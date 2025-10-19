export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                AutoVaga
              </h3>
              <p className="text-sm text-muted-foreground">
                Automatize suas candidaturas e economize tempo na busca por emprego.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="font-semibold">Links Úteis</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-smooth">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-smooth">
                    Benefícios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-smooth">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="font-semibold">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contato@autovaga.com</li>
                <li>(11) 9999-9999</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 AutoVaga. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
