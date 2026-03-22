import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedHeading({ text, className = "", delay = 0 }: Props) {
  const words = text.split(" ");

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
            hidden: { opacity: 0, y: 30, rotateX: -40 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.5,
                delay: delay + i * 0.08,
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
