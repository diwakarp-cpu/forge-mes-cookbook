import type { CookbookLang } from "./forge-i18n";
import { getForgeRepairPages } from "./forge-repair-pages";

export type SupplementalGuidePage = {
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

const pages: Record<CookbookLang, SupplementalGuidePage[]> = {
  en: [
    ...getForgeRepairPages("en"),
    {
      title: "Create and Manage Templates",
      slug: "templates",
      summary:
        "Create reusable serial-number, document, label, parser, and validator templates for process execution.",
      importance: "Recommended",
      prerequisites: ["Know where the template will be used and which data it needs"],
      diagram: {
        intro:
          "A Template turns a reusable format or rule into a governed process asset. Choose the use first, then define, test, and activate the Template.",
        nodes: [
          {
            title: "Choose the use",
            description:
              "Decide whether the Template will generate serials, render PDF/HTML or ZPL content, parse scanned data, or validate an identifier.",
            relation: "determines the available editor and variables",
            category: "Plan",
          },
          {
            title: "Set identity and type",
            description:
              "Template Name and Template Type are required. Description and Context Type are optional.",
            relation: "defines how the Template can be configured",
            category: "Required",
          },
          {
            title: "Build the content",
            description:
              "Write the pattern or content, load a sample when useful, and use only variables supplied by the selected context.",
            relation: "creates a reusable output or validation rule",
            category: "Configure",
          },
          {
            title: "Preview and verify",
            description:
              "Review the output with representative data before saving so missing variables and formatting problems are visible.",
            relation: "makes the Template safe to activate",
            category: "Verify",
          },
          {
            title: "Save and govern",
            description:
              "Keep the Template Active only when it is ready for use. Use My Approvals and change history when governance applies.",
            category: "Control",
          },
        ],
      },
      flow: [
        "Choose the Template use",
        "Set required identity",
        "Build the content",
        "Preview with data",
        "Save and govern",
      ],
      steps: [
        "Open Templates from Process & Engineering and start a manual or AI-assisted Template.",
        "Enter the required Template Name and select the required Template Type.",
        "Add the content, variables, pattern, parser, or validation rule required by the selected type.",
        "Preview the result with representative data, then save it in the correct Active state.",
      ],
      rules: [
        "Template Name and Template Type are required; Description and Context Type are optional.",
        "Context Type controls which data sources are available as variables; leaving it empty provides the broadest flexibility.",
        "A label Template defines printable content, while Label Management controls how labels are configured and used.",
        "Do not activate a Template until its output has been previewed with realistic data.",
      ],
      checklist: [
        "The Template has a clear name, correct type, and appropriate context.",
        "The content uses valid variables and produces the expected preview.",
        "The Active state and any required approval match the intended use.",
      ],
    },
    {
      title: "Create a Production Order",
      slug: "create-production-order",
      summary:
        "Create an optional grouping record for related Work Orders, a client, and a planned production window.",
      importance: "Conditional",
      prerequisites: ["Production Order vs Work Order"],
      diagram: {
        intro:
          "A Production Order groups related Work Orders for planning and monitoring. It does not release production or create unit-level work by itself.",
        nodes: [
          {
            title: "Define the group",
            description:
              "Give the Production Order a required Name and unique Order Number.",
            relation: "creates the identity used to group work",
            category: "Required",
          },
          {
            title: "Set optional scope",
            description:
              "Select a Client only when the group must be restricted to that Client's Work Orders.",
            relation: "controls which Work Orders are eligible",
            category: "Conditional",
          },
          {
            title: "Add planning context",
            description:
              "Add a description, planned Start Date and End Date, and optional metadata when they help planning or reporting.",
            relation: "provides the intended production window",
            category: "Optional",
          },
          {
            title: "Create the order",
            description:
              "Review the details and create the Production Order. It begins as a grouping record, not executable production.",
            relation: "makes the group available to related Work Orders",
            category: "Create",
          },
          {
            title: "Link and monitor work",
            description:
              "Add or associate eligible Work Orders and monitor their combined progress from the Production Order.",
            category: "Monitor",
          },
        ],
      },
      flow: [
        "Name the Production Order",
        "Set optional Client scope",
        "Add dates and context",
        "Create the grouping record",
        "Link and monitor Work Orders",
      ],
      steps: [
        "Open Production Orders and choose Create Production Order.",
        "Enter the required Name and unique Order Number.",
        "Optionally select a Client, add a description, planned dates, and metadata.",
        "Create the Production Order, then connect eligible Work Orders to the group.",
      ],
      rules: [
        "Name and Order Number are required; the Order Number must uniquely identify the Production Order.",
        "Client is optional, but selecting one restricts the Work Orders that can belong to the Production Order.",
        "Description, Start Date, End Date, and metadata are optional planning fields.",
        "A Production Order groups Work Orders; only Work Orders create executable quantities and Production Tasks.",
      ],
      checklist: [
        "The Production Order appears with the correct Name and Order Number.",
        "Client scope and planned dates match the intended group.",
        "Only eligible related Work Orders are connected to the Production Order.",
      ],
    },
  ],
  ta: [
    ...getForgeRepairPages("ta"),
    {
      title: "Templates-ஐ உருவாக்கி நிர்வகியுங்கள்",
      slug: "templates",
      summary:
        "Process execution-க்கு மீண்டும் பயன்படுத்தக்கூடிய serial-number, document, label, parser, மற்றும் validator Templates உருவாக்குங்கள்.",
      importance: "Recommended",
      prerequisites: ["Template எங்கு பயன்படுத்தப்படும், எந்த data தேவை என்பதைத் தெரிந்திருக்க வேண்டும்"],
      diagram: {
        intro:
          "ஒரு format அல்லது rule-ஐ மீண்டும் பயன்படுத்தக்கூடிய process asset-ஆக Template மாற்றுகிறது. முதலில் பயன்பாட்டைத் தேர்ந்தெடுத்து, பிறகு Template-ஐ அமைத்து, test செய்து, activate செய்யுங்கள்.",
        nodes: [
          {
            title: "பயன்பாட்டைத் தேர்ந்தெடுங்கள்",
            description:
              "Template serial உருவாக்குமா, PDF/HTML அல்லது ZPL content காட்டுமா, scanned data-ஐ parse செய்யுமா, identifier-ஐ validate செய்யுமா என்பதை முடிவு செய்யுங்கள்.",
            relation: "கிடைக்கும் editor மற்றும் variables-ஐ தீர்மானிக்கிறது",
            category: "திட்டம்",
          },
          {
            title: "Identity மற்றும் type அமைக்கவும்",
            description:
              "Template Name மற்றும் Template Type கட்டாயம். Description மற்றும் Context Type விருப்பமானவை.",
            relation: "Template எப்படி configure செய்யப்படும் என்பதை வரையறுக்கிறது",
            category: "கட்டாயம்",
          },
          {
            title: "Content உருவாக்குங்கள்",
            description:
              "Pattern அல்லது content எழுதுங்கள், தேவையானால் sample load செய்யுங்கள், தேர்ந்தெடுத்த context தரும் variables மட்டும் பயன்படுத்துங்கள்.",
            relation: "மீண்டும் பயன்படுத்தக்கூடிய output அல்லது validation rule உருவாக்குகிறது",
            category: "அமைப்பு",
          },
          {
            title: "Preview செய்து சரிபார்க்கவும்",
            description:
              "Save செய்வதற்கு முன் realistic data கொண்டு output-ஐ review செய்து missing variables மற்றும் formatting பிரச்சினைகளைப் பாருங்கள்.",
            relation: "Template-ஐ activate செய்ய பாதுகாப்பாக மாற்றுகிறது",
            category: "சரிபார்ப்பு",
          },
          {
            title: "Save செய்து கட்டுப்படுத்துங்கள்",
            description:
              "Template பயன்படுத்தத் தயாரானபோது மட்டும் Active-ஆக வைத்துக்கொள்ளுங்கள். Governance தேவைப்பட்டால் My Approvals மற்றும் change history பயன்படுத்துங்கள்.",
            category: "கட்டுப்பாடு",
          },
        ],
      },
      flow: ["Template பயன்பாடு", "தேவையான identity", "Content", "Preview", "Save மற்றும் governance"],
      steps: [
        "Process & Engineering-இல் Templates திறந்து manual அல்லது AI-assisted Template தொடங்குங்கள்.",
        "கட்டாய Template Name உள்ளிட்டு, கட்டாய Template Type தேர்ந்தெடுங்கள்.",
        "தேர்ந்தெடுத்த type-க்கு தேவையான content, variables, pattern, parser, அல்லது validation rule சேர்க்குங்கள்.",
        "Realistic data கொண்டு preview செய்து, சரியான Active state-இல் save செய்யுங்கள்.",
      ],
      rules: [
        "Template Name மற்றும் Template Type கட்டாயம்; Description மற்றும் Context Type விருப்பமானவை.",
        "Context Type கிடைக்கும் data sources மற்றும் variables-ஐ கட்டுப்படுத்துகிறது; அதை காலியாக விட்டால் அதிக flexibility கிடைக்கும்.",
        "Label Template printable content-ஐ வரையறுக்கிறது; Label Management labels எப்படி பயன்படுத்தப்பட வேண்டும் என்பதை நிர்வகிக்கிறது.",
        "Realistic data கொண்டு preview செய்யாமல் Template-ஐ activate செய்யாதீர்கள்.",
      ],
      checklist: [
        "Template-க்கு தெளிவான name, சரியான type, மற்றும் பொருத்தமான context உள்ளது.",
        "Content valid variables பயன்படுத்தி எதிர்பார்த்த preview-ஐ தருகிறது.",
        "Active state மற்றும் தேவையான approval பயன்பாட்டுடன் பொருந்துகிறது.",
      ],
    },
    {
      title: "Production Order உருவாக்குங்கள்",
      slug: "create-production-order",
      summary:
        "தொடர்புடைய Work Orders, Client, மற்றும் planned production window-ஐ group செய்ய விருப்பமான Production Order உருவாக்குங்கள்.",
      importance: "Conditional",
      prerequisites: ["Production Order vs Work Order"],
      diagram: {
        intro:
          "Production Order தொடர்புடைய Work Orders-ஐ planning மற்றும் monitoring-க்கு group செய்கிறது. அது தனியாக production-ஐ release செய்யாது அல்லது unit-level work உருவாக்காது.",
        nodes: [
          {
            title: "Group-ஐ வரையறுக்கவும்",
            description: "கட்டாய Name மற்றும் unique Order Number கொடுங்கள்.",
            relation: "Work Orders-ஐ group செய்யும் identity-ஐ உருவாக்குகிறது",
            category: "கட்டாயம்",
          },
          {
            title: "விருப்ப scope அமைக்கவும்",
            description:
              "இந்த group ஒரு Client-ன் Work Orders-க்கு மட்டும் இருக்க வேண்டுமெனில் Client தேர்ந்தெடுங்கள்.",
            relation: "எந்த Work Orders தகுதியானவை என்பதை கட்டுப்படுத்துகிறது",
            category: "தேவைப்பட்டால்",
          },
          {
            title: "Planning context சேர்க்கவும்",
            description:
              "Planning அல்லது reporting-க்கு உதவுமானால் description, planned Start Date, End Date, மற்றும் metadata சேர்க்குங்கள்.",
            relation: "எதிர்பார்க்கப்படும் production window-ஐ காட்டுகிறது",
            category: "விருப்பம்",
          },
          {
            title: "Order-ஐ உருவாக்குங்கள்",
            description:
              "விவரங்களை review செய்து Production Order உருவாக்குங்கள். இது executable production அல்ல; grouping record.",
            relation: "தொடர்புடைய Work Orders-க்கு group-ஐ தயாராக்குகிறது",
            category: "உருவாக்கம்",
          },
          {
            title: "Work-ஐ இணைத்து கண்காணிக்கவும்",
            description:
              "தகுதியான Work Orders-ஐ இணைத்து, அவற்றின் மொத்த progress-ஐ Production Order-இல் கண்காணியுங்கள்.",
            category: "கண்காணிப்பு",
          },
        ],
      },
      flow: ["Production Order identity", "Client scope", "Dates மற்றும் context", "Group உருவாக்கம்", "Work Orders கண்காணிப்பு"],
      steps: [
        "Production Orders திறந்து Create Production Order தேர்ந்தெடுங்கள்.",
        "கட்டாய Name மற்றும் unique Order Number உள்ளிடுங்கள்.",
        "தேவையானால் Client, description, planned dates, மற்றும் metadata சேர்க்குங்கள்.",
        "Production Order உருவாக்கி, தகுதியான Work Orders-ஐ அதனுடன் இணைக்குங்கள்.",
      ],
      rules: [
        "Name மற்றும் Order Number கட்டாயம்; Order Number Production Order-ஐ தனித்துவமாக அடையாளம் காட்ட வேண்டும்.",
        "Client விருப்பமானது; அதைத் தேர்ந்தெடுத்தால் அந்த Client-ன் Work Orders மட்டும் சேர்க்க முடியும்.",
        "Description, Start Date, End Date, மற்றும் metadata விருப்பமான planning fields.",
        "Production Order Work Orders-ஐ group செய்கிறது; Work Orders மட்டும் executable quantity மற்றும் Production Tasks உருவாக்கும்.",
      ],
      checklist: [
        "Production Order சரியான Name மற்றும் Order Number-உடன் தெரிகிறது.",
        "Client scope மற்றும் planned dates எதிர்பார்த்த group-உடன் பொருந்துகின்றன.",
        "தகுதியான தொடர்புடைய Work Orders மட்டும் Production Order-க்கு இணைக்கப்பட்டுள்ளன.",
      ],
    },
  ],
  te: [
    ...getForgeRepairPages("te"),
    {
      title: "Templates సృష్టించి నిర్వహించండి",
      slug: "templates",
      summary:
        "Process execution కోసం మళ్లీ ఉపయోగించగల serial-number, document, label, parser, మరియు validator Templates సృష్టించండి.",
      importance: "Recommended",
      prerequisites: ["Template ఎక్కడ ఉపయోగిస్తారు, ఏ data అవసరమో తెలుసుకోవాలి"],
      diagram: {
        intro:
          "ఒక format లేదా rule‌ను మళ్లీ ఉపయోగించగల process asset‌గా Template మార్చుతుంది. ముందుగా ఉపయోగాన్ని ఎంచుకుని, తర్వాత Template‌ను configure చేసి, test చేసి, activate చేయండి.",
        nodes: [
          {
            title: "ఉపయోగాన్ని ఎంచుకోండి",
            description:
              "Template serials సృష్టించాలా, PDF/HTML లేదా ZPL content చూపాలా, scanned data parse చేయాలా, identifier validate చేయాలా నిర్ణయించండి.",
            relation: "అందుబాటులో ఉన్న editor మరియు variables‌ను నిర్ణయిస్తుంది",
            category: "ప్లాన్",
          },
          {
            title: "Identity మరియు type సెట్ చేయండి",
            description:
              "Template Name మరియు Template Type తప్పనిసరి. Description మరియు Context Type optional.",
            relation: "Template ఎలా configure చేయాలో నిర్వచిస్తుంది",
            category: "తప్పనిసరి",
          },
          {
            title: "Content నిర్మించండి",
            description:
              "Pattern లేదా content రాసి, అవసరమైతే sample load చేసి, ఎంచుకున్న context ఇచ్చే variables మాత్రమే ఉపయోగించండి.",
            relation: "మళ్లీ ఉపయోగించగల output లేదా validation rule సృష్టిస్తుంది",
            category: "కాన్ఫిగర్",
          },
          {
            title: "Preview చేసి verify చేయండి",
            description:
              "Save చేసే ముందు realistic dataతో output‌ను review చేసి missing variables మరియు formatting సమస్యలను చూడండి.",
            relation: "Template‌ను activate చేయడానికి సురక్షితంగా చేస్తుంది",
            category: "వెరిఫై",
          },
          {
            title: "Save చేసి govern చేయండి",
            description:
              "Template ఉపయోగానికి సిద్ధంగా ఉన్నప్పుడే Active‌గా ఉంచండి. Governance ఉంటే My Approvals మరియు change history ఉపయోగించండి.",
            category: "కంట్రోల్",
          },
        ],
      },
      flow: ["Template ఉపయోగం", "అవసరమైన identity", "Content", "Preview", "Save మరియు governance"],
      steps: [
        "Process & Engineering‌లో Templates తెరిచి manual లేదా AI-assisted Template ప్రారంభించండి.",
        "తప్పనిసరి Template Name నమోదు చేసి, తప్పనిసరి Template Type ఎంచుకోండి.",
        "ఎంచుకున్న type‌కు అవసరమైన content, variables, pattern, parser, లేదా validation rule జోడించండి.",
        "Realistic dataతో preview చేసి, సరైన Active state‌లో save చేయండి.",
      ],
      rules: [
        "Template Name మరియు Template Type తప్పనిసరి; Description మరియు Context Type optional.",
        "Context Type అందుబాటులో ఉన్న data sources మరియు variables‌ను నియంత్రిస్తుంది; ఖాళీగా ఉంచితే ఎక్కువ flexibility లభిస్తుంది.",
        "Label Template printable content‌ను నిర్వచిస్తుంది; Label Management labels ఎలా ఉపయోగించాలో నిర్వహిస్తుంది.",
        "Realistic dataతో preview చేయకుండా Template‌ను activate చేయకండి.",
      ],
      checklist: [
        "Template‌కు స్పష్టమైన name, సరైన type, మరియు తగిన context ఉన్నాయి.",
        "Content valid variables ఉపయోగించి ఆశించిన preview‌ను ఇస్తుంది.",
        "Active state మరియు అవసరమైన approval ఉద్దేశించిన ఉపయోగానికి సరిపోతాయి.",
      ],
    },
    {
      title: "Production Order సృష్టించండి",
      slug: "create-production-order",
      summary:
        "సంబంధిత Work Orders, Client, మరియు planned production window‌ను group చేయడానికి optional Production Order సృష్టించండి.",
      importance: "Conditional",
      prerequisites: ["Production Order vs Work Order"],
      diagram: {
        intro:
          "Production Order సంబంధిత Work Orders‌ను planning మరియు monitoring కోసం group చేస్తుంది. అది ఒంటరిగా production‌ను release చేయదు లేదా unit-level work సృష్టించదు.",
        nodes: [
          {
            title: "Group‌ను నిర్వచించండి",
            description: "తప్పనిసరి Name మరియు unique Order Number ఇవ్వండి.",
            relation: "Work Orders‌ను group చేసే identity‌ను సృష్టిస్తుంది",
            category: "తప్పనిసరి",
          },
          {
            title: "Optional scope సెట్ చేయండి",
            description:
              "ఈ group ఒక Client Work Orders‌కే పరిమితం కావాలంటే Client ఎంచుకోండి.",
            relation: "ఏ Work Orders అర్హమో నియంత్రిస్తుంది",
            category: "అవసరమైతే",
          },
          {
            title: "Planning context జోడించండి",
            description:
              "Planning లేదా reporting‌కు ఉపయోగమైతే description, planned Start Date, End Date, మరియు metadata జోడించండి.",
            relation: "ఉద్దేశించిన production window‌ను చూపిస్తుంది",
            category: "Optional",
          },
          {
            title: "Order సృష్టించండి",
            description:
              "Details review చేసి Production Order సృష్టించండి. ఇది executable production కాదు; grouping record.",
            relation: "సంబంధిత Work Orders‌కు group‌ను అందుబాటులో ఉంచుతుంది",
            category: "సృష్టించండి",
          },
          {
            title: "Work‌ను link చేసి monitor చేయండి",
            description:
              "అర్హమైన Work Orders‌ను link చేసి, వాటి combined progress‌ను Production Order‌లో monitor చేయండి.",
            category: "మానిటర్",
          },
        ],
      },
      flow: ["Production Order identity", "Client scope", "Dates మరియు context", "Group సృష్టి", "Work Orders monitoring"],
      steps: [
        "Production Orders తెరిచి Create Production Order ఎంచుకోండి.",
        "తప్పనిసరి Name మరియు unique Order Number నమోదు చేయండి.",
        "అవసరమైతే Client, description, planned dates, మరియు metadata జోడించండి.",
        "Production Order సృష్టించి, అర్హమైన Work Orders‌ను దానికి link చేయండి.",
      ],
      rules: [
        "Name మరియు Order Number తప్పనిసరి; Order Number Production Order‌ను ప్రత్యేకంగా గుర్తించాలి.",
        "Client optional; దాన్ని ఎంచుకుంటే ఆ Client‌కు చెందిన Work Orders మాత్రమే జోడించవచ్చు.",
        "Description, Start Date, End Date, మరియు metadata optional planning fields.",
        "Production Order Work Orders‌ను group చేస్తుంది; Work Orders మాత్రమే executable quantity మరియు Production Tasks సృష్టిస్తాయి.",
      ],
      checklist: [
        "Production Order సరైన Name మరియు Order Number‌తో కనిపిస్తుంది.",
        "Client scope మరియు planned dates ఉద్దేశించిన group‌కు సరిపోతాయి.",
        "అర్హమైన సంబంధిత Work Orders మాత్రమే Production Order‌కు link అయ్యాయి.",
      ],
    },
  ],
};

export function getForgeSupplementalPages(
  lang: CookbookLang,
): SupplementalGuidePage[] {
  return pages[lang];
}
