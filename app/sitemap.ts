import type { MetadataRoute } from "next";
import { getVisibleForgeCookbookEntries } from "@/lib/cookbooks/forge";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/cookbooks", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...getVisibleForgeCookbookEntries().map((entry) => ({
      url: new URL(entry.href, siteUrl).toString(),
      changeFrequency: "monthly" as const,
      priority: entry.slug.length === 0 ? 1 : entry.slug.length === 1 ? 0.9 : 0.8,
    })),
  ];
}
