import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Dental Services" },
    { path: "/orthodontics", label: "Types of Braces" },
    { path: "/doctors", label: "Our Doctors" },
    { path: "/virtual-consultation", label: "Virtual Orthodontic Consultation" },
    { path: "/payment", label: "Payment Options" },
    { path: "/contact", label: "Contact Us" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'bg-background/98 backdrop-blur-lg shadow-xl border-b border-border/50' : 'bg-black/60 backdrop-blur-md border-b border-white/20'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center flex-shrink-0">
            <h1 className={`text-base lg:text-lg font-serif font-bold tracking-wide transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'text-foreground' : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]'
              }`}>
              PRECISION SMILE ORTHODONTICS
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1.5 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2.5 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${scrolled || location.pathname !== '/'
                    ? isActive(item.path)
                      ? "text-primary font-semibold"
                      : "text-foreground/80 hover:text-primary"
                    : isActive(item.path)
                      ? "text-white font-semibold drop-shadow-lg"
                      : "text-white/90 hover:text-white drop-shadow-lg"
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="default" size="sm" className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg whitespace-nowrap">
              <a href="tel:6103010295">Call 610-301-0295</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`xl:hidden p-2 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'text-foreground' : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]'} hover:scale-110`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="xl:hidden pb-4 space-y-2 bg-primary text-primary-foreground backdrop-blur-lg rounded-b-lg shadow-xl animate-in slide-in-from-top-4 duration-300">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-all duration-300 animate-in slide-in-from-right-4 ${isActive(item.path)
                    ? "bg-primary-foreground/10 text-primary-foreground font-semibold"
                    : "text-primary-foreground/90 hover:text-white hover:bg-primary-foreground/10 hover:translate-x-1"
                  }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2 animate-in fade-in duration-500" style={{ animationDelay: '300ms' }}>
              <Button variant="default" size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <a href="tel:6103010295">Call 610-301-0295</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
