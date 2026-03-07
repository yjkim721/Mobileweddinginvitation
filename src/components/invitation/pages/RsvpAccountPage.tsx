import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, MessageSquareHeart } from 'lucide-react';
import { Button } from '../../ui/button';
import { toast } from 'sonner@2.0.3';

interface Account {
  relation: string;
  bank: string;
  number: string;
  holder: string;
}

const GROOM_ACCOUNTS: Account[] = [
  { relation: '신랑', bank: '국민', number: '785801-00-032530', holder: '유현욱' },
  { relation: '신랑 아버지', bank: '농협', number: '302-0073-4711-41', holder: '유찬규' },
  { relation: '신랑 어머니', bank: '농협', number: '499-02-010620', holder: '김해옥' },
];

const BRIDE_ACCOUNTS: Account[] = [
  { relation: '신부', bank: '국민', number: '814301-04-269506', holder: '김연재' },
  { relation: '신부 아버지', bank: '신한', number: '902-04-077257', holder: '김능수' },
  { relation: '신부 어머니', bank: '기업', number: '657-023481-01-012', holder: '송현주' },
];

export default function RsvpAccountPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(label);
      toast.success('계좌번호가 복사되었습니다');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('복사에 실패했습니다');
    }
  };

  const handleRsvp = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSe7adLFXimarxVpwXV-M2aAw5UB0HugWeQnt5-uawHSd12rfQ/viewform?usp=sharing&ouid=109362029507949276896', '_blank');
  };

  const AccountCard = ({ account, side }: { account: Account; side: 'groom' | 'bride' }) => {
    const key = `${side}-${account.relation}`;
    const isCopied = copiedIndex === key;

    return (
      <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-200/40 last:border-0">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-700" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            {account.holder} · {account.bank} · {account.number}
          </p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(account.number.replace(/-/g, ''), key)}
          className={`flex-shrink-0 h-7 w-7 p-0 transition-all rounded-full ${
            isCopied ? 'bg-gray-700 text-white' : 'hover:bg-gray-100'
          }`}
        >
          {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        </Button>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-8 pb-16" style={{ background: '#fafaf8' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10 pt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gray-400 mx-auto mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p
              className="text-gray-400 tracking-wider mb-2"
              style={{ fontSize: '0.7rem', fontFamily: "'Noto Serif KR', serif", letterSpacing: '0.3em' }}
            >
              RSVP
            </p>
            <p
              className="text-gray-700"
              style={{ fontSize: '0.9rem', fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}
            >
              마음 전하실 곳
            </p>
          </motion.div>
        </div>

        {/* RSVP Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1">
            <p
              className="text-sm text-gray-600 leading-relaxed"
              style={{ fontFamily: "'Noto Serif KR', serif", lineHeight: '1.8' }}
            >
              참석 여부와 함께<br />
              따뜻한 축하 메시지를 남겨주세요
            </p>
          </div>
          <Button
            onClick={handleRsvp}
            className="flex-shrink-0 px-5 py-4 text-white shadow-sm"
            style={{
              background: '#6a6a6a',
              fontFamily: "'Noto Serif KR', serif",
              fontSize: '0.85rem',
              letterSpacing: '-0.01em',
            }}
          >
            <MessageSquareHeart className="w-3.5 h-3.5 mr-1.5" />
            남기기
          </Button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="h-px bg-gray-300 mx-auto my-8"
        />

        {/* Groom accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-5"
        >
          <h3
            className="text-xs text-gray-500 mb-2.5"
            style={{ fontFamily: "'Noto Serif KR', serif", letterSpacing: '-0.01em' }}
          >
            신랑측
          </h3>
          <div className="bg-white/40 rounded-lg px-3 py-2">
            {GROOM_ACCOUNTS.map((account, index) => (
              <AccountCard key={index} account={account} side="groom" />
            ))}
          </div>
        </motion.div>

        {/* Bride accounts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-8"
        >
          <h3
            className="text-xs text-gray-500 mb-2.5"
            style={{ fontFamily: "'Noto Serif KR', serif", letterSpacing: '-0.01em' }}
          >
            신부측
          </h3>
          <div className="bg-white/40 rounded-lg px-3 py-2">
            {BRIDE_ACCOUNTS.map((account, index) => (
              <AccountCard key={index} account={account} side="bride" />
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <p
            className="text-xs text-gray-500 leading-relaxed"
            style={{ fontFamily: "'Noto Serif KR', serif", lineHeight: '1.8' }}
          >
            참석이 어려우신 분들께서 보내주시는<br />
            따뜻한 마음 감사히 받겠습니다
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
