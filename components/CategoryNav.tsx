


import React, { useRef, useState, useEffect } from 'react';
import type { Category } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrows = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      // Use a small buffer to prevent arrows from flickering at the edges
      setShowLeftArrow(isScrollable && el.scrollLeft > 1);
      setShowRightArrow(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  // Run on mount and when categories change to handle visibility and resizing
  useEffect(() => {
    const observer = new ResizeObserver(checkArrows);
    const currentEl = scrollContainerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }
    // Initial check after a short delay to ensure layout is complete
    const timeoutId = setTimeout(checkArrows, 50);
    return () => {
      clearTimeout(timeoutId);
      if (currentEl) {
        observer.unobserve(currentEl);
      }
      observer.disconnect();
    };
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <nav className="relative">
      <div 
        ref={scrollContainerRef}
        onScroll={checkArrows}
        className="flex space-x-4 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex-shrink-0 flex flex-col items-center justify-center space-y-2 w-24 h-24 p-2 rounded-2xl transition-all duration-300 transform ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white shadow-lg scale-105'
                : 'bg-white text-slate-600 hover:bg-green-100 hover:scale-105'
            }`}
          >
            <category.icon className="h-8 w-8" strokeWidth={1.5} />
            <span className="text-xs font-semibold text-center w-full px-1">{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* Arrow Buttons */}
      <button 
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-opacity duration-300
          ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
      }>
        <ChevronLeft className="w-5 h-5 text-slate-700" />
      </button>

      <button 
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-opacity duration-300
          ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
      }>
        <ChevronRight className="w-5 h-5 text-slate-700" />
      </button>
    </nav>
  );
};