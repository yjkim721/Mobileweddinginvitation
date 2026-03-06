import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { useInView } from "./hooks/useInView";

export function RSVP() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const googleFormUrl = "https://forms.gle/your-google-form-link";

  return (
    <motion.section
      ref={ref}
      className="py-20 px-6 bg-white"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-center mb-8"
        >
          <h2 className="mb-2 text-pink-600">축하 메시지</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <MessageCircle className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <p className="text-gray-700 leading-relaxed mb-2">
              참석 여부와 함께<br />
              따뜻한 축하의 말씀을 남겨주세요
            </p>
            <p className="text-sm text-gray-500">
              소중한 마음 감사히 간직하겠습니다
            </p>
          </div>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
          >
            <span className="font-semibold text-lg">축하 메시지 남기기</span>
          </a>

          <p className="text-xs text-gray-500 text-center mt-4">
            클릭하시면 구글 폼으로 이동합니다
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
