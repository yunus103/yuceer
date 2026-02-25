import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuceerkereste.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio/"], // Assuming Sanity Studio is hosted at /studio
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
