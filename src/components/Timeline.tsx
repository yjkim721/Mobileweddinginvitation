import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const TIMELINE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1625229167921-a7c5745e2596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNvdXBsZSUyMGRhdGluZyUyMGZpcnN0JTIwbWVldHxlbnwxfHx8fDE3NzA3NzQyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "0일",
    description: "처음 만난 날",
  },
  {
    url: "https://images.unsplash.com/photo-1766735329061-f4f21e7b50b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwdG9nZXRoZXIlMjBvdXRkb29yfGVufDF8fHx8MTc3MDcwODQ1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "10일",
    description: "첫 데이트",
  },
  {
    url: "https://images.unsplash.com/photo-1621797005674-48e0150206da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc3MDc3NDI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "50일",
    description: "바닷가 여행",
  },
  {
    url: "https://images.unsplash.com/photo-1602167783547-0198ed0566e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBjbG9zZXVwfGVufDF8fHx8MTc3MDc3NDI5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "100일",
    description: "백일 기념",
  },
  {
    url: "https://images.unsplash.com/photo-1765248626449-3e2ad01da3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MDc3NDI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "200일",
    description: "이백일 기념",
  },
  {
    url: "https://images.unsplash.com/photo-1674490146972-9d14423a8ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHdpbnRlciUyMHNub3d8ZW58MXx8fHwxNzcwNzc0MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "300일",
    description: "겨울 데이트",
  },
  {
    url: "https://images.unsplash.com/photo-1766735654298-38bcea21bbd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB2YWNhdGlvbiUyMHRyYXZlbCUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3MDc3NDI5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "1주년",
    description: "첫 기념일",
  },
  {
    url: "https://images.unsplash.com/photo-1768900044120-650653953a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcG9ydHJhaXQlMjBlbGVnYW50fGVufDF8fHx8MTc3MDcxNDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "2주년",
    description: "프로포즈",
  },
  {
    url: "https://images.unsplash.com/photo-1768726050588-3095d52aad88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjBwcmVwYXJhdGlvbnxlbnwxfHx8fDE3NzA3NzQyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "웨딩",
    description: "2026.06.28",
  },
];

export function Timeline() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      className="py-20 px-6 bg-gradient-to-b from-white to-pink-50"
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
          <h2 className="mb-2 text-pink-600">우리의 이야기</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {TIMELINE_IMAGES.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-pink-600">{item.label}</span>
                  <span className="text-gray-600">{item.description}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-gray-600 leading-relaxed">
            함께한 모든 순간이<br />
            우리의 가장 소중한 이야기가 되었습니다
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
