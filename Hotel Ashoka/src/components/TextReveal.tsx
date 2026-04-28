import { motion } from 'motion/react';

export default function TextReveal({ text, className = "", textClassName = "" }: { text: string, className?: string, textClassName?: string }) {
  const words = text.split(" ");
  
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.25em] mb-2">
          <motion.span
            className={`inline-block ${textClassName}`}
            initial={{ y: "100%", opacity: 0, rotateZ: 5 }}
            whileInView={{ y: 0, opacity: 1, rotateZ: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.05, 
              ease: [0.33, 1, 0.68, 1] 
            }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}
