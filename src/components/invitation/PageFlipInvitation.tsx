import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CoverPage from './pages/CoverPage';
import MessagePage from './pages/MessagePage';
import DatePage from './pages/DatePage';
import CouplePage, {
  COUPLE_IMAGE_SOURCES,
} from './pages/CouplePage';
import TimelinePage, {
  TIMELINE_IMAGE_SOURCES,
  TIMELINE_PREVIEW_IMAGE_SOURCES,
} from './pages/TimelinePage';
import MapPage from './pages/MapPage';
import RsvpAccountPage from './pages/RsvpAccountPage';
import SharePage from './pages/SharePage';
import { Toaster } from '../ui/sonner';

const pages = [
  CoverPage,
  DatePage,
  MessagePage,
  CouplePage,
  TimelinePage,
  MapPage,
  RsvpAccountPage,
  SharePage,
];

export default function PageFlipInvitation() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [hasPlayedInitialIntro, setHasPlayedInitialIntro] =
    useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasPreloadedCoupleRef = useRef(false);
  const hasPreloadedPreviewRef = useRef(false);
  const hasPreloadedFullRef = useRef(false);

  const preloadImages = (sources: string[]) => {
    sources.forEach((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
    });
  };

  const scheduleLowPriority = (
    task: () => void,
    delayMs = 0,
  ) => {
    let idleId: number | null = null;
    let timeoutId: number | null = null;

    const run = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(
          () => {
            task();
          },
          { timeout: 1500 },
        );
        return;
      }
      timeoutId = window.setTimeout(task, 0);
    };

    if (delayMs > 0) {
      timeoutId = window.setTimeout(run, delayMs);
    } else {
      run();
    }

    return () => {
      if (
        idleId !== null &&
        'cancelIdleCallback' in window
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  };

  useEffect(() => {
    if (currentPage === 0 && !hasPlayedInitialIntro) {
      setHasPlayedInitialIntro(true);
    }
  }, [currentPage, hasPlayedInitialIntro]);

  useEffect(() => {
    // Keep cover page fast, then warm up the two "about us" photos.
    if (currentPage < 1 || hasPreloadedCoupleRef.current) {
      return;
    }

    hasPreloadedCoupleRef.current = true;
    return scheduleLowPriority(() => {
      preloadImages(COUPLE_IMAGE_SOURCES);
    }, 300);
  }, [currentPage]);

  useEffect(() => {
    // Keep first impression fast: never preload while cover page is visible.
    if (currentPage < 2 || hasPreloadedPreviewRef.current) {
      return;
    }

    hasPreloadedPreviewRef.current = true;
    return scheduleLowPriority(() => {
      preloadImages(TIMELINE_PREVIEW_IMAGE_SOURCES);
    }, 400);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage < 3 || hasPreloadedFullRef.current) {
      return;
    }

    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
        };
      }
    ).connection;

    const shouldPreloadFullGallery =
      !connection?.saveData &&
      connection?.effectiveType !== '2g' &&
      connection?.effectiveType !== 'slow-2g';

    if (!shouldPreloadFullGallery) {
      return;
    }

    const secondaryImages = TIMELINE_IMAGE_SOURCES.filter(
      (src) =>
        !TIMELINE_PREVIEW_IMAGE_SOURCES.includes(src),
    );
    if (secondaryImages.length === 0) {
      return;
    }

    hasPreloadedFullRef.current = true;
    return scheduleLowPriority(() => {
      preloadImages(secondaryImages);
    }, 1000);
  }, [currentPage]);

  const paginate = (newDirection: number) => {
    const nextPage = currentPage + newDirection;
    if (nextPage >= 0 && nextPage < pages.length) {
      setDirection(newDirection);
      setCurrentPage(nextPage);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't paginate when image modal is open
    if (isImageModalOpen) {
      return;
    }
    
    // Ignore clicks on interactive elements
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
      return;
    }

    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    
    if (clickX > screenWidth / 2) {
      // Right side - next page
      paginate(1);
    } else {
      // Left side - previous page
      paginate(-1);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newPage = value[0];
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 0 : direction > 0 ? 50 : -50,
      opacity: direction === 0 ? 1 : 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const CurrentPageComponent = pages[currentPage];

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#e8e5e0', touchAction: 'pan-y' }}>
      {/* Instagram Story Style Progress Bars - Moved to bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-50 px-6">
        <div className="flex gap-1.5 max-w-md mx-auto">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className="flex-1 py-4 px-0.5 -my-4 group cursor-pointer"
              aria-label={`페이지 ${index + 1}로 이동`}
            >
              {/* Actual progress bar */}
              <div className="h-1 bg-white/30 rounded-full overflow-hidden relative transition-all group-hover:h-1.5">
                {/* Background */}
                <div className="absolute inset-0 bg-white/30" />
                
                {/* Filled portion for completed pages */}
                {index < currentPage && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-white/90"
                  />
                )}
                
                {/* Animated fill for current page */}
                {index === currentPage && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white/90"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Left/Right Navigation Arrows */}
      {currentPage > 0 && !isImageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <ChevronLeft 
            className="w-6 h-6 text-gray-400" 
            strokeWidth={1.5}
          />
        </motion.div>
      )}
      
      {currentPage < pages.length - 1 && currentPage > 0 && !isImageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
          <ChevronRight 
            className="w-6 h-6 text-gray-400" 
            strokeWidth={1.5}
          />
        </motion.div>
      )}

      {/* Navigation buttons */}
      {/* Page content */}
      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={handleClick}>
        <AnimatePresence initial={true} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 400, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div 
              ref={scrollContainerRef}
              className="w-full max-w-md h-[85vh] max-h-[800px] bg-white rounded-lg shadow-2xl overflow-auto"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {currentPage === 4 ? (
                <TimelinePage onImageOpenChange={setIsImageModalOpen} />
              ) : currentPage === 0 ? (
                <CoverPage
                  playInitialIntro={!hasPlayedInitialIntro}
                />
              ) : (
                <CurrentPageComponent />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
