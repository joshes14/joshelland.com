import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const directionMap = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: Props) {
  const reduceMotion = useReducedMotion();
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...(reduceMotion ? { x: 0, y: 8 } : offset) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.58,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
