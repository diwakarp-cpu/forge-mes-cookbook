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
  type ForgeCookbookEntry,
  getForgeCookbookArticleNavigation,
  getForgeCookbookBreadcrumbs,
  getForgeCookbookChildren,
  getForgeCookbookSection,
  getForgeCookbookSections,
  getForgeCookbookTopLevelEntries,
  getVisibleForgeCookbookEntries,
} from "@/lib/cookbooks/forge";
import { cookbookUi, type CookbookLang } from "@/lib/cookbooks/forge-i18n";
import { JsonLd, buildGraph, webPageLd } from "@/app/components/seo/jsonld";
import { CookbookMarkdown } from "./CookbookMarkdown";
import { CookbookEntryIcon } from "./CookbookEntryIcon";
import { CookbookSearch } from "./CookbookSearch";
import styles from "./cookbook.module.css";

type Dict = ReturnType<typeof cookbookUi>;

// Stage/blocker copy is language-driven; hrefs stay stable across languages.
const SETUP_STAGE_HREFS = [
  `${FORGE_COOKBOOK_BASE_PATH}/configure-factory`,
  `${FORGE_COOKBOOK_BASE_PATH}/define-products`,
  `${FORGE_COOKBOOK_BASE_PATH}/design-process`,
  `${FORGE_COOKBOOK_BASE_PATH}/plan-production`,
  `${FORGE_COOKBOOK_BASE_PATH}/run-production`,
  `${FORGE_COOKBOOK_BASE_PATH}/quality-exceptions`,
];

