import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { Leaf } from "lucide-react";

export default function ThreeDBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms based on mouse position
  const gridRotateX = useTransform(smoothMouseY, [-1, 1], [45, 65]);
  const gridRotateY = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  
  const orb1X = useTransform(smoothMouseX, [-1, 1], [-50, 50]);
  const orb1Y = useTransform(smoothMouseY, [-1, 1], [-50, 50]);
  
  const orb2X = useTransform(smoothMouseX, [-1, 1], [50, -50]);
  const orb2Y = useTransform(smoothMouseY, [-1, 1], [50, -50]);

  const orb3X = useTransform(smoothMouseX, [-1, 1], [-80, 80]);
  const orb3Y = useTransform(smoothMouseY, [-1, 1], [80, -80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position from -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-cream pointer-events-none" style={{ perspective: '1000px' }}>
      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-brand-yellow/10 via-transparent to-brand-dark/10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* 3D Moving Grid */}
      <motion.div 
        className="absolute inset-[-50%] bg-[linear-gradient(to_right,rgba(42,50,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,50,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX: gridRotateX,
          rotateY: gridRotateY,
          transformOrigin: 'center center',
          y: -40,
          translateZ: -100
        }}
      />

      {/* Floating 3D Orbs with Mouse Parallax */}
      <motion.div
        className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-yellow/10 blur-[100px]"
        style={{ x: orb1X, y: orb1Y }}
        animate={{
          scale: [1, 1.2, 0.8, 1],
          rotateX: [0, 45, -45, 0],
          rotateY: [0, -45, 45, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-[40%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-brand-yellow/10 blur-[100px]"
        style={{ x: orb2X, y: orb2Y }}
        animate={{
          scale: [1, 1.3, 0.9, 1],
          rotateX: [0, -30, 30, 0],
          rotateY: [0, 30, -30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-brand-dark/10 blur-[120px]"
        style={{ x: orb3X, y: orb3Y }}
        animate={{
          scale: [1, 1.1, 1.2, 1],
          rotateX: [0, 30, -30, 0],
          rotateY: [0, -30, 30, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Leaf Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-brand-yellow/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
            scale: [0.5, 1.2, 0.5],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        >
          <Leaf size={Math.random() * 20 + 15} />
        </motion.div>
      ))}
    </div>
  );
}
