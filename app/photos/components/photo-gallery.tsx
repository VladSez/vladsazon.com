"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  RectangleVertical,
  X,
} from "lucide-react";
import type { PHOTOS_METADATA } from "@/scripts/image-metadata";
import { Button } from "@/components/ui/button";
import { Copyright } from "@/components/ui/copyright";
import { cn } from "@/lib/utils";

type Photo = (typeof PHOTOS_METADATA)[number];
type MobileLayout = "default" | "compact";

interface PhotoGalleryProps {
  photos: readonly Photo[];
}

const iconTransition = {
  type: "spring" as const,
  duration: 0.3,
  bounce: 0,
};

const lightboxTransition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
} as const satisfies Transition;

const lightboxExit = {
  duration: 0.15,
  ease: "easeIn",
} as const satisfies Transition;

const lightboxButtonClass =
  "group flex items-center justify-center size-12 lg:size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-[transform,opacity] active:scale-[0.96] active:opacity-70 ring-1 ring-white/20 hover:ring-white/50 cursor-pointer select-none";

function getSlideVariants(prefersReducedMotion: boolean | null): Variants {
  if (prefersReducedMotion) {
    return {
      enter: { opacity: 0 },
      center: { opacity: 1, transition: { duration: 0 } },
      exit: { opacity: 0, transition: { duration: 0 } },
    };
  }

  return {
    enter: (direction: number) => ({
      x: direction > 0 ? "30%" : "-30%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: lightboxTransition,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-30%" : "30%",
      opacity: 0,
      transition: lightboxExit,
    }),
  };
}

function getContentMotion(delay: number, prefersReducedMotion: boolean | null) {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
    };
  }

  return {
    initial: { opacity: 0, y: 12, scale: 0.96, filter: "blur(4px)" },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { ...lightboxTransition, delay },
    },
  };
}

/**
 * Computes inline style props for a lightbox image to maintain its aspect ratio
 * and responsive sizing based on viewport width and dynamic viewport height (dvh).
 */
function getLightboxImageStyle(
  width: number,
  height: number,
  isMobile: boolean
) {
  const maxWidth = isMobile ? "100vw" : "90vw";
  return {
    aspectRatio: `${width} / ${height}`,
    width: `min(${maxWidth}, calc(85dvh * ${width} / ${height}))`,
  };
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mobileLayout, setMobileLayout] = useState<MobileLayout>("compact");
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleToggleLayout = () => {
    setMobileLayout((prev) => (prev === "compact" ? "default" : "compact"));
  };

  const handleOpenPhoto = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      return;
    }
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handlePrevious = () => paginate(-1);
  const handleNext = () => paginate(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobileViewport(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        paginate(1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, photos.length]);

  const activePhoto = photos[activeIndex];
  const isCompact = mobileLayout === "compact";
  const slideVariants = getSlideVariants(prefersReducedMotion);
  const overlayTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.2 };

  return (
    <>
      <div className="mb-3 flex justify-end lg:hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full size-10 active:opacity-70"
          aria-label={
            isCompact ? "Switch to single column" : "Switch to grid view"
          }
          aria-pressed={isCompact}
          onClick={handleToggleLayout}
        >
          <span className="relative size-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {isCompact ? (
                <motion.span
                  key="single-column"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={iconTransition}
                >
                  <RectangleVertical className="size-5" aria-hidden />
                </motion.span>
              ) : (
                <motion.span
                  key="grid"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={iconTransition}
                >
                  <Grid3x3 className="size-5" aria-hidden />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </Button>
      </div>

      <div
        className={cn(
          "grid gap-px  -mx-5 w-[calc(100%+2.5rem)] sm:mx-0 sm:w-full",
          isCompact ? "grid-cols-3 bg-border" : "grid-cols-1",
          "lg:grid-cols-3 lg:gap-5 lg:bg-transparent lg:mx-0 lg:w-full"
        )}
      >
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => handleOpenPhoto(index)}
            className={cn(
              "cursor-pointer group relative aspect-square overflow-hidden",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              "transition-transform active:scale-[0.99]",
              "rounded-none lg:rounded-xl"
            )}
            aria-label={`Open ${photo.location} photo from ${photo.date}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="bg-slate-100 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground flex justify-end items-center">
        <div>
          <Copyright />
        </div>
      </div>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={overlayTransition}
              />
            </Dialog.Overlay>

            <Dialog.Title className="sr-only">
              {activePhoto.location} photo from {activePhoto.date}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              {activePhoto.alt}
            </Dialog.Description>

            <Dialog.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-0 py-4 lg:p-4 outline-none"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={overlayTransition}
              >
                <div
                  className="relative flex flex-col items-center w-full lg:max-w-4xl lg:w-fit"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    className="relative w-full max-h-[85dvh] lg:max-w-[90vw] shrink-0 overflow-hidden bg-slate-50/30"
                    style={getLightboxImageStyle(
                      activePhoto.width,
                      activePhoto.height,
                      isMobileViewport
                    )}
                    {...getContentMotion(0, prefersReducedMotion)}
                  >
                    <AnimatePresence
                      mode="popLayout"
                      initial={false}
                      custom={direction}
                    >
                      <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag={isMobileViewport ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.15}
                        onDragEnd={(_, info) => {
                          const swipe = info.offset.x + info.velocity.x * 0.2;
                          if (swipe < -80) paginate(1);
                          else if (swipe > 80) paginate(-1);
                        }}
                        className="absolute inset-0 touch-pan-y"
                      >
                        <img
                          src={activePhoto.src}
                          alt={activePhoto.alt}
                          width={activePhoto.width}
                          height={activePhoto.height}
                          className="absolute inset-0 size-full object-contain outline-1 outline-white/10"
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    className="mt-6 text-center max-w-sm"
                    {...getContentMotion(0.1, prefersReducedMotion)}
                  >
                    <p className="text-sm text-white/90 font-medium">
                      {activePhoto.location} · {activePhoto.date}
                    </p>
                    <p className="sr-only">{activePhoto.alt}</p>
                  </motion.div>

                  <motion.div
                    className="mt-4 flex gap-6 items-center"
                    {...getContentMotion(0.2, prefersReducedMotion)}
                  >
                    <button
                      onClick={handlePrevious}
                      className={lightboxButtonClass}
                      aria-label="Previous photo"
                      title="Previous photo"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-xs text-white/60 min-w-[50px] text-center tabular-nums">
                      {activeIndex + 1} / {photos.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className={lightboxButtonClass}
                      aria-label="Next photo"
                      title="Next photo"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </motion.div>
                </div>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute top-2 right-2 lg:top-4 lg:right-4 flex items-center justify-center size-10 rounded-full bg-gray-950/95 md:bg-white/10 md:hover:bg-white/20 text-white transition-[transform,opacity] active:scale-[0.96] active:opacity-70 ring-1 ring-white/40 md:ring-white/20 hover:ring-white/50 cursor-pointer"
                    aria-label="Close lightbox"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </Dialog.Root>
    </>
  );
}
