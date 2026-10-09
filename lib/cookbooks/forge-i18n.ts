// Shared i18n for the Fynd ERP cookbook (client- and server-safe).
// Content (pages, task guides) is translated in separate data files; this module
// holds the fixed UI chrome + markdown scaffolding strings for each language.

export type CookbookLang = "en" | "ta" | "te";

export const COOKBOOK_LANG_COOKIE = "forge-lang";
export const COOKBOOK_LANGS: CookbookLang[] = ["en", "ta", "te"];
export const DEFAULT_COOKBOOK_LANG: CookbookLang = "en";

export function isCookbookLang(value: unknown): value is CookbookLang {
  return value === "en" || value === "ta" || value === "te";
}

export function normalizeCookbookLang(value: unknown): CookbookLang {
  return isCookbookLang(value) ? value : DEFAULT_COOKBOOK_LANG;
}

type StageCopy = { title: string; detail: string };
type BlockerCopy = { title: string; detail: string };

type CookbookDict = {
  // Language switch
  langName: string; // short label shown on the toggle for this language
  toggleAria: string;
  toggleGroupLabel: string;

  // Shell / sidebar
  brandKicker: string;
  brandTitle: string;
  navSectionsAria: string;
  navRegionTitle: string;
  expand: string;
  collapse: string;

  // Search
  searchPlaceholder: string;
  searchResultsAria: string;
  noResults: (query: string) => string;

  // Root hero + landing sections
  heroTitle: string;
  heroDescription: string;
  ctaStart: string;
  ctaJourney: string;
  ctaDownload: string;

  browseTitle: string;
  browseSubtext: string;

  setupTitle: string;
  setupSubtext: string;
  legendRequired: string;
  legendRecommended: string;
  legendConditional: string;
  setupStages: StageCopy[];

  gatesTitle: string;
  gatesSubtext: string;
  gatesSetupCheck: string;
  gatesQuestion: string;
  blockers: BlockerCopy[];
  gatesReady: string;
  gatesReadyDetail: string;

  openStep: string;
  stepWord: string; // "Step" — used in "Step 1: Title"

  // Detail header + article navigation
  breadcrumbCookbooks: string;
  requirementLabel: string;
  importance: Record<"Required" | "Recommended" | "Conditional", string>;
  childHeadingStage: string;
  childHeadingSection: string;
  entryFallbackDesc: string;
  navStepOf: (a: number, b: number) => string;
  navTopicOf: (a: number, b: number) => string;
  navPrevious: string;
  navUpNext: string;
  navJourneyComplete: string;
  navPreviousTopic: string;
  navBackToStage: string;
  navNextTopic: string;
  navCookbookHome: string;
  navReturnHome: string;
  navNextStage: string;

  // Markdown blocks
  gifPlaceholderLabel: string;
  importantNote: string;
  diagramStopNote: string;
  diagramNextStepFallback: string;

  // Markdown scaffolding (headings/text baked into generated page bodies)
  scaffold: {
    beforeYouBegin: string;
    noPrerequisite: string;
    howItWorks: string;
    whyMatters: string;
    stepByStep: string;
    navigation: string;
    whatToDo: string;
    watchTask: string;
    watchTitle: (title: string) => string;
    gifDescription: (title: string) => string;
    rulesToRemember: string;
    readyWhen: string;
    diagramIntroDefault: string;
    diagramWhyDefault: string;
    diagramProvidesRelation: string;
    diagramStageContributes: (summary: string) => string;
    sectionWhyOrder: string;
    sectionWhyOrderBody: string;
  };
};

