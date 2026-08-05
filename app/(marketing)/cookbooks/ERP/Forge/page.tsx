import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/components/seo/metadata";
import {
  FORGE_COOKBOOK_BASE_PATH,
  getForgeCookbookEntry,
} from "@/lib/cookbooks/forge";
import { getLocale } from "@/lib/get-locale";
import { getCookbookLang } from "@/lib/cookbooks/forge-locale";
import { CookbookPageView } from "../../forge/_components/CookbookPageView";

const PAGE_DESCRIPTION =
  "A visual, beginner-friendly guide to setting up Fynd ERP, launching production, and tracing finished units.";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({
    title: "Fynd ERP Product Cookbook",
    description: PAGE_DESCRIPTION,
    path: FORGE_COOKBOOK_BASE_PATH,
    locale,
  });
}

export default async function ForgeCookbookPage() {
  const lang = await getCookbookLang();
  const entry = getForgeCookbookEntry([], lang);
  if (!entry) notFound();
  return <CookbookPageView entry={entry} lang={lang} />;
}
