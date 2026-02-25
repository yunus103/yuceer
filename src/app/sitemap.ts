import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, ALL_POSTS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yuceerkereste.com";

  // Get all products
  const products = await client.fetch(ALL_PRODUCTS_QUERY);
  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/urunler/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Get all blog posts
  const posts = await client.fetch(ALL_POSTS_QUERY);
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Static routes
  const routes = [
    "",
    "/hakkimizda",
    "/iletisim",
    "/belgelerimiz",
    "/urunler",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  return [...routes, ...productUrls, ...postUrls];
}
