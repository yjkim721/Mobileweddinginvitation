import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import firstMeetingImage from "figma:asset/aa23bcefffd4bd732f18c2c8b6aff2afcbc32ea5.png";
import seasonsImage1 from "figma:asset/1bba4b335eee38ee4c5ae4d5ae0333aeb50f3cfe.png";
import seasonsImage2 from "figma:asset/65d4d87554a2c8e5288d6800f0f4b8685a8c74dc.png";
import seasonsImage3 from "figma:asset/e766f0a370369f01612a95c0a0faa482a6bd909a.png";
import seasonsImage4 from "figma:asset/8c279b6c07e3dad0e3cdeb2507d5a493e39cfe3b.png";
import promiseImage1 from "../../../assets/promise_1.jpeg";
import promiseImage2 from "../../../assets/promise_2.jpeg";
import promiseImage3 from "../../../assets/promise_3.jpeg";
import happyImage1 from "../../../assets/happy_1.jpeg";
import happyImage2 from "../../../assets/happy_2.jpeg";
import happyImage3 from "../../../assets/happy_3.jpeg";
import happyImage4 from "../../../assets/happy_4.jpeg";

interface TimelineImage {
  src: string;
  alt: string;
  caption: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  hasImage: boolean;
  images?: TimelineImage[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: "2023. 09",
    title: "만남",
    description: "우연히 시작된 우리",
    hasImage: true,
    images: [
      {
        src: firstMeetingImage,
        alt: "첫 만남",
        caption: "2023.09\n영화관에서 첫 만남",
      },
    ],
  },
  {
    date: "2024",
    title: "계절",
    description: "웃음이 하나둘 늘어났고",
    hasImage: true,
    images: [
      {
        src: seasonsImage1,
        alt: "함께한 계절들 - 봄",
        caption: "2024 봄\n나들이 in 제주도",
      },
      {
        src: seasonsImage2,
        alt: "함께한 계절들 - 여름",
        caption: "2024 여름\n배낚시 in 강릉",
      },
      {
        src: seasonsImage3,
        alt: "함께한 계절들 - 가을",
        caption: "2024 가을\n단풍구경 in 정선",
      },
      {
        src: seasonsImage4,
        alt: "함께한 계절들 - 겨울",
        caption: "2024 겨울\n스노우보드 in 용평",
      },
    ],
  },
  {
    date: "2025. 01",
    title: "약속",
    description: "이제는 함께 하기로",
    hasImage: true,
    images: [
      {
        src: promiseImage1,
        alt: "서약",
        caption: "2025.01\n예쁜 예감이 들었다",
      },
      {
        src: promiseImage2,
        alt: "서약",
        caption: "2025.01\n우리는 언제나",
      },
      {
        src: promiseImage3,
        alt: "서약",
        caption: "2025.01\n손을 잡고 있게 될 것이다\n- 이이체 '연인'",
      },
    ],
  },
  {
    date: "2026. 06",
    title: "평생",
    description: "행복하자",
    hasImage: true,
    images: [
      {
        src: happyImage1,
        alt: "결혼식",
        caption: "2026.06\n두사람의 앞에는 오직",
      },
      {
        src: happyImage2,
        alt: "결혼식",
        caption: "2026.06\n하나의 인생만이 있으리라",
      },
      {
        src: happyImage3,
        alt: "결혼식",
        caption: "2026.06\n이 대지 위에서 그대들은",
      },
      {
        src: happyImage4,
        alt: "결혼식",
        caption: "2026.06\n오랫동안 행복하리라\n- '아파치족 인디언들의 결혼 축시' 중에서",
      },
    ],
  },
];

interface TimelinePageProps {
  onImageOpenChange?: (isOpen: boolean) => void;
}

