import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSignupSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Email signup endpoint
  app.post("/api/signup", async (req, res) => {
    try {
      const validatedData = insertEmailSignupSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignup = await storage.getEmailSignupByEmail(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({ 
          message: "This email is already on the waitlist" 
        });
      }

      const signup = await storage.createEmailSignup(validatedData);
      res.status(201).json({ 
        message: "Successfully joined the waitlist",
        signup: { id: signup.id, email: signup.email, createdAt: signup.createdAt }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email format",
          errors: error.errors 
        });
      }
      
      console.error("Signup error:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get all signups (for analytics/admin purposes)
  app.get("/api/signups", async (req, res) => {
    try {
      const signups = await storage.getEmailSignups();
      res.json({ 
        signups: signups.map(s => ({ 
          id: s.id, 
          email: s.email, 
          createdAt: s.createdAt 
        })),
        total: signups.length
      });
    } catch (error) {
      console.error("Get signups error:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
