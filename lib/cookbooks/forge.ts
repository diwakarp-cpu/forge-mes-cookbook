import "server-only";

import fs from "node:fs";
import path from "node:path";
import { getForgeTaskGuide } from "@/lib/cookbooks/forge-task-guides";
import {
  cookbookUi,
  DEFAULT_COOKBOOK_LANG,
  normalizeCookbookLang,
  type CookbookLang,
} from "@/lib/cookbooks/forge-i18n";
import { FORGE_COOKBOOK_BASE_PATH } from "@/lib/cookbooks/routes";

export { FORGE_COOKBOOK_BASE_PATH } from "@/lib/cookbooks/routes";
export type { CookbookLang } from "@/lib/cookbooks/forge-i18n";

const GUIDE_DIR = path.join(process.cwd(), "content", "cookbooks", "forge");
const PUBLIC_GUIDE_PATH = path.join(GUIDE_DIR, "forge-public-guide.json");
const GUIDE_PATHS: Record<CookbookLang, string> = {
  en: PUBLIC_GUIDE_PATH,
  ta: path.join(GUIDE_DIR, "forge-public-guide.ta.json"),
  te: path.join(GUIDE_DIR, "forge-public-guide.te.json"),
};

// Recorded walkthrough GIFs served from /public, keyed by page slug. Same media
// across every language; only the caption is localized. Exports preserve the
// complete source frame at 760 px wide instead of center-cropping the app bar.
type PageMedia = { url: string; width: number; height: number };
const gif = (file: string, height = 357): PageMedia => ({
  url: `/cookbook-media/forge/${file}`,
  width: 760,
  height,
});
const PAGE_MEDIA: Record<string, PageMedia> = {
  // Configure your factory
  sites: gif("forge-create-site-v3.gif"),
  lines: gif("forge-create-production-line.gif"),
  "stations-and-repair-stations": gif("forge-station-creation.gif"),
  shifts: gif("forge-create-shifts.gif", 368),
  // Define products and materials
  "projects-and-product-families": gif(
    "forge-projects-product-families.gif",
    368,
  ),
  components: gif("forge-create-components.gif", 368),
  "products-and-variants": gif("forge-create-products-variants.gif", 368),
  "bill-of-materials": gif("forge-build-bill-of-materials.gif", 368),
  "activate-bom": gif("forge-activate-bom-version.gif", 368),
  "material-tracking": gif("forge-material-tracking.gif", 368),
  // Design the production process
  "routing-basics": gif("forge-routing-basics.gif", 368),
  "create-routing": gif("forge-create-routing.gif", 368),
  "product-line-assignment": gif("forge-product-line-assignment.gif", 368),
  "starting-lines-and-capacity": gif(
    "forge-starting-lines-and-capacity.gif",
    368,
  ),
  "product-identifiers": gif("forge-product-identifiers.gif", 368),
  // Plan and launch production
  "production-order-vs-work-order": gif(
    "forge-production-order-vs-work-order.gif",
    368,
  ),
  "create-work-order": gif("forge-create-work-order.gif", 368),
  "generate-unit-serials": gif("forge-generate-unit-serials.gif", 368),
  "capacity-and-routing": gif("forge-capacity-and-routing.gif", 368),
  "pre-start-validation": gif("forge-pre-start-validation-release.gif", 385),
  "production-tasks": gif("forge-production-tasks.gif", 385),
  "operator-flow": gif("forge-operator-execution-flow.gif", 385),
  "material-consumption": gif("forge-material-consumption-production.gif", 385),
  "statuses-and-route-logs": gif("forge-statuses-route-logs.gif", 385),
  // Control quality and exceptions
  "quality-controls": gif("forge-configure-quality-controls.gif", 385),
  "inspection-to-capa": gif("forge-inspections-defects-ncr-capa.gif", 385),
  "repair-and-rework": gif("forge-repair-rework.gif", 385),
  "hold-scrap-teardown": gif("forge-hold-scrap-teardown.gif", 385),
  // Package, ship, and trace
  packaging: gif("forge-packaging-in-fynd-erp.gif", 385),
  "containers-and-labels": gif("forge-containers-labels.gif", 385),
  "shipment-verification": gif("forge-shipment-verification.gif", 385),
  "traceability-genealogy-recall": gif(
    "forge-traceability-genealogy-recall.gif",
    385,
  ),
  // Operate and improve
  dashboards: gif("forge-dashboards.gif", 385),
  "shift-operations": gif("forge-shift-operations.gif", 385),
  "tools-and-maintenance": gif("forge-tools-and-maintenance.gif", 385),
  "reports-and-audit": gif("forge-reports-and-audit.gif", 385),
};

