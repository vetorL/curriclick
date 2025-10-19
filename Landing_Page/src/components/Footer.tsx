import { Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Talent Match AI</h3>
            <p className="text-sm text-muted-foreground">
              Seu agente de IA para encontrar o emprego perfeito, mais rápido.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Como Funciona</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LGPD</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Talent Match AI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
