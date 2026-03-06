import { motion } from 'motion/react';

export default function DatePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-12" style={{ background: '#fafaf8' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full"
      >
        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gray-400 mx-auto mb-8 sm:mb-10 md:mb-12"
        />

        {/* Main date display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <p 
            className="text-gray-400 tracking-wider mb-3 sm:mb-3.5 md:mb-4"
            style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', fontFamily: "'Noto Serif KR', serif", letterSpacing: '0.3em' }}
          >
            WEDDING DAY
          </p>
          
          <div className="mb-6 sm:mb-7 md:mb-8">
            <p 
              className="text-gray-800 mb-2"
              style={{ fontSize: 'clamp(2rem, 6.5vw, 2.5rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 300, letterSpacing: '-0.02em' }}
            >
              6 · 28
            </p>
            <p 
              className="text-gray-600"
              style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}
            >
              2026
            </p>
          </div>

          <div className="space-y-2">
            <p 
              className="text-gray-700"
              style={{ fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 400 }}
            >
              토요일 오후 다섯시
            </p>
          </div>
        </motion.div>

        {/* Venue information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <div className="border-t border-b border-gray-300 py-6 sm:py-7 md:py-8 px-4 sm:px-5 md:px-6">
            <p 
              className="text-gray-800 mb-2 sm:mb-2.5 md:mb-3"
              style={{ fontSize: 'clamp(1rem, 2.8vw, 1.1rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 400, letterSpacing: '0.05em' }}
            >
              더베르G
            </p>
            <p 
              className="text-gray-500 leading-relaxed"
              style={{ fontSize: 'clamp(0.7rem, 2.1vw, 0.8rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}
            >
              서울특별시 영등포구 국회대로 612<br />
              코레일리테일빌딩 2층
            </p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-center gap-8 sm:gap-10 md:gap-12"
        >
          <div className="text-center">
            <p className="text-gray-500 mb-1.5 sm:mb-2" style={{ fontSize: 'clamp(0.6rem, 1.9vw, 0.7rem)', fontFamily: "'Noto Serif KR', serif", letterSpacing: '0.1em' }}>
              GROOM
            </p>
            <p className="text-gray-800" style={{ fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 400 }}>
              유현욱
            </p>
          </div>
          
          <div className="w-px bg-gray-300" />
          
          <div className="text-center">
            <p className="text-gray-500 mb-1.5 sm:mb-2" style={{ fontSize: 'clamp(0.6rem, 1.9vw, 0.7rem)', fontFamily: "'Noto Serif KR', serif", letterSpacing: '0.1em' }}>
              BRIDE
            </p>
            <p className="text-gray-800" style={{ fontSize: 'clamp(0.85rem, 2.4vw, 0.95rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 400 }}>
              김연재
            </p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="h-px bg-gray-400 mx-auto mt-8 sm:mt-10 md:mt-12"
        />
      </motion.div>
    </div>
  );
}