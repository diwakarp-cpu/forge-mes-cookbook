import "server-only";

import fs from "node:fs";
import path from "node:path";

const COOKBOOK_BASE_PATH = "/cookbooks/forge";
const PUBLIC_GUIDE_PATH = path.join(
  process.cwd(),
  "content",
  "cookbooks",
  "forge",
  "forge-public-guide.json",
);

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

function loadCatalog(): GuideCatalog {
  return JSON.parse(fs.readFileSync(PUBLIC_GUIDE_PATH, "utf8")) as GuideCatalog;
}

const catalog = loadCatalog();

export const FORGE_COOKBOOK_SECTIONS: ForgeCookbookSection[] = catalog.sections.map(
  ({ title, label, slug, description }) => ({
    title,
    label,
    slug,
    description,
  }),
);

function entryHref(slug: string[]): string {
  return slug.length > 0 ? `${COOKBOOK_BASE_PATH}/${slug.join("/")}` : COOKBOOK_BASE_PATH;
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

function buildDiagram(page: GuidePageSpec): string {
  const explicitNodes = page.diagram?.nodes;
  const nodes = explicitNodes?.length
    ? explicitNodes
    : page.flow.map((title, index) => ({
        title,
        description:
          page.steps[index] ||
          `This stage contributes to the outcome: ${page.summary.replace(/\.$/, "")}.`,
        relation:
          index < page.flow.length - 1
            ? "provides the information needed for"
            : undefined,
        category: page.importance,
      }));

  return JSON.stringify({
    intro:
      page.diagram?.intro ||
      "Follow the arrows from left to right. Each stage prepares the information the next stage needs.",
    nodes,
  });
}

function buildPageBody(page: GuidePageSpec): string {
  const prerequisites =
    page.prerequisites.length > 0
      ? bulletList(page.prerequisites)
      : "- No earlier cookbook topic is required.";

  return [
    "## Before you begin",
    prerequisites,
    "## How it works",
    `\`\`\`diagram\n${buildDiagram(page)}\n\`\`\``,
    `**Why this connection matters:** ${page.rules[0]}`,
    "## What to do",
    numberedList(page.steps),
    "## Rules to remember",
    bulletList(page.rules),
    "## Ready when",
    checklist(page.checklist),
  ].join("\n\n");
}

function buildSectionBody(section: GuideSectionSpec): string {
  void section;

  return [
    "## Why the order matters",
    "Each numbered topic prepares information used by the next one. Complete its readiness check before continuing.",
  ].join("\n\n");
}

function buildEntries(): ForgeCookbookEntry[] {
  const entries: ForgeCookbookEntry[] = [
    {
      id: "forge-root",
      title: catalog.title,
      slug: [],
      href: COOKBOOK_BASE_PATH,
      sourcePath: PUBLIC_GUIDE_PATH,
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
      sourcePath: PUBLIC_GUIDE_PATH,
      body: buildSectionBody(section),
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
        sourcePath: PUBLIC_GUIDE_PATH,
        body: buildPageBody(page),
        excerpt: page.summary,
        metadata: [{ label: "Requirement", value: page.importance }],
        kind: "page",
      });
    }
  }

  return entries;
}

const entries = buildEntries();
const entriesByRoute = new Map(entries.map((entry) => [entry.slug.join("/"), entry]));
const entryOrder = new Map(entries.map((entry, index) => [entry.id, index]));

export function getForgeCookbookEntries(): ForgeCookbookEntry[] {
  return entries;
}

export function isForgeCookbookEntryVisible(entry?: ForgeCookbookEntry): boolean {
  void entry;
  return true;
}

export function getVisibleForgeCookbookEntries(): ForgeCookbookEntry[] {
  return entries;
}

export function getForgeCookbookEntry(slug: string[] = []): ForgeCookbookEntry | undefined {
  return entriesByRoute.get(slug.join("/"));
}

export function getForgeCookbookChildren(entry: ForgeCookbookEntry): ForgeCookbookEntry[] {
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

export function getForgeCookbookTopLevelEntries(): ForgeCookbookEntry[] {
  return entries.filter((entry) => entry.slug.length === 1);
}

export function getForgeCookbookBreadcrumbs(entry: ForgeCookbookEntry): ForgeCookbookEntry[] {
  const breadcrumbs: ForgeCookbookEntry[] = [];
  for (let length = 0; length <= entry.slug.length; length += 1) {
    const match = entriesByRoute.get(entry.slug.slice(0, length).join("/"));
    if (match) breadcrumbs.push(match);
  }
  return breadcrumbs;
}

export function getForgeCookbookArticleNavigation(entry: ForgeCookbookEntry) {
  if (entry.slug.length !== 2) return undefined;

  const articles = entries.filter((candidate) => candidate.slug.length === 2);
  const articleIndex = articles.findIndex((candidate) => candidate.id === entry.id);
  const stage = entriesByRoute.get(entry.slug[0]);
  const stageArticles = articles.filter((candidate) => candidate.slug[0] === entry.slug[0]);
  const stageIndex = stageArticles.findIndex((candidate) => candidate.id === entry.id);

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
  if (rawHref.startsWith(COOKBOOK_BASE_PATH)) {
    const route = rawHref.slice(COOKBOOK_BASE_PATH.length).replace(/^\/|\/$/g, "");
    return entriesByRoute.has(route) ? rawHref : "#";
  }
  return "#";
}

export function getForgeCookbookSection(entry: ForgeCookbookEntry) {
  return FORGE_COOKBOOK_SECTIONS.find((section) => section.slug === entry.slug[0]);
}
