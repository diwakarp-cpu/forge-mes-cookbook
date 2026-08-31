import type { CookbookLang } from "./forge-i18n";

export type ForgeModuleSectionSpec = {
  title: string;
  label: string;
  slug: string;
  description: string;
  pageSlugs: string[];
};

type LocalizedSectionCopy = Record<
  CookbookLang,
  { title: string; label: string; description: string }
>;

type ModuleDefinition = {
  slug: string;
  copy: LocalizedSectionCopy;
  pageSlugs: string[];
};

const modules: ModuleDefinition[] = [
  {
    slug: "start-here",
    copy: {
      en: {
        title: "Start Here",
        label: "Understand Fynd ERP",
        description:
          "Learn the factory model, setup sequence, key terms, readiness checks, and support paths before working in a module.",
      },
      ta: {
        title: "இங்கே தொடங்குங்கள்",
        label: "Fynd ERP-ஐ புரிந்துகொள்ளுங்கள்",
        description:
          "ஒரு module-இல் வேலை தொடங்குவதற்கு முன் factory model, setup வரிசை, முக்கிய சொற்கள், readiness checks, மற்றும் support வழிகளைப் புரிந்துகொள்ளுங்கள்.",
      },
      te: {
        title: "ఇక్కడ ప్రారంభించండి",
        label: "Fynd ERP-ని అర్థం చేసుకోండి",
        description:
          "ఒక module‌లో పని ప్రారంభించే ముందు factory model, setup క్రమం, ముఖ్య పదాలు, readiness checks, మరియు support మార్గాలను అర్థం చేసుకోండి.",
      },
    },
    pageSlugs: [
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
    ],
  },
  {
    slug: "production",
    copy: {
      en: {
        title: "Production",
        label: "Plan and run production",
        description:
          "Define products and materials, group demand, create Work Orders, release work, execute tasks, and monitor production.",
      },
      ta: {
        title: "உற்பத்தி",
        label: "Production-ஐ திட்டமிட்டு இயக்குங்கள்",
        description:
          "Products மற்றும் materials-ஐ வரையறுத்து, demand-ஐ group செய்து, Work Orders உருவாக்கி, tasks-ஐ release செய்து இயக்கி, production-ஐ கண்காணியுங்கள்.",
      },
      te: {
        title: "ఉత్పత్తి",
        label: "Production‌ను ప్లాన్ చేసి నడపండి",
        description:
          "Products మరియు materials‌ను నిర్వచించి, demand‌ను group చేసి, Work Orders సృష్టించి, tasks‌ను release చేసి అమలు చేసి, production‌ను monitor చేయండి.",
      },
    },
    pageSlugs: [
      "dashboards",
      "create-production-order",
      "create-work-order",
      "production-tasks",
      "products-and-variants",
      "projects-and-product-families",
      "components",
      "bill-of-materials",
      "activate-bom",
      "production-order-vs-work-order",
      "generate-unit-serials",
      "capacity-and-routing",
      "pre-start-validation",
      "operator-flow",
      "material-consumption",
      "statuses-and-route-logs",
    ],
  },
  {
    slug: "process-engineering",
    copy: {
      en: {
        title: "Process & Engineering",
        label: "Configure processes and engineering",
        description:
          "Connect Sites, Lines, Stations, Routings, Templates, identifiers, and production tools into an executable process.",
      },
      ta: {
        title: "செயல்முறை & பொறியியல்",
        label: "Process மற்றும் Engineering-ஐ அமைக்குங்கள்",
        description:
          "Sites, Lines, Stations, Routings, Templates, identifiers, மற்றும் production tools-ஐ இணைத்து செயல்படுத்தக்கூடிய process-ஐ அமைக்குங்கள்.",
      },
      te: {
        title: "ప్రక్రియ & ఇంజినీరింగ్",
        label: "Process మరియు Engineering‌ను కాన్ఫిగర్ చేయండి",
        description:
          "Sites, Lines, Stations, Routings, Templates, identifiers, మరియు production tools‌ను కలిపి అమలు చేయగల process‌ను సిద్ధం చేయండి.",
      },
    },
    pageSlugs: [
      "create-routing",
      "stations-and-repair-stations",
      "lines",
      "tools-and-maintenance",
      "templates",
      "label-management",
      "product-identifiers",
      "sites",
      "routing-basics",
      "product-line-assignment",
      "starting-lines-and-capacity",
    ],
  },
  {
    slug: "quality",
    copy: {
      en: {
        title: "Quality",
        label: "Control quality",
        description:
          "Configure quality gates, inspect output, record defects, and manage NCR and CAPA evidence.",
      },
      ta: {
        title: "தரம்",
        label: "Quality-ஐ கட்டுப்படுத்துங்கள்",
        description:
          "Quality gates-ஐ அமைத்து, output-ஐ inspect செய்து, defects-ஐ பதிவு செய்து, NCR மற்றும் CAPA evidence-ஐ நிர்வகியுங்கள்.",
      },
      te: {
        title: "నాణ్యత",
        label: "Quality‌ను నియంత్రించండి",
        description:
          "Quality gates‌ను కాన్ఫిగర్ చేసి, output‌ను inspect చేసి, defects‌ను నమోదు చేసి, NCR మరియు CAPA evidence‌ను నిర్వహించండి.",
      },
    },
    pageSlugs: [
      "quality-dashboard",
      "quality-alerts",
      "alert-rules",
      "defects",
      "dispositions",
      "hold-management",
      "disposition-approvals",
      "control-points",
      "process-audits",
      "ncr-reports",
      "capa",
      "quality-inspections",
      "offline-testing",
      "quality-settings",
      "quality-controls",
      "inspection-to-capa",
    ],
  },
  {
    slug: "repair-rework",
    copy: {
      en: {
        title: "Repair & Rework",
        label: "Manage repair and rework",
        description:
          "Monitor repair and debug queues, manage repair and rework, track returns and RMAs, and configure alerts, intake, symptoms, and reasons.",
      },
      ta: {
        title: "பழுதுபார்ப்பு & மறுவேலை",
        label: "Repair மற்றும் Rework-ஐ நிர்வகியுங்கள்",
        description:
          "Repair மற்றும் Debug queues-ஐ monitor செய்து, repair/rework-ஐ நிர்வகித்து, returns மற்றும் RMA-ஐ track செய்து, alerts, intake, symptoms, reasons-ஐ configure செய்யுங்கள்.",
      },
      te: {
        title: "మరమ్మతు & మళ్లీ పని",
        label: "Repair మరియు Rework‌ను నిర్వహించండి",
        description:
          "Repair మరియు Debug queues‌ను monitor చేసి, repair/rework‌ను నిర్వహించి, returns మరియు RMA‌ను track చేసి, alerts, intake, symptoms, reasons‌ను configure చేయండి.",
      },
    },
    pageSlugs: [
      "repair-dashboard",
      "debug-queue",
      "repair-and-rework",
      "repair-out",
      "rework-board",
      "rd-tracking",
      "customer-returns",
      "rma-tracking",
      "repair-alerts",
      "repair-config",
      "rework-symptoms",
      "rework-reasons",
    ],
  },
  {
    slug: "scrap-teardown",
    copy: {
      en: {
        title: "Scrap & Teardown",
        label: "Control scrap and teardown",
        description:
          "Place material or production on hold, approve scrap, execute disposition, and recover traceable components through teardown.",
      },
      ta: {
        title: "கழிவு & பிரித்தல்",
        label: "Scrap மற்றும் Teardown-ஐ கட்டுப்படுத்துங்கள்",
        description:
          "Material அல்லது production-ஐ hold செய்து, scrap-ஐ approve செய்து, disposition-ஐ execute செய்து, teardown மூலம் trace செய்யக்கூடிய components-ஐ மீட்குங்கள்.",
      },
      te: {
        title: "స్క్రాప్ & విడదీయడం",
        label: "Scrap మరియు Teardown‌ను నియంత్రించండి",
        description:
          "Material లేదా production‌ను hold చేసి, scrap‌ను approve చేసి, disposition‌ను execute చేసి, teardown ద్వారా trace చేయగల components‌ను తిరిగి పొందండి.",
      },
    },
    pageSlugs: [
      "scrap-register",
      "scrap-analytics",
      "teardown-queue",
      "scrap-reasons",
      "hold-scrap-teardown",
    ],
  },
  {
    slug: "traceability",
    copy: {
      en: {
        title: "Traceability",
        label: "Trace materials and units",
        description:
          "Track Item Master materials by quantity, lot, or serial and follow genealogy, recalls, reports, exports, and audit evidence.",
      },
      ta: {
        title: "தடமறிதல்",
        label: "Materials மற்றும் units-ஐ trace செய்யுங்கள்",
        description:
          "Item Master materials-ஐ quantity, lot, அல்லது serial மூலம் track செய்து, genealogy, recalls, reports, exports, மற்றும் audit evidence-ஐ பின்தொடருங்கள்.",
      },
      te: {
        title: "ట్రేసింగ్",
        label: "Materials మరియు units‌ను trace చేయండి",
        description:
          "Item Master materials‌ను quantity, lot, లేదా serial ద్వారా track చేసి, genealogy, recalls, reports, exports, మరియు audit evidence‌ను అనుసరించండి.",
      },
    },
    pageSlugs: [
      "recall-notices",
      "certificates",
      "batch-genealogy",
      "unit-history",
      "master-traceability",
      "material-tracking",
      "traceability-genealogy-recall",
      "reports-and-audit",
    ],
  },
  {
    slug: "packaging-shipping",
    copy: {
      en: {
        title: "Packaging & Shipping",
        label: "Package and ship",
        description:
          "Configure packaging, build container hierarchies, print labels, and verify shipments against shipping rules and gates.",
      },
      ta: {
        title: "பொதி செய்தல் & அனுப்புதல்",
        label: "Package செய்து ship செய்யுங்கள்",
        description:
          "Packaging-ஐ அமைத்து, container hierarchy-ஐ உருவாக்கி, labels-ஐ print செய்து, shipping rules மற்றும் gates-க்கு எதிராக shipments-ஐ verify செய்யுங்கள்.",
      },
      te: {
        title: "ప్యాకింగ్ & షిప్పింగ్",
        label: "Package చేసి ship చేయండి",
        description:
          "Packaging‌ను కాన్ఫిగర్ చేసి, container hierarchy‌ను నిర్మించి, labels‌ను print చేసి, shipping rules మరియు gates‌కు అనుగుణంగా shipments‌ను verify చేయండి.",
      },
    },
    pageSlugs: [
      "packaging",
      "shipments",
      "container-comparison",
      "shipment-verification",
      "shipment-rules",
      "packaging-rules",
      "shipping-gating",
      "asn-templates",
      "containers-and-labels",
    ],
  },
  {
    slug: "shifts-labor",
    copy: {
      en: {
        title: "Shifts & Labor",
        label: "Plan shifts and handovers",
        description:
          "Create Shift Definitions, understand schedule coverage, record handovers, and review break compliance.",
      },
      ta: {
        title: "ஷிப்ட்கள் & பணியாளர்கள்",
        label: "Shifts மற்றும் handovers-ஐ திட்டமிடுங்கள்",
        description:
          "Shift Definitions உருவாக்கி, schedule coverage-ஐ புரிந்து, handovers-ஐ பதிவு செய்து, break compliance-ஐ review செய்யுங்கள்.",
      },
      te: {
        title: "షిఫ్టులు & సిబ్బంది",
        label: "Shifts మరియు handovers‌ను ప్లాన్ చేయండి",
        description:
          "Shift Definitions సృష్టించి, schedule coverage‌ను అర్థం చేసుకుని, handovers‌ను నమోదు చేసి, break compliance‌ను review చేయండి.",
      },
    },
    pageSlugs: [
      "shifts",
      "shift-schedules",
      "shift-calendar",
      "operator-shifts",
      "shift-handovers",
      "break-logs",
      "break-compliance",
      "shift-operations",
    ],
  },
];

