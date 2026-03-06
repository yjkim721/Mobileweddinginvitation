import { motion } from 'motion/react';
import { MessageSquareHeart } from 'lucide-react';
import { Button } from '../ui/button';

export default function RsvpSection() {
  const handleRsvp = () => {
    window.open('https://forms.gle/YOUR_GOOGLE_FORM_ID', '_blank');
  };

  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #faf8f5, #fff9f5)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-16">
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mb-4">
            <path d="M0 15 Q 25 10, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
          <MessageSquareHeart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 
            className="mb-4 text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            축하 메시지
          </h2>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <p className="mb-8 text-muted-foreground" style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.05rem', lineHeight: '1.9' }}>
          참석 여부와 함께<br />
          따뜻한 축하 메시지를 남겨주세요
        </p>

        <div 
          className="rounded-2xl p-8 border-2"
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
            borderColor: 'rgba(212, 165, 116, 0.3)',
            boxShadow: '0 10px 40px rgba(139, 115, 85, 0.1)'
          }}
        >
          <p className="mb-6 text-foreground/80 leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            두 사람의 새로운 시작을 함께 축하해주시면<br />
            더없이 큰 기쁨이 되겠습니다
          </p>
          
          <Button
            onClick={handleRsvp}
            size="lg"
            className="text-white px-8 py-6 shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, #d4a574 0%, #c99366 100%)',
              fontFamily: "'Noto Serif KR', serif",
              fontSize: '1.1rem'
            }}
          >
            <MessageSquareHeart className="w-5 h-5 mr-2" />
            참석 여부 및 축하 메시지 남기기
          </Button>

          <p className="mt-6 text-sm text-muted-foreground">
            * 참석 인원 파악을 위해 2026년 6월 15일까지<br />
            회신 부탁드립니다
          </p>
        </div>

        <div 
          className="mt-12 p-6 rounded-xl border"
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(212, 165, 116, 0.2)'
          }}
        >
          <p className="text-sm text-foreground/70 leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            💌 축하 메시지는 구글 폼을 통해 안전하게 보관되며,<br />
            결혼식 당일 두 사람이 감사히 읽겠습니다
          </p>
        </div>
      </motion.div>
    </section>
  );
}