const en: CookbookDict = {
  langName: "EN",
  toggleAria: "Change cookbook language",
  toggleGroupLabel: "Cookbook language",

  brandKicker: "Setup-to-shipment guide",
  brandTitle: "Fynd ERP Cookbook",
  navSectionsAria: "Fynd ERP cookbook sections",
  navRegionTitle: "Fynd ERP cookbook navigation",
  expand: "Expand",
  collapse: "Collapse",

  searchPlaceholder: "Search the Fynd ERP cookbook",
  searchResultsAria: "Cookbook search results",
  noResults: (query) => `No cookbook pages match “${query}”.`,

  heroTitle: "Set up and run Fynd ERP with confidence",
  heroDescription:
    "A visual, self-serve guide that explains manufacturing in plain language and walks you from factory setup to a traceable finished unit.",
  ctaStart: "Start the guided setup",
  ctaJourney: "See the complete setup journey",
  ctaDownload: "Download complete cookbook (PDF)",

  browseTitle: "Browse the cookbook",
  browseSubtext:
    "Start with a card, follow the stages in order, or use global search to jump directly to a topic.",

  setupTitle: "Work through the Mfg modules",
  setupSubtext:
    "Use the same module structure as Fynd ERP. Start with Production and Process & Engineering, then move through control, traceability, packaging, and shifts.",
  legendRequired: "Required — blocks the core flow",
  legendRecommended: "Recommended — improves control",
  legendConditional: "Conditional — use when the process needs it",
  setupStages: [
    {
      title: "Production",
      detail: "Define products and materials, create orders, release work, and monitor execution.",
    },
    {
      title: "Process & Engineering",
      detail: "Configure Sites, Lines, Stations, Routings, Templates, identifiers, and tools.",
    },
    {
      title: "Quality",
      detail: "Configure controls, inspections, defects, NCR, CAPA, and quality evidence.",
    },
    {
      title: "Repair & Rework",
      detail: "Manage debug and repair queues, rework, returns, RMAs, alerts, intake rules, symptoms, and reasons.",
    },
    {
      title: "Scrap & Teardown",
      detail: "Control holds, scrap decisions, approvals, dispatches, and component recovery.",
    },
    {
      title: "Traceability",
      detail: "Follow materials, units, genealogy, recalls, exports, and audit evidence.",
    },
    {
      title: "Packaging & Shipping",
      detail: "Build containers, print labels, apply shipping gates, and verify shipments.",
    },
    {
      title: "Shifts & Labor",
      detail: "Create Shifts, understand schedule coverage, and record handovers.",
    },
  ],

  gatesTitle: "What stops production from starting?",
  gatesSubtext:
    "Fynd ERP protects production by checking that the required factory, product, process, and unit data are connected.",
  gatesSetupCheck: "Setup check",
  gatesQuestion: "Can this Work Order run?",
  blockers: [
    {
      title: "No Line",
      detail:
        "The Product cannot be assigned to a starting Line, so production cannot be launched.",
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
      detail:
        "The Work Order cannot release until a Line has room and every output unit is identified.",
    },
  ],
  gatesReady: "Ready to release",
  gatesReadyDetail:
    "Active Product-Line assignment + eligible starting Line + Routing + Shift + capacity + exact confirmed finished-unit serial count",

  openStep: "Open step",
  stepWord: "Step",

  breadcrumbCookbooks: "Cookbooks",
  requirementLabel: "Requirement",
  importance: {
    Required: "Required",
    Recommended: "Recommended",
    Conditional: "Conditional",
  },
  childHeadingStage: "Follow this stage in order",
  childHeadingSection: "Pages in this section",
  entryFallbackDesc: "Explore the Fynd ERP product cookbook.",
  navStepOf: (a, b) => `Step ${a} of ${b}`,
  navTopicOf: (a, b) => `Topic ${a} of ${b}`,
  navPrevious: "Previous",
  navUpNext: "Up next",
  navJourneyComplete: "Journey complete",
  navPreviousTopic: "Previous topic",
  navBackToStage: "Back to this stage",
  navNextTopic: "Next topic",
  navCookbookHome: "Cookbook home",
  navReturnHome: "Return to the cookbook home",
  navNextStage: "Next stage:",

  gifPlaceholderLabel: "GIF PLACEHOLDER",
  importantNote: "Important note",
  diagramStopNote: "Complete each required stage before moving to the next.",
  diagramNextStepFallback: "Provides the information needed for the next step.",

  scaffold: {
    beforeYouBegin: "Before you begin",
    noPrerequisite: "No earlier cookbook topic is required.",
    howItWorks: "How it works",
    whyMatters: "Why this connection matters:",
    stepByStep: "Step-by-step in Fynd ERP",
    navigation: "Navigation:",
    whatToDo: "What to do",
    watchTask: "Watch the task",
    watchTitle: (title) => `Watch: ${title}`,
    gifDescription: (title) => `GIF walkthrough placeholder for ${title}.`,
    rulesToRemember: "Rules to remember",
    readyWhen: "Ready when",
    diagramIntroDefault:
      "Follow the numbered steps in order. Each step prepares the information the next step needs.",
    diagramWhyDefault:
      "Imagine one physical product moving from raw material to a customer. These concepts describe what happens to it.",
    diagramProvidesRelation: "provides the information needed for",
    diagramStageContributes: (summary) =>
      `This stage contributes to the outcome: ${summary}.`,
    sectionWhyOrder: "Why the order matters",
    sectionWhyOrderBody:
      "Each numbered topic prepares information used by the next one. Complete its readiness check before continuing.",
  },
};

