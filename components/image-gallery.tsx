'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { X, ChevronLeft, ChevronRight, ZoomIn, CalendarDays, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
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

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
  metadata?: GalleryMetadata;
}

export function ImageGallery({ images, title, metadata }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  
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

  return (
    <div className="w-full">
      {/* Gallery grid - Fixed to ensure 4 images per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div 
            key={image._key || index}
            className="group relative cursor-pointer aspect-square overflow-hidden rounded-md"
            onClick={() => openLightbox(image)}
          >
            {/* Image thumbnail */}
            <Image 
              src={image.url} 
              alt={image.alt || title || 'Gallery image'} 
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="text-white h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogOverlay className="bg-black/95" />
        <DialogContent 
          className="max-w-7xl w-screen border-none bg-transparent shadow-none p-0"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {selectedImage?.caption || title || 'Image preview'}
          </DialogTitle>
          
          <div className="relative w-full flex flex-col items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 text-white bg-black/30 hover:bg-black/50"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            
            {/* Gallery metadata - only shown at the top in the lightbox */}
            {metadata && (
              <div className="w-full max-w-4xl px-6 py-3 mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-white">
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
                  className="absolute left-2 z-40 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50"
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
                  className="absolute right-2 z-40 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50"
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
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || title || 'Enlarged image'}
                  width={1200}
                  height={800}
                  className={cn(
                    "max-h-[80vh] max-w-full object-contain transition-opacity",
                    loadingImage ? "opacity-0" : "opacity-100"
                  )}
                  onLoad={handleImageLoad}
                />
                
                {/* Caption - only shown if available */}
                {selectedImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
                    <p className="text-white text-center text-sm">{selectedImage.caption}</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Image counter */}
            {images.length > 1 && selectedImage && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs">
                {images.findIndex(img => img.url === selectedImage.url) + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}