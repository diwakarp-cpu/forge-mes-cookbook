import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Grid,
  RichIconCard,
  Section,
  Text,
} from "@fynd-design-engineering/fynd-one-ds";
import { buildMetadata } from "@/app/components/seo/metadata";
import { JsonLd, buildGraph, breadcrumbsFromPath, webPageLd } from "@/app/components/seo/jsonld";
import { getLocale } from "@/lib/get-locale";
import styles from "./page.module.css";

const PAGE_PATH = "/cookbooks";
const PAGE_TITLE = "Product cookbooks";
const PAGE_DESCRIPTION =
  "Explore trusted product guidance, operating procedures, implementation recipes, and troubleshooting references from Fynd.";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    locale,
  });
}

export default function CookbooksPage() {
  return (
    <main>
      <JsonLd
        graph={buildGraph(
          breadcrumbsFromPath(PAGE_PATH, PAGE_TITLE),
          webPageLd({
            path: PAGE_PATH,
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
          }),
        )}
      />

      <div id="hero">
        <Section hideHeader title="Product cookbooks hero" className={styles.hero}>
          <div className={styles.heroCopy}>
            <Text variant="heading-xl" as="h1">
              Product cookbooks
            </Text>
            <Text variant="body-l" as="p" color="secondary">
              Trusted product knowledge for configuring, operating, troubleshooting, and governing
              Fynd products.
            </Text>
          </div>
        </Section>
      </div>

      <div id="cookbook-list">
        <Section
          title="Explore cookbooks"
          subtext="Choose a product to open its complete knowledge library."
          bg="subtle"
        >
          <Grid columns={3} gap={24} className={styles.grid}>
            <Link href="/cookbooks/forge" className={styles.cardLink}>
              <RichIconCard
                title="Forge"
                subtext="Product modules, recipes, implementation guidance, and troubleshooting references for Forge MES."
                icon={
                  <Image
                    src="/brand/forge-dark.png"
                    alt="Forge"
                    width={168}
                    height={51}
                    unoptimized
                    className={styles.forgeLogo}
                  />
                }
                iconSize="logo-horizontal"
                iconBordered={false}
                showButton={false}
              />
            </Link>
          </Grid>
        </Section>
      </div>
    </main>
  );
}
