'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface Slide {
  eyebrow?: string
  title?: string
  backgroundImage?: string
  ctaButton?: {
    text: string
    link: string
  }
}

interface HeroProps {
  data?: {
    slides?: Slide[]
    secondaryButton?: {
      text: string
      link: string
    }
  } | null
}

const DEFAULT_SLIDES: Slide[] = [
  {
    backgroundImage: "https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=2068&auto=format&fit=crop",
    eyebrow: "Malzeme Özelliklerine Saygı Duyan Proje Planlaması",
    title: "MARANGOZLUK VE KERESTE HİZMETLERİ",
    ctaButton: { text: "Hemen Teklif Al", link: "/iletisim" }
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    eyebrow: "Yüksek Kaliteli Ahşap İşçiliği",
    title: "ESTETİK VE DAYANIKLI KERESTE TASARIMLAR",
    ctaButton: { text: "Ürünlerimizi İnceleyin", link: "/urunler" }
  },
  {
    backgroundImage: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2070&auto=format&fit=crop",
    eyebrow: "Modern ve Gelenekselin Buluşması",
    title: "GELECEĞİN YAŞAM ALANLARINI İNŞA EDİYORUZ",
    ctaButton: { text: "Hizmetlerimizi Görün", link: "/hizmetler" }
  }
];

export default function Hero({ data }: HeroProps) {
  const slides = (data?.slides && data.slides.length > 0) ? data.slides : DEFAULT_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume auto-play after 10 seconds of inactivity if wanted, 
    // or just leave it paused. Let's resume after 10s.
    setTimeout(() => setIsPaused(false), 10000);
  };

  const currentSlide = slides[currentIndex];
  const eyebrow = currentSlide.eyebrow || "Malzeme Özelliklerine Saygı Duyan Proje Planlaması";
  const title = currentSlide.title || "MARANGOZLUK VE KERESTE HİZMETLERİ";
  const ctaButton = currentSlide.ctaButton || { text: "Hemen Teklif Al", link: "/iletisim" };
  const secondaryButton = data?.secondaryButton ?? { text: "Tanıtım Filmini İzle", link: "#" };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-black">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.div 
               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
               initial={{ scale: 1.1 }}
               animate={{ scale: 1 }}
               transition={{ duration: 10, ease: "linear" }}
               style={{ 
                 backgroundImage: `url("${currentSlide.backgroundImage}")`,
               }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-white">
        <div className="max-w-4xl">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentIndex}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -30 }}
               transition={{ 
                 duration: 0.8, 
                 delay: 0.2, // Small delay so background starts first
                 ease: [0.22, 1, 0.36, 1] // Sharp ease out
               }}
             >
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] mb-4 text-gray-300 uppercase">
                  {eyebrow}
                </p>
                <h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]"
                  dangerouslySetInnerHTML={{ 
                    __html: (title || "").replace(/\n/g, '<br />').replace('KERESTE', '<span class="text-gray-400">KERESTE</span>') 
                  }}
                />
                
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <Link href={ctaButton.link || "/iletisim"}>
                    <Button size="lg" className="rounded-full bg-accent hover:bg-accent-hover text-white px-8 py-6 text-sm font-bold tracking-widest uppercase border-none transition-transform hover:scale-105 active:scale-95">
                      {ctaButton.text}
                    </Button>
                  </Link>
                  
                  {secondaryButton && (
                    <button className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1 group-hover:border-l-black transition-colors" />
                       </div>
                       <span className="text-sm font-bold tracking-wider uppercase group-hover:text-accent transition-colors">{secondaryButton.text}</span>
                    </button>
                  )}
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Slider Navigation Dots (Vertical as per user image) */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-10 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative flex items-center justify-center w-4 h-4 transition-all duration-300 cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Active Circle Ring - Matching the provided image logic */}
            {currentIndex === index && (
              <motion.div
                layoutId="activeSlideRing"
                className="absolute border border-white/80 rounded-full"
                style={{ width: '32px', height: '32px' }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            )}
            
            {/* Dot */}
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/30 group-hover:bg-white/60 group-hover:scale-110'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Progress Indicator (Optional but premium) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <motion.div 
          key={currentIndex + (isPaused ? '-paused' : '')}
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? "0%" : "100%" }}
          transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
        />
      </div>
    </section>
  )
}
