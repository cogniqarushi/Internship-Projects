import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AIAgent from './components/AIAgent';
import { MessageSquare } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isAIStartOpen, setIsAIStartOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-gold selection:text-black flex flex-col relative">
        {/* Subtle Ambient Light for whole app */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-brand-black to-brand-black pointer-events-none -z-10" />
        
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* AI Agent Trigger Button (Visible when closed) */}
        {!isAIStartOpen && (
          <button
            onClick={() => setIsAIStartOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-brand-gold hover:bg-white text-black p-4 rounded-full shadow-lg shadow-brand-gold/20 transition-all duration-300 hover:scale-110 group"
          >
            <MessageSquare size={24} />
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1 bg-white text-black text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Ask AI Coach
            </span>
          </button>
        )}

        <AIAgent isOpen={isAIStartOpen} onClose={() => setIsAIStartOpen(false)} />
      </div>
    </Router>
  );
};

export default App;