const ta: CookbookDict = {
  langName: "தமிழ்",
  toggleAria: "வழிகாட்டியின் மொழியை மாற்று",
  toggleGroupLabel: "வழிகாட்டி மொழி",

  brandKicker: "அமைப்பு முதல் அனுப்புதல் வரை வழிகாட்டி",
  brandTitle: "Fynd ERP Cookbook",
  navSectionsAria: "Fynd ERP வழிகாட்டி பிரிவுகள்",
  navRegionTitle: "Fynd ERP வழிகாட்டி வழிசெலுத்தல்",
  expand: "விரிவாக்கு",
  collapse: "சுருக்கு",

  searchPlaceholder: "Fynd ERP வழிகாட்டியில் தேடுங்கள்",
  searchResultsAria: "வழிகாட்டி தேடல் முடிவுகள்",
  noResults: (query) => `“${query}” உடன் பொருந்தும் பக்கங்கள் எதுவும் இல்லை.`,

  heroTitle: "Fynd ERP-ஐ நம்பிக்கையுடன் அமைத்து இயக்குங்கள்",
  heroDescription:
    "உற்பத்தியை எளிய மொழியில் புரியவைத்து, தொழிற்சாலை அமைப்பிலிருந்து trace செய்யக்கூடிய முடிக்கப்பட்ட unit வரை அழைத்துச் செல்லும் காட்சி வழிகாட்டி.",
  ctaStart: "வழிகாட்டப்பட்ட அமைப்பைத் தொடங்கு",
  ctaJourney: "முழு அமைப்புப் பயணத்தைக் காண்க",
  ctaDownload: "முழு வழிகாட்டியைப் பதிவிறக்கு (PDF)",

  browseTitle: "வழிகாட்டியை உலாவுங்கள்",
  browseSubtext:
    "ஒரு அட்டையிலிருந்து தொடங்குங்கள், நிலைகளை வரிசையாகப் பின்பற்றுங்கள், அல்லது ஒரு தலைப்பிற்கு நேரடியாகச் செல்ல தேடலைப் பயன்படுத்துங்கள்.",

  setupTitle: "Mfg modules வழியாக வேலை செய்யுங்கள்",
  setupSubtext:
    "Fynd ERP-இல் இருக்கும் அதே module structure-ஐ பயன்படுத்துங்கள். Production மற்றும் Process & Engineering-இல் தொடங்கி, control, traceability, packaging, மற்றும் shifts வழியாக தொடருங்கள்.",
  legendRequired: "அவசியம் — முக்கியப் பாதையைத் தடுக்கிறது",
  legendRecommended: "பரிந்துரை — கட்டுப்பாட்டை மேம்படுத்துகிறது",
  legendConditional: "தேவைப்பட்டால் — செயல்முறைக்குத் தேவைப்படும்போது பயன்படுத்தவும்",
  setupStages: [
    {
      title: "உற்பத்தி",
      detail: "Products மற்றும் materials-ஐ வரையறுத்து, orders உருவாக்கி, work-ஐ release செய்து execution-ஐ monitor செய்யுங்கள்.",
    },
    {
      title: "செயல்முறை & பொறியியல்",
      detail: "Sites, Lines, Stations, Routings, Templates, identifiers, மற்றும் tools-ஐ configure செய்யுங்கள்.",
    },
    {
      title: "தரம்",
      detail: "Controls, inspections, defects, NCR, CAPA, மற்றும் quality evidence-ஐ configure செய்யுங்கள்.",
    },
    {
      title: "பழுதுபார்ப்பு & மறுவேலை",
      detail: "Debug மற்றும் repair queues, rework, returns, RMA, alerts, intake rules, symptoms, மற்றும் reasons-ஐ நிர்வகியுங்கள்.",
    },
    {
      title: "கழிவு & பிரித்தல்",
      detail: "Holds, scrap decisions, approvals, dispatches, மற்றும் component recovery-ஐ கட்டுப்படுத்துங்கள்.",
    },
    {
      title: "தடமறிதல்",
      detail: "Materials, units, genealogy, recalls, exports, மற்றும் audit evidence-ஐ trace செய்யுங்கள்.",
    },
    {
      title: "பொதி செய்தல் & அனுப்புதல்",
      detail: "Containers உருவாக்கி, labels print செய்து, shipping gates apply செய்து, shipments verify செய்யுங்கள்.",
    },
    {
      title: "ஷிப்ட்கள் & பணியாளர்கள்",
      detail: "Shifts உருவாக்கி, schedule coverage-ஐ புரிந்து, handovers பதிவு செய்யுங்கள்.",
    },
  ],

  gatesTitle: "உற்பத்தி தொடங்குவதை எது தடுக்கிறது?",
  gatesSubtext:
    "தேவையான தொழிற்சாலை, தயாரிப்பு, செயல்முறை மற்றும் அலகு தரவு இணைக்கப்பட்டுள்ளதா என்பதைச் சரிபார்த்து Fynd ERP உற்பத்தியைப் பாதுகாக்கிறது.",
  gatesSetupCheck: "அமைப்பு சரிபார்ப்பு",
  gatesQuestion: "இந்த Work Order இயங்க முடியுமா?",
  blockers: [
    {
      title: "Line இல்லை",
      detail:
        "Product-ஐ ஒரு தொடக்க Line உடன் ஒதுக்க முடியாது, எனவே உற்பத்தியைத் தொடங்க முடியாது.",
    },
    {
      title: "செயலில் உள்ள BOM இல்லை",
      detail: "உற்பத்திச் செய்முறை தயாராக இல்லை, ஆதரிக்கப்படும் Routing தயாரிக்க முடியாது.",
    },
    {
      title: "Routing அல்லது Shift இல்லை",
      detail: "ஒரு Work Order-க்கு தேவையான செயல்முறை அல்லது கால அட்டவணைத் தகவல் இல்லை.",
    },
    {
      title: "திறன் அல்லது சீரியல்கள் இல்லை",
      detail:
        "ஒரு Line-இல் இடம் இருந்து, ஒவ்வொரு வெளியீட்டு அலகும் அடையாளம் காணப்படும் வரை Work Order-ஐ வெளியிட முடியாது.",
    },
  ],
  gatesReady: "வெளியிட தயார்",
  gatesReadyDetail:
    "செயலில் உள்ள Product-Line ஒதுக்கீடு + தகுதியான தொடக்க Line + Routing + Shift + திறன் + சரியாக உறுதிசெய்யப்பட்ட முடிக்கப்பட்ட அலகு சீரியல் எண்ணிக்கை",

  openStep: "படியைத் திற",
  stepWord: "படி",

  breadcrumbCookbooks: "Cookbooks",
  requirementLabel: "எவ்வளவு அவசியம்",
  importance: {
    Required: "அவசியம்",
    Recommended: "பரிந்துரை",
    Conditional: "தேவைப்பட்டால்",
  },
  childHeadingStage: "இந்த நிலையை வரிசையாகப் பின்பற்றுங்கள்",
  childHeadingSection: "இந்தப் பிரிவில் உள்ள பக்கங்கள்",
  entryFallbackDesc: "Fynd ERP தயாரிப்பு வழிகாட்டியை ஆராயுங்கள்.",
  navStepOf: (a, b) => `படி ${a} / ${b}`,
  navTopicOf: (a, b) => `தலைப்பு ${a} / ${b}`,
  navPrevious: "முந்தையது",
  navUpNext: "அடுத்தது",
  navJourneyComplete: "பயணம் முடிந்தது",
  navPreviousTopic: "முந்தைய தலைப்பு",
  navBackToStage: "இந்த நிலைக்குத் திரும்பு",
  navNextTopic: "அடுத்த தலைப்பு",
  navCookbookHome: "வழிகாட்டி முகப்பு",
  navReturnHome: "வழிகாட்டி முகப்பிற்குத் திரும்பு",
  navNextStage: "அடுத்த நிலை:",

  gifPlaceholderLabel: "GIF இடஒதுக்கீடு",
  importantNote: "முக்கியக் குறிப்பு",
  diagramStopNote: "அடுத்த படிக்குச் செல்லும் முன், தேவையான எல்லா படிகளையும் முடித்துவிடுங்கள்.",
  diagramNextStepFallback: "அடுத்த படிக்குத் தேவையான தகவலை வழங்குகிறது.",

  scaffold: {
    beforeYouBegin: "தொடங்குவதற்கு முன்",
    noPrerequisite: "இதற்கு முன் வேறு எந்தத் தலைப்பையும் முடிக்க வேண்டியதில்லை.",
    howItWorks: "இது எப்படி வேலை செய்கிறது",
    whyMatters: "இந்த இணைப்பு ஏன் முக்கியம்:",
    stepByStep: "Fynd ERP-இல் படிப்படியாக",
    navigation: "செல்ல வேண்டிய வழி:",
    whatToDo: "என்ன செய்ய வேண்டும்",
    watchTask: "செய்முறையைப் பாருங்கள்",
    watchTitle: (title) => `பாருங்கள்: ${title}`,
    gifDescription: (title) => `${title} எப்படி செய்வது என்று காட்டும் GIF.`,
    rulesToRemember: "கவனத்தில் கொள்ள வேண்டியவை",
    readyWhen: "எப்போது முடிந்ததாகக் கொள்ளலாம்",
    diagramIntroDefault:
      "எண்ணிட்ட படிகளை வரிசையாகப் பின்பற்றுங்கள். ஒவ்வொரு படியும் அடுத்த படிக்குத் தேவையான தகவலைத் தயார் செய்கிறது.",
    diagramWhyDefault:
      "ஒரு product, மூலப்பொருளிலிருந்து வாடிக்கையாளர் வரை எப்படி செல்கிறது என்று நினைத்துப் பாருங்கள். அந்தப் பயணத்தில் என்ன நடக்கிறது என்பதை இந்தக் கருத்துகள் விளக்குகின்றன.",
    diagramProvidesRelation: "இதற்குத் தேவையான தகவலை வழங்குகிறது",
    diagramStageContributes: (summary) =>
      `இந்தப் படி கிடைக்கும் முடிவுக்கு உதவுகிறது: ${summary}.`,
    sectionWhyOrder: "வரிசை ஏன் முக்கியம்",
    sectionWhyOrderBody:
      "ஒவ்வொரு எண்ணிட்ட தலைப்பும் அடுத்த தலைப்புக்குத் தேவையான தகவலைத் தயார் செய்கிறது. தொடரும் முன் அதன் checklist-ஐ முடித்துவிடுங்கள்.",
  },
};

