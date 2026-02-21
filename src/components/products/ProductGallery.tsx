'use client'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'

interface ProductImage {
  url: string
  alt?: string
}

interface ProductGalleryProps {
  images: ProductImage[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const validImages = images.filter(img => img.url)
  const [selectedImage, setSelectedImage] = useState<ProductImage>(validImages[0] || { url: '', alt: '' })
  const [imageError, setImageError] = useState(false)

  if (validImages.length === 0) {
    return (
      <div className="h-[400px] bg-neutral-50 flex flex-col items-center justify-center text-neutral-300 border border-neutral-100">
        <Package className="w-16 h-16 mb-4 opacity-50" />
        <span className="text-sm font-medium">Resim bulunmamaktadır</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
            <Package className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-sm">Resim yüklenemedi</span>
          </div>
        ) : (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || title}
            fill
            className="object-cover transition-opacity duration-500"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 px-2">
          {validImages.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(img)
                setImageError(false)
              }}
              className={cn(
                "relative h-20 w-20 shrink-0 rounded-[1rem] overflow-hidden border-2 transition-all duration-300",
                selectedImage.url === img.url
                  ? "border-emerald-600 shadow-md scale-100"
                  : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || `${title} - Görsel ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

