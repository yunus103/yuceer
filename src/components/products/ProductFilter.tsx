'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react' // Import useState
import { cn } from '@/lib/utils'
import { ChevronDown, Filter } from 'lucide-react'

// Mock categories and wood types - in real app fetch from Sanity
const categories = [
  { slug: 'insaatlik', title: 'İnşaatlık Kereste' },
  { slug: 'dekoratif', title: 'Dekoratif Ahşap' },
  { slug: 'palet', title: 'Palet Kerestesi' },
  { slug: 'osb', title: 'OSB & Kontrplak' },
  { slug: 'lambiri', title: 'Lambiri & Döşeme' },
]

const woodTypes = [
  { slug: 'cam', title: 'Çam' },
  { slug: 'ladin', title: 'Ladin' },
  { slug: 'mese', title: 'Meşe' },
  { slug: 'kayin', title: 'Kayın' },
  { slug: 'iroko', title: 'İroko' },
]

export default function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false) // State for mobile filter toggle

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === params.get(name)) {
        params.delete(name) // Toggle off if already selected
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleFilter = (type: 'category' | 'woodType', slug: string) => {
    router.push(`?${createQueryString(type, slug)}`, { scroll: false })
  }

  const currentCategory = searchParams.get('category')
  const currentWoodType = searchParams.get('woodType')

  const clearFilters = () => {
     router.push('/urunler', { scroll: false })
  }

  return (
    <div className="mb-8">
       {/* Mobile Toggle */}
       <div className="md:hidden mb-4">
          <button 
             onClick={() => setIsOpen(!isOpen)}
             className="w-full flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
             <span className="flex items-center gap-2 font-bold"><Filter className="w-4 h-4" /> Filtrele</span>
             <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen ? "rotate-180" : "")} />
          </button>
       </div>

      <div className={cn("bg-white p-6 rounded-xl shadow-sm border border-gray-100", isOpen ? "block" : "hidden md:block")}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="flex-1">
            <h3 className="font-bold mb-4 text-gray-900 border-b pb-2">Kategoriler</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleFilter('category', cat.slug)}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    currentCategory === cat.slug
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Wood Types */}
          <div className="flex-1">
            <h3 className="font-bold mb-4 text-gray-900 border-b pb-2">Ağaç Türleri</h3>
            <div className="flex flex-wrap gap-2">
              {woodTypes.map((wood) => (
                <button
                  key={wood.slug}
                  onClick={() => handleFilter('woodType', wood.slug)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm border transition-all",
                    currentWoodType === wood.slug
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                  )}
                >
                  {wood.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {(currentCategory || currentWoodType) && (
           <div className="mt-6 pt-4 border-t flex justify-end">
              <button 
                 onClick={clearFilters}
                 className="text-sm text-red-500 hover:text-red-700 font-medium underline"
              >
                 Filtreleri Temizle
              </button>
           </div>
        )}
      </div>
    </div>
  )
}
