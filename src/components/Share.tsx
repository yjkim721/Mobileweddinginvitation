import { useState } from "react";
import { motion } from "motion/react";
import { Share2, MessageCircle, Link2, Check } from "lucide-react";
import { useInView } from "./hooks/useInView";

export function Share() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: "당신을 우리의 가장 빛나는 장면에 초대합니다",
    text: "두 사람의 가장 빛나는 장면, 그 시작의 날에 당신을 초대합니다.",
    url: window.location.href,
  };

  const handleKakaoShare = () => {
    // 카카오 SDK가 로드되지 않은 경우 알림
    alert("카카오톡 공유 기능은 카카오 API 키 설정이 필요합니다.");
    
    // 실제 구현 시 사용할 코드 (주석 처리)
    /*
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareData.title,
          description: shareData.text,
          imageUrl: `${window.location.origin}/wedding.png`,
          link: {
            mobileWebUrl: shareData.url,
            webUrl: shareData.url,
          },
        },
      });
    }
    */
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSMSShare = () => {
    const message = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareData.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
          className="text-center mb-8"
        >
          <h2 className="mb-2 text-pink-600">초대장 공유하기</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-center text-gray-600 mb-6">
            소중한 분들과 기쁨을 나누어주세요
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* 카카오톡 */}
            <button
              onClick={handleKakaoShare}
              className="flex flex-col items-center justify-center gap-2 bg-yellow-400 text-gray-800 p-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-md"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold text-sm">카카오톡</span>
            </button>

            {/* 시스템 공유 */}
            <button
              onClick={handleSystemShare}
              className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white p-4 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors shadow-md"
            >
              <Share2 className="w-6 h-6" />
              <span className="font-semibold text-sm">공유하기</span>
            </button>

            {/* 문자 공유 */}
            <button
              onClick={handleSMSShare}
              className="flex flex-col items-center justify-center gap-2 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors shadow-md"
            >
              <MessageCircle className="w-6 h-6" fill="currentColor" />
              <span className="font-semibold text-sm">문자 보내기</span>
            </button>

            {/* 링크 복사 */}
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center gap-2 bg-gray-600 text-white p-4 rounded-xl hover:bg-gray-700 transition-colors shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-6 h-6" />
                  <span className="font-semibold text-sm">복사 완료!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-6 h-6" />
                  <span className="font-semibold text-sm">링크 복사</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
