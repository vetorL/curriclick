import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Pricing = () => {
  const plans = [
    {
      name: "Grátis",
      price: "R$0",
      description: "Perfeito para começar sua jornada",
      features: [
        "5 candidaturas por mês",
        "Preenchimento automático básico",
        "Suporte por email",
        "1 modelo de currículo"
      ],
      highlighted: false,
    },
    {
      name: "Plus",
      price: "R$29,99",
      description: "Ideal para quem busca ativamente",
      features: [
        "Candidaturas ilimitadas por mês",
        "Preenchimento automático avançado",
        "Suporte prioritário",
        "Modelos ilimitados de currículo",
        "Análise de compatibilidade com IA",
        "Notificações de novas vagas",
        "Relatórios de candidaturas"
      ],
      highlighted: true,
    },
    {
      name: "Profissional",
      price: "R$49,99",
      description: "Para quem quer o máximo de recursos",
      features: [
        "Tudo do plano Plus",
        "Consultoria de carreira (1x/mês)",
        "Análise aprofundada de perfil",
        "API para integração",
        "Gerente de conta dedicado",
        "Otimização automática de currículo"
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Escolha <span className="text-primary">seu</span> plano
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos o valor certo em cada opção. Com preço justo e sem compromisso. 
              Escolha o seu.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-smooth ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground shadow-glow scale-105"
                    : "bg-card border border-border shadow-card"
                }`}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${
                    plan.highlighted ? "text-white" : "text-foreground"
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className={`text-4xl font-bold ${
                      plan.highlighted ? "text-white" : "text-foreground"
                    }`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-white" : "text-primary"
                      }`} />
                      <span className={`text-sm ${
                        plan.highlighted ? "text-primary-foreground/90" : "text-foreground/80"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-yellow-400 text-primary hover:bg-yellow-500"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  size="lg"
                >
                  Começar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
