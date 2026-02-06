import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-white/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h2 className="font-heading font-bold text-2xl text-white">PROJECT <span className="text-brand-gold">FITNESS</span></h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xs">Transform your body. Transform your life. Online coaching that gets real results.</p>
          </div>

          <div className="flex gap-6">
             <a 
               href="https://www.instagram.com/projectfitness_official" 
               target="_blank" 
               rel="noreferrer" 
               className="text-gray-400 hover:text-brand-orange transition transform hover:scale-110 flex items-center gap-2"
               aria-label="Visit Instagram"
             >
               <Instagram size={24} />
               <span className="text-sm font-medium">Follow us on Instagram</span>
             </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} Project Fitness. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;