import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-brand-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Custom SVG Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
             <div className="relative w-14 h-14 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-brand-gold blur-xl opacity-10 group-hover:opacity-30 transition-opacity rounded-full" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  {/* Outer Circle */}
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#D4AF37" strokeWidth="2" />
                  
                  {/* Inner Circle (Simulating the double ring effect if needed, or just the main one) */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#silver" strokeWidth="0.5" opacity="0.5" />

                  {/* PF Monogram */}
                  <text x="25" y="75" fontFamily="serif" fontSize="60" fontWeight="bold" fill="#D4AF37">P</text>
                  <text x="55" y="75" fontFamily="serif" fontSize="60" fontWeight="bold" fill="#C0C0C0">F</text>

                  {/* Horizontal Bar */}
                  <rect x="5" y="48" width="90" height="12" fill="#121212" stroke="#D4AF37" strokeWidth="0.5" />
                  
                  {/* Project Fitness Text */}
                  <text x="50" y="56.5" fontFamily="sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle" letterSpacing="0.5" fontWeight="bold">
                    PROJECT FITNESS
                  </text>
                </svg>
             </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:text-brand-gold ${
                      isActive ? 'text-brand-gold border-b-2 border-brand-gold pb-1' : 'text-gray-300'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink 
                to="/contact" 
                className="bg-brand-gold text-black font-black py-2.5 px-6 rounded-full hover:bg-white transition-all duration-300 text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
              >
                Join Now
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest ${
                    isActive ? 'text-brand-gold bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;