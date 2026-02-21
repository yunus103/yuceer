"use client"

import { ArrowUp } from 'lucide-react'

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button 
      className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 group"
      title="Yukarı Çık"
      onClick={scrollToTop}
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
    </button>
  )
}