export function getForgeModuleSections(
  lang: CookbookLang,
): ForgeModuleSectionSpec[] {
  return modules.map((module) => ({
    title: module.copy[lang].title,
    label: module.copy[lang].label,
    slug: module.slug,
    description: module.copy[lang].description,
    pageSlugs: module.pageSlugs,
  }));
}

export const LEGACY_SECTION_DESTINATIONS: Record<string, string> = {
  "configure-factory": "process-engineering",
  "define-products": "production",
  "design-process": "process-engineering",
  "plan-production": "production",
  "run-production": "production",
  "quality-exceptions": "quality",
  "package-trace": "packaging-shipping",
  "operate-improve": "production",
  "help-reference": "start-here",
};

export const LEGACY_PAGE_DESTINATIONS: Record<
  string,
  { sectionSlug: string; pageSlug: string }
> = {
  components: { sectionSlug: "production", pageSlug: "products-and-variants" },
  "bill-of-materials": {
    sectionSlug: "production",
    pageSlug: "products-and-variants",
  },
  "activate-bom": {
    sectionSlug: "production",
    pageSlug: "products-and-variants",
  },
  "production-order-vs-work-order": {
    sectionSlug: "production",
    pageSlug: "create-production-order",
  },
  "generate-unit-serials": {
    sectionSlug: "production",
    pageSlug: "create-work-order",
  },
  "capacity-and-routing": {
    sectionSlug: "production",
    pageSlug: "create-work-order",
  },
  "pre-start-validation": {
    sectionSlug: "production",
    pageSlug: "create-work-order",
  },
  "operator-flow": {
    sectionSlug: "production",
    pageSlug: "production-tasks",
  },
  "material-consumption": {
    sectionSlug: "production",
    pageSlug: "production-tasks",
  },
  "statuses-and-route-logs": {
    sectionSlug: "production",
    pageSlug: "production-tasks",
  },
  dashboards: { sectionSlug: "production", pageSlug: "production-tasks" },
  sites: {
    sectionSlug: "process-engineering",
    pageSlug: "stations-and-repair-stations",
  },
  "routing-basics": {
    sectionSlug: "process-engineering",
    pageSlug: "create-routing",
  },
  "product-line-assignment": {
    sectionSlug: "process-engineering",
    pageSlug: "create-routing",
  },
  "starting-lines-and-capacity": {
    sectionSlug: "process-engineering",
    pageSlug: "lines",
  },
  "quality-controls": {
    sectionSlug: "quality",
    pageSlug: "control-points",
  },
  "inspection-to-capa": {
    sectionSlug: "quality",
    pageSlug: "quality-inspections",
  },
  "hold-scrap-teardown": {
    sectionSlug: "scrap-teardown",
    pageSlug: "scrap-register",
  },
  "material-tracking": {
    sectionSlug: "traceability",
    pageSlug: "master-traceability",
  },
  "traceability-genealogy-recall": {
    sectionSlug: "traceability",
    pageSlug: "batch-genealogy",
  },
  "reports-and-audit": {
    sectionSlug: "traceability",
    pageSlug: "master-traceability",
  },
  "containers-and-labels": {
    sectionSlug: "process-engineering",
    pageSlug: "label-management",
  },
  "shift-operations": {
    sectionSlug: "shifts-labor",
    pageSlug: "shift-handovers",
  },
};
