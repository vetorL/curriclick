import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Busca automatizada ilimitada de vagas",
  "Análise de compatibilidade com Match Score",
  "Candidaturas automáticas personalizadas",
  "Geração e otimização de currículos com IA",
  "Dashboard com todas as suas candidaturas",
  "Alertas de novas vagas compatíveis",
  "Suporte prioritário",
];

const PricingSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Acesso Ilimitado por um{" "}
            <span className="gradient-text">Valor Fixo</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Invista menos do que o valor de um almoço por semana e economize centenas de horas
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
              style={{ background: 'var(--gradient-primary)' }}
            />
            
            <div className="card-gradient p-8 md:p-12 rounded-3xl border-2 border-primary/20 relative">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Mais Popular
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Plano Mensal</h3>
                
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-bold gradient-text">R$ 97</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Cancele quando quiser, sem compromisso
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="cta" size="xl" className="w-full group">
                Começar Teste Grátis de 7 Dias
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                💳 Sem cartão de crédito necessário para o teste
              </p>
            </div>
          </div>
          
          {/* Value proposition */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              <span className="font-semibold text-foreground">Pense nisso:</span> 
              {" "}Você economiza 38+ horas por mês. Seu tempo vale mais que isso!
            </p>
            
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-primary">10x</div>
                <div className="text-xs text-muted-foreground">Mais rápido</div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-secondary">5x</div>
                <div className="text-xs text-muted-foreground">Mais respostas</div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-xs text-muted-foreground">Automatizado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
