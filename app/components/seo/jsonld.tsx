// JSON-LD structured data — builders + render helper.
//
// Pattern:
// - Site-wide entities (Organization, WebSite) are emitted once per route
//   group — in each group's own root layout ((marketing), (editions),
//   (bespoke)) — with stable @ids. The root `app/layout.tsx` is a
//   multi-root passthrough (each group owns its own <html>/<body>), so
//   this can't live there without duplicating on every page.
// - Per-page schemas live in the page file and reference the site-wide
//   @ids via { "@id": ORG_ID } so Google consolidates entities.
// - Use buildGraph() to wrap nodes in a single @graph payload, then
//   render with <JsonLd graph={...} />. One <script> tag per page.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const ORG_ID = `${SITE_URL}#organization`;
export const SITE_ID = `${SITE_URL}#website`;

// Single source of truth for organization-level facts. Edit this when
// brand details change — every page's JSON-LD picks them up.
//
// TODO(deepak): verify each field against legal/marketing source of
// truth before launch. Marked items below are best-guess placeholders.
const BRAND = {
  name: "Fynd",
  legalName: "Shopsense Retail Technologies Limited", // TODO verify
  logoPath: "https://cdn.pixelbin.io/v2/nameless-waterfall-bf6e98/original/fynd-web/misc/fynd-logo.jpg", // TODO replace with /logo.svg once design ships a clean asset
  description:
    "Fynd builds AI-powered commerce, retail and supply chain software for modern brands.",
  foundingDate: "2012", // TODO confirm exact date — using year-only for safety
  address: {
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  // sameAs entries are public profiles Google uses to consolidate the
  // entity. Only include profiles that actually exist and are owned by
  // the organization. TODO confirm each handle.
  sameAs: [
    "https://www.linkedin.com/company/fynd",
    "https://twitter.com/Fynd",
  ],
} as const;

type LDNode = Record<string, unknown>;

function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function organizationLd(): LDNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    logo: abs(BRAND.logoPath),
    description: BRAND.description,
    foundingDate: BRAND.foundingDate,
    address: {
      "@type": "PostalAddress",
      addressLocality: BRAND.address.addressLocality,
      addressRegion: BRAND.address.addressRegion,
      addressCountry: BRAND.address.addressCountry,
    },
    sameAs: BRAND.sameAs,
  };
}

export function websiteLd(): LDNode {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    publisher: { "@id": ORG_ID },
  };
}

export function webPageLd(input: {
  path: string;
  name: string;
  description: string;
}): LDNode {
  const url = abs(input.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function serviceLd(input: {
  path: string;
  name: string;
  description: string;
  serviceType?: string;
}): LDNode {
  const url = abs(input.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    provider: { "@id": ORG_ID },
    ...(input.serviceType ? { serviceType: input.serviceType } : {}),
  };
}

// Segment → display label for auto-generated breadcrumbs. Falls back to
// title-casing the raw segment (hyphens → spaces) when not listed here.
const SEGMENT_LABELS: Record<string, string> = {
  solutions: "Solutions",
  blog: "Blog",
  "customer-stories": "Customer Stories",
  releases: "Releases",
  events: "Events",
  ebooks: "Ebooks",
  storefront: "Storefront",
  "store-os": "Store OS",
  teams: "Teams",
  partner: "Partners",
  "partner-listing": "Partners",
  partners: "Partners",
  logistics: "Logistics",
  newsroom: "Newsroom",
  "knowledge-centre": "Knowledge Centre",
  podcast: "Podcast",
  infographics: "Infographics",
  contact: "Contact",
  p: "Products",
  alternative: "Alternatives",
};

function labelForSegment(seg: string): string {
  if (SEGMENT_LABELS[seg]) return SEGMENT_LABELS[seg];
  return seg
    .split("-")
    .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function breadcrumbListLd(
  items: ReadonlyArray<{ name: string; path?: string }>,
): LDNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: abs(item.path) } : {}),
    })),
  };
}

// Convenience wrapper for the common case: derive the full trail from a
// URL path, using `leafName` (usually the page's own title) for the final
// crumb and SEGMENT_LABELS (or a title-cased fallback) for the rest.
export function breadcrumbsFromPath(path: string, leafName: string): LDNode {
  const segments = path.split("/").filter(Boolean);
  const items: Array<{ name: string; path?: string }> = [{ name: "Home", path: "/" }];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === segments.length - 1;
    items.push({
      name: isLast ? leafName : labelForSegment(seg),
      ...(isLast ? {} : { path: acc }),
    });
  });
  return breadcrumbListLd(items);
}

export function itemListLd(input: {
  path: string;
  items: ReadonlyArray<{ name: string; path: string }>;
}): LDNode {
  const url = abs(input.path);
  return {
    "@type": "ItemList",
    "@id": `${url}#itemlist`,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  };
}

export function howToLd(input: {
  path: string;
  name: string;
  description?: string;
  steps: ReadonlyArray<{ name: string; text: string }>;
}): LDNode {
  const url = abs(input.path);
  return {
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function eventLd(input: {
  path: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  image?: string;
  location?: { name: string; address?: string } | "online";
}): LDNode {
  const url = abs(input.path);
  const isOnline = input.location === "online";
  const place =
    !isOnline && input.location
      ? (input.location as { name: string; address?: string })
      : undefined;
  return {
    "@type": "Event",
    "@id": `${url}#event`,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    startDate: input.startDate,
    ...(input.endDate ? { endDate: input.endDate } : {}),
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: isOnline
      ? { "@type": "VirtualLocation", url }
      : {
          "@type": "Place",
          name: place?.name ?? "",
          ...(place?.address ? { address: place.address } : {}),
        },
    ...(input.image ? { image: input.image } : {}),
    url,
    organizer: { "@id": ORG_ID },
  };
}

export function faqPageLd(
  items: ReadonlyArray<{ question: string; answer: string }>,
  pageUrl?: string,
): LDNode {
  return {
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": `${pageUrl}#faq` } : {}),
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function buildGraph(
  ...nodes: Array<LDNode | null | undefined>
): LDNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean) as LDNode[],
  };
}

export function JsonLd({ graph }: { graph: LDNode }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
