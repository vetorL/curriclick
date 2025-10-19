import { Target, Zap, FileText } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Análise de Compatibilidade",
    subtitle: "O Diferencial",
    description: "Nossa IA compara seu currículo e experiência com os requisitos da vaga, gerando um Match Score para candidaturas mais assertivas.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Automação Total",
    subtitle: "Agente de IA",
    description: "O Agente de IA realiza a busca especializada e automatiza o processo de candidatura, liberando você para focar na preparação da entrevista.",
    color: "secondary",
  },
  {
    icon: FileText,
    title: "Otimização de Currículo",
    subtitle: "Sempre Relevante",
    description: "Receba sugestões de melhoria ou use nossa IA para gerar novos currículos perfeitamente adaptados para a vaga, ideal para migração de carreira.",
    color: "accent",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Talent Match AI: Sua{" "}
            <span className="gradient-text">Vantagem Competitiva</span>
            {" "}no Mercado
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Três pilares de tecnologia trabalhando 24/7 para acelerar sua carreira
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const colorClass = 
              pillar.color === "primary" ? "bg-primary/10 text-primary" :
              pillar.color === "secondary" ? "bg-secondary/10 text-secondary" :
              "bg-accent/10 text-accent";
            
            return (
              <div 
                key={index}
                className="relative group"
              >
                <div className="card-gradient p-8 rounded-3xl border border-border h-full hover:shadow-xl transition-all duration-300">
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
                    style={{ 
                      background: pillar.color === "primary" ? "var(--gradient-primary)" :
                                 pillar.color === "secondary" ? "hsl(var(--secondary))" :
                                 "hsl(var(--accent))"
                    }}
                  />
                  
                  <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {pillar.subtitle}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Visual comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="card-gradient p-8 md:p-12 rounded-3xl border border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Diferença na Prática
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Traditional way */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <span className="text-lg">😓</span>
                  </div>
                  <h4 className="font-semibold text-lg">Busca Tradicional</h4>
                </div>
                
                {[
                  "40+ horas/mês buscando vagas",
                  "Candidaturas genéricas",
                  "Sem feedback de compatibilidade",
                  "Taxa de resposta < 5%"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              
              {/* With AI */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-lg">🚀</span>
                  </div>
                  <h4 className="font-semibold text-lg">Com Talent Match AI</h4>
                </div>
                
                {[
                  "2 horas/mês supervisionando",
                  "Candidaturas personalizadas",
                  "Match Score em cada vaga",
                  "Taxa de resposta > 25%"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-muted-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
