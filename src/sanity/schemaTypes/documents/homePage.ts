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
          name: "slides",
          title: "Slaytlar",
          type: "array",
          of: [
            {
              type: "object",
              name: "slide",
              title: "Slayt",
              fields: [
                {
                  name: "backgroundImage",
                  title: "Arkaplan Resmi",
                  type: "image",
                  options: { hotspot: true },
                },
                {
                  name: "eyebrow",
                  title: "Üst Başlık (Küçük Yazı)",
                  type: "string",
                },
                {
                  name: "title",
                  title: "Ana Başlık",
                  type: "text",
                  rows: 3,
                },
                {
                  name: "ctaButton",
                  title: "Buton",
                  type: "object",
                  fields: [
                    { name: "text", title: "Buton Metni", type: "string" },
                    { name: "link", title: "Buton Linki", type: "string" },
                  ],
                },
              ],
            },
          ],
        }),
        defineField({
          name: "secondaryButton",
          title: "İkinci Buton (Tüm Slaytlar İçin Ortak)",
          type: "object",
          fields: [
            { name: "text", title: "Buton Metni", type: "string" },
            {
              name: "link",
              title: "Buton Linki",
              type: "string",
              description: "Örnek: #",
            },
          ],
        }),
      ],
    }),
  ],
});
