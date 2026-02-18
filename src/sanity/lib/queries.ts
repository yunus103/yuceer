import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings" && _id == "settings"][0] {
    siteTitle,
    "logo": logo.asset->url,
    socials,
    contact
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
        slides[] {
          eyebrow,
          title,
          "backgroundImage": backgroundImage.asset->url,
          ctaButton
        },
        secondaryButton
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
    certificates[] {
      "url": asset->url,
      title,
      "modalImage": modalImage.asset->url
    },
    logistics {
      title,
      description,
      "image": image.asset->url
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
