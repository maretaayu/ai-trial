import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import classNames from 'classnames';

import { slidesData } from './data/slidesItems';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dark mode triggers if the slide object's isDark property is set to true
  const isDark = slidesData[currentSlide]?.isDark || false;

  useEffect(() => {
    document.body.style.backgroundColor = isDark ? '#111827' : '#FAFAFA';
  }, [isDark]);

  return (
    <div className={classNames(
      "w-screen h-screen relative overflow-hidden transition-colors duration-700",
      { 'bg-[#111827] text-[#F9FAFB]': isDark, 'bg-[#FAFAFA] text-gray-900': !isDark }
    )}>

      {/* Progress Bar (very thin at the top) */}
      <div className="absolute top-0 left-0 w-full h-[3px] z-50 bg-black/5">
        <div
          className={classNames(
            "h-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isDark ? "bg-white/30" : "bg-gray-900"
          )}
          style={{ width: `${((currentSlide + 1) / slidesData.length) * 100}%` }}
        />
      </div>

      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slidesData.map((slideObj, i) => (
          <div
            key={i}
            className={classNames(
              "absolute inset-0 w-full h-full flex items-center justify-center pt-8 pb-16 px-16 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
              {
                "opacity-100 z-10 translate-y-0 scale-100": currentSlide === i,
                "opacity-0 z-0 translate-y-12 scale-95 pointer-events-none delay-0": currentSlide > i,
                "opacity-0 z-0 -translate-y-12 scale-105 pointer-events-none delay-0": currentSlide < i
              }
            )}
          >
            {slideObj.component}
          </div>
        ))}
      </div>

      {/* Compact Navigation in Bottom Right Corner */}
      <div className="absolute bottom-8 right-8 z-50">
        <div className={classNames(
          "flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all duration-700",
          isDark ? "bg-white/10 border-white/10 text-zinc-300" : "bg-white border-gray-200 text-gray-800 shadow-xl shadow-gray-200/50"
        )}>
          <button
            onClick={prevSlide}
            className="hover:scale-110 hover:text-black dark:hover:text-white active:scale-95 transition-all"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-[11px] font-bold tracking-widest min-w-[2rem] text-center font-mono">
            {currentSlide + 1} <span className="opacity-50">/ {slidesData.length}</span>
          </span>

          <button
            onClick={nextSlide}
            className="hover:scale-110 hover:text-black dark:hover:text-white active:scale-95 transition-all"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
