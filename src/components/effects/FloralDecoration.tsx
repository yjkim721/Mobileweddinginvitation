import { motion } from 'motion/react';

interface FloralDecorationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
}

export default function FloralDecoration({ position = 'top-left', size = 'md' }: FloralDecorationProps) {
  const sizeMap = {
    sm: 60,
    md: 100,
    lg: 140,
  };

  const positionMap = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  const w = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 1 }}
      className={`absolute ${positionMap[position]} pointer-events-none`}
      style={{ width: w, height: w }}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Decorative floral corner */}
        <path
          d="M0 0 Q 15 15, 0 30 Q 10 25, 20 30 Q 25 20, 30 30 Q 30 15, 40 20 Q 35 10, 45 10 Q 40 5, 50 0"
          stroke="#d4a574"
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
        <circle cx="10" cy="15" r="3" fill="#d4a574" opacity="0.3" />
        <circle cx="25" cy="25" r="2" fill="#d4a574" opacity="0.4" />
        <circle cx="35" cy="15" r="2.5" fill="#d4a574" opacity="0.3" />
        
        {/* Leaves */}
        <path
          d="M5 5 Q 8 10, 5 15 Q 3 10, 5 5"
          fill="#8b7355"
          opacity="0.2"
        />
        <path
          d="M20 10 Q 23 15, 20 20 Q 18 15, 20 10"
          fill="#8b7355"
          opacity="0.2"
        />
      </svg>
    </motion.div>
  );
}
