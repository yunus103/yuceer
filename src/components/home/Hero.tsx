'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play, X } from 'lucide-react'

interface HeroProps {
  data?: {
    heroVideo?: string
    heroPoster?: string
    heroTitle?: string
    heroSubtitle?: string
    youtubeLink?: string
    heroCTA?: {
      label?: string
      url?: string
    }
  } | null
}

export default function Hero({ data }: HeroProps) {
  // Safe defaults
  const posterUrl = data?.heroPoster || "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2070&auto=format&fit=crop";
  const title = data?.heroTitle || "GELECEĞİN YAŞAM ALANLARINI İNŞA EDİYORUZ";
  const subtitle = data?.heroSubtitle || "Doğal ahşabın sıcaklığını ve kalitesini modern yaşam alanlarınıza taşıyoruz.";
  const youtubeLink = data?.youtubeLink;
  const ctaLabel = data?.heroCTA?.label || "Ürünlerimizi İnceleyin";
  const ctaUrl = data?.heroCTA?.url || "/urunler";

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to extract YouTube ID
  let youtubeEmbedUrl = "";
  if (youtubeLink) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeLink.match(regExp);
    if (match && match[2].length === 11) {
      youtubeEmbedUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
  }

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black flex items-center">
      {/* 
        1. Poster Image (LCP Optimization) 
        - Priority=true ensures it loads immediately.
        - Placeholder="blur" isn't strictly necessary with priority, but good for UX if using local images. For remote, we rely on priority.
        - Object-cover ensures it covers the area.
      */}
      <div className="absolute inset-0 z-0">
         <Image 
            src={posterUrl}
            alt={title}
            fill
            priority
            className="object-cover w-full h-full"
            sizes="100vw"
            quality={90}
         />
      </div>

      {/* 
        2. Video Background 
        - Plays inline, muted, loop, autoPlay.
        - Preload="none" ensures it lazily loads (browser logic).
        - Z-index needs to be higher than image but lower than overlay/content.
        - We use a simple fade-in to smoothing transition from poster to video if needed, 
          but standard method is strictly placing it on top.
      */}
      {data?.heroVideo && (
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          poster={posterUrl} // Poster atribute helps browser transition
          autoPlay
          muted
          loop
          playsInline
          preload="none" 
        >
          <source src={data.heroVideo} type="video/mp4" />
        </video>
      )}

      {/* 
        3. Overlay 
        - Darkens the background to ensure text readability.
        - Z index 1 puts it above video/image.
      */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* 
        4. Content 
        - Z index 20 puts it above overlay.
      */}
      <div className="container relative z-20 px-4 text-white">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter leading-[1.1]">
               {title}
             </h1>
             <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
               {subtitle}
             </p>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
               className="flex flex-col sm:flex-row items-center gap-4"
             >
                <Link href={ctaUrl} className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-full bg-accent hover:bg-emerald-600 text-white px-8 py-6 text-base font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 group shadow-lg">
                    {ctaLabel} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {youtubeEmbedUrl && (
                  <Button 
                    variant="outline"
                    size="lg" 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto rounded-full border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 group bg-transparent backdrop-blur-sm shadow-lg"
                  >
                    <Play className="mr-2 w-5 h-5 fill-white" /> Tanıtım Videosu
                  </Button>
                )}
             </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                src={youtubeEmbedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
