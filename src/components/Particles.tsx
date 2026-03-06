import { motion } from "motion/react";
import { Heart, Sparkles, Star } from "lucide-react";

const particleIcons = [Heart, Sparkles, Star];

export function Particles() {
  const particles = Array.from({ length: 15 }, (_, i) => {
    const Icon = particleIcons[i % particleIcons.length];
    return {
      id: i,
      Icon,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 16 + Math.random() * 16,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-20"
          style={{
            left: particle.left,
            top: "-50px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 360],
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <particle.Icon
            size={particle.size}
            className="text-pink-400"
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}
