import { motion } from 'motion/react';
import { Share2, MessageCircle, Link2, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

export default function ShareSection() {
  const SHARE_DATA = {
    title: '당신을 우리의 가장 빛나는 장면에 초대합니다',
    description: '두 사람의 가장 빛나는 장면, 그 시작의 날에 당신을 초대합니다.',
    url: typeof window !== 'undefined' ? window.location.href : 'http://localhost:5500',
  };

  const handleKakaoShare = () => {
    // Kakao SDK would be initialized with real key
    toast.info('카카오톡 공유 기능은 API 키 설정 후 사용 가능합니다');
    
    /* Production code with real Kakao key:
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: SHARE_DATA.title,
          description: SHARE_DATA.description,
          imageUrl: 'wedding.png URL',
          link: {
            mobileWebUrl: SHARE_DATA.url,
            webUrl: SHARE_DATA.url,
          },
        },
      });
    }
    */
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: SHARE_DATA.title,
          text: SHARE_DATA.description,
          url: SHARE_DATA.url,
        });
        toast.success('공유되었습니다');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('공유에 실패했습니다');
        }
      }
    } else {
      toast.info('이 브라우저는 공유 기능을 지원하지 않습니다');
    }
  };

  const handleSmsShare = () => {
    const message = `${SHARE_DATA.title}\n\n${SHARE_DATA.description}\n\n${SHARE_DATA.url}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_DATA.url);
      toast.success('링크가 복사되었습니다');
    } catch (err) {
      toast.error('복사에 실패했습니다');
    }
  };

  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #fff9f5, #faf8f5)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mb-16">
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mb-4">
            <path d="M0 15 Q 25 10, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
          <Share2 className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 
            className="text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            초대장 공유하기
          </h2>
          <p className="mt-4 mb-4 text-muted-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            소중한 분들께 우리의 기쁜 소식을 전해주세요
          </p>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={handleKakaoShare}
            variant="outline"
            className="flex-col h-auto py-6 border-2 hover:bg-yellow-50 transition-all"
            style={{ borderColor: '#FEE500' }}
          >
            <MessageCircle className="w-8 h-8 mb-2" style={{ color: '#3C1E1E' }} />
            <span className="text-sm" style={{ color: '#3C1E1E' }}>카카오톡</span>
          </Button>

          <Button
            onClick={handleSystemShare}
            variant="outline"
            className="flex-col h-auto py-6 border-2 hover:bg-blue-50 transition-all"
            style={{ borderColor: 'rgba(212, 165, 116, 0.4)' }}
          >
            <Share2 className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm text-primary">공유하기</span>
          </Button>

          <Button
            onClick={handleSmsShare}
            variant="outline"
            className="flex-col h-auto py-6 border-2 hover:bg-green-50 transition-all"
            style={{ borderColor: '#22C55E' }}
          >
            <Mail className="w-8 h-8 mb-2" style={{ color: '#22C55E' }} />
            <span className="text-sm" style={{ color: '#22C55E' }}>문자</span>
          </Button>

          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="flex-col h-auto py-6 border-2 hover:bg-purple-50 transition-all"
            style={{ borderColor: '#A855F7' }}
          >
            <Link2 className="w-8 h-8 mb-2" style={{ color: '#A855F7' }} />
            <span className="text-sm" style={{ color: '#A855F7' }}>링크복사</span>
          </Button>
        </div>

        <div 
          className="p-6 rounded-xl border"
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
            borderColor: 'rgba(212, 165, 116, 0.2)'
          }}
        >
          <p className="text-sm text-foreground/70 leading-relaxed break-all">
            {SHARE_DATA.url}
          </p>
        </div>
      </motion.div>
    </section>
  );
}