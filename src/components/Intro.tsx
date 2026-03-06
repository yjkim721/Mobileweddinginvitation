import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "lucide-react";

const BW_BG = "https://images.unsplash.com/photo-1738245003342-6242e20c2fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwcnVyYWwlMjB2aWxsYWdlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDc3NDI4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const COLOR_BG = "https://images.unsplash.com/photo-1769184614148-b24ac44feeab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHBpbmslMjBzdW5zZXQlMjBncmFkaWVudCUyMHNreXxlbnwxfHx8fDE3NzA3NzQyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface IntroProps {
  onComplete: () => void;
}

export function Intro({ onComplete }: IntroProps) {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState<"start" | "walking" | "meeting" | "colorize" | "flash">("start");

  const handleStart = () => {
    setStarted(true);
    setStage("walking");

    // 걸어오는 애니메이션 (2초)
    setTimeout(() => setStage("meeting"), 2000);

    // 손 잡는 순간 (1초)
    setTimeout(() => {
      setStage("colorize");
      // 진동 효과 (모바일)
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 3000);

    // 플래시 효과
    setTimeout(() => setStage("flash"), 3500);

    // 본문 진입
    setTimeout(() => onComplete(), 4500);
  };

  const isColor = stage === "colorize" || stage === "flash";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 배경 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={BW_BG}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: "grayscale(1)",
            }}
            animate={{
              filter: isColor ? "grayscale(0)" : "grayscale(1)",
            }}
            transition={{ duration: 0.8 }}
          />
          {isColor && (
            <motion.img
              src={COLOR_BG}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </div>

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />

        {/* 흔들림 효과 */}
        {stage === "colorize" && (
          <motion.div
            className="absolute inset-0"
            animate={{ x: [-10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* 플래시 효과 */}
        {stage === "flash" && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* 콘텐츠 */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {!started ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="mb-8"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h1 className="text-white mb-3" style={{ fontSize: '2.5rem', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                  Two Hearts, One Story
                </h1>
                <p className="text-white/90 text-lg" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                  당신을 우리의 가장 빛나는 장면에 초대합니다
                </p>
              </motion.div>

              <motion.button
                onClick={handleStart}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-4 rounded-full text-xl shadow-2xl border-2 border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontWeight: 700, letterSpacing: '0.05em' }}
              >
                GAME START
              </motion.button>
            </motion.div>
          ) : (
            <div className="relative w-full max-w-md h-64">
              {/* 신랑 캐릭터 */}
              <motion.div
                className="absolute bottom-20 flex flex-col items-center"
                initial={{ x: -200, opacity: 0 }}
                animate={{
                  x: stage === "walking" || stage === "meeting" || isColor ? 100 : -200,
                  opacity: 1,
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center shadow-xl border-4 border-white">
                  <User className="w-8 h-8 text-white" />
                </div>
                <p className="mt-2 text-white font-semibold" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                  현욱
                </p>
              </motion.div>

              {/* 신부 캐릭터 */}
              <motion.div
                className="absolute bottom-20 flex flex-col items-center"
                initial={{ x: 400, opacity: 0 }}
                animate={{
                  x: stage === "walking" || stage === "meeting" || isColor ? 200 : 400,
                  opacity: 1,
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <div className="w-16 h-16 rounded-full bg-pink-400 flex items-center justify-center shadow-xl border-4 border-white">
                  <User className="w-8 h-8 text-white" />
                </div>
                <p className="mt-2 text-white font-semibold" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                  연재
                </p>
              </motion.div>

              {/* 하트 이펙트 */}
              {(stage === "meeting" || isColor) && (
                <motion.div
                  className="absolute bottom-36 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-6xl">❤️</span>
                </motion.div>
              )}

              {/* 텍스트 */}
              {isColor && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white text-2xl" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)', fontWeight: 600 }}>
                    세상에 색이 생겼습니다
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
