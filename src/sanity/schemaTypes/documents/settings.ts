import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const settings = defineType({
  name: "settings",
  title: "Site Ayarları",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Başlığı",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "socials",
      title: "Sosyal Medya Hesapları",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "contact",
      title: "İletişim Bilgileri",
      type: "object",
      fields: [
        { name: "address", title: "Adres", type: "text" },
        { name: "phone", title: "Telefon", type: "string" },
        { name: "email", title: "E-posta", type: "string" },
        {
          name: "workingHours",
          title: "Çalışma Saatleri",
          type: "text",
          description:
            "Örn: Pzt - Cmt: 08:30 - 18:30 (Her satırı yeni bir paragraf olarak algılar)",
        },
        { name: "mapEmbed", title: "Google Maps Embed Kodu", type: "text" },
      ],
    }),
    defineField({
      name: "seo",
      title: "Varsayılan SEO Ayarları",
      type: "seo",
    }),
  ],
});
