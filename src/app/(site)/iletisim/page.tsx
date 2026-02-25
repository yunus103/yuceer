import { PageHero } from '@/components/ui/PageHero'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'
import ContactForm from '@/components/contact/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Yüceer Kereste ile iletişime geçin. Adres, telefon ve iletişim formu bilgilerimiz.',
}

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
              
              <ContactForm />
           </div>

           {/* Contact Info Cards (Right) 2x2 Grid */}
           <div className="grid sm:grid-cols-2 gap-6 order-1 lg:order-2">
              {/* Address */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-neutral-200/60 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
                 <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-neutral-900">Fabrika</h3>
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
