'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { X, ChevronLeft, ChevronRight, ZoomIn, CalendarDays, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface GalleryImage {
  _key?: string;
  url: string;
  alt?: string;
  caption?: string;
}

interface GalleryMetadata {
  title?: string;
  category?: string;
  description?: string;
  date?: string;
}

interface GridGalleryProps {
  images: GalleryImage[];
  title?: string;
  metadata?: GalleryMetadata;
  columns?: number;
  gap?: number;
}

export function GridGallery({ 
  images, 
  title, 
  metadata,
  columns = 4,
  gap = 4
}: GridGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Handle hydration issues with SSR
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
    setLoadingImage(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPreviousImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.url === selectedImage.url);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    
    setSelectedImage(images[previousIndex]);
    setLoadingImage(true);
  };

  const goToNextImage = () => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.url === selectedImage.url);
    const nextIndex = (currentIndex + 1) % images.length;
    
    setSelectedImage(images[nextIndex]);
    setLoadingImage(true);
  };
  
  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch(event.key) {
      case 'ArrowLeft':
        goToPreviousImage();
        break;
      case 'ArrowRight':
        goToNextImage();
        break;
      case 'Escape':
        closeLightbox();
        break;
      default:
        break;
    }
  };

  if (!isClient) return null;

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6',
  }[columns] || 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';

  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
  }[gap] || 'gap-4';

  return (
    <div className="w-full">
      {/* Gallery masonry grid */}
      <div className={`grid ${gridClasses} ${gapClasses}`}>
        {images.map((image, index) => (
          <div 
            key={image._key || index}
            className="group relative cursor-pointer overflow-hidden"
            onClick={() => openLightbox(image)}
          >
            <AspectRatio ratio={1 / 1}>
              <Image 
                src={image.url} 
                alt={image.alt || title || 'Gallery image'} 
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[2px]">
                <div className="rounded-full bg-white/20 p-3">
                  <ZoomIn className="text-white h-6 w-6" />
                </div>
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
      
      {/* Lightbox dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogOverlay className="bg-black/95 backdrop-blur-sm" />
        <DialogContent 
          className="max-w-7xl w-screen border-none bg-transparent shadow-none p-0"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {selectedImage?.caption || title || 'Image preview'}
          </DialogTitle>
          
          <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white bg-black/30 hover:bg-black/50 rounded-full"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            
            {/* Gallery metadata - only shown at the top in the lightbox */}
            {metadata && (
              <div className="w-full max-w-5xl px-6 py-3 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-white">
                <div>
                  <h3 className="text-lg font-semibold">{metadata.title}</h3>
                  {metadata.description && (
                    <p className="text-sm text-white/80 mt-1 max-w-xl">{metadata.description}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  {metadata.date && (
                    <div className="flex items-center text-sm text-white/80">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {format(new Date(metadata.date), "MMM d, yyyy")}
                    </div>
                  )}
                  
                  {metadata.category && (
                    <div className="flex items-center text-sm px-2 py-1 rounded-full bg-white/20">
                      <Tag className="h-3 w-3 mr-1" />
                      {metadata.category}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Navigation buttons - only shown if more than 1 image */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-40 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 h-12 w-12 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousImage();
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-40 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 h-12 w-12 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}
            
            {/* Main image */}
            {selectedImage && (
              <div className="w-full flex items-center justify-center">
                {loadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || title || 'Enlarged image'}
                  width={1400}
                  height={900}
                  className={cn(
                    "max-h-[85vh] max-w-full object-contain transition-all rounded-lg shadow-2xl",
                    loadingImage ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  )}
                  onLoad={handleImageLoad}
                />
                
                {/* Caption - only shown if available */}
                {selectedImage.caption && (
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-white/70" />
                      <p className="text-white text-sm">{selectedImage.caption}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Image counter */}
            {images.length > 1 && selectedImage && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                {images.findIndex(img => img.url === selectedImage.url) + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}