import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Toaster } from '../ui/sonner';
import FloralDecoration from '../effects/FloralDecoration';
import WeddingInfo from '../sections/WeddingInfo';
import MapSection from '../sections/MapSection';
import CoupleIntro from '../sections/CoupleIntro';
import Timeline from '../sections/Timeline';
import RsvpSection from '../sections/RsvpSection';
import AccountInfo from '../sections/AccountInfo';
import ShareSection from '../sections/ShareSection';

export default function MainInvitation() {
  useEffect(() => {
    // Smooth scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#faf8f5' }}>
      {/* Hero section - Invitation card style */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center px-6 py-20"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl" />
        </div>

        {/* Main invitation card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-2xl w-full"
        >
          {/* Card container with shadow and border */}
          <div 
            className="relative bg-white rounded-lg p-12 shadow-2xl"
            style={{
              boxShadow: '0 20px 60px rgba(139, 115, 85, 0.2), inset 0 1px 0 rgba(255,255,255,1)',
              border: '1px solid rgba(212, 165, 116, 0.3)'
            }}
          >
            {/* Decorative corners */}
            <FloralDecoration position="top-left" size="md" />
            <FloralDecoration position="top-right" size="md" />
            <FloralDecoration position="bottom-left" size="md" />
            <FloralDecoration position="bottom-right" size="md" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Top decoration */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mb-8"
              >
                <svg width="200" height="30" viewBox="0 0 200 30" className="mx-auto opacity-50">
                  <path 
                    d="M0 15 Q 50 5, 100 15 T 200 15" 
                    stroke="#d4a574" 
                    fill="none" 
                    strokeWidth="1"
                  />
                  <circle cx="100" cy="15" r="4" fill="#d4a574" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <p 
                  className="text-muted-foreground mb-6 tracking-widest"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem' }}
                >
                  WEDDING INVITATION
                </p>
                
                <h1 
                  className="mb-6"
                  style={{ 
                    fontFamily: "'Noto Serif KR', serif", 
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: '#3d3027',
                    letterSpacing: '0.05em',
                    lineHeight: '1.4'
                  }}
                >
                  유현욱 <span className="text-primary">♥</span> 김연재
                </h1>

                <div className="mb-8 space-y-3">
                  <p 
                    className="text-foreground"
                    style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.1rem', fontWeight: 300 }}
                  >
                    2026년 6월 28일 일요일 오후 5시
                  </p>
                  <p className="text-muted-foreground">더베르G</p>
                </div>

                <div className="relative py-6">
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <motion.p 
                    className="text-foreground/80 leading-relaxed mx-auto px-6"
                    style={{ 
                      fontFamily: "'Noto Serif KR', serif", 
                      fontSize: '1rem',
                      lineHeight: '2',
                      maxWidth: '400px'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                  >
                    두 사람이 만나<br />
                    세상에 색이 생겼습니다<br />
                    <br />
                    그 빛나는 순간을 함께 하고 싶습니다<br />
                    오셔서 축복해 주시면<br />
                    더없는 기쁨으로 간직하겠습니다
                  </motion.p>
                  <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>
              </motion.div>

              {/* Bottom decoration */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="mt-8"
              >
                <svg width="200" height="30" viewBox="0 0 200 30" className="mx-auto opacity-50">
                  <path 
                    d="M0 15 Q 50 25, 100 15 T 200 15" 
                    stroke="#d4a574" 
                    fill="none" 
                    strokeWidth="1"
                  />
                  <circle cx="100" cy="15" r="4" fill="#d4a574" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-primary/50"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Main content sections */}
      <div className="relative z-10">
        <WeddingInfo />
        <CoupleIntro />
        <Timeline />
        <MapSection />
        <RsvpSection />
        <AccountInfo />
        <ShareSection />

        {/* Footer */}
        <footer className="py-16 px-6 text-center" style={{ background: '#faf8f5' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative line */}
            <div className="max-w-md mx-auto mb-8">
              <svg width="100%" height="2" viewBox="0 0 300 2">
                <line x1="0" y1="1" x2="300" y2="1" stroke="#d4a574" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>

            <p 
              className="mb-4 text-muted-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', letterSpacing: '0.1em' }}
            >
              Thank you for celebrating with us
            </p>
            <p 
              className="text-primary"
              style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.1rem' }}
            >
              현욱 ♥ 연재
            </p>
            <p className="mt-6 text-xs text-muted-foreground opacity-60">
              2026. 06. 28
            </p>
          </motion.div>
        </footer>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-center" />
    </div>
  );
}