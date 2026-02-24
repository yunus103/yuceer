'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Package, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

const sanityImageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  try {
    const url = new URL(src)
    if (url.hostname === 'cdn.sanity.io') {
      url.searchParams.set('auto', 'format')
      url.searchParams.set('fit', 'max')
      url.searchParams.set('w', width.toString())
      if (quality) {
        url.searchParams.set('q', quality.toString())
      }
      return url.href
    }
  } catch (error) {
    // Ignore invalid URLs
  }
  return src
}

interface ProductImage {
  url: string
  alt?: string
  disableObjectBottom?: boolean
}

interface ProductGalleryProps {
  images: ProductImage[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const validImages = images.filter(img => img.url)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  // Embla Carousel setup
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true })
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  // Sync main gallery and thumbnails
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return
      mainApi.scrollTo(index)
    },
    [mainApi, thumbApi]
  )

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return
    setSelectedIndex(mainApi.selectedScrollSnap())
    thumbApi.scrollTo(mainApi.selectedScrollSnap())
  }, [mainApi, thumbApi, setSelectedIndex])

  useEffect(() => {
    if (!mainApi) return
    onSelect()
    mainApi.on('select', onSelect)
    mainApi.on('reInit', onSelect)
  }, [mainApi, onSelect])

  const scrollPrev = useCallback(() => mainApi && mainApi.scrollPrev(), [mainApi])
  const scrollNext = useCallback(() => mainApi && mainApi.scrollNext(), [mainApi])

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  if (validImages.length === 0) {
    return (
      <div className="h-[400px] bg-neutral-50 flex flex-col items-center justify-center text-neutral-300 border border-neutral-100 rounded-xl lg:rounded-2xl">
        <Package className="w-16 h-16 mb-4 opacity-50" />
        <span className="text-sm font-medium">Resim bulunmamaktadır</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Main Image Gallery */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden rounded-xl lg:rounded-2xl group">
        <div className="overflow-hidden w-full h-full" ref={mainRef}>
          <div className="flex w-full h-full touch-pan-y">
            {validImages.map((img, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                {imageErrors[index] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                    <Package className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-sm">Resim yüklenemedi</span>
                  </div>
                ) : (
                  <Image
                    loader={sanityImageLoader}
                    src={img.url}
                    alt={img.alt || `${title} - Resim ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      !img.disableObjectBottom ? "object-bottom" : "object-center"
                    )}
                    priority={index === 0}
                    quality={85}
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Visible on Hover/Desktop, always on Mobile if needed) */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Önceki resim"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Sonraki resim"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        {validImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium z-10 tracking-wide">
            {selectedIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails Gallery */}
      {validImages.length > 1 && (
        <div className="overflow-hidden" ref={thumbRef}>
          <div className="flex gap-2 sm:gap-3 touch-pan-x">
            {validImages.map((img, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={cn(
                  "relative flex-[0_0_20%] sm:flex-[0_0_15%] md:flex-[0_0_20%] aspect-[4/3] min-w-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300",
                  selectedIndex === index
                    ? "border-emerald-600 shadow-md scale-100 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100 hover:scale-[1.02]"
                )}
              >
                <Image
                  loader={sanityImageLoader}
                  src={img.url}
                  alt={img.alt || `${title} - Küçük Resim ${index + 1}`}
                  fill
                  sizes="120px"
                  quality={60}
                  className={cn(
                    "object-cover",
                    !img.disableObjectBottom ? "object-bottom" : "object-center"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

