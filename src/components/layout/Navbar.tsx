'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/hakkimizda', label: 'Kurumsal' },
  { href: '/urunler', label: 'Ürünler' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/referanslar', label: 'Referanslar' },
  { href: '/iletisim', label: 'İletişim' },
]

const MotionDiv = motion.create('div')

interface NavbarProps {
  logo?: string
}

export default function Navbar({ logo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navbar is scrolled or we are not on the homepage (to ensure visibility on all pages)
  const showBackground = isScrolled || !isHomePage

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          showBackground ? 'bg-navbar-bg shadow-md py-2 md:py-3 border-white/5' : 'bg-transparent py-4 md:py-6 border-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 z-50 group">
             {logo ? (
                <div className="relative h-16 w-44">
                   <Image 
                      src={logo} 
                      alt="Yüceer Logo" 
                      fill 
                      className="object-contain" 
                      priority
                   />
                </div>
             ) : (
                <div className="flex flex-col items-center">
                   <div className="w-10 h-10 rounded-full border-2 border-white text-white flex items-center justify-center transition-colors">
                      <div className="w-5 h-5 transform rotate-45 bg-white" />
                   </div>
                   <span className="text-sm font-bold tracking-[0.2em] mt-1 text-white">
                     YÜCEER
                   </span>
                </div>
             )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <div key={link.href} className="flex items-center gap-2">
                   <Link
                     href={link.href}
                     className={cn(
                       "text-[11px] font-bold tracking-widest uppercase transition-colors relative group flex items-center gap-1",
                       isActive ? "text-white" : "text-white/60 hover:text-white"
                     )}
                   >
                     {link.label}
                     {/* Underline indicator for active state */}
                     {isActive && (
                       <motion.div 
                         layoutId="activeNav"
                         className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                         transition={{ type: "spring", stiffness: 380, damping: 30 }}
                       />
                     )}
                   </Link>
                </div>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-white">
             <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                Ara
             </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-white z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
               <X className="w-6 h-6" />
            ) : (
               <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />
            <MotionDiv
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-navbar-bg z-50 p-6 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex justify-end mb-8">
              </div>
              <nav className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors border-b border-white/10 pb-2",
                        isActive ? "text-primary border-primary/50" : "text-white hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
              
              <div className="mt-auto pt-10 border-t border-white/10">
                <div className="flex flex-col gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+90 555 123 45 67</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>info@yuceerkereste.com</span>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
