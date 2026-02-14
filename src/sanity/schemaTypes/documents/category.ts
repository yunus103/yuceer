import { defineField, defineType } from 'sanity'
import { Tag } from 'lucide-react'

export const category = defineType({
  name: 'category',
  title: 'Kategoriler',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Kategori Adı',
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
      name: 'description',
      title: 'Açıklama',
      type: 'text',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Ayarları',
      type: 'seo',
    }),
  ],
})
