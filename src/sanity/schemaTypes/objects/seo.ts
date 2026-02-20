import { defineField, defineType } from "sanity";
import { Search } from "lucide-react";

export const seo = defineType({
  name: "seo",
  title: "SEO & Sosyal Medya",
  type: "object",
  icon: Search,
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Başlık",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("60 karakterden uzun başlıklar kesilebilir."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Açıklama",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("160 karakterden uzun açıklamalar kesilebilir."),
    }),
    defineField({
      name: "ogImage",
      title: "Sosyal Medya Paylaşım Görseli (OG Image)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "keywords",
      title: "Anahtar Kelimeler",
      type: "string",
      description: "Virgülle ayırarak giriniz (örn: kereste, ahşap, çatılık).",
    }),
  ],
});
