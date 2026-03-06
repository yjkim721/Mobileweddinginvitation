import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import mapImage from "figma:asset/32ba213c9bd03b39a5a1f190995be2438abfb050.png";

export default function MapPage() {
  const address =
    "서울특별시 영등포구 국회대로 612 코레일유통빌딩 2층";

  const handleNaverMap = () => {
    window.open(
      `https://map.naver.com/p/search/${encodeURIComponent(address)}`,
      "_blank",
    );
  };

  const handleGoogleMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      "_blank",
    );
  };

  const handleKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/search/${encodeURIComponent(address)}`,
      "_blank",
    );
  };

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: "#fafaf8" }}
    >
      <div className="p-6 sm:p-7 md:p-8 pb-10 sm:pb-11 md:pb-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-9 md:mb-10 pt-2 sm:pt-3 md:pt-4"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gray-400 mx-auto mb-4 sm:mb-5 md:mb-6"
          />
          <p 
            className="text-gray-400 tracking-wider"
            style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)', fontFamily: "'Noto Serif KR', serif", letterSpacing: '0.3em' }}
          >
            LOCATION
          </p>
          <p 
            className="text-gray-700 mt-2"
            style={{ fontSize: 'clamp(0.8rem, 2.3vw, 0.9rem)', fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}
          >
            오시는 길
          </p>
        </motion.div>

        {/* Map Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-9 md:mb-10"
        >
          <button
            onClick={handleNaverMap}
            className="group relative pb-1"
          >
            <span
              className="text-gray-600 group-hover:text-gray-900 transition-colors"
              style={{
                fontSize: "clamp(0.7rem, 2.1vw, 0.8rem)",
                fontFamily: "'Noto Serif KR', serif",
                letterSpacing: "0.08em",
              }}
            >
              NAVER
            </span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300 group-hover:bg-gray-900 transition-colors"></div>
          </button>
          <span
            className="text-gray-300"
            style={{ fontSize: "0.8rem" }}
          >
            |
          </span>
          <button
            onClick={handleKakaoMap}
            className="group relative pb-1"
          >
            <span
              className="text-gray-600 group-hover:text-gray-900 transition-colors"
              style={{
                fontSize: "clamp(0.7rem, 2.1vw, 0.8rem)",
                fontFamily: "'Noto Serif KR', serif",
                letterSpacing: "0.08em",
              }}
            >
              KAKAO
            </span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300 group-hover:bg-gray-900 transition-colors"></div>
          </button>
          <span
            className="text-gray-300"
            style={{ fontSize: "0.8rem" }}
          >
            |
          </span>
          <button
            onClick={handleGoogleMap}
            className="group relative pb-1"
          >
            <span
              className="text-gray-600 group-hover:text-gray-900 transition-colors"
              style={{
                fontSize: "clamp(0.7rem, 2.1vw, 0.8rem)",
                fontFamily: "'Noto Serif KR', serif",
                letterSpacing: "0.08em",
              }}
            >
              GOOGLE
            </span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300 group-hover:bg-gray-900 transition-colors"></div>
          </button>
        </motion.div>

        {/* Map Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative w-full rounded-lg overflow-hidden border border-gray-300">
            <img 
              src={mapImage} 
              alt="오시는 길 약도" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Venue Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          <p
            className="text-gray-700"
            style={{ fontSize: "0.88rem", lineHeight: "1.7" }}
          >
            서울시 영등포구 국회대로 612 코레일유통사옥 2층
            <br />
            더베르지
          </p>
        </motion.div>

        {/* Transportation Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-6"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {/* 자가용 */}
          <div>
            <h4
              className="text-gray-800 mb-2.5"
              style={{
                fontSize: "0.9rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              자가용 이용 시
            </h4>
            <div
              className="space-y-0.5 text-gray-500 text-left"
              style={{
                fontSize: "0.8rem",
                lineHeight: "1.7",
                fontFamily: "'Noto Serif KR', serif",
              }}
            >
              <div>
                네비게이션{" "}
                <span className="font-medium">[더베르G]</span>{" "}
                검색
              </div>
              <div>국회대로 612 2층 / 당산동 3가 2-7</div>
            </div>
          </div>

          {/* 지하철 */}
          <div>
            <h4
              className="text-gray-800 mb-2.5"
              style={{
                fontSize: "0.9rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              지하철 이용 시
            </h4>
            <div
              className="text-gray-500 text-left"
              style={{
                fontSize: "0.7rem",
                lineHeight: "1.6",
                fontFamily: "'Noto Serif KR', serif",
              }}
            >
              <div>
                2호선, 5호선 영등포구청역 4번 출구에서 566m
                (도보 약 7분)
              </div>
            </div>
          </div>

          {/* 셔틀버스 */}
          <div>
            <h4
              className="text-gray-800 mb-2.5"
              style={{
                fontSize: "0.9rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              셔틀버스 안내
            </h4>
            <div
              className="text-gray-500 text-left"
              style={{
                fontSize: "0.7rem",
                lineHeight: "1.6",
                fontFamily: "'Noto Serif KR', serif",
              }}
            >
              <div>
                영등포구청역 5번 출구 우리은행 앞 ↔ 더베르G
                주차장 입구 좌측
              </div>
            </div>
          </div>
        </motion.div>

        {/* Phone Number at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center mt-10"
        >
          <p
            className="text-gray-500"
            style={{
              fontSize: "0.7rem",
              fontFamily: "'Noto Serif KR', serif",
            }}
          >
            더베르G Tel. 02. 2088. 5272
          </p>
        </motion.div>
      </div>
    </div>
  );
}