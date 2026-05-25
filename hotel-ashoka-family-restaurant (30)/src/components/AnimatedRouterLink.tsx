import { motion, HTMLMotionProps } from 'motion/react';
import { Link, LinkProps } from 'react-router-dom';
import React from 'react';

// Create a motion component from the Link component
const MotionLink = motion(Link);

interface AnimatedRouterLinkProps extends Omit<LinkProps, keyof HTMLMotionProps<"a">>, HTMLMotionProps<"a"> {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedRouterLink({ children, className = '', ...props }: AnimatedRouterLinkProps) {
  return (
    <MotionLink
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
