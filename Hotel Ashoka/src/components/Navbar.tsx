import { useState, useEffect } from "react";
import { Menu, X, Phone, Leaf } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "../utils";
import AnimatedRouterLink from "./AnimatedRouterLink";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about", hasDropdown: true },
    { name: "Menu", href: "/menu", hasDropdown: true },
    { name: "Gallery", href: "/gallery", hasDropdown: true },
    { name: "Events", href: "/events", hasDropdown: true },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || location.pathname !== "/"
          ? "bg-brand-dark py-2"
          : "bg-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <AnimatedRouterLink to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center bg-brand-cream/10 rounded-full border border-[#c9a34e]/30 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/d/1fl1_PwYstotCqSb26KCzcoIlMIMkTr86" 
                alt="Hotel Ashoka Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif text-3xl md:text-4xl font-bold text-[#c9a34e] tracking-tight italic group-hover:scale-105 transition-transform duration-300 flex items-center gap-2" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Hotel Ashoka
            </span>
          </AnimatedRouterLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <AnimatedRouterLink
                key={link.name}
                to={link.href}
                className={cn(
                  "relative py-1 text-[17px] font-medium tracking-wide transition-all group flex items-center gap-1.5",
                  location.pathname === link.href
                    ? "text-brand-cream"
                    : "text-brand-cream/80 hover:text-brand-yellow",
                  "font-serif"
                )}
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 w-full h-[2.5px] bg-[#c9a34e] transition-transform origin-center",
                  location.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </AnimatedRouterLink>
            ))}
          </nav>

          {/* Book a Table Button */}
          <div className="hidden md:block">
            <AnimatedRouterLink
              to="/reservation"
              className="flex items-center gap-2 bg-gradient-to-b from-[#e2c17d] to-brand-yellow text-brand-dark px-8 py-2.5 rounded-full text-[17px] font-bold transition-all hover:scale-105 active:scale-95 border border-brand-cream/20 font-serif"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              <span>Book a Table</span>
            </AnimatedRouterLink>
          </div>

          {/* Mobile Menu Toggle */}
          <AnimatedButton
            className="md:hidden p-2 text-brand-yellow hover:text-brand-cream transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </AnimatedButton>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-dark border-t border-brand-yellow/40 py-6 px-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <AnimatedRouterLink
              key={link.name}
              to={link.href}
              className={cn(
                "text-base font-serif p-3 rounded-lg transition-colors border-l-2 flex items-center justify-between",
                location.pathname === link.href
                  ? "bg-brand-yellow/10 text-brand-cream border-brand-yellow"
                  : "text-brand-cream/80 hover:bg-brand-yellow/5 hover:text-brand-cream border-transparent",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>{link.name}</span>
              {link.hasDropdown && (
                <svg className="w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </AnimatedRouterLink>
          ))}
          <AnimatedRouterLink
            to="/reservation"
            className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#e2c17d] to-brand-yellow text-brand-dark px-5 py-3 rounded-full text-base font-bold transition-all mt-4 hover:scale-105 font-serif"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone size={18} />
            <span>Book a Table</span>
          </AnimatedRouterLink>
        </div>
      )}
    </motion.header>
  );
}
