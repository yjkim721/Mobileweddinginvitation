import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export default function MapSection() {
  const address = "서울특별시 영등포구 국회대로 612 코레일리테일빌딩 2층";
  const venueName = "더베르G";

  const handleNaverMap = () => {
    window.open(`https://map.naver.com/p/search/${encodeURIComponent(address)}`, '_blank');
  };

  const handleGoogleMap = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const handleKakaoMap = () => {
    window.open(`https://map.kakao.com/link/search/${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <section className="py-20 px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-16">
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mb-4">
            <path d="M0 15 Q 25 10, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
          <h2 
            className="text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            오시는 길
          </h2>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <Card 
          className="overflow-hidden border-2"
          style={{ 
            borderColor: 'rgba(212, 165, 116, 0.3)',
            boxShadow: '0 10px 40px rgba(139, 115, 85, 0.15)'
          }}
        >
          {/* Map placeholder */}
          <div className="relative h-64 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f5e6d3 0%, #f9e4d4 100%)' }}>
            <MapPin className="w-16 h-16 text-primary/40" />
            <div 
              className="absolute bottom-4 left-4 right-4 backdrop-blur-sm p-4 rounded-lg border"
              style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'rgba(212, 165, 116, 0.3)',
                boxShadow: '0 4px 20px rgba(139, 115, 85, 0.1)'
              }}
            >
              <p className="text-primary" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>{venueName}</p>
              <p className="text-sm text-muted-foreground mt-1">{address}</p>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="p-6 bg-white">
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={handleNaverMap}
                variant="outline"
                className="flex-col h-auto py-4 border-2 hover:bg-green-50"
                style={{ borderColor: '#03C75A', color: '#03C75A' }}
              >
                <Navigation className="w-5 h-5 mb-2" />
                <span className="text-xs">네이버</span>
              </Button>
              <Button
                onClick={handleKakaoMap}
                variant="outline"
                className="flex-col h-auto py-4 border-2 hover:bg-yellow-50"
                style={{ borderColor: '#FEE500', color: '#3C1E1E' }}
              >
                <Navigation className="w-5 h-5 mb-2" />
                <span className="text-xs">카카오</span>
              </Button>
              <Button
                onClick={handleGoogleMap}
                variant="outline"
                className="flex-col h-auto py-4 border-2 hover:bg-blue-50"
                style={{ borderColor: '#4285F4', color: '#4285F4' }}
              >
                <Navigation className="w-5 h-5 mb-2" />
                <span className="text-xs">구글</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Transportation info */}
        <div className="mt-8 space-y-4">
          <Card 
            className="p-4 border"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
              borderColor: 'rgba(212, 165, 116, 0.2)'
            }}
          >
            <h4 className="mb-2 text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>🚇 지하철</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              5호선, 9호선 여의도역 5번 출구 도보 5분
            </p>
          </Card>

          <Card 
            className="p-4 border"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
              borderColor: 'rgba(212, 165, 116, 0.2)'
            }}
          >
            <h4 className="mb-2 text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>🚗 자가용</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              건물 내 주차장 이용 가능 (2시간 무료)
            </p>
          </Card>

          <Card 
            className="p-4 border"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
              borderColor: 'rgba(212, 165, 116, 0.2)'
            }}
          >
            <h4 className="mb-2 text-primary" style={{ fontFamily: "'Noto Serif KR', serif" }}>🚌 버스</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              국회의사당 정류장: 261, 461, 753, 5012, 5615
            </p>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}