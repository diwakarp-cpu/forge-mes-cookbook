import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/components/seo/metadata";
import {
  getForgeCookbookEntries,
  getForgeCookbookEntry,
  isForgeCookbookEntryVisible,
} from "@/lib/cookbooks/forge";
import { getLocale } from "@/lib/get-locale";
import { getCookbookLang } from "@/lib/cookbooks/forge-locale";
import { CookbookPageView } from "../_components/CookbookPageView";

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getForgeCookbookEntries()
    .filter((entry) => entry.slug.length > 0 && isForgeCookbookEntryVisible(entry))
    .map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getForgeCookbookEntry(slug);
  if (!entry || !isForgeCookbookEntryVisible(entry)) return {};
  const locale = await getLocale();
  return buildMetadata({
    title: `${entry.title} — Fynd ERP Product Cookbook`,
    description: entry.excerpt || `Explore ${entry.title} in the Fynd ERP Product Cookbook.`,
    path: entry.href,
    locale,
  });
}

export default async function ForgeCookbookDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getCookbookLang();
  const entry = getForgeCookbookEntry(slug, lang);
  if (!entry || !isForgeCookbookEntryVisible(entry)) notFound();
  return <CookbookPageView entry={entry} lang={lang} />;
}
