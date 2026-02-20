import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings" && _id == "settings"][0] {
    siteTitle,
    "logo": logo.asset->url,
    socials,
    contact {
      address,
      phone,
      email,
      workingHours,
      mapEmbed
    }
  }
`);

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url
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
      "slug": slug.current,
      "mainImage": mainImage.asset->url
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
    description,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "specs": technicalSpecs.rows[] {
      label,
      value
    }
  }
`);
