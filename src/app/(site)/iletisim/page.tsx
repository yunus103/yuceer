import { PageHero } from '@/components/ui/PageHero'
import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'

export default async function ContactPage() {
  const settings = await client.fetch(SETTINGS_QUERY);
  const contact = settings?.contact;
  
  const address = contact?.address || "Keresteciler Sitesi, No: 123, Ostim, Ankara, Türkiye";
  const phone = contact?.phone || "+90 312 345 67 89";
  const phone2 = contact?.phone2;
  const email = contact?.email || "info@yuceerkereste.com";
  const workingHours = contact?.workingHours || "Pazartesi - Cumartesi: 08:30 - 18:30";
  const mapEmbed = contact?.mapEmbed || "";

  // Extract src from iframe if present
  const extractSrc = (embed: string) => {
    if (!embed) return "";
    const match = embed.match(/src="([^"]+)"/);
    return match ? match[1] : embed;
  };

  const mapSrc = extractSrc(mapEmbed);

  return (
    <div className="bg-neutral-50/50 min-h-screen">
      <PageHero title="İletişim" />

      <div className="container mx-auto px-4 py-16 md:py-20">
        
        {/* Top Section: Form (Left) & Info Cards (Right) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16 md:mb-24">
           
           {/* Form Column (Left) */}
           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 border border-neutral-200/60 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-1 bg-emerald-600 rounded-full" />
                 <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Bize Ulaşın</h2>
              </div>
              
              <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">Adınız Soyadınız</label>
                       <input type="text" className="w-full px-5 py-4 bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium" placeholder="Ad Soyad" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">Telefon Numaranız</label>
                       <input type="tel" className="w-full px-5 py-4 bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium" placeholder="0555 123 45 67" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">E-posta Adresiniz</label>
                    <input type="email" className="w-full px-5 py-4 bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium" placeholder="ornek@email.com" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">Mesajınız</label>
                    <textarea className="w-full px-5 py-4 bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white h-36 resize-none transition-all text-sm font-medium" placeholder="Talebiniz veya sorunuz..." />
                 </div>
                 <div className="pt-2">
                    <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-7 text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-600/20">
                       Mesajı Gönder
                    </Button>
                 </div>
              </form>
           </div>

           {/* Contact Info Cards (Right) 2x2 Grid */}
           <div className="grid sm:grid-cols-2 gap-6 order-1 lg:order-2">
              {/* Address */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
                 <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-neutral-900">Merkez Ofis</h3>
                 <p className="text-neutral-600 text-start leading-relaxed text-sm">
                    {address}
                 </p>
              </div>

              {/* Phone */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
                 <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Phone className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-neutral-900">Telefon</h3>
                 <div className="flex flex-col gap-2">
                    <a href={`tel:${phone.toString().replace(/\s+/g, '')}`} className="text-neutral-600 hover:text-emerald-600 transition-colors font-medium">
                      {phone}
                    </a>
                    {phone2 && (
                      <a href={`tel:${phone2.toString().replace(/\s+/g, '')}`} className="text-neutral-600 hover:text-emerald-600 transition-colors font-medium">
                        {phone2}
                      </a>
                    )}
                 </div>
              </div>

              {/* Email */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
                 <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Mail className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-neutral-900">E-posta</h3>
                 <a href={`mailto:${email}`} className="text-neutral-600 hover:text-emerald-600 transition-colors font-medium break-all">
                    {email}
                 </a>
              </div>

              {/* Working Hours */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
                 <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Clock className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-neutral-900">Çalışma Saatleri</h3>
                 <p className="text-start text-neutral-600 whitespace-pre-line leading-relaxed text-sm">
                    {workingHours}
                 </p>
              </div>
           </div>
        </div>

        {/* Bottom Section: Map */}
        <div className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-neutral-200/40 border border-neutral-200/60 min-h-[500px] flex flex-col">
            <div className="flex-1 w-full rounded-[1.5rem] overflow-hidden relative bg-neutral-50">
               {mapSrc ? (
                   <iframe 
                     src={mapSrc} 
                     className="absolute inset-0 w-full h-full border-0 transition-all duration-500"
                     allowFullScreen 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade"
                   />
               ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-neutral-400 italic text-sm font-medium bg-neutral-100/50">
                       Harita verisi yapılandırılmadı.
                   </div>
               )}
            </div>
        </div>

      </div>
    </div>
  )
}
