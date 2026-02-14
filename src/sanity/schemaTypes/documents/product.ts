import { defineField, defineType } from 'sanity'
import { Package } from 'lucide-react'

export const product = defineType({
  name: 'product',
  title: 'Ürünler',
  type: 'document',
  icon: Package,
  fields: [
    defineField({
      name: 'title',
      title: 'Ürün Adı',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'woodType',
      title: 'Ağaç Türü',
      type: 'reference',
      to: [{ type: 'woodType' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Teknik Özellikler',
      type: 'technicalSpecs',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'seo',
    }),
  ],
})
