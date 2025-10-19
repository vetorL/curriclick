import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const partners = [
    "Google", "Ambev", "Heineken", "Fox", "Microsoft", "Unilever"
  ];

  return (
    <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Candidate-se a vagas em segundos.{" "}
            <span className="text-yellow-300">Conheça Currí-lick.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Economize horas preenchendo formulários de candidatura. Seus dados
            profissionais sempre prontos para enviar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              Conhecer agora
            </Button>
            <Button 
              variant="default" 
              size="lg"
              className="bg-yellow-400 text-primary hover:bg-yellow-500"
            >
              Começar agora
            </Button>
          </div>

          {/* Partners Section */}
          <div className="pt-16 space-y-4">
            <p className="text-primary-foreground/80 text-sm">Faça parte</p>
            <p className="text-primary-foreground/60 text-xs">
              Seja qual empresa parceira ou faça parte delas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 pt-4">
              {partners.map((partner) => (
                <div 
                  key={partner}
                  className="text-white/70 font-semibold text-sm md:text-base hover:text-white transition-smooth"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
