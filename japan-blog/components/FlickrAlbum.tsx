"use client";

import React, { useState } from 'react';
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FlickrPhoto {
  id: string;
  title: string;
  url_m: string;  // Medium size
  url_l: string;  // Large size
  url_o?: string; // Original size
}

interface FlickrAlbumProps {
  albumId: string;
  title?: string;
  photos: FlickrPhoto[];
  className?: string;
}

export default function FlickrAlbum({ albumId, title = "Photo Album", photos, className = "" }: FlickrAlbumProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mt-8 ${className}`}
      >
        <Card className="border-stone-200/60 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-600" />
              {title}
              <a 
                href={`https://www.flickr.com/photos/youruser/albums/${albumId}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-auto text-stone-500 hover:text-amber-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video bg-stone-100 rounded-lg overflow-hidden">
              <motion.img
                key={currentIndex}
                src={photos[currentIndex]?.url_l || photos[currentIndex]?.url_m}
                alt={photos[currentIndex]?.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openLightbox(currentIndex)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {photos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex 
                        ? 'border-amber-500 opacity-100' 
                        : 'border-stone-200 opacity-60 hover:opacity-80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={photo.url_m}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Photo Title */}
            {photos[currentIndex]?.title && (
              <p className="text-sm text-stone-600 text-center italic">
                {photos[currentIndex].title}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={photos[currentIndex]?.url_o || photos[currentIndex]?.url_l || photos[currentIndex]?.url_m}
              alt={photos[currentIndex]?.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}