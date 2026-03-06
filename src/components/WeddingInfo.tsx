import { motion } from "motion/react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useInView } from "./hooks/useInView";

export function WeddingInfo() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-6 bg-gradient-to-b from-white to-pink-50"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <h2 className="mb-2 text-pink-600">예식 정보</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h3 className="mb-6 text-gray-800">유현욱 ♥ 김연재</h3>

          <div className="space-y-6 text-left">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">2026년 6월 28일 일요일</p>
                <p className="text-gray-600">오후 5시</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">더베르G</p>
                <p className="text-gray-600 text-sm">
                  서울특별시 영등포구 국회대로 612<br />
                  코레일리테일빌딩 2층
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-600">
                  따뜻한 마음으로 참석해 주시면<br />
                  큰 기쁨이 되겠습니다
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="text-center text-gray-600 text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p>두 사람의 가장 빛나는 장면,</p>
          <p>그 시작의 날에 당신을 초대합니다.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
