import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const TIMELINE_IMAGES = [
  {
    day: '0일',
    title: '우리의 시작',
    image: 'https://images.unsplash.com/photo-1765854892653-85cc5b51c789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBjb2ZmZWUlMjBkYXRlJTIwY2FzdWFsfGVufDF8fHx8MTc3MDc3NDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '처음 만난 그날의 설렘'
  },
  {
    day: '10일',
    title: '첫 데이트',
    image: 'https://images.unsplash.com/photo-1758810410699-2dc1daec82dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzaWxob3VldHRlJTIwcm9tYW50aWN8ZW58MXx8fHwxNzcwNzc0Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '두근거림이 가득했던 순간'
  },
  {
    day: '50일',
    title: '첫 여행',
    image: 'https://images.unsplash.com/photo-1624157389159-d24fe22bb762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwYmVhY2glMjBzdW5zZXR8ZW58MXx8fHwxNzcwNzAyMDM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '함께한 첫 바다'
  },
  {
    day: '100일',
    title: '백일',
    image: 'https://images.unsplash.com/photo-1765248626449-3e2ad01da3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MDc3NDI4Mjww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '첫 기념일을 축하하며'
  },
  {
    day: '200일',
    title: '이백일',
    image: 'https://images.unsplash.com/photo-1770116900303-4257a6f2a8df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0cmF2ZWwlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzcwNzc0Mjc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '함께 모험을 떠나며'
  },
  {
    day: '300일',
    title: '삼백일',
    image: 'https://images.unsplash.com/photo-1586022045128-730988f570c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBoaWtpbmclMjBtb3VudGFpbnxlbnwxfHx8fDE3NzA2OTc5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '산을 넘고 계곡을 건너'
  },
  {
    day: '1주년',
    title: 'First Anniversary',
    image: 'https://images.unsplash.com/photo-1765248626449-3e2ad01da3fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBhbm5pdmVyc2FyeSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MDc3NDI4Mjww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '1년간의 추억을 되새기며'
  },
  {
    day: '2주년',
    title: 'Second Anniversary',
    image: 'https://images.unsplash.com/photo-1765854636438-0168b6b53ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcHJvcG9zYWwlMjByb21hbnRpY3xlbnwxfHx8fDE3NzA3NzQyNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '평생을 약속한 프러포즈'
  },
  {
    day: '웨딩',
    title: 'Wedding Day',
    image: 'https://images.unsplash.com/photo-1769230359060-399efa8d3b2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjByb21hbnRpY3xlbnwxfHx8fDE3NzA3NzQyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: '영원을 맹세하는 날'
  }
];

export default function Timeline() {
  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #fff9f5, #faf8f5)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mb-4">
            <path d="M0 15 Q 25 10, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
          <h2 
            className="mb-2 text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            우리의 이야기
          </h2>
          <p className="mb-4 text-muted-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            두 사람이 함께 걸어온 시간들
          </p>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-purple-200 to-pink-200 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {TIMELINE_IMAGES.map((item, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-6 items-center ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                    <div className="inline-block px-4 py-1 mb-2 bg-pink-100 text-pink-700 rounded-full text-sm">
                      {item.day}
                    </div>
                    <h3 className="mb-2" style={{ fontSize: '1.3rem' }}>{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block relative z-10">
                    <div className="w-4 h-4 bg-pink-500 rounded-full border-4 border-white shadow-lg" />
                  </div>

                  {/* Image */}
                  <div className="flex-1">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square max-w-xs mx-auto">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}