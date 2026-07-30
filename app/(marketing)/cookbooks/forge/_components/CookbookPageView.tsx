import Link from "next/link";
import {
  Button,
  Chip,
  Grid,
  HeroSplit,
  RichIconCard,
  Section,
  Text,
} from "@fynd-design-engineering/fynd-one-ds";
import {
  FORGE_COOKBOOK_BASE_PATH,
  FORGE_COOKBOOK_SECTIONS,
  type ForgeCookbookEntry,
  getForgeCookbookArticleNavigation,
  getForgeCookbookBreadcrumbs,
  getForgeCookbookChildren,
  getForgeCookbookSection,
  getForgeCookbookTopLevelEntries,
  getVisibleForgeCookbookEntries,
} from "@/lib/cookbooks/forge";
import { JsonLd, buildGraph, webPageLd } from "@/app/components/seo/jsonld";
import { CookbookMarkdown } from "./CookbookMarkdown";
import { CookbookEntryIcon } from "./CookbookEntryIcon";
import { CookbookSearch } from "./CookbookSearch";
import styles from "./cookbook.module.css";

const SETUP_STAGES = [
  {
    number: "01",
    title: "Model the factory",
    detail: "Create the Site, Lines, Stations, repair Stations, and Shifts.",
    href: `${FORGE_COOKBOOK_BASE_PATH}/configure-factory`,
  },
  {
    number: "02",
    title: "Define what you make",
    detail: "Create Components, Products, Variants, and an active BOM.",
    href: `${FORGE_COOKBOOK_BASE_PATH}/define-products`,
  },
  {
    number: "03",
    title: "Design the process",
    detail: "Build a Routing and connect the Product to an eligible starting Line.",
    href: `${FORGE_COOKBOOK_BASE_PATH}/design-process`,
  },
  {
    number: "04",
    title: "Plan production",
    detail: "Create a Work Order, confirm capacity, and generate every finished-unit serial.",
    href: `${FORGE_COOKBOOK_BASE_PATH}/plan-production`,
  },
  {
    number: "05",
    title: "Run the work",
    detail: "Release the Work Order and move its Production Tasks through the route.",
    href: `${FORGE_COOKBOOK_BASE_PATH}/run-production`,
  },
  {
    number: "06",
    title: "Verify and trace",
    detail: "Inspect, handle exceptions, package, ship, and preserve genealogy.",
    href: `${FORGE_COOKBOOK_BASE_PATH}/quality-exceptions`,
  },
];

const PRODUCTION_BLOCKERS = [
  {
    title: "No Line",
    detail: "The Product cannot be assigned to a starting Line, so production cannot be launched.",
  },
  {
    title: "No active BOM",
    detail: "The production recipe is not ready and a supported Routing cannot be prepared.",
  },
  {
    title: "No Routing or Shift",
    detail: "A Work Order is missing required process or scheduling information.",
  },
  {
    title: "No capacity or serials",
    detail: "The Work Order cannot release until a Line has room and every output unit is identified.",
  },
];

function entryDescription(entry: ForgeCookbookEntry): string {
  return (
    entry.excerpt ||
    getForgeCookbookSection(entry)?.description ||
    "Explore the Forge MES product cookbook."
  );
}

function withoutIndexDuplication(entry: ForgeCookbookEntry, hasChildren: boolean): string {
  if (!entry.body) return entry.body;

  const lines = entry.body.replace(/\r\n/g, "\n").split("\n");
  const firstContentIndex = lines.findIndex((line) => line.trim());
  if (firstContentIndex >= 0) {
    const firstContent = lines[firstContentIndex]
      .replace(/[*_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (firstContent === entry.excerpt) lines.splice(firstContentIndex, 1);
  }

  if (hasChildren && entry.slug.length === 1) {
    const repeatedHeadingIndex = lines.findIndex((line) =>
      /^##\s+(What's in this section|Implementation Pages)\s*$/i.test(line.trim()),
    );
    if (repeatedHeadingIndex >= 0) {
      const nextRuleOffset = lines
        .slice(repeatedHeadingIndex + 1)
        .findIndex((line) => /^---+$/.test(line.trim()));
      const endIndex =
        nextRuleOffset < 0 ? lines.length : repeatedHeadingIndex + 1 + nextRuleOffset + 1;
      lines.splice(repeatedHeadingIndex, endIndex - repeatedHeadingIndex);
    }
  }

  return lines
    .filter((line) => !/^\s*\[[^\]]+\]\([^)]+\)\s*$/.test(line))
    .join("\n")
    .replace(/^(\s*---+\s*)+/, "")
    .replace(/(\s*---+\s*)+$/, "")
    .trim();
}

