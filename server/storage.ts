import { type User, type InsertUser, type EmailSignup, type InsertEmailSignup } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup>;
  getEmailSignups(): Promise<EmailSignup[]>;
  getEmailSignupByEmail(email: string): Promise<EmailSignup | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailSignups: Map<string, EmailSignup>;

  constructor() {
    this.users = new Map();
    this.emailSignups = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEmailSignup(insertSignup: InsertEmailSignup): Promise<EmailSignup> {
    const id = randomUUID();
    const signup: EmailSignup = {
      ...insertSignup,
      id,
      createdAt: new Date(),
    };
    this.emailSignups.set(id, signup);
    return signup;
  }

  async getEmailSignups(): Promise<EmailSignup[]> {
    return Array.from(this.emailSignups.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getEmailSignupByEmail(email: string): Promise<EmailSignup | undefined> {
    return Array.from(this.emailSignups.values()).find(
      (signup) => signup.email === email,
    );
  }
}

export const storage = new MemStorage();