// Conceptual and reference articles explain the system without demonstrating a
// discrete UI task, so they intentionally do not render a video placeholder.
const PAGES_WITHOUT_VIDEO = new Set([
  "forge-mes-in-plain-language",
  "manufacturing-basics",
  "how-forge-data-connects",
  "complete-setup-journey",
  "how-to-use-this-cookbook",
  "factory-model",
  "factory-readiness",
  "requirement-matrix",
  "first-production-run",
  "troubleshooting",
  "glossary",
  "capability-availability",
]);

type GuidePageSpec = {
  title: string;
  slug: string;
  summary: string;
  importance: "Required" | "Recommended" | "Conditional";
  prerequisites: string[];
  flow: string[];
  steps: string[];
  rules: string[];
  checklist: string[];
  diagram?: {
    intro: string;
    nodes: Array<{
      title: string;
      description: string;
      relation?: string;
      category?: string;
    }>;
  };
};

type GuideSectionSpec = {
  title: string;
  label: string;
  slug: string;
  description: string;
  pages: GuidePageSpec[];
};

type GuideCatalog = {
  title: string;
  description: string;
  sections: GuideSectionSpec[];
};

export type ForgeCookbookEntry = {
  id: string;
  notionId?: string;
  title: string;
  slug: string[];
  href: string;
  sourcePath?: string;
  body: string;
  excerpt: string;
  metadata: Array<{ label: string; value: string }>;
  kind: "page" | "collection";
};

export type ForgeCookbookSection = {
  title: string;
  label: string;
  slug: string;
  notionId?: string;
  description: string;
};

function loadCatalog(lang: CookbookLang): GuideCatalog {
  const filePath = GUIDE_PATHS[lang] ?? PUBLIC_GUIDE_PATH;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as GuideCatalog;
  } catch {
    // Missing/invalid locale file → fall back to English so the cookbook never breaks.
    return JSON.parse(
      fs.readFileSync(PUBLIC_GUIDE_PATH, "utf8"),
    ) as GuideCatalog;
  }
}

function entryHref(slug: string[]): string {
  return slug.length > 0
    ? `${FORGE_COOKBOOK_BASE_PATH}/${slug.join("/")}`
    : FORGE_COOKBOOK_BASE_PATH;
}

function bulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function numberedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function checklist(items: string[]): string {
  return items.map((item) => `- [ ] ${item}`).join("\n");
}

function buildDiagram(page: GuidePageSpec, lang: CookbookLang): string {
  const scaffold = cookbookUi(lang).scaffold;
  const importanceLabels = cookbookUi(lang).importance;
  const explicitNodes = page.diagram?.nodes;
  const nodes = explicitNodes?.length
    ? explicitNodes
    : page.flow.map((title, index) => ({
        title,
        description:
          page.steps[index] ||
          scaffold.diagramStageContributes(page.summary.replace(/\.$/, "")),
        relation:
          index < page.flow.length - 1
            ? scaffold.diagramProvidesRelation
            : undefined,
        category: importanceLabels[page.importance] ?? page.importance,
      }));

  return JSON.stringify({
    intro: page.diagram?.intro || scaffold.diagramIntroDefault,
    nodes,
  });
}

