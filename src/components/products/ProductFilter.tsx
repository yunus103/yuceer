'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, Filter, X, Tag, TreePine } from 'lucide-react'

interface FilterItem {
  slug: string
  title: string
}

interface ProductFilterProps {
  categories: FilterItem[]
  woodTypes: FilterItem[]
}

export default function ProductFilter({ categories, woodTypes }: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === params.get(name)) {
        params.delete(name)
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
  const hasActiveFilters = currentCategory || currentWoodType

  const clearFilters = () => {
    router.push('/urunler', { scroll: false })
  }

  return (
    <div className="mb-6 lg:mb-0">
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all",
            hasActiveFilters
              ? "bg-primary/5 border-primary/20 shadow-sm"
              : "bg-white border-gray-200 shadow-sm"
          )}
        >
          <span className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <Filter className="w-4 h-4 text-primary" /> Filtrele
            {hasActiveFilters && (
              <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
                {(currentCategory ? 1 : 0) + (currentWoodType ? 1 : 0)}
              </span>
            )}
          </span>
          <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", isOpen ? "rotate-180" : "")} />
        </button>
      </div>

      <div className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
        isOpen ? "block" : "hidden lg:block"
      )}>
        {/* Filter Header — desktop only */}
        <div className="hidden lg:block px-5 pt-5 pb-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4 text-primary" /> Filtreler
          </h3>
        </div>

        <div className="p-4 sm:p-5 space-y-5">
          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Kategoriler
              </h4>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleFilter('category', cat.slug)}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                      currentCategory === cat.slug
                        ? "bg-primary text-white font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-muted hover:text-gray-900"
                    )}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {categories.length > 0 && woodTypes.length > 0 && (
            <div className="border-t border-gray-100" />
          )}

          {/* Wood Types */}
          {woodTypes.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <TreePine className="w-3 h-3" /> Ağaç Türleri
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {woodTypes.map((wood) => (
                  <button
                    key={wood.slug}
                    onClick={() => handleFilter('woodType', wood.slug)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      currentWoodType === wood.slug
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-muted text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    {wood.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 bg-muted/30">
            <button
              onClick={clearFilters}
              className="w-full text-xs text-gray-500 hover:text-red-600 font-medium flex items-center justify-center gap-1.5 py-1 transition-colors"
            >
              <X className="w-3 h-3" /> Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
