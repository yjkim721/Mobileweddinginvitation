import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';

interface Account {
  relation: string;
  bank: string;
  number: string;
  holder: string;
}

const GROOM_ACCOUNTS: Account[] = [
  { relation: '신랑', bank: '신한은행', number: '110-123-456789', holder: '유현욱' },
  { relation: '신랑 아버지', bank: '국민은행', number: '123-45-678901', holder: '유OO' },
  { relation: '신랑 어머니', bank: '우리은행', number: '1002-123-456789', holder: '김OO' },
];

const BRIDE_ACCOUNTS: Account[] = [
  { relation: '신부', bank: 'KB국민은행', number: '123-456-789012', holder: '김연재' },
  { relation: '신부 아버지', bank: '하나은행', number: '123-456789-01234', holder: '김OO' },
  { relation: '신부 어머니', bank: '농협은행', number: '352-1234-5678-90', holder: '박OO' },
];

export default function AccountInfo() {
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

  const AccountCard = ({ account, side }: { account: Account; side: 'groom' | 'bride' }) => {
    const key = `${side}-${account.relation}`;
    const isCopied = copiedIndex === key;

    return (
      <Card 
        className="p-4 border transition-colors"
        style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
          borderColor: isCopied ? 'rgba(34, 197, 94, 0.5)' : 'rgba(212, 165, 116, 0.2)'
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">{account.relation}</p>
            <p className="mb-1 truncate text-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              {account.bank} {account.holder}
            </p>
            <p className="text-sm text-muted-foreground font-mono">{account.number}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => copyToClipboard(account.number.replace(/-/g, ''), key)}
            className={`flex-shrink-0 transition-all ${
              isCopied 
                ? 'bg-green-50 border-green-500 text-green-700' 
                : 'hover:bg-amber-50'
            }`}
            style={{ borderColor: isCopied ? undefined : 'rgba(212, 165, 116, 0.3)' }}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                <span className="text-xs">완료</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1" />
                <span className="text-xs">복사</span>
              </>
            )}
          </Button>
        </div>
      </Card>
    );
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
            className="mb-4 text-primary"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '2rem', fontWeight: 300, letterSpacing: '0.1em' }}
          >
            마음 전하실 곳
          </h2>
          <p className="mb-4 text-muted-foreground" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            축하의 마음을 전하고 싶으신 분들을 위해<br />
            계좌번호를 안내드립니다
          </p>
          <svg width="100" height="30" viewBox="0 0 100 30" className="mx-auto opacity-40 mt-4">
            <path d="M0 15 Q 25 20, 50 15 T 100 15" stroke="#d4a574" fill="none" strokeWidth="1"/>
          </svg>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Groom side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 pb-4" style={{ borderBottom: '2px solid rgba(139, 115, 85, 0.2)' }}>
              <h3 
                className="text-center text-primary" 
                style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.3rem', fontWeight: 400 }}
              >
                신랑측
              </h3>
            </div>
            <div className="space-y-3">
              {GROOM_ACCOUNTS.map((account, index) => (
                <AccountCard key={index} account={account} side="groom" />
              ))}
            </div>
          </motion.div>

          {/* Bride side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-6 pb-4" style={{ borderBottom: '2px solid rgba(139, 115, 85, 0.2)' }}>
              <h3 
                className="text-center text-primary" 
                style={{ fontFamily: "'Noto Serif KR', serif", fontSize: '1.3rem', fontWeight: 400 }}
              >
                신부측
              </h3>
            </div>
            <div className="space-y-3">
              {BRIDE_ACCOUNTS.map((account, index) => (
                <AccountCard key={index} account={account} side="bride" />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-xl text-center border"
          style={{ 
            background: 'linear-gradient(to right, #faf8f5, #fff9f5, #faf8f5)',
            borderColor: 'rgba(212, 165, 116, 0.2)'
          }}
        >
          <p className="text-sm text-foreground/70 leading-relaxed" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            참석이 어려우신 분들께서 보내주시는<br />
            따뜻한 마음 감사히 받겠습니다 💝
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}