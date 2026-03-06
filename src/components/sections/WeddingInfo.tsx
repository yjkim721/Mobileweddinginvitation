import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card } from '../ui/card';

export default function WeddingInfo() {
  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #faf8f5, #fff9f5)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Decorative title */}
        <div className="mb-12">
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mb-4">
            <path d="M0 15 Q 25 10, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
          <h2 
            className="mb-2 text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            예식 안내
          </h2>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <p className="mb-12 text-muted-foreground" style={{ fontSize: '1rem', lineHeight: '1.9', fontFamily: "'Noto Serif KR', serif" }}>
          두 사람의 가장 빛나는 장면,<br />
          그 시작의 날에 당신을 초대합니다.
        </p>

        <div className="grid gap-6">
          <Card 
            className="p-6 border-2"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
              borderColor: 'rgba(212, 165, 116, 0.2)',
              boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)'
            }}
          >
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div className="text-left flex-1">
                <h3 className="mb-2 text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>날짜</h3>
                <p className="text-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>2026년 6월 28일 일요일</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-2"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
              borderColor: 'rgba(212, 165, 116, 0.2)',
              boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)'
            }}
          >
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div className="text-left flex-1">
                <h3 className="mb-2 text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>시간</h3>
                <p className="text-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>오후 5시</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-2"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
              borderColor: 'rgba(212, 165, 116, 0.2)',
              boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)'
            }}
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div className="text-left flex-1">
                <h3 className="mb-2 text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>장소</h3>
                <p className="text-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>더베르G</p>
                <p className="text-muted-foreground mt-1" style={{ fontSize: '0.9rem' }}>
                  서울특별시 영등포구 국회대로 612<br />
                  코레일리테일빌딩 2층
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(212, 165, 116, 0.2)' }}>
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: '0.9rem' }}>신랑</p>
              <p className="text-lg text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>유현욱</p>
              <a 
                href="tel:010-9277-9959" 
                className="inline-block mt-2 text-primary/70 hover:text-primary transition-colors"
                style={{ fontSize: '0.9rem' }}
              >
                010-9277-9959
              </a>
            </div>
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: '0.9rem' }}>신부</p>
              <p className="text-lg text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>김연재</p>
              <a 
                href="tel:010-2550-7505" 
                className="inline-block mt-2 text-primary/70 hover:text-primary transition-colors"
                style={{ fontSize: '0.9rem' }}
              >
                010-2550-7505
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}