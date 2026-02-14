import { defineField, defineType } from 'sanity'
import { Hammer } from 'lucide-react'

export const service = defineType({
  name: 'service',
  title: 'Hizmetler',
  type: 'document',
  icon: Hammer,
  fields: [
    defineField({
      name: 'title',
      title: 'Hizmet Başlığı',
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
      name: 'summary',
      title: 'Özet (Ana sayfada görünür)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [{ type: 'block' }],
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
      name: 'icon',
      title: 'İkon (SVG kodu veya görsel)',
      type: 'image', // Simplifying icon as image/icon upload for now, or could use a string for icon name
      description: 'Hizmet için ikon görseli',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'seo',
    }),
  ],
})
