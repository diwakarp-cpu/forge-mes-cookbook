"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Section, Text } from "@fynd-design-engineering/fynd-one-ds";
import {
  CookbookSearch,
  type CookbookSearchItem,
} from "./CookbookSearch";
import styles from "./cookbook.module.css";

type NavigationItem = {
  href: string;
  title: string;
};

type Props = {
  children: ReactNode;
  navigationItems: NavigationItem[];
  searchItems: CookbookSearchItem[];
};

export function CookbookShell({ children, navigationItems, searchItems }: Props) {
  const pathname = usePathname();
  const isCookbookHome = pathname === "/cookbooks/forge";

  return (
    <div id="cookbook-shell">
      <Section hideHeader title="Forge cookbook navigation" className={styles.bodySection}>
        <div
          className={
            isCookbookHome
              ? `${styles.pageLayout} ${styles.pageLayoutHome}`
              : styles.pageLayout
          }
        >
          <aside className={styles.sidebar}>
            <Link
              href="/cookbooks/forge"
              className={styles.sidebarBrand}
              aria-label="Forge cookbook home"
            >
              <Text variant="body-s" as="span" color="secondary">
                Setup-to-shipment guide
              </Text>
              <Text variant="body-m" as="span" weight="semibold">
                Forge MES Cookbook
              </Text>
            </Link>
            <CookbookSearch items={searchItems} variant="compact" />
            <nav aria-label="Forge cookbook sections" className={styles.sidebarNav}>
              {navigationItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={active ? styles.sidebarLinkActive : styles.sidebarLink}
                    aria-current={
                      pathname === item.href ? "page" : active ? "location" : undefined
                    }
                  >
                    <Text variant="body-s" as="span" weight={active ? "semibold" : "regular"}>
                      {item.title}
                    </Text>
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div
            className={
              isCookbookHome
                ? `${styles.shellContent} ${styles.homeShellContent}`
                : styles.shellContent
            }
          >
            {children}
          </div>
        </div>
      </Section>
    </div>
  );
}
