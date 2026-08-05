import "server-only";

import { cookies } from "next/headers";
import {
  COOKBOOK_LANG_COOKIE,
  DEFAULT_COOKBOOK_LANG,
  normalizeCookbookLang,
  type CookbookLang,
} from "./forge-i18n";

// Resolves the reader's chosen cookbook language from the request cookie.
// Reading cookies makes the cookbook routes render dynamically, which is what
// lets the language toggle flip the whole tree without a URL change.
export async function getCookbookLang(): Promise<CookbookLang> {
  try {
    const store = await cookies();
    return normalizeCookbookLang(store.get(COOKBOOK_LANG_COOKIE)?.value);
  } catch {
    return DEFAULT_COOKBOOK_LANG;
  }
}
