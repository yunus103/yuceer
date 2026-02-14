'use client'
import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] md:h-[500px] w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-4"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={cn(
                "relative h-24 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                selectedImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${title} - Görsel ${index + 1}`}
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
