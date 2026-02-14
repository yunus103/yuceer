import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0] {
    siteTitle,
    "logo": logo.asset->url,
    socials,
    contact
  }
`);

export const HERO_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(_createdAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "mainImage": mainImage.asset->url
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    "icon": icon.asset->url,
    "mainImage": mainImage.asset->url
  }
`);

export const REFERENCES_QUERY = defineQuery(`
  *[_type == "companyReference"] {
    _id,
    companyName,
    "logo": logo.asset->url,
    url
  }
`);

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "woodType": woodType->title,
    "mainImage": mainImage.asset->url
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    hero {
      eyebrow,
      title,
      "backgroundImage": backgroundImage.asset->url,
      ctaButton,
      secondaryButton
    }
  }
`);

export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category"] {title, "slug": slug.current}`,
);
export const WOOD_TYPES_QUERY = defineQuery(
  `*[_type == "woodType"] {title, "slug": slug.current}`,
);
