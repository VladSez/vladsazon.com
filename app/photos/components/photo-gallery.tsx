"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PHOTOS_METADATA } from "@/scripts/image-metadata";
import { Copyright } from "@/components/ui/copyright";

type Photo = (typeof PHOTOS_METADATA)[number];

interface PhotoGalleryProps {
  photos: readonly Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => handleOpenPhoto(index)}
            className="cursor-pointer group relative aspect-square overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all active:scale-99"
            aria-label={`Open ${photo.location} photo from ${photo.date}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="bg-slate-100 h-full w-full object-cover"
              loading="lazy"
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
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div
                className="relative flex items-center justify-center max-h-[85dvh] w-full "
                style={{
                  aspectRatio: `${activePhoto.width} / ${activePhoto.height}`,
                }}
              >
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  width={activePhoto.width}
                  height={activePhoto.height}
                  className="max-h-[85dvh] max-w-[90vw] w-full h-full object-contain rounded-lg"
                  style={{
                    aspectRatio: `${activePhoto.width} / ${activePhoto.height}`,
                  }}
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
                  className="group flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95 active:opacity-70"
                  aria-label="Previous photo"
                  title="Previous photo"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xs text-white/60 min-w-[50px] text-center">
                  {activeIndex + 1} / {photos.length}
                </span>
                <button
                  onClick={handleNext}
                  className="group flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95 active:opacity-70"
                  aria-label="Next photo"
                  title="Next photo"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            {/* Close button */}
            <Dialog.Close
              className="absolute top-4 right-4 flex items-center justify-center size-10 rounded-full bg-black/90 hover:bg-black/80 text-white shadow-lg transition-all active:scale-95 active:opacity-70 ring-1 ring-white/20 hover:ring-white/50 cursor-pointer"
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
