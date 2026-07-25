import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = "/brand/forge-dark.png",
  type = "website",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  const socialImage = new URL(image, siteUrl).toString();

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      images: [{ url: socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}
