import { defineField, defineType } from "sanity";
import { Info } from "lucide-react";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Hakkımızda Sayfası",
  type: "document",
  icon: Info,
  fields: [
    defineField({
      name: "title",
      title: "Sayfa Başlığı",
      type: "string",
      initialValue: "Hakkımızda",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero (Kapak) Resmi",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "introduction",
      title: "Giriş Metni",
      type: "text",
      rows: 4,
      description: "Sayfanın üst kısmında yer alacak kısa tanıtım yazısı.",
    }),
    defineField({
      name: "foundingYear",
      title: "Kuruluş Yılı",
      type: "number",
      validation: (rule) =>
        rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: "historyHeading",
      title: "Hikaye Bölümü Başlığı",
      type: "string",
      initialValue: "Ahşaba Duyulan Saygı ve Ustalıkla Geçen Yıllar",
      description: "Hikaye bölümünde görünecek ana başlık.",
    }),
    defineField({
      name: "historyImage",
      title: "Hikaye Bölümü Görseli",
      type: "image",
      options: { hotspot: true },
      description: "Hikaye bölümünde yan tarafta görünecek resim.",
    }),
    defineField({
      name: "historyQuote",
      title: "Hikaye Bölümü Alıntı",
      type: "string",
      initialValue: "Doğadan aldığımızı sanata dönüştürüyoruz.",
      description: "Resmin üzerinde italik olarak görünecek alıntı.",
    }),
    defineField({
      name: "history",
      title: "Tarihçe",
      type: "array",
      of: [{ type: "block" }],
      description: "Firmanın geçmişini ve gelişimini anlatan detaylı yazı.",
    }),
    defineField({
      name: "mission",
      title: "Misyonumuz",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "vision",
      title: "Vizyonumuz",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "stats",
      title: "İstatistikler & Kapasite",
      type: "object",
      fields: [
        defineField({
          name: "totalArea",
          title: "Toplam Alan (m²)",
          type: "number",
        }),
        defineField({
          name: "dailyProduction",
          title: "Günlük Üretim Kapasitesi (m³)",
          type: "number",
        }),
        defineField({
          name: "employees",
          title: "Çalışan Sayısı",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "certificates",
      title: "Sertifikalar",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "title",
              type: "string",
              title: "Sertifika Adı",
              description: "Örn: FSC, ISO 9001",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "logistics",
      title: "Lojistik & Teslimat",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Başlık",
          type: "string",
          initialValue: "Tüm Türkiye'ye Teslimat",
        }),
        defineField({
          name: "description",
          title: "Açıklama",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "image",
          title: "Lojistik Resmi",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Ayarları",
      type: "seo",
    }),
  ],
});
