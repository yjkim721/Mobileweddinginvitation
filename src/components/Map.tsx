import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";
import { useInView } from "./hooks/useInView";

export function Map() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const address = "서울특별시 영등포구 국회대로 612 코레일리테일빌딩 2층";
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

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
          <h2 className="mb-2 text-pink-600">오시는 길</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <MapPin className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800 mb-1">더베르G</p>
              <p className="text-gray-600 text-sm leading-relaxed">{address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-green-600 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-green-100"
            >
              <Navigation className="w-5 h-5" />
              <span className="font-semibold">네이버 지도</span>
            </a>

            <a
              href={googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-blue-600 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-blue-100"
            >
              <Navigation className="w-5 h-5" />
              <span className="font-semibold">구글 지도</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-sm text-gray-600 space-y-3">
          <div>
            <p className="font-semibold text-gray-800 mb-2">🚇 지하철 이용시</p>
            <p className="leading-relaxed">
              5호선, 9호선 여의도역 5번 출구 도보 5분<br />
              1호선, 9호선 노량진역 1번 출구 도보 10분
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">🚗 자가용 이용시</p>
            <p className="leading-relaxed">
              건물 내 주차장 이용 가능<br />
              (주차 공간이 협소하오니 가급적 대중교통을 이용해 주세요)
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">📞 문의</p>
            <p className="leading-relaxed">
              신랑: 010-9277-9959<br />
              신부: 010-2550-7505
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
