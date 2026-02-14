import { defineField, defineType } from 'sanity'
import { TreePine } from 'lucide-react'

export const woodType = defineType({
  name: 'woodType',
  title: 'Ağaç Türleri',
  type: 'document',
  icon: TreePine,
  fields: [
    defineField({
      name: 'title',
      title: 'Ağaç Türü Adı (örn. Çam, Meşe)',
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
  ],
})
