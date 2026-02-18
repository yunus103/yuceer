"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Certificate {
  title: string;
  url: string;
  modalImage?: string;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section className="container mx-auto px-4 mb-24 text-center">
      <div className="max-w-3xl mx-auto mb-16">
        <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">
          KALİTE BELGELERİMİZ
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
          Sertifikalı Üretim, Belgelenmiş Kalite
        </h2>
        <p className="text-neutral-600 text-lg leading-relaxed">
         Üretim süreçlerimiz ve ürün kalitemiz, ulusal ve uluslararası geçerliliğe sahip sertifikalarla belgelendirilmiştir.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-center">
        {certificates.map((cert, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-4 group cursor-pointer"
            onClick={() => setSelectedCert(cert)}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center p-6 bg-white rounded-full shadow-lg border-2 border-transparent group-hover:border-orange-500 transition-all duration-300 transform group-hover:-translate-y-2">
              <div className="absolute inset-0 bg-orange-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {cert.url && (
                <div className="relative w-full h-full">
                   <Image
                    src={cert.url}
                    alt={cert.title || "Sertifika"}
                    fill
                    className="object-contain relative z-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <Search className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              )}
            </div>
            <span className="text-sm font-bold text-neutral-500 group-hover:text-orange-600 transition-colors uppercase tracking-wide">
              {cert.title}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
             onClick={() => setSelectedCert(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl p-2 md:p-4 shadow-2xl overflow-hidden"
               onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/90 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
            <div className="relative w-full h-[60vh] md:h-[80vh]">
              <Image
                src={selectedCert.modalImage || selectedCert.url}
                alt={selectedCert.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h3 className="text-xl font-bold text-center">{selectedCert.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
