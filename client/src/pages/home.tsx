import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Image, Eye, Clock, Heart, Handshake, Play } from "lucide-react";

interface EmailSignup {
  email: string;
}

export default function Home() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signupMutation = useMutation({
    mutationFn: async (data: EmailSignup) => {
      const response = await apiRequest("POST", "/api/signup", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you when SketchTattoo is ready.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/signups"] });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    signupMutation.mutate({ email });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
          <div className="absolute inset-0 hero-video flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-muted/20 to-background/40 flex items-center justify-center">
              <Play className="w-24 h-24 text-muted-foreground opacity-30" data-testid="hero-video-placeholder" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Logo */}
          <motion.div className="mb-12" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" data-testid="logo">
              SketchTattoo
            </h1>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
            data-testid="main-headline"
          >
            Visualize your next{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              masterpiece
            </span>
          </motion.h2>

          {/* Sub-headline */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            variants={itemVariants}
            data-testid="sub-headline"
          >
            The web app that applies your designs to your clients' bodies in real-time
          </motion.p>

          {/* Email Signup CTA */}
          <motion.div 
            className="max-w-md mx-auto"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" data-testid="email-signup-form">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                required
                data-testid="input-email"
              />
              <Button
                type="submit"
                disabled={signupMutation.isPending}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 glow hover:scale-105"
                data-testid="button-signup"
              >
                {signupMutation.isPending ? "Joining..." : "Join the waitlist"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-3" data-testid="text-waitlist-count">
              Join 500+ tattoo artists already on the waitlist
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4" data-testid="how-it-works-title">How it works</h3>
            <p className="text-muted-foreground text-lg" data-testid="how-it-works-subtitle">
              Three simple steps to transform your creative process
            </p>
          </motion.div>

          {/* Animated Process Flow */}
          <motion.div 
            className="relative max-w-4xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Step 1 */}
              <motion.div 
                className="flex-1 text-center"
                variants={itemVariants}
                data-testid="step-upload"
              >
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Upload Photo</h4>
                <p className="text-muted-foreground">Upload a photo of your client's body part</p>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:block text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 2 */}
              <motion.div 
                className="flex-1 text-center"
                variants={itemVariants}
                data-testid="step-design"
              >
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Add Design</h4>
                <p className="text-muted-foreground">Upload your tattoo design and position it</p>
              </motion.div>

              {/* Arrow */}
              <div className="hidden md:block text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Step 3 */}
              <motion.div 
                className="flex-1 text-center"
                variants={itemVariants}
                data-testid="step-preview"
              >
                <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Preview Result</h4>
                <p className="text-muted-foreground">See the realistic tattoo preview instantly</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Static Infographic */}
      <section className="py-16 px-6 bg-card/30">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              data-testid="benefit-workflow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Accelerate Workflow</h4>
              <p className="text-muted-foreground text-sm">Reduce the time needed to create renderings for clients</p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              data-testid="benefit-retention"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Enhance Retention</h4>
              <p className="text-muted-foreground text-sm">Offer clients clear visualization, increasing trust and satisfaction</p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              data-testid="benefit-consultation"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Simplify Consultation</h4>
              <p className="text-muted-foreground text-sm">Help sell tattoo concepts more effectively to clients</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4" data-testid="footer-logo">SketchTattoo</div>
          <div className="text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
              Privacy Policy
            </a>
            <span className="mx-4">•</span>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
