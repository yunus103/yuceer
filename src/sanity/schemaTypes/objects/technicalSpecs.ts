import { defineArrayMember, defineField, defineType } from 'sanity'
import { Table } from 'lucide-react'

export const technicalSpecs = defineType({
  name: 'technicalSpecs',
  title: 'Teknik Özellikler Tablosu',
  type: 'object',
  icon: Table,
  fields: [
    defineField({
      name: 'rows',
      title: 'Özellik Satırları',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'row',
          title: 'Satır',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Özellik Adı (örn. Boyut, Ağırlık)',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Değer (örn. 10x10 cm, 5kg)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare({ label, value }) {
              return {
                title: `${label}: ${value}`,
              }
            },
          },
        }),
      ],
    }),
  ],
})
