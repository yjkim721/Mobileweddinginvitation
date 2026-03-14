import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import coverImage from 'figma:asset/f9f969ffed8b23afea2c99c0a530a3dcd4e1c658.png';
import promiseImage3 from '../../../assets/promise_3.jpeg';
import { messages } from '../../../data/messages';

const INTRO_MIN_DURATION_MS = 900;
const INTRO_MAX_WAIT_MS = 1600;
const COVER_TRANSITION_DURATION_S = 0.62;
const EASING = [0.22, 1, 0.36, 1] as const;
const FALLBACK_CONTENT =
  '2026.06.28 SUN 17:00\n영등포 더베르G 2층';
const INTRO_NAMES = '유현욱 · 김연재';
const INTRO_DATE = '2026.06.28 SUN 17:00';

type CoverPageProps = {
  playInitialIntro?: boolean;
};

export default function CoverPage({
  playInitialIntro = false,
}: CoverPageProps) {
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;
  const nameParam = searchParams?.get('name');
  const versionParam = searchParams?.get('version');
  const selectedCoverImage =
    versionParam === '2' ? promiseImage3 : coverImage;
  const personalizedMessage = nameParam
    ? messages.find((entry) => entry.name === nameParam) ?? null
    : null;
  const coverLines = (
    personalizedMessage?.content ?? FALLBACK_CONTENT
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
          <div className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
            <p
              className="text-white"
              style={{
                fontSize: '0.9rem',
                fontFamily: "'Noto Serif KR', serif",
              }}
            >
              탭하여 넘겨주세요 →
            </p>
          </div>
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
                {INTRO_NAMES}
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
                초대장을 열고 있어요
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
