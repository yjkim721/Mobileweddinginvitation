import { motion } from 'motion/react';
import { MessageSquareHeart, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';

export default function RsvpPage() {
  const handleRsvp = () => {
    window.open('https://forms.gle/YOUR_GOOGLE_FORM_ID', '_blank');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-10" style={{ background: '#fafaf8' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-sm"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gray-400 mx-auto mb-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <p 
            className="text-gray-400 tracking-wider"
            style={{ fontSize: '0.7rem', fontFamily: "'Noto Serif KR', serif", letterSpacing: '0.3em' }}
          >
            RSVP
          </p>
          <p 
            className="text-gray-700 mt-2 mb-4"
            style={{ fontSize: '0.9rem', fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}
          >
            참석 여부
          </p>
          <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif", lineHeight: '1.8' }}>
            참석 여부와 함께<br />
            따뜻한 축하 메시지를 남겨주세요
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          <Button
            onClick={handleRsvp}
            className="w-full py-6 text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #6a6a6a 0%, #4a4a4a 100%)',
              fontFamily: "'Noto Serif KR', serif",
              fontSize: '1rem',
            }}
          >
            <MessageSquareHeart className="w-5 h-5 mr-2" />
            축하 메시지 남기기
          </Button>

          <div className="bg-white rounded-lg p-6 border border-gray-300 text-left">
            <div className="flex items-start gap-3 mb-4">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm text-gray-800 mb-1" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                  회신 기한
                </h4>
                <p className="text-xs text-gray-600">
                  2026년 6월 15일까지
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              * 참석 인원 파악을 위해 기한 내 회신 부탁드립니다
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              💌 축하 메시지는 구글 폼을 통해<br />
              안전하게 보관되며, 결혼식 당일<br />
              두 사람이 감사히 읽겠습니다
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}