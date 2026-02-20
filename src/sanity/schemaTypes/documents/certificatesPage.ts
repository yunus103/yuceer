import { defineField, defineType } from "sanity";
import { FileCheck } from "lucide-react";

export const certificatesPage = defineType({
  name: "certificatesPage",
  title: "Belgelerimiz Sayfası",
  type: "document",
  icon: FileCheck,
  fields: [
    defineField({
      name: "title",
      title: "Sayfa Başlığı",
      type: "string",
      initialValue: "Belgelerimiz & Sertifikalar",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sayfa Alt Başlığı",
      type: "text",
      rows: 2,
      initialValue:
        "Üretim süreçlerimiz ve ürün kalitemiz, ulusal ve uluslararası geçerliliğe sahip sertifikalarla belgelendirilmiştir.",
    }),
    defineField({
      name: "certificates",
      title: "Sertifikalar",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Sertifika Adı",
            },
            {
              name: "description",
              type: "text",
              title: "Kısa Açıklama",
              rows: 2,
            },
            {
              name: "icon",
              type: "image",
              title: "Sertifika Logosu / İkonu",
              options: { hotspot: true },
            },
            {
              name: "images",
              type: "array",
              title: "Sertifika Görselleri",
              description:
                "Sertifikanın asıl görselleri (Birden fazla eklenebilir, modal içinde kaydırılabilir olacaktır)",
              of: [{ type: "image", options: { hotspot: true } }],
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
