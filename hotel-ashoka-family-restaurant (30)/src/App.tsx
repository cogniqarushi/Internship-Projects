/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollToTop from './components/ScrollToTop';
import AnimatedRoutes from './components/AnimatedRoutes';
import ThreeDBackground from './components/ThreeDBackground';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThreeDBackground />
      <div className="min-h-screen bg-brand-cream font-sans text-[#1a3c34] selection:bg-[#d4af37]/30 flex flex-col relative z-0">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}
