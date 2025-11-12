import React, { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { ShopBannerData } from '../types';

interface ShopBannerSliderProps {
  banners: ShopBannerData[];
  interval?: number; // Auto-play interval in milliseconds
}

const ShopBannerSlider: React.FC<ShopBannerSliderProps> = ({ banners, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return; // No need for slider if 0 or 1 banner

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, interval);
    return () => clearInterval(timer);
  }, [banners.length, interval]);

  if (!banners || banners.length === 0) {
    return null; // Render nothing if no banners
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg bg-slate-200 h-48">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <ImageWithFallback 
        src={currentBanner.imageUrl} 
        alt={currentBanner.title_en || currentBanner.title_ml}
        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4 text-center">
        <h1 className="text-4xl font-bold" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.7)' }}>
          {currentBanner.title_ml}
        </h1>
        {currentBanner.title_en && (
          <p className="text-xl font-medium" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.7)' }}>
            {currentBanner.title_en}
          </p>
        )}
        <p className="mt-2 text-lg font-medium" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
          {currentBanner.tagline_ml}
        </p>
        {currentBanner.tagline_en && (
          <p className="text-base font-normal" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            {currentBanner.tagline_en}
          </p>
        )}
      </div>
      {/* Navigation dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopBannerSlider;