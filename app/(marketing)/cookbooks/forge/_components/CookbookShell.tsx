"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Section, Text } from "@fynd-design-engineering/fynd-one-ds";
import { FORGE_COOKBOOK_BASE_PATH } from "@/lib/cookbooks/routes";
import {
  CookbookSearch,
  type CookbookSearchItem,
} from "./CookbookSearch";
import styles from "./cookbook.module.css";

type NavigationItem = {
  href: string;
  title: string;
  children: Array<{
    href: string;
    title: string;
  }>;
};

type Props = {
  children: ReactNode;
  navigationItems: NavigationItem[];
  searchItems: CookbookSearchItem[];
};

export function CookbookShell({ children, navigationItems, searchItems }: Props) {
  const pathname = usePathname();
  const isCookbookHome = pathname === FORGE_COOKBOOK_BASE_PATH;
  const activeSectionHref = navigationItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  )?.href;
  const [navigationOverride, setNavigationOverride] = useState<{
    pathname: string;
    expandedHref: string | null;
  } | null>(null);
  const expandedHref =
    navigationOverride?.pathname === pathname
      ? navigationOverride.expandedHref
      : activeSectionHref || null;

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
              href={FORGE_COOKBOOK_BASE_PATH}
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
              {navigationItems.map((item, index) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const expanded = expandedHref === item.href;
                const childListId = `cookbook-section-${index}`;

                return (
                  <div className={styles.sidebarGroup} key={item.href}>
                    <div className={styles.sidebarGroupHeader}>
                      <Link
                        href={item.href}
                        className={active ? styles.sidebarLinkActive : styles.sidebarLink}
                        aria-current={
                          pathname === item.href ? "page" : active ? "location" : undefined
                        }
                        onClick={() =>
                          setNavigationOverride({
                            pathname,
                            expandedHref: item.href,
                          })
                        }
                      >
                        <Text
                          variant="body-s"
                          as="span"
                          weight={active ? "semibold" : "regular"}
                        >
                          {item.title}
                        </Text>
                      </Link>
                      <button
                        type="button"
                        className={styles.sidebarToggle}
                        aria-expanded={expanded}
                        aria-controls={childListId}
                        onClick={() =>
                          setNavigationOverride({
                            pathname,
                            expandedHref: expanded ? null : item.href,
                          })
                        }
                      >
                        <span
                          className={
                            expanded
                              ? styles.sidebarToggleIconExpanded
                              : styles.sidebarToggleIcon
                          }
                          aria-hidden
                        >
                          ›
                        </span>
                        <span className={styles.visuallyHidden}>
                          {expanded ? "Collapse" : "Expand"} {item.title}
                        </span>
                      </button>
                    </div>
                    {expanded ? (
                      <div id={childListId} className={styles.sidebarChildren}>
                        {item.children.map((child, childIndex) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={
                                childActive
                                  ? styles.sidebarChildLinkActive
                                  : styles.sidebarChildLink
                              }
                              aria-current={childActive ? "page" : undefined}
                            >
                              <Text
                                variant="body-xs"
                                as="span"
                                weight={childActive ? "semibold" : "regular"}
                              >
                                {String(childIndex + 1).padStart(2, "0")} · {child.title}
                              </Text>
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
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
