import { defineField, defineType } from "sanity";
import { Home } from "lucide-react";

export const homePage = defineType({
  name: "homePage",
  title: "Anasayfa İçeriği",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "hero",
      title: "Hero Alanı",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Üst Başlık (Küçük Yazı)",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Ana Başlık",
          type: "text",
          rows: 3,
          description: "Satır atlamak için Enter tuşunu kullanabilirsiniz.",
        }),
        defineField({
          name: "backgroundImage",
          title: "Arkaplan Resmi",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "ctaButton",
          title: "Birinci Buton (CTA)",
          type: "object",
          fields: [
            { name: "text", title: "Buton Metni", type: "string" },
            {
              name: "link",
              title: "Buton Linki",
              type: "string",
              description: "Örnek: /iletisim",
            },
          ],
        }),
        defineField({
          name: "secondaryButton",
          title: "İkinci Buton",
          type: "object",
          fields: [
            { name: "text", title: "Buton Metni", type: "string" },
            {
              name: "link",
              title: "Buton Linki",
              type: "string",
              description: "Örnek: /hakkimizda",
            },
          ],
        }),
      ],
    }),
  ],
});
