import { defineField, defineType } from 'sanity'
import { Building2 } from 'lucide-react'

export const companyReference = defineType({
  name: 'companyReference',
  title: 'Referanslar',
  type: 'document',
  icon: Building2,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Firma Adı',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Firma Logosu',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'url',
      title: 'Web Sitesi URL (Opsiyonel)',
      type: 'url',
    }),
  ],
})
