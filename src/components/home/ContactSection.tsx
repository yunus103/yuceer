import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail } from 'lucide-react'

import ScrollAnimation from '@/components/ui/ScrollAnimation'

export default function ContactSection() {
  return (
    <section className="relative py-24 flex items-center justify-center min-h-[800px]">
       {/* Background */}
       <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed-background"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-dfd8f3793371?q=80&w=2070&auto=format&fit=crop")',
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
       </div>

       <div className="container relative z-10 px-4">
          <ScrollAnimation className="max-w-3xl mx-auto bg-muted rounded-3xl p-8 md:p-16 shadow-2xl">
             <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight uppercase">Randevu Oluştur</h2>
                <p className="text-gray-500 mt-4">Projeniz için uzman ekibimizle görüşmek üzere bilgilerinizi bırakın.</p>
             </div>

             <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Adınız</label>
                      <input type="text" className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 transition-colors placeholder:text-gray-300" placeholder="Adınız" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Soyadınız</label>
                      <input type="text" className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 transition-colors placeholder:text-gray-300" placeholder="Soyadınız" />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">E-posta Adresi</label>
                   <input type="email" className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 transition-colors placeholder:text-gray-300" placeholder="ornek@sirket.com" />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Telefon Numarası</label>
                   <input type="tel" className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 transition-colors placeholder:text-gray-300" placeholder="0555 555 55 55" />
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Hizmet Türü</label>
                   <select className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 transition-colors text-gray-700">
                      <option>İnşaatlık Kereste</option>
                      <option>Dekoratif Ahşap</option>
                      <option>Lambiri & Deck</option>
                      <option>Özel Sipariş</option>
                   </select>
                </div>

                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                   <Button size="lg" className="w-full md:w-auto rounded-full bg-accent hover:bg-accent-hover text-white px-10 py-6 text-sm font-bold tracking-widest uppercase border-none transition-all hover:scale-105">
                      Gönder
                   </Button>
                   
                   <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="font-medium">2-583-018-36-28</span>
                   </div>
                </div>
             </form>
          </ScrollAnimation>
       </div>
    </section>
  )
}
