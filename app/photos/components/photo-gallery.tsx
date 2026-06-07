"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
  type Transition,
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

const lightboxButtonClass =
  "group flex items-center justify-center size-12 lg:size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-[transform,opacity] active:scale-[0.96] active:opacity-70 ring-1 ring-white/20 hover:ring-white/50 cursor-pointer select-none";

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

interface LightboxImageProps {
  photo: Photo;
}

/**
 * Renders a single image within the lightbox view. (Used on desktop viewports)
 */
function LightboxImage({ photo }: LightboxImageProps) {
  return (
    <div className="relative size-full">
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className="absolute inset-0 size-full object-contain outline-1 outline-white/10"
        draggable={false}
      />
    </div>
  );
}

interface LightboxCarouselProps {
  photos: readonly Photo[];
  activeIndex: number;
  onNavigate: (direction: -1 | 1) => void;
  navTick: number;
  navDirection: -1 | 1;
}

/**
 * LightboxCarousel displays an animated, swipeable/lightbox-style photo viewer. (Used on mobile viewports)
 * Handles navigation between photos, slide transitions, and responsive layout.
 */
function LightboxCarousel({
  photos,
  activeIndex,
  onNavigate,
  navTick,
  navDirection,
}: LightboxCarouselProps) {
  // Watch for user preference for reduced motion
  const prefersReducedMotion = useReducedMotion();
  // Ref for the photo viewport element
  const viewportRef = useRef<HTMLDivElement>(null);
  // Total number of photos
  const photoCount = photos.length;
  // Index of previous and next photos for circular navigation
  const prevIndex = (activeIndex - 1 + photoCount) % photoCount;
  const nextIndex = (activeIndex + 1) % photoCount;
  // We render 3 slides for smooth swipe/loop effect (or just 1 if only 1 image)
  const slides =
    photoCount > 1
      ? [photos[prevIndex], photos[activeIndex], photos[nextIndex]]
      : [photos[activeIndex]];
  const slideCount = slides.length;

  // State to keep track of each slide's width (used for motion calculations)
  const [slideWidth, setSlideWidth] = useState(0);
  // X position of the slide track (controlled by Framer Motion)
  const x = useMotionValue(0);
  // Store the current transition animation, so we can stop it programmatically
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  // Are we currently animating a transition?
  const isAnimatingRef = useRef(false);
  // Do we need to "snap" the carousel back to center after an animation?
  const pendingCenterResetRef = useRef(false);
  // Last navigation "tick" (for external navigation triggering)
  const lastHandledNavTick = useRef(navTick);

  // Use reduced transition if the user prefers reduced motion
  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : lightboxTransition;

  // Handle resizing/sliding logic; This recalculates slide width and resets position
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    function updateWidth() {
      const width = viewportRef.current?.clientWidth ?? 0;
      setSlideWidth(width);
      // Reset track position if not animating, not pending center, and width is valid
      if (
        !isAnimatingRef.current &&
        !pendingCenterResetRef.current &&
        width > 0
      ) {
        // Center on active slide (middle of [prev, active, next])
        x.set(photoCount > 1 ? -width : 0);
      }
    }

    updateWidth();
    // Watch for resizes to viewport using ResizeObserver
    const observer = new ResizeObserver(updateWidth);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [photoCount, x]);

  // After an animation "cycle" completes, snap the carousel back to the center slide
  useLayoutEffect(() => {
    if (!pendingCenterResetRef.current) return;

    const width = viewportRef.current?.clientWidth ?? slideWidth;
    if (width <= 0) return;

    // Snap to center slide
    x.set(photoCount > 1 ? -width : 0);
    pendingCenterResetRef.current = false;
    isAnimatingRef.current = false;
  }, [activeIndex, photoCount, slideWidth, x]);

  // Called when carousel should animate left/right to the next/previous photo
  const goTo = useCallback(
    (direction: -1 | 1) => {
      const width = viewportRef.current?.clientWidth ?? slideWidth;
      if (width <= 0 || photoCount <= 1) return;

      // If an animation is currently running, stop it
      animationRef.current?.stop();
      isAnimatingRef.current = true;

      // Animate to the left or right boundary (based on direction)
      const targetX = direction === 1 ? -width * 2 : 0;

      animationRef.current = animate(x, targetX, {
        ...slideTransition,
        onComplete: () => {
          // Signal that we need to "reset" (jump) back to center after nav change
          pendingCenterResetRef.current = true;
          // Tell parent to update active index so we re-render with new image
          onNavigate(direction);
        },
      });
    },
    [onNavigate, photoCount, slideTransition, slideWidth, x]
  );

  // Keep the goTo function continually up to date so event handlers never go stale
  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  // Effect: trigger "goTo" if navTick changes (external navigation requested)
  useEffect(() => {
    if (navTick === lastHandledNavTick.current) return;
    lastHandledNavTick.current = navTick;
    goToRef.current(navDirection);
  }, [navTick, navDirection]);

  // Handle finish-drag event on the carousel (either animate, swipe, or bounce back)
  function handleDragEnd(_: unknown, info: PanInfo) {
    const width = viewportRef.current?.clientWidth ?? slideWidth;
    if (width <= 0 || photoCount <= 1) return;

    // Stop any ongoing animation
    animationRef.current?.stop();

    // Calculate "swipe" amount; velocity is factored in for fast swipes
    const swipe = info.offset.x + info.velocity.x * 0.15;

    // If swiped left enough, go to next
    if (swipe < -40) {
      goTo(1);
      return;
    }
    // If swiped right enough, go to previous
    if (swipe > 40) {
      goTo(-1);
      return;
    }

    // Otherwise, bounce back to center
    isAnimatingRef.current = true;
    animationRef.current = animate(x, -width, {
      ...slideTransition,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }

  // Grab the current active photo object (for fallback rendering)
  const activePhoto = photos[activeIndex];
  // Are we ready to render the track/animation (only if width is measured)
  const isTrackReady = slideWidth > 0;

  return (
    <div ref={viewportRef} className="relative size-full overflow-hidden">
      {/* If not ready to animate, show a static photo fallback */}
      {!isTrackReady && (
        <img
          src={activePhoto.src}
          alt={activePhoto.alt}
          width={activePhoto.width}
          height={activePhoto.height}
          className="absolute inset-0 size-full object-contain outline-1 outline-white/10"
          draggable={false}
        />
      )}

      {/* Main animated swipeable track */}
      {isTrackReady && (
        <motion.div
          className="flex h-full"
          style={{
            x, // Framer-motion x value, animates the whole track
            width: slideWidth * slideCount,
            // Allow all touch actions to be disabled when multiple photos are present (for gestures like swipe),
            // otherwise restrict to vertical scrolling (pan-y) when only one photo is shown to prevent accidental horizontal gestures.
            touchAction: photoCount > 1 ? "none" : "pan-y",
          }}
          // The 'drag' prop enables drag gesture on the x-axis (horizontal) only when there is more than one photo.
          // If there is only one photo, dragging is disabled by passing 'false'.
          drag={photoCount > 1 ? "x" : false}
          dragConstraints={
            photoCount > 1
              ? { left: -slideWidth * 2, right: 0 }
              : false
          }
          dragElastic={0.12}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
        >
          {/* Render previous, current, and next slide (or just one if only one image) */}
          {slides.map((photo) => (
            <div
              key={photo.src}
              className="relative h-full shrink-0"
              style={{ width: slideWidth, flex: `0 0 ${slideWidth}px` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="absolute inset-0 size-full object-contain outline-1 outline-white/10"
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navTick, setNavTick] = useState(0);
  const [navDirection, setNavDirection] = useState<-1 | 1>(1);
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

  const navigateBy = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex(
        (prev) => (prev + direction + photos.length) % photos.length
      );
    },
    [photos.length]
  );

  const requestCarouselNavigation = (direction: -1 | 1) => {
    setNavDirection(direction);
    setNavTick((tick) => tick + 1);
  };

  const handleNavigate = useCallback(
    (direction: -1 | 1) => {
      if (isMobileViewport) {
        requestCarouselNavigation(direction);
        return;
      }
      navigateBy(direction);
    },
    [isMobileViewport, navigateBy]
  );

  const handlePrevious = () => handleNavigate(-1);
  const handleNext = () => handleNavigate(1);

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
        handleNavigate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNavigate(1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNavigate, isOpen]);

  const activePhoto = photos[activeIndex];
  const isCompact = mobileLayout === "compact";
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
                  className="flex flex-col items-center w-full lg:max-w-4xl lg:w-fit"
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
                    {/* Render LightboxCarousel on mobile viewports, otherwise render LightboxImage */}
                    {isMobileViewport ? (
                      <LightboxCarousel
                        photos={photos}
                        activeIndex={activeIndex}
                        onNavigate={navigateBy}
                        navTick={navTick}
                        navDirection={navDirection}
                      />
                    ) : (
                      <LightboxImage photo={activePhoto} />
                    )}
                  </motion.div>

                  <motion.div
                    className="mt-4 lg:mt-6 text-center max-w-sm"
                    {...getContentMotion(0.1, prefersReducedMotion)}
                  >
                    <p className="text-sm text-white/90 font-medium">
                      {activePhoto.location} · {activePhoto.date}
                    </p>
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
