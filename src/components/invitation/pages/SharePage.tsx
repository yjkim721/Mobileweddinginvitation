import { motion } from 'motion/react';

export default function SharePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-10" style={{ background: '#fafaf8' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 sm:px-0"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gray-400 mx-auto mb-8 sm:mb-10 md:mb-12"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-600"
          style={{ 
            fontFamily: "'Noto Serif KR', serif", 
            fontSize: 'clamp(0.9rem, 2.6vw, 1rem)',
            lineHeight: '1.8',
            letterSpacing: '-0.01em'
          }}
        >
          You are invited to our special wedding.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-px bg-gray-400 mx-auto mt-8 sm:mt-10 md:mt-12"
        />
      </motion.div>
    </div>
  );
}