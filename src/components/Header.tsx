import { Button } from "@/components/ui/button";
import { Menu, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Header = () => {
  const navItems = [
    { label: "Inicio", href: "#" },
    { label: "Rutas", href: "#rutas" },
    { label: "Paraderos", href: "#paraderos" },
    { label: "Estadísticas", href: "#estadisticas" },
    { label: "Empresas", href: "#empresas" },
    { label: "Panel IMOVEQROO", href: "#panel" },
  ];

  return (
    <header className="w-full bg-primary text-primary-foreground shadow-institutional sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-accent-foreground">
                QR
              </div>
              <div>
                <h1 className="text-xl font-poppins font-bold leading-tight">MoveSmart QROO</h1>
                <p className="text-xs opacity-90">Gobierno de Quintana Roo</p>
              </div>
            </div>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Social Icons - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <a href="#" className="hover:text-accent transition-colors p-1">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-accent transition-colors p-1">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-accent transition-colors p-1">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-accent transition-colors p-1">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <Button 
              variant="default" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
            >
              Iniciar sesión
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
