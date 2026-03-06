import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function CoupleIntro() {
  return (
    <section className="py-20 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-16">
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mb-4">
            <path d="M0 15 Q 25 10, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
          <h2 
            className="text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            신랑 & 신부
          </h2>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <div className="space-y-12">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-8 border-2"
            style={{ 
              background: 'linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 100%)',
              borderColor: 'rgba(139, 115, 85, 0.15)',
              boxShadow: '0 4px 20px rgba(139, 115, 85, 0.08)'
            }}
          >
            <div className="text-center">
              <div 
                className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #d4a574 0%, #c99366 100%)' }}
              >
                <span className="text-4xl text-white">👨</span>
              </div>
              <h3 
                className="mb-2 text-primary" 
                style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.5rem', fontWeight: 400 }}
              >
                유현욱
              </h3>
              <p className="text-muted-foreground mb-4 text-sm tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Groom</p>
              <p className="text-sm leading-relaxed text-foreground/80" style={{ fontFamily: "'Noto Serif KR', serif", lineHeight: '1.9' }}>
                세상에 색을 입혀준 그대에게<br />
                평생의 감사를 전하고 싶습니다
              </p>
            </div>
          </motion.div>

          {/* Heart connector */}
          <div className="flex justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-primary/60 fill-primary/60" />
            </motion.div>
          </div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl p-8 border-2"
            style={{ 
              background: 'linear-gradient(135deg, #fff5f5 0%, #ffe4e6 100%)',
              borderColor: 'rgba(139, 115, 85, 0.15)',
              boxShadow: '0 4px 20px rgba(139, 115, 85, 0.08)'
            }}
          >
            <div className="text-center">
              <div 
                className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #d4a574 0%, #c99366 100%)' }}
              >
                <span className="text-4xl text-white">👰</span>
              </div>
              <h3 
                className="mb-2 text-primary" 
                style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.5rem', fontWeight: 400 }}
              >
                김연재
              </h3>
              <p className="text-muted-foreground mb-4 text-sm tracking-wider" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Bride</p>
              <p className="text-sm leading-relaxed text-foreground/80" style={{ fontFamily: "'Noto Serif KR', serif", lineHeight: '1.9' }}>
                흑백이던 내 세상에 무지개를 선물한<br />
                그대와 영원을 약속합니다
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center p-8 rounded-2xl border"
          style={{ 
            background: 'linear-gradient(to right, #faf8f5, #fff9f5, #faf8f5)',
            borderColor: 'rgba(212, 165, 116, 0.2)'
          }}
        >
          <p className="leading-relaxed text-foreground/80" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.05rem', lineHeight: '2' }}>
            서로의 삶에 색을 입혀준 두 사람이<br />
            이제 하나의 캔버스에 함께 그림을 그리려 합니다<br />
            <br />
            그 첫 번째 붓질을 시작하는 날,<br />
            여러분을 초대합니다
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}