'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Lütfen adınızı ve soyadınızı giriniz.'
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
        body: JSON.stringify({ ...formData, type: 'İletişim Sayfası Formu' })
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Mesajınız başarıyla gönderildi.')
        setFormData({ name: '', phone: '', email: '', message: '' })
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
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">Adınız Soyadınız *</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-5 py-4 bg-neutral-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm font-medium ${errors.name ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-neutral-200 focus:ring-emerald-500/20 focus:border-emerald-500'}`} 
            placeholder="Ad Soyad" 
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">Telefon Numaranız *</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-5 py-4 bg-neutral-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm font-medium ${errors.phone ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-neutral-200 focus:ring-emerald-500/20 focus:border-emerald-500'}`}
            placeholder="0555 123 45 67" 
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">E-posta Adresiniz *</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-5 py-4 bg-neutral-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm font-medium ${errors.email ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-neutral-200 focus:ring-emerald-500/20 focus:border-emerald-500'}`}
          placeholder="ornek@email.com" 
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
      </div>
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1">Mesajınız *</label>
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-5 py-4 bg-neutral-50/50 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white h-36 resize-none transition-all text-sm font-medium ${errors.message ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500' : 'border-neutral-200 focus:ring-emerald-500/20 focus:border-emerald-500'}`}
          placeholder="Talebiniz veya sorunuz..." 
        />
        {errors.message && <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
      </div>

      {status !== 'idle' && status !== 'loading' && (
        <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${
          status === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message}
        </div>
      )}

      <div className="pt-2">
        <Button 
          disabled={status === 'loading'}
          size="lg" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-7 text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Gönderiliyor...
            </>
          ) : 'Mesajı Gönder'}
        </Button>
      </div>
    </form>
  )
}
