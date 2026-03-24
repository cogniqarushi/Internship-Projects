import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || location.pathname !== '/'
          ? 'bg-[#1a3a2a] shadow-md py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://69a5d041581800b707fb219f.imgix.net/ashoka%20logo.jpeg" 
              alt="Hotel Ashoka Logo" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-sm object-cover"
            />
            <span className="font-serif text-2xl font-bold text-brand-orange tracking-tight hidden sm:block">
              Hotel Ashoka
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all rounded-full group",
                  location.pathname === link.href 
                    ? "bg-[#1a3a2a] text-brand-orange shadow-inner border border-black/20" 
                    : "text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4">
              <Link
                to="/reservation"
                className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-orange/90 transition-colors shadow-sm animate-subtle-pulse"
              >
                <Phone size={16} />
                <span>Book Table</span>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1a3a2a] border-t border-white/10 shadow-lg py-4 px-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-base font-medium p-3 rounded-xl transition-colors",
                location.pathname === link.href 
                  ? "bg-black/20 text-brand-orange" 
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/reservation"
            className="flex items-center justify-center gap-2 bg-brand-orange text-white px-5 py-3 rounded-full text-base font-medium hover:bg-brand-orange/90 transition-colors mt-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone size={18} />
            <span>Book Table</span>
          </Link>
        </div>
      )}
    </motion.header>
  );
}
