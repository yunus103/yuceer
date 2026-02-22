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
      name: "order",
      title: "Sıra",
      type: "number",
      description:
        "Ana sayfa ve ürünler sayfasındaki sıralamayı belirler. (Örn: 1 en önce çıkar)",
      initialValue: 99,
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
      name: "material",
      title: "Hammadde",
      type: "string",
      description: "Örn: Kızılçam, Sedir, Karaçam",
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      description: "Örn: Endüstriyel",
    }),
    defineField({
      name: "productionType",
      title: "Üretim",
      type: "string",
      description: "Örn: Özel Ölçü",
    }),
    defineField({
      name: "technicalSpecs",
      title: "Teknik Özellikler",
      type: "technicalSpecs",
    }),
    defineField({
      name: "applications",
      title: "Kullanım Alanları",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "certificates",
      title: "Sertifikalar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Başlık (Örn: ISPM-15)", type: "string" },
            {
              name: "description",
              title: "Açıklama (Örn: Uluslararası Isıl İşlem)",
              type: "string",
            },
            {
              name: "iconType",
              title: "İkon",
              type: "string",
              options: {
                list: [
                  { title: "Ağaç", value: "TreePine" },
                  { title: "Kutu", value: "Box" },
                  { title: "Kalkan", value: "ShieldCheck" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
});
