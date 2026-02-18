'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  data?: {
    heroVideo?: string
    heroPoster?: string
    heroTitle?: string
    heroSubtitle?: string
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
  const ctaLabel = data?.heroCTA?.label || "Hizmetlerimizi İnceleyin";
  const ctaUrl = data?.heroCTA?.url || "/hizmetler";

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
             >
                <Link href={ctaUrl} className="inline-block">
                  <Button size="lg" className="rounded-full bg-accent hover:bg-emerald-600 text-white px-8 py-6 text-base font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 group">
                    {ctaLabel} <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
