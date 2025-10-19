import { Button } from "@/components/ui/button";

export const Benefits = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section 1: Automação */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Automação no preenchimento
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Com apenas um clique, todos os seus dados profissionais são preenchidos 
                automaticamente em qualquer formulário de candidatura. Economize tempo 
                e candidate-se a mais vagas.
              </p>
              <Button variant="default" size="lg">
                Ver vídeo
              </Button>
            </div>
            <div className="bg-muted rounded-2xl h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Área de demonstração</p>
            </div>
          </div>

          {/* Section 2: Compatibilidade */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Decorative circles */}
                <div className="absolute w-16 h-16 rounded-full bg-yellow-400 top-12 left-8 animate-pulse"></div>
                <div className="absolute w-12 h-12 rounded-full bg-green-400 bottom-16 left-24"></div>
                <div className="absolute w-20 h-20 rounded-full bg-blue-400 top-8 right-16"></div>
                <div className="absolute w-14 h-14 rounded-full bg-red-400 bottom-12 right-8"></div>
                <div className="absolute w-10 h-10 rounded-full bg-purple-400 bottom-24 right-32"></div>
                <div className="text-4xl">✕</div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Compatibilidade de <span className="text-primary">vagas</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilize nossa IA para encontrar as vagas mais adequadas ao seu perfil. 
                Não perca tempo com oportunidades que não combinam com você. Nosso algoritmo 
                analisa seu perfil e recomenda as melhores vagas.
              </p>
              <Button variant="default" size="lg">
                Encontrar →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
