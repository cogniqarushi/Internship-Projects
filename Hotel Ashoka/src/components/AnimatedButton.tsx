import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export default function AnimatedButton({ children, className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
