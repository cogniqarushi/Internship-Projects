import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import Home from '../pages/Home';
const Menu = lazy(() => import('../pages/Menu'));
const Reservation = lazy(() => import('../pages/Reservation'));
const FAQ = lazy(() => import('../pages/FAQ'));
const Contact = lazy(() => import('../pages/Contact'));
const About = lazy(() => import('../pages/About'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Events = lazy(() => import('../pages/Events'));

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
    rotateX: 15,
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
  },
  out: {
    opacity: 0,
    scale: 1.1,
    rotateX: -15,
  }
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand-dark"><div className="w-10 h-10 border-4 border-[#c9a34e] border-t-transparent rounded-full animate-spin"></div></div>}>
      {children}
    </Suspense>
  </motion.div>
);

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - key is required for AnimatePresence to work with Routes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
        <Route path="/reservation" element={<PageWrapper><Reservation /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}
