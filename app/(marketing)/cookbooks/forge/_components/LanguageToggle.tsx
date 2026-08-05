"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  COOKBOOK_LANG_COOKIE,
  COOKBOOK_LANGS,
  cookbookUi,
  type CookbookLang,
} from "@/lib/cookbooks/forge-i18n";
import styles from "./cookbook.module.css";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function LanguageToggle({ lang }: { lang: CookbookLang }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = cookbookUi(lang);

  function selectLang(next: CookbookLang) {
    if (next === lang) return;
    document.cookie = `${COOKBOOK_LANG_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
    // Re-render the server tree so page + nav + content switch language.
    startTransition(() => router.refresh());
  }

  return (
    <div
      className={styles.langToggle}
      role="group"
      aria-label={t.toggleGroupLabel}
      data-pending={isPending ? "true" : undefined}
    >
      {COOKBOOK_LANGS.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            className={active ? styles.langToggleOptionActive : styles.langToggleOption}
            data-lang={option}
            aria-pressed={active}
            onClick={() => selectLang(option)}
          >
            {cookbookUi(option).langName}
          </button>
        );
      })}
    </div>
  );
}
