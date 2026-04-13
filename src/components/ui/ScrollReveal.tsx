import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "w-fit" | "w-full";
  delay?: number;
  yOffset?: number;
}

const ScrollReveal = ({ 
  children, 
  width = "w-full", 
  delay = 0,
  yOffset = 30
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={width} style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : yOffset,
        }}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.17, 0.55, 0.55, 1], // fluid ease-out
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
