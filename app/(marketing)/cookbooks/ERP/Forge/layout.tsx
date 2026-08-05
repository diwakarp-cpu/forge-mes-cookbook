import type { ReactNode } from "react";
import {
  getForgeCookbookChildren,
  getForgeCookbookSection,
  getForgeCookbookTopLevelEntries,
  getVisibleForgeCookbookEntries,
} from "@/lib/cookbooks/forge";
import { getCookbookLang } from "@/lib/cookbooks/forge-locale";
import { cookbookUi } from "@/lib/cookbooks/forge-i18n";
import { CookbookShell } from "../../forge/_components/CookbookShell";

export default async function ForgeCookbookLayout({ children }: { children: ReactNode }) {
  const lang = await getCookbookLang();
  const t = cookbookUi(lang);
  const navigationItems = getForgeCookbookTopLevelEntries(lang).map((entry) => ({
    href: entry.href,
    title: entry.title,
    children: getForgeCookbookChildren(entry, lang).map((child) => ({
      href: child.href,
      title: child.title,
    })),
  }));
  const searchItems = getVisibleForgeCookbookEntries(lang)
    .filter((entry) => entry.slug.length > 0)
    .map((entry) => ({
      title: entry.title,
      excerpt:
        entry.excerpt ||
        getForgeCookbookSection(entry, lang)?.description ||
        t.entryFallbackDesc,
      href: entry.href,
      section: getForgeCookbookSection(entry, lang)?.title || t.brandTitle,
    }));

  return (
    <CookbookShell navigationItems={navigationItems} searchItems={searchItems} lang={lang}>
      {children}
    </CookbookShell>
  );
}
