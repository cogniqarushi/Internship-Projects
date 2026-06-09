import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import { LogoIcon } from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="max-w-xs text-center md:text-left">
            <Link to="/" className="inline-block mb-4">
              <img 
                src="https://lh3.googleusercontent.com/d/1fcQ1ykQ72VgTC7tka6Z6nKYSjm93cwNQ"
                alt="GBD Construction Logo" 
                className="h-14 md:h-16 w-auto object-contain" 
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Trusted residential construction and new condo developments across Montreal's North Shore.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="https://www.facebook.com/gbdconstruction?fref=ts" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/gbdconstruction/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex gap-12 text-sm text-center md:text-left">
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link to="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} GBD Construction. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Trust & Quality</p>
        </div>
      </div>
    </footer>
  );
}
