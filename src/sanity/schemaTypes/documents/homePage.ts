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
      title: "Hero Alanı (Video)",
      type: "object",
      fields: [
        defineField({
          name: "heroVideo",
          title: "Arkaplan Videosu",
          type: "file",
          options: {
            accept: "video/mp4",
          },
          description:
            "MP4 formatında, sessiz ve optimize edilmiş video (yaklaşık 2MB, 720p).",
        }),
        defineField({
          name: "heroPoster",
          title: "Video Posteri (Kapak Resmi)",
          type: "image",
          options: { hotspot: true },
          description:
            "Video yüklenene kadar gösterilecek ve LCP için kullanılacak görsel.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "heroTitle",
          title: "Ana Başlık",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "heroSubtitle",
          title: "Alt Başlık",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "heroCTA",
          title: "Buton",
          type: "object",
          fields: [
            { name: "label", title: "Buton Metni", type: "string" },
            { name: "url", title: "Buton Linki", type: "string" },
          ],
        }),
        defineField({
          name: "youtubeLink",
          title: "Tanıtım Videosu Linki (YouTube)",
          type: "url",
          description: "Örn: https://www.youtube.com/watch?v=...",
        }),
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "Hakkımızda Bölümü",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Bölüm Başlığı",
          type: "string",
          initialValue: "GÜVENİLİR KERESTE HİZMETLERİ VE KUSURSUZ İŞÇİLİK.",
        }),
        defineField({
          name: "summary",
          title: "Bölüm Özeti",
          type: "text",
          rows: 4,
          initialValue:
            "Kapsamlı hizmetlerimiz, proje planlamasından üretime, sonlandırmadan montaja kadar her aşamayı içerir. Böylece müşterilerimiz sadece tasarıma ve sonuca odaklanabilir.",
        }),
        defineField({
          name: "primaryButton",
          title: "Buton",
          type: "object",
          fields: [
            { name: "text", title: "Buton Metni", type: "string" },
            { name: "link", title: "Buton Linki", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "whyChooseUs",
      title: "Neden Biz?",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Bölüm Başlığı",
          type: "string",
          initialValue: "NEDEN YÜCEER KERESTE'Yİ TERCİH ETMELİSİNİZ?",
        }),
        defineField({
          name: "subtitle",
          title: "Alt Başlık",
          type: "string",
          initialValue: "KALİTE VE GÜVENİN ADRESİ",
        }),
        defineField({
          name: "features",
          title: "Özellikler",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Başlık" },
                {
                  name: "description",
                  type: "text",
                  title: "Açıklama",
                  rows: 2,
                },
                {
                  name: "icon",
                  type: "string",
                  title: "İkon (Lucide icon name)",
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
});
