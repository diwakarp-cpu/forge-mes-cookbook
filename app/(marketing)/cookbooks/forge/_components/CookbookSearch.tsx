"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Grid,
  RichIconCard,
  SearchBar,
  Text,
} from "@fynd-design-engineering/fynd-one-ds";
import { cookbookUi, type CookbookLang } from "@/lib/cookbooks/forge-i18n";
import { CookbookEntryIcon } from "./CookbookEntryIcon";
import styles from "./cookbook.module.css";

export type CookbookSearchItem = {
  title: string;
  excerpt: string;
  href: string;
  section: string;
};

type Props = {
  items: CookbookSearchItem[];
  variant?: "cards" | "compact";
  lang?: CookbookLang;
};

export function CookbookSearch({ items, variant = "cards", lang = "en" }: Props) {
  const t = cookbookUi(lang);
  const [query, setQuery] = useState("");
  const isCompact = variant === "compact";
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return items
      .filter((item) => `${item.title} ${item.excerpt} ${item.section}`.toLowerCase().includes(normalized))
      .slice(0, isCompact ? 8 : 12);
  }, [isCompact, items, query]);

  return (
    <div
      className={
        isCompact
          ? `${styles.searchArea} ${styles.compactSearchArea}`
          : styles.searchArea
      }
    >
      <SearchBar value={query} onChange={setQuery} placeholder={t.searchPlaceholder} />
      {query.trim() ? (
        results.length > 0 ? (
          isCompact ? (
            <ul className={styles.compactSearchResults} aria-label={t.searchResultsAria}>
              {results.map((item) => (
                <li key={item.href} className={styles.compactSearchItem}>
                  <Link
                    href={item.href}
                    className={styles.compactSearchLink}
                    onClick={() => setQuery("")}
                  >
                    <Text variant="body-s" as="span" weight="semibold">
                      {item.title}
                    </Text>
                    <Text variant="body-xs" as="span" color="secondary">
                      {item.section}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Grid columns={3} gap={20} className={styles.searchResults}>
              {results.map((item) => (
                <Link key={item.href} href={item.href} className={styles.cardLink}>
                  <RichIconCard
                    title={item.title}
                    subtext={item.excerpt || item.section}
                    icon={<CookbookEntryIcon title={item.title} />}
                    showButton={false}
                  />
                </Link>
              ))}
            </Grid>
          )
        ) : (
          <div className={isCompact ? styles.noResultsCompact : styles.noResults}>
            <Text variant="body-m" as="p" color="secondary">
              {t.noResults(query.trim())}
            </Text>
          </div>
        )
      ) : null}
    </div>
  );
}
