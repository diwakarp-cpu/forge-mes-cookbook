import type { CookbookLang } from "./forge-i18n";

type Importance = "Required" | "Recommended" | "Conditional";

export type LiveModuleGuidePage = {
  title: string;
  slug: string;
  summary: string;
  importance: Importance;
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

type LocalizedText = Record<CookbookLang, string>;

type LivePageDefinition = {
  module: string;
  title: string;
  slug: string;
  summary: LocalizedText;
  importance?: Importance;
  sourceSlug?: string;
};

const text = (en: string, ta: string, te: string): LocalizedText => ({ en, ta, te });

const definitions: LivePageDefinition[] = [
  // Production
  {
    module: "Production",
    title: "Dashboard",
    slug: "dashboards",
    sourceSlug: "dashboards",
    importance: "Recommended",
    summary: text(
      "Monitor current manufacturing activity, output, work status, and exceptions from the Mfg overview.",
      "Current manufacturing activity, output, work status, மற்றும் exceptions-ஐ Mfg overview-ல் monitor செய்யுங்கள்.",
      "Current manufacturing activity, output, work status, మరియు exceptions‌ను Mfg overview‌లో monitor చేయండి.",
    ),
  },
  {
    module: "Production",
    title: "Production Orders",
    slug: "create-production-order",
    sourceSlug: "create-production-order",
    summary: text(
      "Group related Work Orders under one production plan and monitor their combined progress.",
      "தொடர்புடைய Work Orders-ஐ ஒரே production plan-ல் group செய்து, அவற்றின் மொத்த progress-ஐ monitor செய்யுங்கள்.",
      "సంబంధిత Work Orders‌ను ఒకే production plan‌లో group చేసి, వాటి మొత్తం progress‌ను monitor చేయండి.",
    ),
  },
  {
    module: "Production",
    title: "Work Orders",
    slug: "create-work-order",
    sourceSlug: "create-work-order",
    summary: text(
      "Create executable production demand, set quantity and dates, and follow release and completion status.",
      "இயக்கக்கூடிய production demand-ஐ உருவாக்கி, quantity மற்றும் dates அமைத்து, release முதல் completion வரை status-ஐ track செய்யுங்கள்.",
      "అమలు చేయగల production demand‌ను సృష్టించి, quantity మరియు dates సెట్ చేసి, release నుంచి completion వరకు status‌ను track చేయండి.",
    ),
  },
  {
    module: "Production",
    title: "Production Tasks",
    slug: "production-tasks",
    sourceSlug: "production-tasks",
    summary: text(
      "Review the unit-level tasks generated from Work Orders and follow each task through execution.",
      "Work Orders-லிருந்து உருவாகும் unit-level tasks-ஐ review செய்து, ஒவ்வொரு task-ன் execution-ஐ track செய்யுங்கள்.",
      "Work Orders నుంచి సృష్టైన unit-level tasks‌ను review చేసి, ప్రతి task execution‌ను track చేయండి.",
    ),
  },
  {
    module: "Production",
    title: "Products",
    slug: "products-and-variants",
    sourceSlug: "products-and-variants",
    summary: text(
      "Maintain Products, SKUs, Variants, BOM coverage, and the active configuration used for production.",
      "Production-க்கு பயன்படுத்தும் Products, SKUs, Variants, BOM coverage, மற்றும் active configuration-ஐ நிர்வகியுங்கள்.",
      "Production‌కు ఉపయోగించే Products, SKUs, Variants, BOM coverage, మరియు active configuration‌ను నిర్వహించండి.",
    ),
  },
  {
    module: "Production",
    title: "Product Families",
    slug: "projects-and-product-families",
    sourceSlug: "projects-and-product-families",
    summary: text(
      "Group related Products into Product Families and retain Project context where it is available.",
      "தொடர்புடைய Products-ஐ Product Families-ஆக group செய்து, கிடைக்கும் இடத்தில் Project context-ஐ வைத்திருங்கள்.",
      "సంబంధిత Products‌ను Product Families‌గా group చేసి, అందుబాటులో ఉన్న చోట Project context‌ను ఉంచండి.",
    ),
  },

  // Process & Engineering
  {
    module: "Process & Engineering",
    title: "Routing",
    slug: "create-routing",
    sourceSlug: "create-routing",
    summary: text(
      "Define and validate the ordered operations, Stations, and conditions a Product follows.",
      "ஒரு Product பின்பற்ற வேண்டிய operations, Stations, மற்றும் conditions வரிசையை அமைத்து validate செய்யுங்கள்.",
      "ఒక Product అనుసరించాల్సిన operations, Stations, మరియు conditions క్రమాన్ని నిర్వచించి validate చేయండి.",
    ),
  },
  {
    module: "Process & Engineering",
    title: "Stations",
    slug: "stations-and-repair-stations",
    sourceSlug: "stations-and-repair-stations",
    summary: text(
      "Create regular and Repair Stations and connect each execution point to the correct Site.",
      "Regular மற்றும் Repair Stations-ஐ உருவாக்கி, ஒவ்வொரு execution point-ஐ சரியான Site-உடன் இணைக்கவும்.",
      "Regular మరియు Repair Stations‌ను సృష్టించి, ప్రతి execution point‌ను సరైన Site‌తో కలపండి.",
    ),
  },
  {
    module: "Process & Engineering",
    title: "Line",
    slug: "lines",
    sourceSlug: "lines",
    summary: text(
      "Create production Lines, set their type and capacity, and mark eligible starting Lines.",
      "Production Lines-ஐ உருவாக்கி, type மற்றும் capacity அமைத்து, தகுதியான starting Lines-ஐ குறிக்கவும்.",
      "Production Lines‌ను సృష్టించి, type మరియు capacity సెట్ చేసి, అర్హమైన starting Lines‌ను గుర్తించండి.",
    ),
  },
  {
    module: "Process & Engineering",
    title: "Tools and Equipments",
    slug: "tools-and-maintenance",
    sourceSlug: "tools-and-maintenance",
    summary: text(
      "Track production tools and equipment, availability, calibration, and maintenance evidence.",
      "Production tools மற்றும் equipment-ன் availability, calibration, மற்றும் maintenance evidence-ஐ track செய்யுங்கள்.",
      "Production tools మరియు equipment availability, calibration, మరియు maintenance evidence‌ను track చేయండి.",
    ),
  },
  {
    module: "Process & Engineering",
    title: "Templates",
    slug: "templates",
    sourceSlug: "templates",
    summary: text(
      "Create reusable serial, document, label, parser, and validation templates.",
      "மீண்டும் பயன்படுத்தக்கூடிய serial, document, label, parser, மற்றும் validation Templates உருவாக்குங்கள்.",
      "మళ్లీ ఉపయోగించగల serial, document, label, parser, మరియు validation Templates సృష్టించండి.",
    ),
  },
  {
    module: "Process & Engineering",
    title: "Label Management",
    slug: "label-management",
    importance: "Recommended",
    summary: text(
      "Configure the labels and print behavior used by production and packaging workflows.",
      "Production மற்றும் packaging workflows பயன்படுத்தும் labels மற்றும் print behavior-ஐ configure செய்யுங்கள்.",
      "Production మరియు packaging workflows ఉపయోగించే labels మరియు print behavior‌ను configure చేయండి.",
    ),
  },
  {
    module: "Process & Engineering",
    title: "Identifier Management",
    slug: "product-identifiers",
    sourceSlug: "product-identifiers",
    summary: text(
      "Configure controlled identifier patterns and generation rules for Products and units.",
      "Products மற்றும் units-க்கு controlled identifier patterns மற்றும் generation rules-ஐ அமைக்கவும்.",
      "Products మరియు units కోసం controlled identifier patterns మరియు generation rules‌ను configure చేయండి.",
    ),
  },

  // Quality
  {
    module: "Quality",
    title: "Quality Dashboard",
    slug: "quality-dashboard",
    importance: "Recommended",
    summary: text(
      "Monitor inspection volume, defects, holds, NCRs, CAPAs, and ageing from one quality overview.",
      "Inspection volume, defects, holds, NCRs, CAPAs, மற்றும் ageing-ஐ ஒரே quality overview-ல் monitor செய்யுங்கள்.",
      "Inspection volume, defects, holds, NCRs, CAPAs, మరియు ageing‌ను ఒకే quality overview‌లో monitor చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Quality Alerts",
    slug: "quality-alerts",
    importance: "Recommended",
    summary: text(
      "Review triggered quality warnings and escalations and open the source record for action.",
      "Trigger ஆன quality warnings மற்றும் escalations-ஐ review செய்து, action-க்கு source record-ஐ திறக்கவும்.",
      "Trigger అయిన quality warnings మరియు escalations‌ను review చేసి, action కోసం source record‌ను తెరవండి.",
    ),
  },
  {
    module: "Quality",
    title: "Alert Rules",
    slug: "alert-rules",
    importance: "Recommended",
    summary: text(
      "Configure the quality conditions, thresholds, scope, and response that create alerts.",
      "Quality alerts உருவாகும் conditions, thresholds, scope, மற்றும் response-ஐ configure செய்யுங்கள்.",
      "Quality alerts సృష్టించే conditions, thresholds, scope, మరియు response‌ను configure చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Defects",
    slug: "defects",
    summary: text(
      "Record confirmed quality defects with the affected unit, evidence, severity, and current status.",
      "பாதிக்கப்பட்ட unit, evidence, severity, மற்றும் current status-உடன் confirmed quality defects-ஐ பதிவு செய்யுங்கள்.",
      "ప్రభావిత unit, evidence, severity, మరియు current status‌తో confirmed quality defects‌ను నమోదు చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Dispositions",
    slug: "dispositions",
    summary: text(
      "Choose and track the approved outcome for nonconforming material or units.",
      "Nonconforming material அல்லது units-க்கு approved outcome-ஐ தேர்வு செய்து track செய்யுங்கள்.",
      "Nonconforming material లేదా units కోసం approved outcome‌ను ఎంచుకుని track చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Hold Management",
    slug: "hold-management",
    summary: text(
      "Place affected material or units on hold, preserve the reason, and control their release.",
      "பாதிக்கப்பட்ட material அல்லது units-ஐ hold-ல் வைத்து, reason-ஐ பதிவு செய்து, release-ஐ கட்டுப்படுத்துங்கள்.",
      "ప్రభావిత material లేదా units‌ను hold‌లో ఉంచి, reason‌ను నమోదు చేసి, release‌ను నియంత్రించండి.",
    ),
  },
  {
    module: "Quality",
    title: "Disposition Approvals",
    slug: "disposition-approvals",
    summary: text(
      "Review pending disposition decisions and approve or reject them with traceable evidence.",
      "Pending disposition decisions-ஐ review செய்து, trace செய்யக்கூடிய evidence-உடன் approve அல்லது reject செய்யுங்கள்.",
      "Pending disposition decisions‌ను review చేసి, trace చేయగల evidence‌తో approve లేదా reject చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Control Points",
    slug: "control-points",
    summary: text(
      "Define where quality checks occur, what is measured, and which result is required to continue.",
      "Quality checks எங்கு நடக்க வேண்டும், என்ன measure செய்ய வேண்டும், continue செய்ய எந்த result தேவை என்பதை அமைக்கவும்.",
      "Quality checks ఎక్కడ జరగాలి, ఏమి measure చేయాలి, కొనసాగడానికి ఏ result అవసరమో నిర్వచించండి.",
    ),
  },
  {
    module: "Quality",
    title: "Process Audits",
    slug: "process-audits",
    importance: "Recommended",
    summary: text(
      "Plan and record audits that verify the process is being followed as defined.",
      "Process வரையறுத்தபடி பின்பற்றப்படுகிறதா என்பதை verify செய்ய audits-ஐ plan செய்து பதிவு செய்யுங்கள்.",
      "Process నిర్వచించిన విధంగా అనుసరించబడుతోందో verify చేయడానికి audits‌ను plan చేసి నమోదు చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "NCR Reports",
    slug: "ncr-reports",
    summary: text(
      "Document nonconformance, containment, ownership, investigation, and final disposition.",
      "Nonconformance, containment, owner, investigation, மற்றும் final disposition-ஐ பதிவு செய்யுங்கள்.",
      "Nonconformance, containment, owner, investigation, మరియు final disposition‌ను నమోదు చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "CAPA",
    slug: "capa",
    summary: text(
      "Track corrective and preventive actions from root cause through verification of effectiveness.",
      "Root cause முதல் effectiveness verification வரை corrective மற்றும் preventive actions-ஐ track செய்யுங்கள்.",
      "Root cause నుంచి effectiveness verification వరకు corrective మరియు preventive actions‌ను track చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Quality Inspections",
    slug: "quality-inspections",
    summary: text(
      "Perform required inspections, capture measurements and evidence, and record the result.",
      "தேவையான inspections-ஐ செய்து, measurements மற்றும் evidence-ஐ capture செய்து, result-ஐ பதிவு செய்யுங்கள்.",
      "అవసరమైన inspections చేసి, measurements మరియు evidence‌ను capture చేసి, result‌ను నమోదు చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Offline Testing",
    slug: "offline-testing",
    importance: "Conditional",
    summary: text(
      "Record test work performed outside the live station flow and link the result to the correct unit.",
      "Live Station flow-க்கு வெளியே செய்த test work-ஐ பதிவு செய்து, result-ஐ சரியான unit-உடன் link செய்யுங்கள்.",
      "Live Station flow బయట చేసిన test work‌ను నమోదు చేసి, result‌ను సరైన unit‌తో link చేయండి.",
    ),
  },
  {
    module: "Quality",
    title: "Quality Settings",
    slug: "quality-settings",
    importance: "Recommended",
    summary: text(
      "Configure the shared quality behavior and defaults used across inspections and exceptions.",
      "Inspections மற்றும் exceptions முழுவதும் பயன்படுத்தும் shared quality behavior மற்றும் defaults-ஐ configure செய்யுங்கள்.",
      "Inspections మరియు exceptions అంతటా ఉపయోగించే shared quality behavior మరియు defaults‌ను configure చేయండి.",
    ),
  },

  // Scrap & Teardown
  {
    module: "Scrap & Teardown",
    title: "Scrap Register",
    slug: "scrap-register",
    summary: text(
      "Review every scrap record with its material, quantity, reason, approval, and traceability context.",
      "ஒவ்வொரு scrap record-ஐ material, quantity, reason, approval, மற்றும் traceability context-உடன் review செய்யுங்கள்.",
      "ప్రతి scrap record‌ను material, quantity, reason, approval, మరియు traceability context‌తో review చేయండి.",
    ),
  },
  {
    module: "Scrap & Teardown",
    title: "Scrap Analytics",
    slug: "scrap-analytics",
    importance: "Recommended",
    summary: text(
      "Analyse scrap volume, cost, reasons, Products, Lines, Stations, and trends.",
      "Scrap volume, cost, reasons, Products, Lines, Stations, மற்றும் trends-ஐ analyse செய்யுங்கள்.",
      "Scrap volume, cost, reasons, Products, Lines, Stations, మరియు trends‌ను analyse చేయండి.",
    ),
  },
  {
    module: "Scrap & Teardown",
    title: "Teardown Queue",
    slug: "teardown-queue",
    summary: text(
      "Process approved teardown work and recover eligible components without breaking genealogy.",
      "Approved teardown work-ஐ process செய்து, genealogy பாதிக்காமல் eligible components-ஐ recover செய்யுங்கள்.",
      "Approved teardown work‌ను process చేసి, genealogy దెబ్బతినకుండా eligible components‌ను recover చేయండి.",
    ),
  },
  {
    module: "Scrap & Teardown",
    title: "Scrap Reasons",
    slug: "scrap-reasons",
    importance: "Recommended",
    summary: text(
      "Maintain a controlled reason list so equivalent scrap causes are reported consistently.",
      "ஒரே மாதிரியான scrap causes ஒரே விதமாக report ஆக controlled reason list-ஐ maintain செய்யுங்கள்.",
      "ఒకే రకమైన scrap causes ఒకే విధంగా report అయ్యేలా controlled reason list‌ను maintain చేయండి.",
    ),
  },

  // Traceability
  {
    module: "Traceability",
    title: "Recall Notices",
    slug: "recall-notices",
    summary: text(
      "Create and track recall scope, affected units or batches, actions, and completion evidence.",
      "Recall scope, பாதிக்கப்பட்ட units அல்லது batches, actions, மற்றும் completion evidence-ஐ உருவாக்கி track செய்யுங்கள்.",
      "Recall scope, ప్రభావిత units లేదా batches, actions, మరియు completion evidence‌ను సృష్టించి track చేయండి.",
    ),
  },
  {
    module: "Traceability",
    title: "Certificates",
    slug: "certificates",
    importance: "Conditional",
    summary: text(
      "Manage traceable certificates linked to the correct Product, batch, unit, or shipment.",
      "சரியான Product, batch, unit, அல்லது shipment-உடன் link ஆன traceable certificates-ஐ நிர்வகியுங்கள்.",
      "సరైన Product, batch, unit, లేదా shipment‌తో link అయిన traceable certificates‌ను నిర్వహించండి.",
    ),
  },
  {
    module: "Traceability",
    title: "Batch Genealogy",
    slug: "batch-genealogy",
    summary: text(
      "Follow parent and child batch relationships from received material to finished output.",
      "Received material முதல் finished output வரை parent மற்றும் child batch relationships-ஐ trace செய்யுங்கள்.",
      "Received material నుంచి finished output వరకు parent మరియు child batch relationships‌ను trace చేయండి.",
    ),
  },
  {
    module: "Traceability",
    title: "Unit History",
    slug: "unit-history",
    summary: text(
      "Review a serialized unit's complete production, quality, repair, packaging, and shipment history.",
      "ஒரு serialized unit-ன் முழு production, quality, repair, packaging, மற்றும் shipment history-ஐ review செய்யுங்கள்.",
      "ఒక serialized unit పూర్తి production, quality, repair, packaging, మరియు shipment history‌ను review చేయండి.",
    ),
  },
  {
    module: "Traceability",
    title: "Master Traceability",
    slug: "master-traceability",
    summary: text(
      "Search across materials, lots, serials, Work Orders, Products, and linked manufacturing records.",
      "Materials, lots, serials, Work Orders, Products, மற்றும் linked manufacturing records முழுவதும் search செய்யுங்கள்.",
      "Materials, lots, serials, Work Orders, Products, మరియు linked manufacturing records అంతటా search చేయండి.",
    ),
  },

  // Packaging & Shipping
  {
    module: "Packaging & Shipping",
    title: "Packaging",
    slug: "packaging",
    sourceSlug: "packaging",
    summary: text(
      "Pack eligible finished units into the correct packaging structure and record the result.",
      "Eligible finished units-ஐ சரியான packaging structure-ல் pack செய்து, result-ஐ பதிவு செய்யுங்கள்.",
      "Eligible finished units‌ను సరైన packaging structure‌లో pack చేసి, result‌ను నమోదు చేయండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "Shipments",
    slug: "shipments",
    summary: text(
      "Create and monitor shipments, their containers, destination, status, and dispatch evidence.",
      "Shipments, அவற்றின் containers, destination, status, மற்றும் dispatch evidence-ஐ உருவாக்கி monitor செய்யுங்கள்.",
      "Shipments, వాటి containers, destination, status, మరియు dispatch evidence‌ను సృష్టించి monitor చేయండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "Container Comparison",
    slug: "container-comparison",
    importance: "Conditional",
    summary: text(
      "Compare container contents and identifiers to find missing, extra, or mismatched units.",
      "Missing, extra, அல்லது mismatched units-ஐ கண்டுபிடிக்க container contents மற்றும் identifiers-ஐ compare செய்யுங்கள்.",
      "Missing, extra, లేదా mismatched units‌ను కనుగొనడానికి container contents మరియు identifiers‌ను compare చేయండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "Shipment Verification",
    slug: "shipment-verification",
    sourceSlug: "shipment-verification",
    summary: text(
      "Verify shipment contents and required checks before dispatch is allowed.",
      "Dispatch அனுமதிக்கும் முன் shipment contents மற்றும் required checks-ஐ verify செய்யுங்கள்.",
      "Dispatch అనుమతించే ముందు shipment contents మరియు required checks‌ను verify చేయండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "Shipment Rules",
    slug: "shipment-rules",
    importance: "Recommended",
    summary: text(
      "Configure the checks and conditions that a shipment must satisfy before dispatch.",
      "Dispatch-க்கு முன் shipment satisfy செய்ய வேண்டிய checks மற்றும் conditions-ஐ configure செய்யுங்கள்.",
      "Dispatch‌కు ముందు shipment satisfy చేయాల్సిన checks మరియు conditions‌ను configure చేయండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "Packaging Rules",
    slug: "packaging-rules",
    importance: "Recommended",
    summary: text(
      "Define eligible packaging, capacity, nesting, and content rules for Products and units.",
      "Products மற்றும் units-க்கு eligible packaging, capacity, nesting, மற்றும் content rules-ஐ அமைக்கவும்.",
      "Products మరియు units కోసం eligible packaging, capacity, nesting, మరియు content rules‌ను నిర్వచించండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "Shipping Gating",
    slug: "shipping-gating",
    summary: text(
      "Block shipment until required production, quality, packaging, and verification gates are complete.",
      "Required production, quality, packaging, மற்றும் verification gates complete ஆகும் வரை shipment-ஐ block செய்யுங்கள்.",
      "Required production, quality, packaging, మరియు verification gates complete అయ్యే వరకు shipment‌ను block చేయండి.",
    ),
  },
  {
    module: "Packaging & Shipping",
    title: "ASN Templates",
    slug: "asn-templates",
    importance: "Conditional",
    summary: text(
      "Create reusable Advance Shipping Notice formats for outbound shipment communication.",
      "Outbound shipment communication-க்கு மீண்டும் பயன்படுத்தக்கூடிய Advance Shipping Notice formats உருவாக்குங்கள்.",
      "Outbound shipment communication కోసం మళ్లీ ఉపయోగించగల Advance Shipping Notice formats సృష్టించండి.",
    ),
  },

  // Shifts & Labor
  {
    module: "Shifts & Labor",
    title: "Shift Definitions",
    slug: "shifts",
    sourceSlug: "shifts",
    summary: text(
      "Define reusable Shift names, codes, working times, and break structure.",
      "மீண்டும் பயன்படுத்தக்கூடிய Shift names, codes, working times, மற்றும் break structure-ஐ அமைக்கவும்.",
      "మళ్లీ ఉపయోగించగల Shift names, codes, working times, మరియు break structure‌ను నిర్వచించండి.",
    ),
  },
  {
    module: "Shifts & Labor",
    title: "Shift Schedules",
    slug: "shift-schedules",
    summary: text(
      "Apply Shift Definitions to the required dates, Sites, Lines, and operating coverage.",
      "Shift Definitions-ஐ தேவையான dates, Sites, Lines, மற்றும் operating coverage-க்கு apply செய்யுங்கள்.",
      "Shift Definitions‌ను అవసరమైన dates, Sites, Lines, మరియు operating coverage‌కు apply చేయండి.",
    ),
  },
  {
    module: "Shifts & Labor",
    title: "Shift Calendar",
    slug: "shift-calendar",
    importance: "Recommended",
    summary: text(
      "Review scheduled coverage, overlaps, gaps, holidays, and upcoming Shift assignments by date.",
      "Date வாரியாக scheduled coverage, overlaps, gaps, holidays, மற்றும் upcoming Shift assignments-ஐ review செய்யுங்கள்.",
      "Date వారీగా scheduled coverage, overlaps, gaps, holidays, మరియు upcoming Shift assignments‌ను review చేయండి.",
    ),
  },
  {
    module: "Shifts & Labor",
    title: "Operator Shifts",
    slug: "operator-shifts",
    summary: text(
      "Assign operators to the correct Shift and operating scope and review their current assignment.",
      "Operators-ஐ சரியான Shift மற்றும் operating scope-க்கு assign செய்து, current assignment-ஐ review செய்யுங்கள்.",
      "Operators‌ను సరైన Shift మరియు operating scope‌కు assign చేసి, current assignment‌ను review చేయండి.",
    ),
  },
  {
    module: "Shifts & Labor",
    title: "Shift Handovers",
    slug: "shift-handovers",
    summary: text(
      "Record open work, risks, exceptions, and ownership when one Shift hands work to the next.",
      "ஒரு Shift அடுத்த Shift-க்கு work கொடுக்கும்போது open work, risks, exceptions, மற்றும் owner details-ஐ பதிவு செய்யுங்கள்.",
      "ఒక Shift తదుపరి Shift‌కు work అప్పగించినప్పుడు open work, risks, exceptions, మరియు owner details‌ను నమోదు చేయండి.",
    ),
  },
  {
    module: "Shifts & Labor",
    title: "Break Logs",
    slug: "break-logs",
    importance: "Recommended",
    summary: text(
      "Review the actual break events recorded for operators and Shifts.",
      "Operators மற்றும் Shifts-க்கு பதிவு செய்யப்பட்ட actual break events-ஐ review செய்யுங்கள்.",
      "Operators మరియు Shifts కోసం నమోదు చేసిన actual break events‌ను review చేయండి.",
    ),
  },
  {
    module: "Shifts & Labor",
    title: "Break Compliance",
    slug: "break-compliance",
    importance: "Recommended",
    summary: text(
      "Compare planned and actual breaks and investigate missing, late, or excessive break events.",
      "Planned மற்றும் actual breaks-ஐ compare செய்து, missing, late, அல்லது excessive break events-ஐ investigate செய்யுங்கள்.",
      "Planned మరియు actual breaks‌ను compare చేసి, missing, late, లేదా excessive break events‌ను investigate చేయండి.",
    ),
  },
];

const genericCopy: Record<
  CookbookLang,
  {
    prerequisite: string;
    scope: string;
    review: (title: string) => string;
    act: string;
    verify: string;
    rules: string[];
    checklist: string[];
  }
> = {
  en: {
    prerequisite: "The required source records or configuration context must already exist",
    scope: "Use the available search, date, status, and scope filters to select the correct records.",
    review: (title) => `Review the records, status, and available actions shown in ${title}.`,
    act: "Open the relevant action, complete every required field, and review the result before saving or submitting.",
    verify: "Confirm the saved result, new status, linked records, and history before leaving the page.",
    rules: [
      "Use only the actions allowed by the current status and your permission.",
      "Confirm the selected record and filter scope before changing data.",
      "After saving, verify the resulting status and traceable history.",
    ],
    checklist: [
      "The correct record and scope are selected",
      "Required details and evidence are complete",
      "The expected status or history update is visible",
    ],
  },
  ta: {
    prerequisite: "தேவையான source records அல்லது configuration context முன்பே இருக்க வேண்டும்",
    scope: "கிடைக்கும் search, date, status, மற்றும் scope filters மூலம் சரியான records-ஐ தேர்வு செய்யுங்கள்.",
    review: (title) => `${title}-ல் உள்ள records, status, மற்றும் available actions-ஐ review செய்யுங்கள்.`,
    act: "தேவையான action-ஐ திறந்து, எல்லா required fields-ஐ நிரப்பி, save அல்லது submit செய்வதற்கு முன் result-ஐ review செய்யுங்கள்.",
    verify: "Page-ஐ விட்டு வெளியேறும் முன் saved result, new status, linked records, மற்றும் history-ஐ verify செய்யுங்கள்.",
    rules: [
      "Current status மற்றும் உங்கள் permission அனுமதிக்கும் actions மட்டும் பயன்படுத்துங்கள்.",
      "Data மாற்றும் முன் selected record மற்றும் filter scope சரியா என்று உறுதிசெய்யுங்கள்.",
      "Save செய்த பிறகு resulting status மற்றும் traceable history-ஐ verify செய்யுங்கள்.",
    ],
    checklist: [
      "சரியான record மற்றும் scope தேர்வு செய்யப்பட்டுள்ளது",
      "Required details மற்றும் evidence முழுமையாக உள்ளது",
      "Expected status அல்லது history update தெரிகிறது",
    ],
  },
  te: {
    prerequisite: "అవసరమైన source records లేదా configuration context ముందుగానే ఉండాలి",
    scope: "అందుబాటులో ఉన్న search, date, status, మరియు scope filters‌తో సరైన records‌ను ఎంచుకోండి.",
    review: (title) => `${title}లో ఉన్న records, status, మరియు available actions‌ను review చేయండి.`,
    act: "అవసరమైన action‌ను తెరిచి, అన్ని required fields పూర్తి చేసి, save లేదా submit చేసే ముందు result‌ను review చేయండి.",
    verify: "Page నుంచి బయటకు వెళ్లే ముందు saved result, new status, linked records, మరియు history‌ను verify చేయండి.",
    rules: [
      "Current status మరియు మీ permission అనుమతించే actions మాత్రమే ఉపయోగించండి.",
      "Data మార్చే ముందు selected record మరియు filter scope సరైందో నిర్ధారించండి.",
      "Save చేసిన తర్వాత resulting status మరియు traceable history‌ను verify చేయండి.",
    ],
    checklist: [
      "సరైన record మరియు scope ఎంచుకున్నారు",
      "Required details మరియు evidence పూర్తిగా ఉన్నాయి",
      "Expected status లేదా history update కనిపిస్తోంది",
    ],
  },
};

export function getForgeLiveModulePages(
  lang: CookbookLang,
  sourcePages: Map<string, LiveModuleGuidePage>,
): LiveModuleGuidePage[] {
  const copy = genericCopy[lang];

  return definitions.map((definition) => {
    const source = definition.sourceSlug
      ? sourcePages.get(definition.sourceSlug)
      : undefined;
    const openStep = `Mfg → ${definition.module} → ${definition.title}`;

    if (source) {
      return {
        ...source,
        title: definition.title,
        slug: definition.slug,
        summary: definition.summary[lang],
        importance: definition.importance ?? source.importance,
      };
    }

    return {
      title: definition.title,
      slug: definition.slug,
      summary: definition.summary[lang],
      importance: definition.importance ?? "Conditional",
      prerequisites: [copy.prerequisite],
      flow: [
        definition.title,
        lang === "en" ? "Set the scope" : lang === "ta" ? "Scope அமைக்கவும்" : "Scope సెట్ చేయండి",
        lang === "en" ? "Review and act" : lang === "ta" ? "Review செய்து action எடுக்கவும்" : "Review చేసి action తీసుకోండి",
        lang === "en" ? "Verify the result" : lang === "ta" ? "Result-ஐ verify செய்யவும்" : "Result‌ను verify చేయండి",
      ],
      steps: [
        `${lang === "en" ? "Open" : lang === "ta" ? "திறக்கவும்" : "తెరవండి"}: ${openStep}.`,
        copy.scope,
        copy.review(definition.title),
        copy.act,
        copy.verify,
      ],
      rules: copy.rules,
      checklist: copy.checklist,
    };
  });
}
