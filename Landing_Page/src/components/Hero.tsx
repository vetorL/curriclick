import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
      />
      
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by AI
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Encontre Seu Próximo Emprego{" "}
              <span className="gradient-text">10x Mais Rápido</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Cansado do processo lento de candidatura? O Talent Match AI é seu Agente de Busca inteligente: 
              ele encontra, analisa a compatibilidade e candidata você automaticamente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="cta" size="xl" className="group">
                Comece Grátis por 7 Dias
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Ver Como Funciona
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Sem cartão de crédito
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Cancele quando quiser
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
              style={{ background: 'var(--gradient-primary)' }}
            />
            <img 
              src={heroImage} 
              alt="Profissional relaxado enquanto IA trabalha em candidaturas"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
