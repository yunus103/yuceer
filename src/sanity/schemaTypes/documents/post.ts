import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export const post = defineType({
  name: "post",
  title: "Blog Yazıları",
  type: "document",
  icon: FileText,
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Kısa Özet",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("SEO için 160 karakterden uzun olmamalıdır."),
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
      name: "publishedAt",
      title: "Yayınlanma Tarihi",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Yazar",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      description:
        "Önerilen boyut: 1200x630px. Bu görsel blog listesinde ve detay sayfasında kullanılacaktır.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternatif Metin",
          description:
            "SEO ve erişilebilirlik için görseli açıklayan kısa bir metin girin.",
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "İçerik",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternatif Metin",
              description:
                "SEO ve erişilebilirlik için görseli açıklayan kısa bir metin girin.",
            }),
            defineField({
              name: "float",
              type: "string",
              title: "Hizalama (Metin İçi)",
              description:
                "Görseli yazının etrafından akıtmak için sağa veya sola hizalayabilirsiniz.",
              options: {
                list: [
                  { title: "Normal (Ortada)", value: "none" },
                  { title: "Sola Hizala", value: "left" },
                  { title: "Sağa Hizala", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "none",
            }),
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
