import { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Copy, Check } from "lucide-react";
import { useInView } from "./hooks/useInView";

const ACCOUNTS = {
  groom: [
    { name: "신랑 유현욱", bank: "국민은행", number: "123-456-789012" },
    { name: "신랑 아버지", bank: "우리은행", number: "234-567-890123" },
    { name: "신랑 어머니", bank: "신한은행", number: "345-678-901234" },
  ],
  bride: [
    { name: "신부 김연재", bank: "카카오뱅크", number: "3333-01-2345678" },
    { name: "신부 아버지", bank: "NH농협", number: "456-789-012345" },
    { name: "신부 어머니", bank: "하나은행", number: "567-890-123456" },
  ],
};

export function Account() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2000);
    });
  };

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
          className="text-center mb-8"
        >
          <h2 className="mb-2 text-pink-600">마음 전하실 곳</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {/* 신랑측 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <h3 className="text-gray-800">신랑측 계좌</h3>
            </div>
            <div className="space-y-3">
              {ACCOUNTS.groom.map((account, index) => {
                const id = `groom-${index}`;
                const isCopied = copiedAccount === id;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4 border border-blue-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">{account.name}</p>
                        <p className="text-sm text-gray-600">
                          {account.bank} {account.number}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(account.number, id)}
                        className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">복사</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 신부측 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-pink-500" />
              <h3 className="text-gray-800">신부측 계좌</h3>
            </div>
            <div className="space-y-3">
              {ACCOUNTS.bride.map((account, index) => {
                const id = `bride-${index}`;
                const isCopied = copiedAccount === id;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4 border border-pink-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">{account.name}</p>
                        <p className="text-sm text-gray-600">
                          {account.bank} {account.number}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(account.number, id)}
                        className="flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm font-medium">복사</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p>참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다.</p>
          <p>너그러운 마음으로 양해 부탁드립니다.</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
