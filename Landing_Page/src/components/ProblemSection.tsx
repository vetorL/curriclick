import { XCircle, Clock, AlertTriangle, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Buscar vagas é exaustivo",
    description: "Horas navegando em múltiplos sites de emprego para encontrar vagas específicas para sua formação.",
  },
  {
    icon: AlertTriangle,
    title: "Incerteza sobre compatibilidade",
    description: "Não sabe se seu currículo é bom o suficiente para a vaga desejada antes de se candidatar.",
  },
  {
    icon: TrendingDown,
    title: "Formulários repetitivos",
    description: "Perder horas preenchendo os mesmos dados em diferentes plataformas de candidatura.",
  },
  {
    icon: XCircle,
    title: "Baixa taxa de resposta",
    description: "Enviar dezenas de candidaturas genéricas sem receber retorno das empresas.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Pare de Perder Tempo com{" "}
            <span className="gradient-text">Candidaturas Ineficientes</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Sabemos como o processo tradicional de busca de emprego pode ser frustrante e demorado
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div 
                key={index}
                className="card-gradient p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm">{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
