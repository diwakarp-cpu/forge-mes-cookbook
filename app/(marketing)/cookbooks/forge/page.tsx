import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/app/components/seo/metadata";
import { getForgeCookbookEntry } from "@/lib/cookbooks/forge";
import { getLocale } from "@/lib/get-locale";
import { CookbookPageView } from "./_components/CookbookPageView";

const PAGE_DESCRIPTION =
  "A visual, beginner-friendly guide to setting up Forge MES, launching production, and tracing finished units.";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({
    title: "Forge MES Product Cookbook",
    description: PAGE_DESCRIPTION,
    path: "/cookbooks/forge",
    locale,
  });
}

export default function ForgeCookbookPage() {
  const entry = getForgeCookbookEntry();
  if (!entry) notFound();
  return <CookbookPageView entry={entry} />;
}
