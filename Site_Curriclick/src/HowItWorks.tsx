import { UserCircle, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Cadastre seus dados",
    description: "Preencha uma única vez suas informações profissionais de forma segura.",
  },
  {
    icon: Zap,
    title: "Automação instantânea",
    description: "Nossa tecnologia preenche automaticamente os formulários para você.",
  },
  {
    icon: CheckCircle,
    title: "Seja contratado",
    description: "Candidate-se a mais vagas em menos tempo e aumente suas chances.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Como funciona
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Três passos simples para revolucionar sua busca por emprego
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-card transition-smooth hover:shadow-glow"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="text-primary font-semibold text-sm">
                    {index + 1}. {step.title}
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
