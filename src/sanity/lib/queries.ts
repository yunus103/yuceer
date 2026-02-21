import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings" && _id == "settings"][0] {
    siteTitle,
    "logo": logo.asset->url,
    socials,
    contact {
      address,
      phone,
      phone2,
      email,
      workingHours,
      mapEmbed
    },
    footerTitle,
    footerDescription
  }
`);

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    title,
    shortDescription,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  {
    "home": *[_type == "homePage" && _id == "homePage"][0] {
      hero {
        "heroVideo": heroVideo.asset->url,
        "heroPoster": heroPoster.asset->url,
        heroTitle,
        heroSubtitle,
        heroCTA {
          label,
          url
        }
      },
      aboutSection,
      whyChooseUs {
        title,
        subtitle,
        features[] {
          title,
          description,
          icon
        }
      }
    },
    "about": *[_type == "aboutPage" && _id == "aboutPage"][0] {
      "historyImage": historyImage.asset->url,
      foundingYear
    },
    "products": *[_type == "product"] | order(_createdAt desc)[0...4] {
      _id,
      title,
      shortDescription,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title,
    foundingYear,
    historyHeading,
    "historyImage": historyImage.asset->url,
    history,
    mission,
    vision,
    stats[] {
      name,
      value,
      icon
    },
    logistics {
      title,
      description,
      "image": image.asset->url
    },
    "contentBackgroundImage": contentBackgroundImage.asset->url,
    seo {
      metaTitle,
      metaDescription
    }
  }
`);

export const CERTIFICATES_PAGE_QUERY = defineQuery(`
  *[_type == "certificatesPage"][0] {
    title,
    subtitle,
    certificates[] {
      title,
      description,
      "icon": icon.asset->url,
      "images": images[].asset->url
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    shortDescription,
    description,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "gallery": gallery[] {
      "url": asset->url,
      "alt": alt
    },
    "specs": technicalSpecs.rows[] {
      label,
      value
    },
    applications,
    certificates[] {
      title,
      description,
      iconType
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const RELATED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && slug.current != $slug] | order(_createdAt desc)[0...3] {
    _id,
    title,
    shortDescription,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`);
