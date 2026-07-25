import type { ReactNode } from "react";
import {
  getForgeCookbookSection,
  getForgeCookbookTopLevelEntries,
  getVisibleForgeCookbookEntries,
} from "@/lib/cookbooks/forge";
import { CookbookShell } from "./_components/CookbookShell";

export default function ForgeCookbookLayout({ children }: { children: ReactNode }) {
  const navigationItems = getForgeCookbookTopLevelEntries().map((entry) => ({
    href: entry.href,
    title: entry.title,
  }));
  const searchItems = getVisibleForgeCookbookEntries()
    .filter((entry) => entry.slug.length > 0)
    .map((entry) => ({
      title: entry.title,
      excerpt:
        entry.excerpt ||
        getForgeCookbookSection(entry)?.description ||
        "Explore the Forge MES product cookbook.",
      href: entry.href,
      section: getForgeCookbookSection(entry)?.title || "Forge cookbook",
    }));

  return (
    <CookbookShell navigationItems={navigationItems} searchItems={searchItems}>
      {children}
    </CookbookShell>
  );
}
