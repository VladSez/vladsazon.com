"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
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

/**
 * Computes inline style props for a lightbox image to maintain its aspect ratio
 * and responsive sizing based on viewport width and dynamic viewport height (dvh).
 */
function getLightboxImageStyle(width: number, height: number) {
  return {
    aspectRatio: `${width} / ${height}`,
    width: `min(90vw, calc(85dvh * ${width} / ${height}))`,
  };
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileLayout, setMobileLayout] = useState<MobileLayout>("compact");

  const handleToggleLayout = () => {
    setMobileLayout((prev) => (prev === "compact" ? "default" : "compact"));
  };

  const handleOpenPhoto = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Add keyboard navigation for photo modal when it's open
  useEffect(() => {
    // If the modal is not open, don't add the event listener
    if (!isOpen) return;

    // Handle left/right arrow key presses to navigate photos
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        // Go to the previous photo, wrapping around to the last photo if at the start
        e.preventDefault();
        setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        // Go to the next photo, wrapping around to the first photo if at the end
        e.preventDefault();
        setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      }
    }

    // Attach the keyboard event listener
    document.addEventListener("keydown", handleKeyDown);
    // Clean up the event listener when the modal closes or dependencies change
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, photos.length]);

  const activePhoto = photos[activeIndex];
  const isCompact = mobileLayout === "compact";

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
          "grid gap-px bg-border -mx-5 w-[calc(100%+2.5rem)] sm:mx-0 sm:w-full",
          isCompact ? "grid-cols-3" : "grid-cols-1",
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
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
          <Dialog.Title className="sr-only">
            {activePhoto.location} photo from {activePhoto.date}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {activePhoto.alt}
          </Dialog.Description>

          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div
              className="relative flex flex-col items-center max-w-4xl w-fit"
              // Prevent click on dialog content from closing the modal
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div
                className="relative max-h-[85dvh] max-w-[90vw] shrink-0 bg-slate-50/30"
                style={getLightboxImageStyle(
                  activePhoto.width,
                  activePhoto.height
                )}
              >
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={activePhoto.width}
                  height={activePhoto.height}
                  className="absolute inset-0 size-full object-contain"
                />
              </div>

              {/* Caption */}
              <div className="mt-6 text-center max-w-sm">
                <p className="text-sm text-white/90 font-medium">
                  {activePhoto.location} · {activePhoto.date}
                </p>
                <p className="sr-only">{activePhoto.alt}</p>
              </div>

              {/* Navigation */}
              <div className="mt-4 flex gap-6 items-center">
                <button
                  onClick={handlePrevious}
                  className="group flex items-center justify-center size-12 lg:size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 active:opacity-70 ring-1 ring-white/20 hover:ring-white/50 cursor-pointer"
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
                  className="group flex items-center justify-center size-12 lg:size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 active:opacity-70 ring-1 ring-white/20 hover:ring-white/50 cursor-pointer"
                  aria-label="Next photo"
                  title="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            {/* Close button */}
            <Dialog.Close
              className="absolute top-4 right-4 flex items-center justify-center size-10 rounded-full bg-gray-950/95 lg:bg-white/10 lg:hover:bg-white/20 text-white transition-all active:scale-95 active:opacity-70 ring-1 ring-white/40 lg:ring-white/20 hover:ring-white/50 cursor-pointer"
              aria-label="Close lightbox"
              title="Close"
            >
              <X size={20} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
