import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update styles if not on home page
  const isHomePage = location.pathname === '/';
  const forceDarkText = !isHomePage && !isScrolled;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="https://lh3.googleusercontent.com/d/1fWCG2m7utI6m8MO_KIYYbSe8KmXnmmMF"
            alt="GBD Construction Logo" 
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={`font-medium text-sm transition-colors hover:text-accent ${
                isScrolled || !isHomePage ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`px-6 py-2.5 rounded-none font-medium text-sm transition-all border ${
              isScrolled || !isHomePage
                ? 'bg-primary text-white border-primary hover:bg-transparent hover:text-primary' 
                : 'bg-white text-primary border-white hover:bg-transparent hover:text-white'
            }`}
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled || !isHomePage ? 'text-primary' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 z-40">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 font-medium text-gray-800 border-b border-gray-50 hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
