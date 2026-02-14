import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const post = defineType({
  name: 'post',
  title: 'Blog Yazıları',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
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
      name: 'publishedAt',
      title: 'Yayınlanma Tarihi',
      type: 'datetime',
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'seo',
    }),
  ],
})