function entryDescription(entry: ForgeCookbookEntry, lang: CookbookLang, t: Dict): string {
  return (
    entry.excerpt ||
    getForgeCookbookSection(entry, lang)?.description ||
    t.entryFallbackDesc
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

function StageSequence({
  entries,
  lang,
  t,
}: {
  entries: ForgeCookbookEntry[];
  lang: CookbookLang;
  t: Dict;
}) {
  if (entries.length === 0) return null;

  return (
    <Grid columns={3} mobileColumns={1} gap={20} className={styles.stageCardGrid}>
      {entries.map((child, index) => (
        <RichIconCard
          key={child.href}
          className={styles.stageTopicCard}
          title={`${String(index + 1).padStart(2, "0")} · ${child.title}`}
          subtext={entryDescription(child, lang, t)}
          href={child.href}
          overlayLabel={`${t.stepWord} ${index + 1}: ${child.title}`}
          alwaysShowArrow
          actions={<Button label={t.openStep} href={child.href} size="md" showChevron />}
        />
      ))}
    </Grid>
  );
}

function RootPage({ lang, t }: { lang: CookbookLang; t: Dict }) {
  const topLevel = getForgeCookbookTopLevelEntries(lang);
  const sections = getForgeCookbookSections(lang);
  // English labels keep section icons consistent regardless of display language.
  const enSections = getForgeCookbookSections("en");
  const searchableItems = getVisibleForgeCookbookEntries(lang)
    .filter((candidate) => candidate.slug.length > 0)
    .map((candidate) => ({
      title: candidate.title,
      excerpt: entryDescription(candidate, lang, t),
      href: candidate.href,
      section: getForgeCookbookSection(candidate, lang)?.title || t.brandTitle,
    }));

  return (
    <>
      <div id="explore-cookbook">
        <Section title={t.browseTitle} subtext={t.browseSubtext}>
          <CookbookSearch items={searchableItems} lang={lang} />
          <Grid columns={3} gap={24} className={styles.sectionGrid}>
            {topLevel.map((sectionEntry) => {
              const section = sections.find((item) => item.slug === sectionEntry.slug[0]);
              const iconKey =
                enSections.find((item) => item.slug === sectionEntry.slug[0])?.label ||
                sectionEntry.slug[0];
              return (
                <Link key={sectionEntry.href} href={sectionEntry.href} className={styles.cardLink}>
                  <RichIconCard
                    title={section?.label || sectionEntry.title}
                    subtext={section?.description || entryDescription(sectionEntry, lang, t)}
                    icon={<CookbookEntryIcon title={iconKey} />}
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
        <Section title={t.setupTitle} subtext={t.setupSubtext}>
          <div className={styles.requirementLegend} aria-label="Requirement level legend">
            <Chip label={t.legendRequired} variant="outlined" showDot={false} />
            <Chip label={t.legendRecommended} variant="outlined" showDot={false} />
            <Chip label={t.legendConditional} variant="outlined" showDot={false} />
          </div>
          <ol className={styles.setupFlow}>
            {t.setupStages.map((stage, index) => (
              <li className={styles.setupStage} key={SETUP_STAGE_HREFS[index]}>
                <Link href={SETUP_STAGE_HREFS[index]} className={styles.setupStageLink}>
                  <Text variant="body-s" as="span" weight="semibold" color="secondary">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text variant="heading-s" as="h3">
                    {stage.title}
                  </Text>
                  <Text variant="body-s" as="p" color="secondary">
                    {stage.detail}
                  </Text>
                  <Text variant="body-s" as="span" weight="semibold">
                    {t.importance.Required}
                  </Text>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <div id="production-gates">
        <Section title={t.gatesTitle} subtext={t.gatesSubtext} bg="subtle">
          <div className={styles.blockerFlow}>
            <div className={styles.blockerStart}>
              <Text variant="body-s" as="span" weight="semibold">
                {t.gatesSetupCheck}
              </Text>
              <Text variant="heading-s" as="p">
                {t.gatesQuestion}
              </Text>
            </div>
            <div className={styles.blockerConnector} aria-hidden>
              →
            </div>
            <Grid columns={2} mobileColumns={1} gap={16} className={styles.blockerGrid}>
              {t.blockers.map((blocker) => (
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
              {t.gatesReady}
            </Text>
            <Text variant="body-m" as="p">
              {t.gatesReadyDetail}
            </Text>
          </div>
        </Section>
      </div>
    </>
  );
}

function RootHero({ t }: { t: Dict }) {
  return (
    <HeroSplit
      id="hero"
      title={t.heroTitle}
      description={t.heroDescription}
      actions={
        <div className={styles.rootHeroActions}>
          <Button
            label={t.ctaStart}
            href={`${FORGE_COOKBOOK_BASE_PATH}/start-here/forge-mes-in-plain-language`}
          />
          <Button
            label={t.ctaJourney}
            href={`${FORGE_COOKBOOK_BASE_PATH}/start-here/complete-setup-journey`}
            variant="secondary"
          />
          <Button
            label={t.ctaDownload}
            href="/api/cookbooks/forge/download"
            variant="secondary"
          />
        </div>
      }
      image={{
        src: "https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/solutions/forge/forge-hero.png",
        alt: "Fynd ERP manufacturing operations",
        width: 1272,
        height: 716,
      }}
      imagePriority
      bg="var(--fds-neutral-0)"
      visualBg="var(--fds-neutral-10)"
    />
  );
}

function DetailHeader({
  entry,
  lang,
  t,
}: {
  entry: ForgeCookbookEntry;
  lang: CookbookLang;
  t: Dict;
}) {
  const breadcrumbs = getForgeCookbookBreadcrumbs(entry, lang);
  const description = entryDescription(entry, lang, t);

  return (
    <header className={styles.detailHeader}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
        <Link href="/cookbooks">
          <Text variant="body-s" as="span" color="secondary">
            {t.breadcrumbCookbooks}
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

function DetailPage({
  entry,
  lang,
  t,
}: {
  entry: ForgeCookbookEntry;
  lang: CookbookLang;
  t: Dict;
}) {
  const children = getForgeCookbookChildren(entry, lang);
  const body = withoutIndexDuplication(entry, children.length > 0);
  const childHeading =
    entry.slug.length === 1 ? t.childHeadingStage : t.childHeadingSection;
  const articleNavigation = getForgeCookbookArticleNavigation(entry, lang);
  return (
    <div id="cookbook-body" className={styles.articleBody}>
      {children.length > 0 ? (
        <div className={styles.childrenSectionTop}>
          <Text variant="heading-m" as="h2">
            {childHeading}
          </Text>
          <StageSequence entries={children} lang={lang} t={t} />
        </div>
      ) : null}

      {body && children.length > 0 ? (
        <div className={styles.stageOverview}>
          <CookbookMarkdown content={body} lang={lang} />
        </div>
      ) : null}

      {body && children.length === 0 ? (
        <div className={children.length > 0 ? styles.supplementaryContent : undefined}>
          <CookbookMarkdown content={body} lang={lang} />
        </div>
      ) : children.length === 0 ? (
        <div className={styles.collectionIntro}>
          <Text variant="body-l" as="p" color="secondary">
            {entryDescription(entry, lang, t)}
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
                {t.navStepOf(articleNavigation.stagePosition, articleNavigation.stageTotal)}
              </Text>
            </div>
            <Text variant="body-s" as="span" color="secondary">
              {t.navTopicOf(articleNavigation.journeyPosition, articleNavigation.journeyTotal)}
            </Text>
          </div>

          <progress
            className={styles.articleProgress}
            value={articleNavigation.stagePosition}
            max={articleNavigation.stageTotal}
            aria-label={`${articleNavigation.stage.title}: ${t.navStepOf(articleNavigation.stagePosition, articleNavigation.stageTotal)}`}
          />

          <Grid columns={2} mobileColumns={1} gap={16} className={styles.articleNavigationActions}>
            <div className={styles.articleNavigationAction}>
              <Text variant="body-xs" as="span" weight="semibold" color="secondary">
                {t.navPrevious}
              </Text>
              <Text variant="body-m" as="span" weight="semibold">
                {articleNavigation.previous?.title || articleNavigation.stage.title}
              </Text>
              <Button
                label={articleNavigation.previous ? t.navPreviousTopic : t.navBackToStage}
                href={articleNavigation.previous?.href || articleNavigation.stage.href}
                variant="secondary"
                iconLeft={<span aria-hidden>←</span>}
                showChevron={false}
                aria-label={`${articleNavigation.previous ? t.navPreviousTopic : t.navBackToStage}: ${articleNavigation.previous?.title || articleNavigation.stage.title}`}
              />
            </div>

            <div
              className={`${styles.articleNavigationAction} ${styles.articleNavigationNextAction}`}
            >
              <Text variant="body-xs" as="span" weight="semibold" color="secondary">
                {articleNavigation.next ? t.navUpNext : t.navJourneyComplete}
              </Text>
              <Text variant="body-m" as="span" weight="semibold">
                {articleNavigation.next?.title || t.navReturnHome}
              </Text>
              {articleNavigation.next &&
              articleNavigation.next.slug[0] !== entry.slug[0] ? (
                <Text variant="body-xs" as="span" color="secondary">
                  {t.navNextStage} {getForgeCookbookSection(articleNavigation.next, lang)?.title}
                </Text>
              ) : null}
              <Button
                label={articleNavigation.next ? t.navNextTopic : t.navCookbookHome}
                href={articleNavigation.next?.href || FORGE_COOKBOOK_BASE_PATH}
                showChevron
                aria-label={`${articleNavigation.next ? t.navNextTopic : t.navCookbookHome}: ${articleNavigation.next?.title || t.navReturnHome}`}
              />
            </div>
          </Grid>
        </nav>
      ) : null}
    </div>
  );
}

export function CookbookPageView({
  entry,
  lang = "en",
}: {
  entry: ForgeCookbookEntry;
  lang?: CookbookLang;
}) {
  const t = cookbookUi(lang);
  const description = entryDescription(entry, lang, t);
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
        <RootHero t={t} />
        <RootPage lang={lang} t={t} />
      </main>
    );
  }

  return (
    <article className={styles.article}>
      {structuredData}
      <DetailHeader entry={entry} lang={lang} t={t} />
      <DetailPage entry={entry} lang={lang} t={t} />
    </article>
  );
}
