import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, ArrowUp, Clock } from 'lucide-react'
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

import { navLinks } from '@/lib/navigation'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

export default async function Footer() {
  const settings = await client.fetch(SETTINGS_QUERY);
  
  // Fallbacks
  const siteTitle = settings?.siteTitle || "YÜCEER KERESTE";
  const logoUrl = settings?.logo;
  const address = settings?.contact?.address || "Keresteciler Sitesi, No: 123, Ostim, Ankara, Türkiye";
  const phone = settings?.contact?.phone || "+90 312 123 45 67";
  const phone2 = settings?.contact?.phone2;
  const email = settings?.contact?.email || "info@yuceerkereste.com";
  const workingHours = settings?.contact?.workingHours || "Pazartesi - Cumartesi: 08:30 - 18:30";
  const socials = settings?.socials || [];
  const footerTitle = settings?.footerTitle || "ESTETİK YAPILAR İÇİN\nDOĞAL KERESTE";
  const footerDescription = settings?.footerDescription || "Modern üretim tesislerimizde işlenen, fırınlanmış ve dayanıklı kereste ürünleri ile projelerinize değer katıyoruz.";


  return (
    <footer className="bg-dark-bg text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
        {/* Background Pattern - subtle rings or texture can be added here if needed */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Column 1: Brand & Description (Lumbert Style: Left aligned, large text) */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
               {logoUrl ? (
                   <div className="relative h-24 w-72">
                       <Image 
                           src={logoUrl} 
                           alt={siteTitle} 
                           fill 
                           className="object-contain object-left" 
                       />
                   </div>
               ) : (
                   <h2 className="text-3xl font-bold tracking-widest text-white">{siteTitle}</h2>
               )}
            </Link>
            
            <h3 className="text-2xl md:text-3xl font-bold leading-tight text-white/90 max-w-md whitespace-pre-line">
              {footerTitle}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {footerDescription}
            </p>

            {/* Socials */}
            {socials && socials.length > 0 && (
              <div className="flex gap-4 pt-4">
                  {socials.map((social: any, idx: number) => (
                    <Link key={idx} href={social.url} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-gray-400">
                        {social.platform.toLowerCase().includes('instagram') ? <Instagram className="w-5 h-5" /> :
                         social.platform.toLowerCase().includes('facebook') ? <Facebook className="w-5 h-5" /> :
                         social.platform.toLowerCase().includes('linkedin') ? <Linkedin className="w-5 h-5" /> :
                         <Mail className="w-5 h-5" />}
                    </Link>
                  ))}
              </div>
            )}
          </div>

          {/* Spacer Column */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Column 2: Navigation (Explore) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-8">Keşfet</h4>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                  <li key={item.href}>
                      <Link href={item.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"/>
                          {item.label}
                      </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-6">İletişim</h4>
            <ul className="space-y-6">
              <li className="group">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Merkez Ofis</span>
                        <p className="text-gray-300 leading-relaxed text-xs">{address}</p>
                    </div>
                 </div>
              </li>
              <li className="group">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Phone className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Telefon</span>
                        <a href={`tel:${phone}`} className="text-gray-300 hover:text-white transition-colors block text-xs">{phone}</a>
                        {phone2 && (
                          <a href={`tel:${phone2}`} className="text-gray-300 hover:text-white transition-colors block text-xs mt-1">{phone2}</a>
                        )}
                    </div>
                 </div>
              </li>
              <li className="group">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">E-posta</span>
                        <a href={`mailto:${email}`} className="text-gray-300 hover:text-white transition-colors block text-xs">{email}</a>
                    </div>
                 </div>
              </li>
              <li className="group">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Çalışma Saatleri</span>
                        <p className="text-gray-300 leading-relaxed text-xs whitespace-pre-line">{workingHours}</p>
                    </div>
                 </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {siteTitle}. Tüm hakları saklıdır.
          </p>
          
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  )
}