const te: CookbookDict = {
  langName: "తెలుగు",
  toggleAria: "గైడ్ భాషను మార్చండి",
  toggleGroupLabel: "గైడ్ భాష",

  brandKicker: "సెటప్ నుండి షిప్‌మెంట్ వరకు గైడ్",
  brandTitle: "Fynd ERP Cookbook",
  navSectionsAria: "Fynd ERP గైడ్ విభాగాలు",
  navRegionTitle: "Fynd ERP గైడ్ నావిగేషన్",
  expand: "విస్తరించు",
  collapse: "కుదించు",

  searchPlaceholder: "Fynd ERP గైడ్‌లో వెతకండి",
  searchResultsAria: "గైడ్ శోధన ఫలితాలు",
  noResults: (query) => `“${query}”కి సరిపోలే పేజీలు ఏవీ లేవు.`,

  heroTitle: "Fynd ERP‑ని నమ్మకంగా సెటప్ చేసి నడపండి",
  heroDescription:
    "ఉత్పత్తిని సులభంగా అర్థమయ్యేలా చెబుతూ, ఫ్యాక్టరీ సెటప్ నుంచి trace చేయగల పూర్తయిన unit వరకు తీసుకెళ్లే విజువల్ గైడ్.",
  ctaStart: "గైడెడ్ సెటప్‌ను ప్రారంభించండి",
  ctaJourney: "పూర్తి సెటప్ ప్రయాణాన్ని చూడండి",
  ctaDownload: "పూర్తి గైడ్‌ను డౌన్‌లోడ్ చేయండి (PDF)",

  browseTitle: "గైడ్‌ను విహరించండి",
  browseSubtext:
    "ఒక కార్డ్‌తో ప్రారంభించండి, దశలను వరుసగా అనుసరించండి, లేదా నేరుగా ఒక అంశానికి వెళ్లడానికి శోధనను ఉపయోగించండి.",

  setupTitle: "Mfg modules ద్వారా పని చేయండి",
  setupSubtext:
    "Fynd ERP‌లో ఉన్న అదే module structure‌ను ఉపయోగించండి. Production మరియు Process & Engineering‌తో ప్రారంభించి, control, traceability, packaging, మరియు shifts ద్వారా కొనసాగండి.",
  legendRequired: "అవసరం — ప్రధాన ప్రవాహాన్ని అడ్డుకుంటుంది",
  legendRecommended: "సిఫార్సు — నియంత్రణను మెరుగుపరుస్తుంది",
  legendConditional: "అవసరమైతే — ప్రక్రియకు అవసరమైనప్పుడు ఉపయోగించండి",
  setupStages: [
    {
      title: "ఉత్పత్తి",
      detail: "Products మరియు materials‌ను నిర్వచించి, orders సృష్టించి, work‌ను release చేసి execution‌ను monitor చేయండి.",
    },
    {
      title: "ప్రక్రియ & ఇంజినీరింగ్",
      detail: "Sites, Lines, Stations, Routings, Templates, identifiers, మరియు tools‌ను configure చేయండి.",
    },
    {
      title: "నాణ్యత",
      detail: "Controls, inspections, defects, NCR, CAPA, మరియు quality evidence‌ను configure చేయండి.",
    },
    {
      title: "మరమ్మతు & మళ్లీ పని",
      detail: "Debug మరియు repair queues, rework, returns, RMA, alerts, intake rules, symptoms, మరియు reasons‌ను నిర్వహించండి.",
    },
    {
      title: "స్క్రాప్ & విడదీయడం",
      detail: "Holds, scrap decisions, approvals, dispatches, మరియు component recovery‌ను నియంత్రించండి.",
    },
    {
      title: "ట్రేసింగ్",
      detail: "Materials, units, genealogy, recalls, exports, మరియు audit evidence‌ను trace చేయండి.",
    },
    {
      title: "ప్యాకింగ్ & షిప్పింగ్",
      detail: "Containers నిర్మించి, labels print చేసి, shipping gates apply చేసి, shipments verify చేయండి.",
    },
    {
      title: "షిఫ్టులు & సిబ్బంది",
      detail: "Shifts సృష్టించి, schedule coverage‌ను అర్థం చేసుకుని, handovers నమోదు చేయండి.",
    },
  ],

  gatesTitle: "ఉత్పత్తి ప్రారంభం కావడాన్ని ఏది ఆపుతుంది?",
  gatesSubtext:
    "అవసరమైన ఫ్యాక్టరీ, ఉత్పత్తి, ప్రక్రియ మరియు యూనిట్ డేటా అనుసంధానించబడిందో లేదో తనిఖీ చేయడం ద్వారా Fynd ERP ఉత్పత్తిని కాపాడుతుంది.",
  gatesSetupCheck: "సెటప్ తనిఖీ",
  gatesQuestion: "ఈ Work Order నడవగలదా?",
  blockers: [
    {
      title: "Line లేదు",
      detail:
        "Product‑ను ఒక ప్రారంభ Line‑కి కేటాయించలేము, కాబట్టి ఉత్పత్తిని ప్రారంభించలేము.",
    },
    {
      title: "యాక్టివ్ BOM లేదు",
      detail: "ఉత్పత్తి రెసిపీ సిద్ధంగా లేదు, మద్దతు గల Routing సిద్ధం చేయలేము.",
    },
    {
      title: "Routing లేదా Shift లేదు",
      detail: "ఒక Work Order‑కి అవసరమైన ప్రక్రియ లేదా షెడ్యూలింగ్ సమాచారం లేదు.",
    },
    {
      title: "సామర్థ్యం లేదా సీరియల్స్ లేవు",
      detail:
        "ఒక Line‑లో స్థలం ఉండి, ప్రతి అవుట్‌పుట్ యూనిట్ గుర్తించబడే వరకు Work Order‑ను విడుదల చేయలేము.",
    },
  ],
  gatesReady: "విడుదలకు సిద్ధం",
  gatesReadyDetail:
    "యాక్టివ్ Product‑Line కేటాయింపు + అర్హత గల ప్రారంభ Line + Routing + Shift + సామర్థ్యం + ఖచ్చితంగా నిర్ధారించబడిన పూర్తయిన యూనిట్ సీరియల్ సంఖ్య",

  openStep: "దశను తెరవండి",
  stepWord: "దశ",

  breadcrumbCookbooks: "Cookbooks",
  requirementLabel: "ఎంత అవసరం",
  importance: {
    Required: "అవసరం",
    Recommended: "సిఫార్సు",
    Conditional: "అవసరమైతే",
  },
  childHeadingStage: "ఈ దశను వరుసగా అనుసరించండి",
  childHeadingSection: "ఈ విభాగంలోని పేజీలు",
  entryFallbackDesc: "Fynd ERP ఉత్పత్తి గైడ్‌ను అన్వేషించండి.",
  navStepOf: (a, b) => `దశ ${a} / ${b}`,
  navTopicOf: (a, b) => `అంశం ${a} / ${b}`,
  navPrevious: "మునుపటిది",
  navUpNext: "తదుపరి",
  navJourneyComplete: "ప్రయాణం పూర్తయింది",
  navPreviousTopic: "మునుపటి అంశం",
  navBackToStage: "ఈ దశకు తిరిగి వెళ్లండి",
  navNextTopic: "తదుపరి అంశం",
  navCookbookHome: "గైడ్ హోమ్",
  navReturnHome: "గైడ్ హోమ్‌కు తిరిగి వెళ్లండి",
  navNextStage: "తదుపరి దశ:",

  gifPlaceholderLabel: "GIF ప్లేస్‌హోల్డర్",
  importantNote: "ముఖ్యమైన గమనిక",
  diagramStopNote: "తదుపరి దశకు వెళ్లే ముందు అవసరమైన అన్ని దశలను పూర్తి చేయండి.",
  diagramNextStepFallback: "తదుపరి దశకు అవసరమైన సమాచారాన్ని అందిస్తుంది.",

  scaffold: {
    beforeYouBegin: "మీరు ప్రారంభించే ముందు",
    noPrerequisite: "దీనికి ముందు మరో అంశాన్ని పూర్తి చేయాల్సిన అవసరం లేదు.",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    whyMatters: "ఈ అనుసంధానం ఎందుకు ముఖ్యం:",
    stepByStep: "Fynd ERP‑లో దశలవారీగా",
    navigation: "వెళ్లాల్సిన మార్గం:",
    whatToDo: "ఏమి చేయాలి",
    watchTask: "చేసే విధానాన్ని చూడండి",
    watchTitle: (title) => `చూడండి: ${title}`,
    gifDescription: (title) => `${title} ఎలా చేయాలో చూపించే GIF.`,
    rulesToRemember: "గుర్తుంచుకోవాల్సిన విషయాలు",
    readyWhen: "ఎప్పుడు పూర్తైనట్టు",
    diagramIntroDefault:
      "నంబర్ ఉన్న దశలను వరుసగా అనుసరించండి. ప్రతి దశ తర్వాతి దశకు కావాల్సిన సమాచారాన్ని సిద్ధం చేస్తుంది.",
    diagramWhyDefault:
      "ఒక product ముడి పదార్థం నుంచి కస్టమర్ వరకు ఎలా వెళ్తుందో ఊహించండి. ఆ ప్రయాణంలో ఏమి జరుగుతుందో ఇవి వివరిస్తాయి.",
    diagramProvidesRelation: "దీనికి అవసరమైన సమాచారాన్ని అందిస్తుంది",
    diagramStageContributes: (summary) =>
      `ఈ దశ చివరి ఫలితానికి సహాయపడుతుంది: ${summary}.`,
    sectionWhyOrder: "వరుస ఎందుకు ముఖ్యం",
    sectionWhyOrderBody:
      "ప్రతి నంబర్ ఉన్న అంశం తర్వాతి అంశానికి కావాల్సిన సమాచారాన్ని సిద్ధం చేస్తుంది. కొనసాగేముందు దాని checklist పూర్తి చేయండి.",
  },
};

const DICTS: Record<CookbookLang, CookbookDict> = { en, ta, te };

export function cookbookUi(lang: CookbookLang): CookbookDict {
  return DICTS[normalizeCookbookLang(lang)];
}
