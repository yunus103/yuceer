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
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "İstatistik Adı" },
            { name: "value", type: "string", title: "Değer" },
            { name: "icon", type: "string", title: "İkon (Lucide icon name)" },
          ],
        },
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
            },
            {
              name: "modalImage",
              type: "image",
              title: "Modal İçin Büyük Görsel",
              description: "Tıklandığında açılacak büyük sertifika görseli",
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
          initialValue: "Lojistik Ağımız",
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
