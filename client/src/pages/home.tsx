import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Upload, Image, Eye, Clock, Heart, Handshake } from "lucide-react";
import heroVideoSrc from "@assets/1086524-hd_1280_720_25fps_1757086339730.mp4";
import devicePrototypeGif from "@assets/file-YwCcOT43HD-unscreen_1757086674659.gif";

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
        title: "Benvenuto nella lista d'attesa!",
        description: "Ti notificheremo quando SketchTattoo sarà pronto.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/signups"] });
    },
    onError: (error) => {
      toast({
        title: "Qualcosa è andato storto",
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
        title: "Email non valida",
        description: "Inserisci un indirizzo email valido.",
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
          <div className="absolute inset-0 hero-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-20 blur-sm"
              data-testid="hero-background-video"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Logo */}
          <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" data-testid="logo">
              SketchTattoo
            </h1>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
            data-testid="main-headline"
          >
            Visualizza il tuo prossimo{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              capolavoro
            </span>
          </motion.h2>

          {/* Sub-headline */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
            variants={itemVariants}
            data-testid="sub-headline"
          >
            L'app web che applica i tuoi disegni sui corpi dei tuoi clienti in tempo reale
          </motion.p>

          {/* Email Signup CTA */}
          <motion.div 
            className="max-w-md mx-auto px-4 sm:px-0"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4" data-testid="email-signup-form">
              <Input
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent text-sm sm:text-base"
                required
                data-testid="input-email"
              />
              <Button
                type="submit"
                disabled={signupMutation.isPending}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 glow hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                data-testid="button-signup"
              >
                {signupMutation.isPending ? "Iscrizione..." : "Iscriviti alla lista d'attesa"}
              </Button>
            </form>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3" data-testid="text-waitlist-count">
              Unisciti a 500+ tatuatori già nella lista d'attesa
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Device Prototype Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <img
                src={devicePrototypeGif}
                alt="Dimostrazione del prototipo dell'app SketchTattoo"
                className="max-w-xs sm:max-w-md md:max-w-lg w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl"
                data-testid="device-prototype"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20 rounded-3xl pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" data-testid="how-it-works-title">Come funziona</h3>
            <p className="text-muted-foreground text-base sm:text-lg" data-testid="how-it-works-subtitle">
              Tre semplici passaggi per trasformare il tuo processo creativo
            </p>
          </motion.div>

          {/* Animated Process Flow */}
          <motion.div 
            className="relative max-w-4xl mx-auto mb-16 sm:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              {/* Step 1 */}
              <motion.div 
                className="flex-1 text-center"
                variants={itemVariants}
                data-testid="step-upload"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">Carica Foto</h4>
                <p className="text-muted-foreground text-sm sm:text-base">Carica una foto della parte del corpo del tuo cliente</p>
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Image className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">Aggiungi Disegno</h4>
                <p className="text-muted-foreground text-sm sm:text-base">Carica il tuo disegno del tatuaggio e posizionalo</p>
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold mb-2">Anteprima Risultato</h4>
                <p className="text-muted-foreground text-sm sm:text-base">Vedi l'anteprima realistica del tatuaggio istantaneamente</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Static Infographic */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-card/30">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Benefit 1 */}
            <motion.div 
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              data-testid="benefit-workflow"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">Accelera il Flusso di Lavoro</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">Riduci il tempo necessario per creare rendering per i clienti</p>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              data-testid="benefit-retention"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">Migliora la Fidelizzazione</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">Offri ai clienti una visualizzazione chiara, aumentando fiducia e soddisfazione</p>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              className="text-center p-4 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              data-testid="benefit-consultation"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-2">Semplifica la Consulenza</h4>
              <p className="text-muted-foreground text-xs sm:text-sm">Aiuta a vendere i concetti di tatuaggio più efficacemente ai clienti</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" data-testid="footer-logo">SketchTattoo</div>
          <div className="text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
              Politica sulla Privacy
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
              Termini di Servizio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