export default function TimelinePage({
  onImageOpenChange,
}: TimelinePageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<
    TimelineImage[]
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageOpen = (
    images: TimelineImage[],
    startIndex = 0,
  ) => {
    setCurrentImages(images);
    setCurrentImageIndex(startIndex);
    setIsOpen(true);
    if (onImageOpenChange) {
      onImageOpenChange(true);
    }
  };

  const handleImageClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(false);
    setCurrentImageIndex(0);
    if (onImageOpenChange) {
      onImageOpenChange(false);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : currentImages.length - 1,
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev < currentImages.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <div
      className="h-full overflow-y-auto p-6 sm:p-7 md:p-8"
      style={{ background: "#fafaf8" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 pt-2 sm:pt-3 md:pt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gray-400 mx-auto mb-4 sm:mb-5 md:mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 tracking-wider"
            style={{
              fontSize: "clamp(0.6rem, 2vw, 0.7rem)",
              fontFamily: "'Noto Serif KR', serif",
              letterSpacing: "0.3em",
            }}
          >
            OUR STORY
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-700 mt-2"
            style={{
              fontSize: "clamp(0.8rem, 2.3vw, 0.9rem)",
              fontFamily: "'Noto Serif KR', serif",
              fontWeight: 300,
            }}
          >
            우리가 함께 걸어온 시간
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto space-y-12 sm:space-y-14 md:space-y-16 pb-8 sm:pb-10 md:pb-12">
          {TIMELINE_EVENTS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.9 + 0.2 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div
                className={`flex gap-6 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
              >
                {/* Date Side */}
                <div
                  className={`w-28 flex-shrink-0 pt-1 ${index % 2 === 0 ? "text-right pr-2" : "text-left pl-2"}`}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.1 + 0.2 * index,
                    }}
                    className="text-gray-400"
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {event.date}
                  </motion.p>
                </div>

                {/* Center Line with Dot */}
                <div className="flex flex-col items-center flex-shrink-0 relative">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + 0.2 * index,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className={`w-2.5 h-2.5 rounded-full ${index === TIMELINE_EVENTS.length - 1 ? "bg-gray-700 ring-2 ring-gray-400 ring-offset-2" : "bg-gray-400"} relative z-10`}
                    style={{
                      boxShadow:
                        index === TIMELINE_EVENTS.length - 1
                          ? "0 0 12px rgba(106, 106, 106, 0.3)"
                          : "none",
                    }}
                  />
                  {index < TIMELINE_EVENTS.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{
                        duration: 0.8,
                        delay: 1.4 + 0.2 * index,
                        ease: "easeOut",
                      }}
                      className="w-px bg-gradient-to-b from-gray-300 to-gray-200 mt-3 absolute top-3"
                      style={{ minHeight: "80px" }}
                    />
                  )}
                </div>

                {/* Content Side */}
                <div
                  className={`flex-1 pb-4 ${index % 2 === 0 ? "text-left pl-2" : "text-right pr-2"}`}
                >
                  {/* Photo Preview */}
                  {event.hasImage &&
                    event.images &&
                    event.images.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 1.3 + 0.2 * index,
                        }}
                        className={`mb-4 inline-block ${index % 2 === 0 ? "" : "text-right"}`}
                      >
                        <div
                          className="relative overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow group"
                          style={{
                            width: "180px",
                            height: "120px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageOpen(event.images, 0);
                          }}
                        >
                          <img
                            src={event.images[0].src}
                            alt={event.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                          {/* Camera Icon Indicator - subtle */}
                          <div className="absolute bottom-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Camera
                              size={14}
                              className="text-white"
                              strokeWidth={2}
                              style={{
                                filter:
                                  "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.4 + 0.2 * index,
                    }}
                  >
                    <h3
                      className="text-gray-700"
                      style={{
                        fontSize: "0.95rem",
                        fontFamily: "'Noto Serif KR', serif",
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        lineHeight: 1.7,
                        wordBreak: "keep-all",
                      }}
                    >
                      {event.title}
                    </h3>
                    {event.description && (
                      <p
                        className="text-gray-500 mt-2"
                        style={{
                          fontSize: "0.8rem",
                          fontFamily: "'Noto Serif KR', serif",
                          fontWeight: 300,
                          letterSpacing: "0.01em",
                          lineHeight: 1.7,
                        }}
                      >
                        {event.description}
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Polaroid Modal - Using Portal with AnimatePresence */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
              style={{ zIndex: 9999 }}
              onClick={handleImageClose}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
                className="relative bg-white shadow-2xl"
                style={{
                  fontFamily: "'Noto Serif KR', serif",
                  width: "min(85vw, 400px)",
                  padding: "16px",
                  paddingBottom: "60px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Polaroid Image - Square 1:1 with Click Areas */}
                <div
                  className="relative bg-white overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={currentImages[currentImageIndex]?.src}
                    alt={
                      currentImages[currentImageIndex]?.alt ||
                      "Polaroid"
                    }
                    className="w-full h-full object-cover"
                  />

                  {/* Clickable Left Half - Only show if multiple images */}
                  {currentImages.length > 1 && (
                    <>
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      />

                      {/* Clickable Right Half */}
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer"
                        onClick={handleNextImage}
                        aria-label="Next image"
                      />
                    </>
                  )}
                </div>

                {/* Polaroid Caption Area */}
                <div
                  className="mt-4 text-center"
                  style={{ minHeight: "40px" }}
                >
                  <p
                    className="text-gray-600 whitespace-pre-line"
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      letterSpacing: "0.02em",
                      fontFamily: "'Noto Serif KR', serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {currentImages[currentImageIndex]
                      ?.caption || "Our Memory"}
                  </p>
                </div>

                {/* Navigation Arrow Icons - Only show if multiple images */}
                {currentImages.length > 1 && (
                  <>
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
                      style={{
                        filter:
                          "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                      }}
                    >
                      <ChevronLeft
                        size={28}
                        className="text-white"
                        strokeWidth={2}
                      />
                    </div>
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"
                      style={{
                        filter:
                          "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                      }}
                    >
                      <ChevronRight
                        size={28}
                        className="text-white"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Image Counter - New Design */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                      {currentImages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex
                              ? "w-6 bg-gray-600"
                              : "w-1.5 bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