function buildPageBody(page: GuidePageSpec, lang: CookbookLang): string {
  const scaffold = cookbookUi(lang).scaffold;
  const prerequisites =
    page.prerequisites.length > 0
      ? bulletList(page.prerequisites)
      : `- ${scaffold.noPrerequisite}`;
  const taskGuide = getForgeTaskGuide(page.slug, lang);
  const actionSection = taskGuide
    ? [
        `## ${scaffold.stepByStep}`,
        `**${scaffold.navigation}** ${taskGuide.navigationPath}`,
        numberedList(taskGuide.steps),
      ]
    : [`## ${scaffold.whatToDo}`, numberedList(page.steps)];
  const media = PAGE_MEDIA[page.slug];
  const gifPlaceholder = JSON.stringify({
    title: scaffold.watchTitle(page.title),
    description: scaffold.gifDescription(page.title),
    ...(media
      ? { media: media.url, mediaWidth: media.width, mediaHeight: media.height }
      : {}),
  });
  const watchSection = PAGES_WITHOUT_VIDEO.has(page.slug)
    ? []
    : [
        `## ${scaffold.watchTask}`,
        `\`\`\`gif-placeholder\n${gifPlaceholder}\n\`\`\``,
      ];

  return [
    `## ${scaffold.beforeYouBegin}`,
    prerequisites,
    `## ${scaffold.howItWorks}`,
    `\`\`\`diagram\n${buildDiagram(page, lang)}\n\`\`\``,
    `**${scaffold.whyMatters}** ${page.rules[0]}`,
    ...actionSection,
    ...watchSection,
    `## ${scaffold.rulesToRemember}`,
    bulletList(page.rules),
    `## ${scaffold.readyWhen}`,
    checklist(page.checklist),
  ].join("\n\n");
}

function buildSectionBody(
  section: GuideSectionSpec,
  lang: CookbookLang,
): string {
  void section;
  const scaffold = cookbookUi(lang).scaffold;

  return [`## ${scaffold.sectionWhyOrder}`, scaffold.sectionWhyOrderBody].join(
    "\n\n",
  );
}

type ForgeDataset = {
  sections: ForgeCookbookSection[];
  entries: ForgeCookbookEntry[];
  entriesByRoute: Map<string, ForgeCookbookEntry>;
  entryOrder: Map<string, number>;
};

function buildDataset(lang: CookbookLang): ForgeDataset {
  const catalog = loadCatalog(lang);
  const ui = cookbookUi(lang);
  const sourcePath = GUIDE_PATHS[lang];

  const sections: ForgeCookbookSection[] = catalog.sections.map(
    ({ title, label, slug, description }) => ({
      title,
      label,
      slug,
      description,
    }),
  );

  const entries: ForgeCookbookEntry[] = [
    {
      id: "forge-root",
      title: catalog.title,
      slug: [],
      href: FORGE_COOKBOOK_BASE_PATH,
      sourcePath,
      body: "",
      excerpt: catalog.description,
      metadata: [],
      kind: "page",
    },
  ];

  for (const section of catalog.sections) {
    entries.push({
      id: `section-${section.slug}`,
      title: section.title,
      slug: [section.slug],
      href: entryHref([section.slug]),
      sourcePath,
      body: buildSectionBody(section, lang),
      excerpt: section.description,
      metadata: [],
      kind: "collection",
    });

    for (const page of section.pages) {
      const slug = [section.slug, page.slug];
      entries.push({
        id: slug.join("/"),
        title: page.title,
        slug,
        href: entryHref(slug),
        sourcePath,
        body: buildPageBody(page, lang),
        excerpt: page.summary,
        metadata: [
          {
            label: ui.requirementLabel,
            value: ui.importance[page.importance] ?? page.importance,
          },
        ],
        kind: "page",
      });
    }
  }

  return {
    sections,
    entries,
    entriesByRoute: new Map(
      entries.map((entry) => [entry.slug.join("/"), entry]),
    ),
    entryOrder: new Map(entries.map((entry, index) => [entry.id, index])),
  };
}

const datasetCache = new Map<CookbookLang, ForgeDataset>();

