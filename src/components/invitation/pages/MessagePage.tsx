import { motion } from 'motion/react';

export default function MessagePage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8 md:p-10" style={{ background: '#fafaf8' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-sm w-full px-4 sm:px-0"
      >
        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <svg width="60" height="2" viewBox="0 0 60 2" className="mx-auto">
            <line x1="0" y1="1" x2="60" y2="1" stroke="#d0d0c8" strokeWidth="1" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-700 leading-loose mb-6 sm:mb-7 md:mb-8"
          style={{
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            fontFamily: "'Noto Serif KR', serif",
            lineHeight: '2',
            letterSpacing: '-0.02em',
          }}
        >
          소나기 속에서 우산을 든 친구를 만난 행운처럼,<br />
          서로라는 기적을 만나 평범한 일상이<br />
          눈부시게 바뀌었습니다
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-gray-700 leading-loose mb-6 sm:mb-7 md:mb-8"
          style={{
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            fontFamily: "'Noto Serif KR', serif",
            lineHeight: '2',
            letterSpacing: '-0.02em',
          }}
        >
          하나둘 쌓여간 작고 소중한 기적이<br />
          행복을 가져다 준 지금,<br />
          이제는 서로의 주인공이 되어<br />
          시시콜콜한 일상마저도<br />
          반짝이는 순간들로 채워가려합니다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-gray-700 leading-loose"
          style={{
            fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
            fontFamily: "'Noto Serif KR', serif",
            lineHeight: '2',
            letterSpacing: '-0.02em',
          }}
        >
          이 설레는 시작에 소중한 여러분을 초대합니다.<br />
          보내주시는 축복을 큰 기쁨으로 간직하겠습니다.
        </motion.p>

        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-8 sm:mt-10 md:mt-12"
        >
          <svg width="60" height="2" viewBox="0 0 60 2" className="mx-auto">
            <line x1="0" y1="1" x2="60" y2="1" stroke="#d0d0c8" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 sm:mt-9 md:mt-10 text-center"
        >
          <p
            className="text-gray-600"
            style={{
              fontSize: 'clamp(0.8rem, 2.3vw, 0.9rem)',
              fontFamily: "'Noto Serif KR', serif",
              letterSpacing: '0.1em',
            }}
          >
            현욱·연재 드림
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}