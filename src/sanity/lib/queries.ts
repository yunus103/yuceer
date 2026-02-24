import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings" && _id == "settings"][0] {
    siteTitle,
    "logo": logo.asset->url,
    "favicon": favicon.asset->url,
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
  *[_type == "product"] | order(coalesce(order, 999) asc, _createdAt desc) {
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
        },
        youtubeLink
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
    "products": *[_type == "product"] | order(coalesce(order, 999) asc, _createdAt desc)[0...6] {
      _id,
      title,
      shortDescription,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      "mainImageAlt": mainImage.alt
    },
    "posts": *[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      publishedAt,
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
    material,
    category,
    productionType,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "mainImageDisableObjectBottom": mainImage.disableObjectBottom,
    "gallery": gallery[] {
      "url": asset->url,
      "alt": alt,
      disableObjectBottom
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
  *[_type == "product" && slug.current != $slug] | order(coalesce(order, 999) asc, _createdAt desc)[0...3] {
    _id,
    title,
    shortDescription,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`);

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    publishedAt,
    author,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    content[] {
      ...,
      _type == "image" => {
        "url": asset->url,
        alt,
        float
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      "ogImage": ogImage.asset->url
    }
  }
`);
