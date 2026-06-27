import { AnimatePresence, motion } from 'motion/react';
import { ScrollText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import coverImage from '../../../assets/cover2.jpg';
import promiseImage3 from '../../../assets/promise_3.jpeg';
import { messages } from '../../../data/messages';
import {
  setInvitationLanguage,
  useInvitationLanguage,
} from '../language';

const INTRO_MIN_DURATION_MS = 900;
const INTRO_MAX_WAIT_MS = 1600;
const COVER_TRANSITION_DURATION_S = 0.62;
const EASING = [0.22, 1, 0.36, 1] as const;
const FALLBACK_CONTENT =
  '2026.06.28 SUN 17:00\n영등포 더베르G 2층';
const FALLBACK_CONTENT_EN =
  'JUNE 28, 2026 · 5:00 PM\nThe Verge G, Yeongdeungpo';
const INTRO_NAMES = '유현욱 · 김연재';
const INTRO_NAMES_EN = 'Hyeonuk Ryu · Yeonjae Kim';
const INTRO_DATE = '2026.06.28 SUN 17:00';
const KOREAN_TEXT_PATTERN = /[가-힣]/;
const VENUE_GUIDE_ITEMS = [
  {
    title: '지하주차장 2시간 무료 이용 가능',
    detail:
      '주차등록: 웰컴드링크존 or 지하1층 연회장 입구\n추가요금: 10분당 500원',
  },
  {
    title: 'ATM 안내',
    detail: '2층 축의대 좌측 계단 앞에 있어요.',
  },
  {
    title: '웰컴 드링크가 준비되어 있습니다.',
    detail: '2층 홀 맞은편에서 자유롭게 즐겨주세요.',
  },
  {
    title: '신부대기실 인사는 16:45까지 가능해요.',
    detail: '홀 왼편 꽃길 끝에 위치해 있어요.',
  },
  {
    title: '식사는 16:30~18:30에 가능해요.',
    detail: '지하 1층 위치, 모든 엘리베이터 가능합니다.',
  },
  {
    title: '연회장 내 모든 음료·주류 무제한',
    detail: '예식장 서비스이오니 마음껏 드세요~',
  },
  {
    title: '결혼식 후 친구 단체 촬영은 생략합니다.',
    detail: '여유롭고 편안한 식사 시간이 되시길 바랍니다.',
  },
  {
    title: '드레스코드 안내',
    detail: '흰색을 제외한 모든 색상 괜찮아요. 예쁘게 입고 와주세요.',
  },
];
const VENUE_GUIDE_ITEMS_EN = [
  {
    title: 'Parking',
    detail:
      '2 hours free in the underground lot. Register your vehicle at the Welcome Drink Zone or B1 Banquet Hall. (Extra time: ₩500 / 10 mins)',
  },
  {
    title: 'ATM',
    detail: '2nd floor, by the stairs to the left of the reception desk.',
  },
  {
    title: 'Welcome Drinks',
    detail: '2nd floor, directly across from the main hall.',
  },
  {
    title: 'Greeting the Bride',
    detail:
      'Open until 4:45 PM. Located at the end of the flower walkway on the left side of the hall.',
  },
  {
    title: 'Dining',
    detail:
      '4:30 PM - 6:30 PM in the B1 Banquet Hall (accessible via any elevator).',
  },
  {
    title: 'Unlimited Beverages',
    detail:
      'Enjoy complimentary, unlimited alcoholic and non-alcoholic drinks in the Banquet Hall.',
  },
  {
    title: 'Photography',
    detail:
      "We will skip the traditional friends' group photo after the ceremony so you can relax and enjoy your meal sooner!",
  },
];

type CoverPageProps = {
  playInitialIntro?: boolean;
  onContinue?: () => void;
};

export default function CoverPage({
  playInitialIntro = false,
  onContinue,
}: CoverPageProps) {
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;
  const nameParam = searchParams?.get('name');
  const versionParam = searchParams?.get('version');
  const isEnglish = useInvitationLanguage();
  const selectedCoverImage =
    versionParam === '2' ? promiseImage3 : coverImage;
  const personalizedMessage = nameParam
    ? messages.find((entry) => entry.name === nameParam) ?? null
    : null;
  const shouldUsePersonalizedMessage =
    personalizedMessage &&
    (!isEnglish ||
      !KOREAN_TEXT_PATTERN.test(personalizedMessage.content));
  const coverLines = (
    (shouldUsePersonalizedMessage
      ? personalizedMessage.content
      : null) ??
    (isEnglish ? FALLBACK_CONTENT_EN : FALLBACK_CONTENT)
  ).split('\n');

  const [imageStatus, setImageStatus] = useState<
    'loading' | 'loaded' | 'error'
  >('loading');
  const [showIntro, setShowIntro] = useState(
    playInitialIntro,
  );
  const [hasMetIntroMinimum, setHasMetIntroMinimum] =
    useState(!playInitialIntro);
  const [hasReachedIntroTimeout, setHasReachedIntroTimeout] =
    useState(!playInitialIntro);
  const [isVenueGuideOpen, setIsVenueGuideOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setImageStatus('loading');

    const preloadImage = new Image();
    preloadImage.decoding = 'async';
    preloadImage.fetchPriority = 'high';

    const markLoaded = () => {
      if (!cancelled) {
        setImageStatus('loaded');
      }
    };

    const markError = () => {
      if (!cancelled) {
        setImageStatus('error');
      }
    };

    preloadImage.onload = markLoaded;
    preloadImage.onerror = markError;
    preloadImage.src = selectedCoverImage;

    if (preloadImage.complete) {
      if (preloadImage.naturalWidth > 0) {
        markLoaded();
      } else {
        markError();
      }
    }

    return () => {
      cancelled = true;
      preloadImage.onload = null;
      preloadImage.onerror = null;
    };
  }, [selectedCoverImage]);

  useEffect(() => {
    if (!playInitialIntro) {
      setShowIntro(false);
      setHasMetIntroMinimum(true);
      setHasReachedIntroTimeout(true);
      return;
    }

    const minimumTimer = window.setTimeout(() => {
      setHasMetIntroMinimum(true);
    }, INTRO_MIN_DURATION_MS);
    const timeoutTimer = window.setTimeout(() => {
      setHasReachedIntroTimeout(true);
    }, INTRO_MAX_WAIT_MS);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(timeoutTimer);
    };
  }, [playInitialIntro]);

  useEffect(() => {
    if (!showIntro) {
      return;
    }

    if (hasReachedIntroTimeout) {
      setShowIntro(false);
      return;
    }

    if (hasMetIntroMinimum && imageStatus !== 'loading') {
      setShowIntro(false);
    }
  }, [
    hasMetIntroMinimum,
    hasReachedIntroTimeout,
    imageStatus,
    showIntro,
  ]);

  const isImageReady = imageStatus === 'loaded';
  const hasImageFailed = imageStatus === 'error';
  const shouldRevealContent = !showIntro;
  const venueGuideItems = isEnglish
    ? VENUE_GUIDE_ITEMS_EN
    : VENUE_GUIDE_ITEMS;

  return (
    <div
      className="h-full relative overflow-hidden"
      style={{ background: '#ddd8cf' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #ece6dd 0%, #d8d1c7 50%, #ccc2b7 100%)',
        }}
      />

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isImageReady ? 0.1 : hasImageFailed ? 0.55 : 0.42,
        }}
        transition={{
          duration: COVER_TRANSITION_DURATION_S,
          ease: EASING,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 18%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 34%), radial-gradient(circle at 78% 20%, rgba(242,226,203,0.42) 0%, rgba(242,226,203,0) 30%), radial-gradient(circle at 50% 78%, rgba(228,214,194,0.38) 0%, rgba(228,214,194,0) 44%)',
        }}
      />

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isImageReady ? 0 : hasImageFailed ? 0.26 : 0.18,
          y: isImageReady ? -10 : 0,
        }}
        transition={{
          duration: COVER_TRANSITION_DURATION_S,
          ease: EASING,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(22px)',
          background:
            'linear-gradient(145deg, rgba(248,243,237,0.34) 0%, rgba(233,226,216,0.18) 52%, rgba(244,239,231,0.28) 100%)',
        }}
      />

      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: isImageReady ? 1 : 0,
          scale: isImageReady ? 1 : 1.015,
        }}
        transition={{
          duration: COVER_TRANSITION_DURATION_S,
          ease: EASING,
        }}
      >
        <img
          src={selectedCoverImage}
          alt="Wedding"
          className="w-full h-full object-cover"
          onLoad={() => setImageStatus('loaded')}
          onError={() => setImageStatus('error')}
          loading="eager"
          decoding="async"
        />
      </motion.div>

      <div className="relative h-full flex flex-col p-6 sm:p-8 md:p-12">
        <motion.button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setInvitationLanguage(isEnglish ? 'ko' : 'eng');
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={
            shouldRevealContent
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -8 }
          }
          transition={{
            duration: 0.75,
            delay: shouldRevealContent ? 0.1 : 0,
            ease: EASING,
          }}
          style={{
            position: 'absolute',
            top: '1.15rem',
            right: '1.15rem',
            zIndex: 5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.1rem',
            padding: '0.18rem',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.58)',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            boxShadow:
              '0 10px 28px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.12)',
          }}
          aria-label={
            isEnglish ? 'Switch language to Korean' : '영어로 전환'
          }
        >
          {(['ko', 'eng'] as const).map((language) => {
            const isActive =
              language === 'eng' ? isEnglish : !isEnglish;

            return (
              <span
                key={language}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '2.05rem',
                  height: '1.55rem',
                  borderRadius: '999px',
                  background: isActive
                    ? 'rgba(255,255,255,0.9)'
                    : 'transparent',
                  color: isActive
                    ? 'rgba(30,30,30,0.9)'
                    : 'rgba(255,255,255,0.86)',
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: '0.58rem',
                  fontWeight: isActive ? 500 : 300,
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                }}
              >
                {language === 'eng' ? 'EN' : 'KR'}
              </span>
            );
          })}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={
            shouldRevealContent
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -12 }
          }
          transition={{
            duration: 0.9,
            delay: shouldRevealContent ? 0.12 : 0,
            ease: EASING,
          }}
          className="text-center pt-2 sm:pt-4"
        >
          <p
            className="text-black tracking-widest"
            style={{
              fontSize: '0.7rem',
              fontFamily: "'Noto Serif KR', serif",
              letterSpacing: '0.3em',
            }}
          >
            WEDDING INVITATION
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={
            shouldRevealContent
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -8 }
          }
          transition={{
            duration: 0.9,
            delay: shouldRevealContent ? 0.2 : 0,
            ease: EASING,
          }}
          className="pt-8"
        >
          <div className="mt-2">
            {coverLines.map((line, index) => (
              <p
                key={index}
                className="text-black text-center inline-block"
                style={{
                  fontSize: '0.85rem',
                  fontFamily: "'Noto Serif KR', serif",
                  fontWeight: 300,
                  lineHeight: '2',
                  display: 'block',
                }}
              >
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="flex-1"></div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={
            shouldRevealContent
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{
            duration: 0.75,
            delay: shouldRevealContent ? 0.3 : 0,
            ease: EASING,
          }}
          className="pb-4 text-center"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsVenueGuideOpen(true);
            }}
            className="group inline-flex items-center gap-2 border border-white/50 bg-black/18 px-4 py-2 text-white shadow-sm backdrop-blur-md transition-all hover:border-white/70 hover:bg-black/24"
            style={{
              borderRadius: '999px',
              fontFamily: "'Noto Serif KR', serif",
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              boxShadow:
                '0 10px 28px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.14)',
            }}
            aria-label={isEnglish ? 'Open venue guide' : '안내 보기'}
          >
            <ScrollText
              aria-hidden="true"
              size={14}
              style={{ opacity: 0.82 }}
              strokeWidth={1.4}
            />
            <span>VENUE GUIDE</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={
            shouldRevealContent
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{
            duration: 0.7,
            delay: shouldRevealContent ? 0.38 : 0,
            ease: EASING,
          }}
          className="pb-4 text-center"
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onContinue?.();
            }}
            className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full"
            style={{
              border: 0,
              cursor: 'pointer',
            }}
            aria-label={
              isEnglish
                ? 'Continue to the next page'
                : '다음 페이지로 이동'
            }
          >
            <p
              className="text-white"
              style={{
                fontSize: '0.9rem',
                fontFamily: "'Noto Serif KR', serif",
                margin: 0,
              }}
            >
              {isEnglish ? 'Tap to continue →' : '탭하여 넘겨주세요 →'}
            </p>
          </button>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          isImageReady
            ? { opacity: 0.04, y: -8 }
            : { opacity: hasImageFailed ? 0.2 : 0.14, y: 0 }
        }
        transition={{
          duration: 0.9,
          delay: 0.02,
          ease: EASING,
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(140deg, rgba(244,240,232,0.42) 0%, rgba(236,230,221,0.32) 52%, rgba(244,240,232,0.22) 100%)',
          zIndex: 20,
        }}
      />

      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="initial-cover-intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: COVER_TRANSITION_DURATION_S,
              ease: EASING,
            }}
            className="absolute inset-0 z-30"
            style={{
              background:
                'linear-gradient(165deg, rgba(244,239,231,0.98) 0%, rgba(231,223,212,0.97) 54%, rgba(219,209,196,0.95) 100%)',
            }}
          >
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0.28, y: 16 }}
              animate={{ opacity: 0.42, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 1.2, ease: EASING }}
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(140deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 28%, rgba(255,255,255,0.16) 100%)',
                mixBlendMode: 'screen',
              }}
            />

            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0.2, y: 10 }}
              animate={{ opacity: 0.34, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1.4, ease: EASING }}
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 28%, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0) 42%), radial-gradient(circle at 22% 82%, rgba(230,214,191,0.34) 0%, rgba(230,214,191,0) 34%)',
                filter: 'blur(18px)',
              }}
            />

            <div className="relative h-full flex flex-col items-center justify-center px-8 text-center">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: EASING,
                }}
                className="text-black/60 tracking-[0.35em]"
                style={{
                  fontSize: '0.68rem',
                  fontFamily: "'Noto Serif KR', serif",
                }}
              >
                WEDDING INVITATION
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.95,
                  delay: 0.18,
                  ease: EASING,
                }}
                className="mt-6 text-black"
                style={{
                  fontSize: 'clamp(1.7rem, 7vw, 2.25rem)',
                  fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                }}
              >
                {isEnglish ? INTRO_NAMES_EN : INTRO_NAMES}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.9,
                  delay: 0.28,
                  ease: EASING,
                }}
                className="mt-4 text-black/70"
                style={{
                  fontSize: '0.82rem',
                  fontFamily: "'Noto Serif KR', serif",
                  letterSpacing: '0.18em',
                }}
              >
                {INTRO_DATE}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.78 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0.9 }}
                transition={{
                  duration: 0.9,
                  delay: 0.36,
                  ease: EASING,
                }}
                className="mt-7 h-px w-20 bg-black/15"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: 0.85,
                  delay: 0.42,
                  ease: EASING,
                }}
                className="mt-7 text-black/65"
                style={{
                  fontSize: '0.86rem',
                  fontFamily: "'Noto Serif KR', serif",
                  fontWeight: 300,
                }}
              >
                {isEnglish
                  ? 'Opening the invitation'
                  : '초대장을 열고 있어요'}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isVenueGuideOpen && (
              <motion.div
                key="venue-guide-modal"
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem 1.25rem',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EASING }}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsVenueGuideOpen(false);
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Venue Guide"
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(23, 19, 14, 0.58)',
                    backdropFilter: 'blur(12px)',
                  }}
                />

                <motion.div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '21.5rem',
                    maxHeight: 'calc(100vh - 4rem)',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    textAlign: 'center',
                    borderRadius: '8px',
                    border: '1px solid rgba(120, 106, 82, 0.26)',
                    background:
                      'linear-gradient(180deg, #fffdf8 0%, #f7f1e7 100%)',
                    boxShadow:
                      '0 34px 80px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(255,255,255,0.62)',
                    fontFamily: "'Noto Serif KR', serif",
                  }}
                  initial={{ opacity: 0, y: 22, scale: 0.965 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.985 }}
                  transition={{ duration: 0.34, ease: EASING }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      pointerEvents: 'none',
                      position: 'absolute',
                      inset: '0.75rem',
                      border: '1px solid rgba(120, 106, 82, 0.18)',
                      borderRadius: '6px',
                    }}
                  />

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsVenueGuideOpen(false);
                    }}
                    style={{
                      position: 'absolute',
                      right: '1.15rem',
                      top: '1.05rem',
                      zIndex: 10,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.8rem',
                      height: '1.8rem',
                      border: 0,
                      color: '#82776a',
                      background: 'transparent',
                    }}
                    aria-label={
                      isEnglish ? 'Close venue guide' : '안내 닫기'
                    }
                  >
                    <X size={15} strokeWidth={1.25} />
                  </button>

                  <div
                    style={{
                      position: 'relative',
                      padding: '2.1rem 1.75rem 1.35rem',
                    }}
                  >
                    <div
                      style={{
                        width: '4rem',
                        height: '1px',
                        margin: '0 auto 1.25rem',
                        background: 'rgba(120,106,82,0.38)',
                      }}
                    />
                    <p
                      style={{
                        color: '#9a9284',
                        fontSize: '0.62rem',
                        letterSpacing: '0.31em',
                      }}
                    >
                      OUR WEDDING DAY
                    </p>
                    <p
                      style={{
                        marginTop: '0.5rem',
                        color: '#3f3931',
                        fontSize: isEnglish ? '0.9rem' : '1rem',
                        fontWeight: 300,
                        lineHeight: 1.55,
                      }}
                    >
                      {isEnglish ? 'Please note.' : '알려드립니다.'}
                    </p>
                    <div
                      style={{
                        width: '4rem',
                        height: '1px',
                        margin: '1.25rem auto 0',
                        background: 'rgba(120,106,82,0.22)',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      padding: '0 1.5rem 1.85rem',
                    }}
                  >
                    <div style={{ textAlign: 'left' }}>
                      {venueGuideItems.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.36,
                            delay: 0.08 + index * 0.045,
                            ease: EASING,
                          }}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: isEnglish
                              ? '2.95rem minmax(0, 1fr)'
                              : '2.4rem minmax(0, 1fr)',
                            columnGap: isEnglish ? '0.65rem' : '0.75rem',
                            padding: isEnglish
                              ? '0.78rem 0'
                              : '0.82rem 0',
                            borderTop:
                              index === 0
                                ? '1px solid rgba(120,106,82,0.18)'
                                : 'none',
                            borderBottom:
                              '1px solid rgba(120,106,82,0.18)',
                          }}
                        >
                          <div
                            style={{
                              textAlign: 'right',
                              color: '#9b7a64',
                              fontSize: '0.86rem',
                              lineHeight: 1.45,
                              fontWeight: 400,
                            }}
                          >
                            {String(index + 1).padStart(2, '0')}
                            {isEnglish ? ' |' : ''}
                          </div>

                          <div>
                            <p
                              style={{
                                color: '#3f3931',
                                margin: 0,
                                fontSize: isEnglish ? '0.72rem' : '0.79rem',
                                lineHeight: 1.5,
                                fontWeight: 500,
                                letterSpacing: 0,
                              }}
                            >
                              {item.title}
                            </p>
                            <p
                              style={{
                                margin: '0.25rem 0 0',
                                color: '#7f7669',
                                fontSize: isEnglish ? '0.66rem' : '0.71rem',
                                lineHeight: 1.55,
                                fontWeight: 300,
                                letterSpacing: 0,
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {item.detail}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
