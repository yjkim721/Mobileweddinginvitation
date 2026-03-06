import { motion } from "motion/react";
import { Heart, Phone } from "lucide-react";
import { useInView } from "./hooks/useInView";

export function Couple() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-6 bg-gradient-to-b from-pink-50 to-white"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-center mb-12"
        >
          <h2 className="mb-2 text-pink-600">신랑 & 신부</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {/* 신랑 */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">👨</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-800">유현욱</h3>
                  <span className="text-sm text-gray-500">신랑</span>
                </div>
                <a
                  href="tel:010-9277-9959"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>010-9277-9959</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* 하트 */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, rotate: 0 }}
            animate={isInView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
          </motion.div>

          {/* 신부 */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-pink-100"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-3xl">👩</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-800">김연재</h3>
                  <span className="text-sm text-gray-500">신부</span>
                </div>
                <a
                  href="tel:010-2550-7505"
                  className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>010-2550-7505</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-gray-600 leading-relaxed">
            서로의 다름을 이해하고<br />
            함께 웃고 함께 울며<br />
            평생을 함께 걸어가겠습니다
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