function StageSequence({ entries }: { entries: ForgeCookbookEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <Grid columns={3} mobileColumns={1} gap={20} className={styles.stageCardGrid}>
      {entries.map((child, index) => (
        <RichIconCard
          key={child.href}
          className={styles.stageTopicCard}
          title={`${String(index + 1).padStart(2, "0")} · ${child.title}`}
          subtext={entryDescription(child)}
          icon={<CookbookEntryIcon title={child.title} />}
          href={child.href}
          overlayLabel={`Step ${index + 1}: ${child.title}`}
          alwaysShowArrow
          actions={
            <Button
              label="Open step"
              href={child.href}
              size="md"
              showChevron
            />
          }
        />
      ))}
    </Grid>
  );
}

function RootPage() {
  const topLevel = getForgeCookbookTopLevelEntries();
  const searchableItems = getVisibleForgeCookbookEntries()
    .filter((candidate) => candidate.slug.length > 0)
    .map((candidate) => ({
      title: candidate.title,
      excerpt: entryDescription(candidate),
      href: candidate.href,
      section: getForgeCookbookSection(candidate)?.title || "Forge cookbook",
    }));

  return (
    <>
      <div id="explore-cookbook">
        <Section
          title="Browse the cookbook"
          subtext="Start with a card, follow the stages in order, or use global search to jump directly to a topic."
        >
          <CookbookSearch items={searchableItems} />
          <Grid columns={3} gap={24} className={styles.sectionGrid}>
            {topLevel.map((sectionEntry) => {
              const section = FORGE_COOKBOOK_SECTIONS.find(
                (item) => item.slug === sectionEntry.slug[0],
              );
              return (
                <Link key={sectionEntry.href} href={sectionEntry.href} className={styles.cardLink}>
                  <RichIconCard
                    title={section?.label || sectionEntry.title}
                    subtext={section?.description || entryDescription(sectionEntry)}
                    icon={<CookbookEntryIcon title={section?.label || sectionEntry.title} />}
                    iconSize="icon-48"
                    showButton={false}
                  />
                </Link>
              );
            })}
          </Grid>
        </Section>
      </div>

      <div id="setup-journey">
        <Section
          title="Set up Forge in the right order"
          subtext="Follow one connected path from an empty environment to a traceable finished unit. Each stage unlocks the next."
        >
          <div className={styles.requirementLegend} aria-label="Requirement level legend">
            <Chip label="Required — blocks the core flow" variant="outlined" showDot={false} />
            <Chip
              label="Recommended — improves control"
              variant="outlined"
              showDot={false}
            />
            <Chip
              label="Conditional — use when the process needs it"
              variant="outlined"
              showDot={false}
            />
          </div>
          <ol className={styles.setupFlow}>
            {SETUP_STAGES.map((stage) => (
              <li className={styles.setupStage} key={stage.title}>
                <Link href={stage.href} className={styles.setupStageLink}>
                  <Text variant="body-s" as="span" weight="semibold" color="secondary">
                    {stage.number}
                  </Text>
                  <Text variant="heading-s" as="h3">
                    {stage.title}
                  </Text>
                  <Text variant="body-s" as="p" color="secondary">
                    {stage.detail}
                  </Text>
                  <Text variant="body-s" as="span" weight="semibold">
                    Required
                  </Text>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <div id="production-gates">
        <Section
          title="What stops production from starting?"
          subtext="Forge protects production by checking that the required factory, product, process, and unit data are connected."
          bg="subtle"
        >
          <div className={styles.blockerFlow}>
            <div className={styles.blockerStart}>
              <Text variant="body-s" as="span" weight="semibold">
                Setup check
              </Text>
              <Text variant="heading-s" as="p">
                Can this Work Order run?
              </Text>
            </div>
            <div className={styles.blockerConnector} aria-hidden>
              →
            </div>
            <Grid columns={2} mobileColumns={1} gap={16} className={styles.blockerGrid}>
              {PRODUCTION_BLOCKERS.map((blocker) => (
                <div className={styles.blockerCard} key={blocker.title}>
                  <Text variant="body-m" as="h3" weight="semibold">
                    {blocker.title}
                  </Text>
                  <Text variant="body-s" as="p" color="secondary">
                    {blocker.detail}
                  </Text>
                </div>
              ))}
            </Grid>
          </div>
          <div className={styles.blockerOutcome}>
            <Text variant="body-s" as="span" weight="semibold">
              Ready to release
            </Text>
            <Text variant="body-m" as="p">
              Active Product-Line assignment + eligible starting Line + Routing + Shift + capacity
              + exact confirmed finished-unit serial count
            </Text>
          </div>
        </Section>
      </div>
    </>
  );
}

function RootHero() {
  return (
    <HeroSplit
      id="hero"
      title="Set up and run Forge MES with confidence"
      description="A visual, self-serve guide that explains manufacturing in plain language and walks you from factory setup to a traceable finished unit."
      actions={
        <div className={styles.rootHeroActions}>
          <Button
            label="Start the guided setup"
            href={`${FORGE_COOKBOOK_BASE_PATH}/start-here/forge-mes-in-plain-language`}
          />
          <Button
            label="See the complete setup journey"
            href={`${FORGE_COOKBOOK_BASE_PATH}/start-here/complete-setup-journey`}
            variant="secondary"
          />
          <Button
            label="Download complete cookbook (PDF)"
            href="/api/cookbooks/forge/download"
            variant="secondary"
          />
        </div>
      }
      image={{
        src: "https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/solutions/forge/forge-hero.png",
        alt: "Forge MES manufacturing operations",
        width: 1272,
        height: 716,
      }}
      imagePriority
      bg="var(--fds-neutral-0)"
      visualBg="var(--fds-neutral-10)"
    />
  );
}

function DetailHeader({ entry }: { entry: ForgeCookbookEntry }) {
  const breadcrumbs = getForgeCookbookBreadcrumbs(entry);
  const description = entryDescription(entry);

  return (
    <header className={styles.detailHeader}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/cookbooks">
          <Text variant="body-s" as="span" color="secondary">
            Cookbooks
          </Text>
        </Link>
        {breadcrumbs.map((breadcrumb, index) => (
          <span className={styles.breadcrumbItem} key={breadcrumb.href}>
            <Text variant="body-s" as="span" color="secondary" aria-hidden>
              /
            </Text>
            {index === breadcrumbs.length - 1 ? (
              <Text variant="body-s" as="span" color="secondary">
                {breadcrumb.title}
              </Text>
            ) : (
              <Link href={breadcrumb.href}>
                <Text variant="body-s" as="span" color="secondary">
                  {breadcrumb.title}
                </Text>
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className={styles.heroCopy}>
        <Text variant="heading-xl" as="h1">
          {entry.title}
        </Text>
        <Text variant="body-l" as="p" color="secondary" className={styles.heroDescription}>
          {description}
        </Text>
        {entry.metadata.length > 0 ? (
          <div className={styles.metadata}>
            {entry.metadata.map((item) => (
              <Chip
                key={`${item.label}-${item.value}`}
                label={`${item.label}: ${item.value}`}
                variant="outlined"
                showDot={false}
              />
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

function DetailPage({ entry }: { entry: ForgeCookbookEntry }) {
  const children = getForgeCookbookChildren(entry);
  const body = withoutIndexDuplication(entry, children.length > 0);
  const childHeading =
    entry.slug.length === 1 ? "Follow this stage in order" : "Pages in this section";
  const articleNavigation = getForgeCookbookArticleNavigation(entry);
  return (
    <div id="cookbook-body" className={styles.articleBody}>
      {children.length > 0 ? (
        <div className={styles.childrenSectionTop}>
          <Text variant="heading-m" as="h2">
            {childHeading}
          </Text>
          <StageSequence entries={children} />
        </div>
      ) : null}

      {body && children.length > 0 ? (
        <div className={styles.stageOverview}>
          <CookbookMarkdown content={body} />
        </div>
      ) : null}

      {body && children.length === 0 ? (
        <div className={children.length > 0 ? styles.supplementaryContent : undefined}>
          <CookbookMarkdown content={body} />
        </div>
      ) : children.length === 0 ? (
        <div className={styles.collectionIntro}>
          <Text variant="body-l" as="p" color="secondary">
            {entryDescription(entry)}
          </Text>
        </div>
      ) : null}

      {articleNavigation ? (
        <nav className={styles.articleNavigation} aria-label="Continue through the cookbook">
          <div className={styles.articleNavigationHeader}>
            <div className={styles.articleNavigationCopy}>
              <Text variant="body-s" as="span" weight="semibold" color="secondary">
                {articleNavigation.stage.title}
              </Text>
              <Text variant="heading-s" as="h2">
                Step {articleNavigation.stagePosition} of {articleNavigation.stageTotal}
              </Text>
            </div>
            <Text variant="body-s" as="span" color="secondary">
              Topic {articleNavigation.journeyPosition} of {articleNavigation.journeyTotal}
            </Text>
          </div>

          <progress
            className={styles.articleProgress}
            value={articleNavigation.stagePosition}
            max={articleNavigation.stageTotal}
            aria-label={`${articleNavigation.stage.title}: step ${articleNavigation.stagePosition} of ${articleNavigation.stageTotal}`}
          />

          <Grid columns={2} mobileColumns={1} gap={16} className={styles.articleNavigationActions}>
            <div className={styles.articleNavigationAction}>
              <Text variant="body-xs" as="span" weight="semibold" color="secondary">
                Previous
              </Text>
              <Text variant="body-m" as="span" weight="semibold">
                {articleNavigation.previous?.title || articleNavigation.stage.title}
              </Text>
              <Button
                label={articleNavigation.previous ? "Previous topic" : "Back to this stage"}
                href={articleNavigation.previous?.href || articleNavigation.stage.href}
                variant="secondary"
                iconLeft={<span aria-hidden>←</span>}
                showChevron={false}
                aria-label={`${articleNavigation.previous ? "Previous topic" : "Back to this stage"}: ${articleNavigation.previous?.title || articleNavigation.stage.title}`}
              />
            </div>

            <div
              className={`${styles.articleNavigationAction} ${styles.articleNavigationNextAction}`}
            >
              <Text variant="body-xs" as="span" weight="semibold" color="secondary">
                {articleNavigation.next ? "Up next" : "Journey complete"}
              </Text>
              <Text variant="body-m" as="span" weight="semibold">
                {articleNavigation.next?.title || "Return to the cookbook home"}
              </Text>
              {articleNavigation.next &&
              articleNavigation.next.slug[0] !== entry.slug[0] ? (
                <Text variant="body-xs" as="span" color="secondary">
                  Next stage: {getForgeCookbookSection(articleNavigation.next)?.title}
                </Text>
              ) : null}
              <Button
                label={articleNavigation.next ? "Next topic" : "Cookbook home"}
                href={articleNavigation.next?.href || FORGE_COOKBOOK_BASE_PATH}
                showChevron
                aria-label={`${articleNavigation.next ? "Next topic" : "Cookbook home"}: ${articleNavigation.next?.title || "Return to the cookbook home"}`}
              />
            </div>
          </Grid>
        </nav>
      ) : null}

    </div>
  );
}

export function CookbookPageView({ entry }: { entry: ForgeCookbookEntry }) {
  const description = entryDescription(entry);
  const isRoot = entry.slug.length === 0;
  const structuredData = (
    <JsonLd
      graph={buildGraph(
        webPageLd({ path: entry.href, name: entry.title, description }),
      )}
    />
  );

  if (isRoot) {
    return (
      <main>
        {structuredData}
        <RootHero />
        <RootPage />
      </main>
    );
  }

  return (
    <article className={styles.article}>
      {structuredData}
      <DetailHeader entry={entry} />
      <DetailPage entry={entry} />
    </article>
  );
}
