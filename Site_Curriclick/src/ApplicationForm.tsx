import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

export const ApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Dados Salvos com Sucesso!",
        description: "Suas informações estão prontas para uso em candidaturas.",
      });
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="application-form" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-12 shadow-card border border-border text-center space-y-6">
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto shadow-glow">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold">Tudo Pronto!</h3>
              <p className="text-lg text-muted-foreground">
                Seus dados foram salvos com sucesso. Agora você pode se candidatar 
                a vagas com apenas um clique!
              </p>
              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsSubmitted(false)}
              >
                Editar Informações
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Cadastre Suas Informações
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha uma vez, use para sempre
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="João Silva"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="transition-smooth"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="joao.silva@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="transition-smooth"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(11) 98765-4321"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="transition-smooth"
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience">Experiência Profissional</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  placeholder="Descreva sua experiência profissional, cargos anteriores e responsabilidades..."
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="transition-smooth resize-none"
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills">Habilidades</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  placeholder="Liste suas principais habilidades e competências..."
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="transition-smooth resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full text-base"
            >
              Salvar Informações
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
