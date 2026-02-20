import { defineField, defineType } from "sanity";
import { Package } from "lucide-react";

export const product = defineType({
  name: "product",
  title: "Ürünler",
  type: "document",
  icon: Package,
  fields: [
    defineField({
      name: "title",
      title: "Ürün Adı",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description:
        "Ürün listelerinde ve meta açıklamalarda kullanılacak özet bilgi.",
    }),

    defineField({
      name: "mainImage",
      title: "Ana Görsel",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternatif Metin",
          description: "SEO ve erişilebilirlik için görseli açıklayan metin.",
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeri",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternatif Metin",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "technicalSpecs",
      title: "Teknik Özellikler",
      type: "technicalSpecs",
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
});