function getDataset(lang: CookbookLang = DEFAULT_COOKBOOK_LANG): ForgeDataset {
  const normalized = normalizeCookbookLang(lang);
  let dataset = datasetCache.get(normalized);
  if (!dataset) {
    dataset = buildDataset(normalized);
    datasetCache.set(normalized, dataset);
  }
  return dataset;
}

// Slugs are shared across languages, so route validation is language-independent.
const routeSlugs = new Set(
  getDataset(DEFAULT_COOKBOOK_LANG).entriesByRoute.keys(),
);

export function getForgeCookbookSections(
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookSection[] {
  return getDataset(lang).sections;
}

export function getForgeCookbookEntries(
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookEntry[] {
  return getDataset(lang).entries;
}

export function isForgeCookbookEntryVisible(
  entry?: ForgeCookbookEntry,
): boolean {
  void entry;
  return true;
}

export function getVisibleForgeCookbookEntries(
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookEntry[] {
  return getDataset(lang).entries;
}

export function getForgeCookbookEntry(
  slug: string[] = [],
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookEntry | undefined {
  return getDataset(lang).entriesByRoute.get(slug.join("/"));
}

export function getForgeCookbookChildren(
  entry: ForgeCookbookEntry,
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookEntry[] {
  const { entries, entryOrder } = getDataset(lang);
  return entries
    .filter(
      (candidate) =>
        candidate.slug.length === entry.slug.length + 1 &&
        entry.slug.every((segment, index) => candidate.slug[index] === segment),
    )
    .sort(
      (a, b) =>
        (entryOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER) -
        (entryOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER),
    );
}

export function getForgeCookbookTopLevelEntries(
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookEntry[] {
  return getDataset(lang).entries.filter((entry) => entry.slug.length === 1);
}

export function getForgeCookbookBreadcrumbs(
  entry: ForgeCookbookEntry,
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
): ForgeCookbookEntry[] {
  const { entriesByRoute } = getDataset(lang);
  const breadcrumbs: ForgeCookbookEntry[] = [];
  for (let length = 0; length <= entry.slug.length; length += 1) {
    const match = entriesByRoute.get(entry.slug.slice(0, length).join("/"));
    if (match) breadcrumbs.push(match);
  }
  return breadcrumbs;
}

export function getForgeCookbookArticleNavigation(
  entry: ForgeCookbookEntry,
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
) {
  if (entry.slug.length !== 2) return undefined;

  const { entries, entriesByRoute } = getDataset(lang);
  const articles = entries.filter((candidate) => candidate.slug.length === 2);
  const articleIndex = articles.findIndex(
    (candidate) => candidate.id === entry.id,
  );
  const stage = entriesByRoute.get(entry.slug[0]);
  const stageArticles = articles.filter(
    (candidate) => candidate.slug[0] === entry.slug[0],
  );
  const stageIndex = stageArticles.findIndex(
    (candidate) => candidate.id === entry.id,
  );

  if (articleIndex < 0 || stageIndex < 0 || !stage) return undefined;

  return {
    previous: articles[articleIndex - 1],
    next: articles[articleIndex + 1],
    stage,
    stagePosition: stageIndex + 1,
    stageTotal: stageArticles.length,
    journeyPosition: articleIndex + 1,
    journeyTotal: articles.length,
  };
}

export function resolveForgeCookbookHref(rawHref: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(rawHref)) return rawHref;
  if (rawHref.startsWith("#")) return rawHref;
  if (rawHref.startsWith(FORGE_COOKBOOK_BASE_PATH)) {
    const route = rawHref
      .slice(FORGE_COOKBOOK_BASE_PATH.length)
      .replace(/^\/|\/$/g, "");
    return routeSlugs.has(route) ? rawHref : "#";
  }
  return "#";
}

export function getForgeCookbookSection(
  entry: ForgeCookbookEntry,
  lang: CookbookLang = DEFAULT_COOKBOOK_LANG,
) {
  return getDataset(lang).sections.find(
    (section) => section.slug === entry.slug[0],
  );
}
