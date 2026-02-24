'use client'

import { Button } from '@/components/ui/Button'
import ScrollAnimation from '@/components/ui/ScrollAnimation'
import { useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface ContactSectionProps {
  backgroundImage?: string
}

export default function ContactSection({ backgroundImage }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Lütfen adınızı giriniz.'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası zorunludur.'
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Lütfen geçerli uzunlukta bir telefon numarası giriniz.'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi zorunludur.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi giriniz.'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Lütfen bir mesaj yazınız.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Ana Sayfa İletişim Formu' })
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Mesajınız başarıyla gönderildi.')
        setFormData({ name: '', surname: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
        setMessage('Mesajınız gönderilemedi. Lütfen tekrar deneyin.')
      }
    } catch {
      setStatus('error')
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <section className="relative py-24 flex items-center justify-center min-h-[800px]">
       {/* Background */}
       <div className="absolute inset-0 z-0 bg-dark-bg">
          {backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed-background opacity-50"
              style={{ 
                backgroundImage: `url("${backgroundImage}")`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
       </div>

       <div className="container relative z-10 px-4">
          <ScrollAnimation className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-16 shadow-2xl">
             <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight uppercase">İletişime Geç</h2>
                <p className="text-gray-500 mt-4">Sorularınız, talepleriniz veya projeleriniz için bize ulaşın.</p>
             </div>

             <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                   <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Adınız *</label>
                       <input 
                         name="name" 
                         value={formData.name} 
                         onChange={handleChange} 
                         type="text" 
                         className={`w-full bg-transparent border-b outline-none py-2 transition-colors placeholder:text-gray-300 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`} 
                         placeholder="Adınız" 
                       />
                       {errors.name && <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Soyadınız</label>
                       <input 
                         name="surname" 
                         value={formData.surname} 
                         onChange={handleChange} 
                         type="text" 
                         className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none py-2 transition-colors placeholder:text-gray-300" 
                         placeholder="Soyadınız" 
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">E-posta Adresi *</label>
                    <input 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      type="email" 
                      className={`w-full bg-transparent border-b outline-none py-2 transition-colors placeholder:text-gray-300 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`} 
                      placeholder="ornek@sirket.com" 
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Telefon Numarası *</label>
                    <input 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      type="tel" 
                      className={`w-full bg-transparent border-b outline-none py-2 transition-colors placeholder:text-gray-300 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`} 
                      placeholder="0555 555 55 55" 
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Mesajınız *</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      className={`w-full bg-transparent border-b outline-none py-2 transition-colors placeholder:text-gray-300 min-h-[100px] resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'}`} 
                      placeholder="Mesajınızı buraya yazın..." 
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                 </div>

                 {status !== 'idle' && status !== 'loading' && (
                  <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${
                    status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message}
                  </div>
                 )}

                 <div className="pt-6">
                    <Button 
                      disabled={status === 'loading'}
                      size="lg" 
                      className="w-full rounded-full bg-accent hover:bg-accent-hover text-white px-10 py-6 text-sm font-bold tracking-widest uppercase border-none transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Gönderiliyor...
                        </>
                      ) : 'Gönder'}
                    </Button>
                 </div>
             </form>
          </ScrollAnimation>
       </div>
    </section>
  )
}
