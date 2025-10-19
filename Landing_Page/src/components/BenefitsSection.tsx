import { GraduationCap, RefreshCw } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Para Recém-Formados",
    benefits: [
      "Acelere suas primeiras candidaturas em áreas de nicho",
      "Destaque-se com um currículo otimizado por IA",
      "Encontre vagas alinhadas com sua formação",
      "Economize tempo para preparação de entrevistas",
    ],
    gradient: "from-primary to-primary-glow",
  },
  {
    icon: RefreshCw,
    title: "Para Migração de Carreira",
    benefits: [
      "Gere currículos que realçam habilidades transferíveis",
      "Encontre vagas compatíveis com seu novo objetivo",
      "Adapte sua experiência para diferentes setores",
      "Receba insights sobre gaps de competências",
    ],
    gradient: "from-secondary to-accent",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Seja Você Recém-Formado ou{" "}
            <span className="gradient-text">em Transição de Carreira</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa IA se adapta ao seu perfil e objetivos profissionais
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={index}
                className="relative group"
              >
                {/* Gradient border effect */}
                <div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                />
                
                <div className="card-gradient p-8 rounded-3xl border border-border h-full relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6">{audience.title}</h3>
                  
                  <ul className="space-y-4">
                    {audience.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${audience.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
