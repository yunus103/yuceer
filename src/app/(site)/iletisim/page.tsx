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
    <div className="bg-white">
      <PageHero title="İletişim" />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
           
           {/* Info Cards Column */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl group">
                 <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-3 text-neutral-900">Merkez Ofis</h3>
                 <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-sm">
                    {address}
                 </p>
              </div>

              <div className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl group">
                 <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-3 text-neutral-900">İletişim</h3>
                 <div className="text-neutral-600 space-y-2 text-sm">
                    <a href={`tel:${phone.toString().replace(/\s+/g, '')}`} className="block hover:text-emerald-600 transition-colors font-semibold text-base">{phone}</a>
                    <a href={`mailto:${email}`} className="block hover:text-emerald-600 transition-colors">{email}</a>
                 </div>
              </div>

              <div className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 transition-all hover:bg-white hover:shadow-xl group">
                 <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Clock className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl mb-3 text-neutral-900">Çalışma Saatleri</h3>
                 <p className="text-neutral-600 whitespace-pre-line leading-relaxed text-sm">
                    {workingHours}
                 </p>
              </div>
           </div>

           {/* Form Column */}
           <div className="lg:col-span-2 space-y-12">
              <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-neutral-200/50 border border-neutral-100">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-1 bg-emerald-600 rounded-full" />
                    <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">Bize Mesaj Gönderin</h2>
                 </div>
                 
                 <form className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="space-y-3">
                       <label className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-400 ml-1">Adınız Soyadınız</label>
                       <input type="text" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white focus:border-emerald-600/30 transition-all text-sm font-medium" placeholder="Ad Soyad" />
                    </div>
                    <div className="space-y-3">
                       <label className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-400 ml-1">Telefon Numaranız</label>
                       <input type="tel" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white focus:border-emerald-600/30 transition-all text-sm font-medium" placeholder="0555 123 45 67" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-400 ml-1">E-posta Adresiniz</label>
                       <input type="email" className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white focus:border-emerald-600/30 transition-all text-sm font-medium" placeholder="ornek@email.com" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="font-bold text-[11px] uppercase tracking-[0.2em] text-neutral-400 ml-1">Mesajınız</label>
                       <textarea className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-600/5 focus:bg-white focus:border-emerald-600/30 h-44 resize-none transition-all text-sm font-medium" placeholder="Talebiniz veya sorunuz..." />
                    </div>
                    <div className="md:col-span-2 pt-4">
                       <Button size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-8 text-sm font-bold uppercase tracking-widest rounded-3xl shadow-xl shadow-emerald-900/20 transition-all hover:scale-[1.01] active:scale-100">
                          Mesajı Gönder
                       </Button>
                    </div>
                 </form>
              </div>

              {/* Map Canvas */}
              <div className="relative w-full h-[500px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-neutral-200/50 border-8 border-white">
                  {mapSrc ? (
                      <iframe 
                        src={mapSrc} 
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                  ) : (
                      <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400 italic">
                          Harita verisi yapılandırılmadı.
                      </div>
                  )}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
