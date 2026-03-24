import { motion, useReducedMotion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedHeading({ text, className = "", delay = 0 }: Props) {
  const words = text.split(" ");
  const reduceMotion = useReducedMotion();

  return (
    <motion.h1
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 8 : 20, rotateX: reduceMotion ? 0 : -18, scale: reduceMotion ? 1 : 0.98 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              transition: {
                duration: reduceMotion ? 0.22 : 0.52,
                delay: delay + i * (reduceMotion ? 0.03 : 0.07),
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
