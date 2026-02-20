"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, Search, FileCheck, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface Certificate {
  title: string;
  description?: string;
  icon: string;
  images?: string[];
}

interface CertificatesGridProps {
  certificates: Certificate[];
}

export default function CertificatesGrid({ certificates }: CertificatesGridProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="group bg-neutral-50 rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center h-full"
              onClick={() => {
                  setSelectedCert(cert);
                  setSelectedIndex(0); // Reset index for new selection
              }}
            >
              {/* Icon / Logo Container */}
              <div className="relative w-32 h-32 mb-8 bg-white rounded-3xl p-6 shadow-md group-hover:shadow-lg transition-all duration-300 flex-shrink-0">
                {cert.icon ? (
                  <Image
                    src={cert.icon}
                    alt={cert.title}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileCheck className="w-12 h-12 text-emerald-600" />
                  </div>
                )}
                {/* Search Overlay */}
                <div className="absolute inset-0 bg-emerald-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Search className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-black text-neutral-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {cert.title}
              </h3>
              
              {cert.description && (
                <p className="text-neutral-600 leading-relaxed text-sm line-clamp-3">
                  {cert.description}
                </p>
              )}

              {/* View Button */}
              <div className="mt-auto pt-8">
                <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs">
                  <span>{cert.images && cert.images.length > 1 ? `${cert.images.length} Belgeyi Görüntüle` : 'Belgeyi Görüntüle'}</span>
                  <div className="w-6 h-px bg-emerald-600 transform group-hover:scale-x-150 transition-transform origin-left" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with Carousel */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[95vh] bg-white rounded-[3rem] p-4 md:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 z-[110] p-3 bg-neutral-100 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all group"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Carousel Section */}
            <div className="flex-1 relative mt-8 flex flex-col justify-center min-h-0">
                {selectedCert.images && selectedCert.images.length > 0 ? (
                    <>
                        <div className="overflow-hidden h-full" ref={emblaRef}>
                            <div className="flex h-full">
                                {selectedCert.images.map((img, i) => (
                                    <div key={i} className="flex-[0_0_100%] min-w-0 relative h-[50vh] md:h-[65vh]">
                                        <Image
                                            src={img}
                                            alt={`${selectedCert.title} - ${i + 1}`}
                                            fill
                                            className="object-contain"
                                            priority={i === 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons (Only if more than 1 image) */}
                        {selectedCert.images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-2xl shadow-lg text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all z-10 hidden md:flex"
                                    onClick={scrollPrev}
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-2xl shadow-lg text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all z-10 hidden md:flex"
                                    onClick={scrollNext}
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>

                                {/* Dots / Pagination */}
                                <div className="flex justify-center gap-2 mt-6">
                                    {selectedCert.images.map((_, i) => (
                                        <button
                                            key={i}
                                            className={cn(
                                                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                                                i === selectedIndex ? "bg-emerald-600 w-8" : "bg-neutral-200"
                                            )}
                                            onClick={() => emblaApi?.scrollTo(i)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="relative w-full h-[50vh] md:h-[65vh]">
                         <Image
                            src={selectedCert.icon}
                            alt={selectedCert.title}
                            fill
                            className="object-contain opacity-50 grayscale"
                         />
                    </div>
                )}
            </div>

            <div className="mt-8 text-center pb-4">
                <h3 className="text-2xl md:text-3xl font-black text-neutral-900 mb-2">{selectedCert.title}</h3>
                {selectedCert.images && selectedCert.images.length > 1 && (
                    <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase">
                        Görsel {selectedIndex + 1} / {selectedCert.images.length}
                    </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
