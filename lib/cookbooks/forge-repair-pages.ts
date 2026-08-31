import type { CookbookLang } from "./forge-i18n";

type RepairGuidePage = {
  title: string;
  slug: string;
  summary: string;
  importance: "Required" | "Recommended" | "Conditional";
  prerequisites: string[];
  flow: string[];
  steps: string[];
  rules: string[];
  checklist: string[];
};

const en: RepairGuidePage[] = [
  {
    title: "Repair Dashboard",
    slug: "repair-dashboard",
    summary: "Monitor repair demand, status, ageing, and queue movement from one overview.",
    importance: "Recommended",
    prerequisites: ["Repair or rework records must exist for meaningful dashboard results"],
    flow: ["Open dashboard", "Set the scope", "Review repair load", "Open the relevant queue"],
    steps: [
      "Open Mfg → Repair & Rework → Repair Dashboard.",
      "Set the available date, status, product, line, station, or other scope filters for the review.",
      "Review workload, status, ageing, and repair movement to identify delayed or high-priority work.",
      "Open the relevant underlying queue or record when an item needs action.",
    ],
    rules: [
      "Dashboard values follow the selected filters and available repair data.",
      "Use the Dashboard for monitoring; complete operational work in the appropriate queue or board.",
      "Investigate ageing and high-priority items before normal work when they require attention.",
    ],
    checklist: ["The review scope is correct", "Delayed or high-priority work is identified", "The correct queue is opened for action"],
  },
  {
    title: "Debug Queue",
    slug: "debug-queue",
    summary: "Review failed units, capture diagnosis, and decide the correct repair or rework path.",
    importance: "Conditional",
    prerequisites: ["A failed unit, defect, or production exception"],
    flow: ["Find the failed unit", "Review failure evidence", "Record diagnosis", "Choose the next path"],
    steps: [
      "Open Mfg → Repair & Rework → Debug Queue.",
      "Search or filter by serial, Work Order, Product, status, line, or station to find the failed unit.",
      "Review the original failure, route context, defect evidence, and previous attempts before diagnosing it.",
      "Record the diagnosis and use the available triage decision to send the unit to the correct approved next path.",
    ],
    rules: [
      "Keep the diagnosis linked to the original unit and Work Order.",
      "Do not create a duplicate repair record when an active record already exists.",
      "Complete the diagnosis before handing work to Repair Queue or Rework Board.",
    ],
    checklist: ["The correct failed unit is selected", "Failure evidence and history are reviewed", "The next approved path is recorded"],
  },
  {
    title: "Repair Queue",
    slug: "repair-and-rework",
    summary: "Move a failed RSN from Debug through Repair, QC, rework or return paths, and verified release.",
    importance: "Conditional",
    prerequisites: ["A failed RSN or existing repair job", "A valid Repair Station when station assignment is required", "Permission for the displayed repair and QC actions"],
    flow: ["Send to Repair", "Start Repair", "Complete Repair", "Quality decision", "Repair or Rework return", "Verified release"],
    steps: [
      "Open the failed RSN in Debug Queue, review its evidence and history, use Send to Repair when displayed, and verify Queued for Repair.",
      "Open the RSN in Repair Queue, confirm the Station and attempt, select Start Repair, and verify In Repair.",
      "Use Complete Repair to record the result, 4M cause, time, cost, notes, and evidence; verify Pending QC.",
      "In Repair Out, review the record before using QC Pass or QC Reject. Verify the resulting status and timeline after every decision.",
      "If rejected or routed back, follow only the Repair or Rework action that Forge displays, record the new attempt, and resubmit for verification.",
      "Use Release only after QC Pass and only when it is displayed; confirm the routed or released outcome instead of assuming success.",
    ],
    rules: [
      "Every repair job must remain linked to the original unit and Work Order.",
      "Repair, QC, Release, return, Rework, and Scrap actions are status-dependent; use only the action Forge displays.",
      "Complete Repair is the Pending QC handoff in the verified flow; do not document a separate Send to QC action unless the target deployment displays one.",
      "If Forge shows an error, stop and report it. Do not repeat a state-changing action or assume that it succeeded.",
    ],
    checklist: ["The correct RSN and attempt are open", "Every transition is visible in status and timeline", "Repair and QC evidence are complete", "The final route or release is verified"],
  },
  {
    title: "Repair Out",
    slug: "repair-out",
    summary: "Review repaired units in quality verification and confirm their recorded outbound status and evidence.",
    importance: "Conditional",
    prerequisites: ["Repair work has reached an outbound-ready state"],
    flow: ["Find repaired work", "Verify repair evidence", "Use the available state action", "Confirm the recorded outcome"],
    steps: [
      "Open Mfg → Repair & Rework → Repair Out.",
      "Search or filter for the repaired unit and review its current status, repair status, repair level, failure reason, Product, and Work Order.",
      "Open the record when the detail page loads successfully, then confirm the lifecycle, timeline, repair result, costs, notes, and supporting evidence.",
      "Use only the quality, release, or routing action that Forge displays for the record's current state; available actions can differ by status and configuration.",
      "Refresh and confirm the resulting status and timeline. If Forge displays an error, stop the operation and escalate it instead of assuming that the handoff succeeded.",
    ],
    rules: [
      "Repair Out actions are state-dependent; do not assume an outbound destination that the record does not display.",
      "Any release or routing outcome must match the repair result, quality decision, and configured route.",
      "Return unresolved work to the appropriate repair or debug path instead of forcing completion.",
    ],
    checklist: ["Repair and quality evidence are complete", "The displayed action is valid for the current state", "The resulting status is visible in the timeline"],
  },
  {
    title: "Rework Board",
    slug: "rework-board",
    summary: "Track rework jobs across board stages while preserving the unit, Work Order, and attempt history.",
    importance: "Conditional",
    prerequisites: ["A failure or approved disposition that creates rework"],
    flow: ["Review board columns", "Review the rework card", "Record the attempt", "Move to the result"],
    steps: [
      "Open Mfg → Repair & Rework → Rework Board.",
      "Use the board columns and filters to find Pending, In Progress, Pending Re-inspection, or Failed work.",
      "Review the card's serial, linked Work Order, mechanism, attempt number, and failure evidence. Select Record work only when the job is ready for an update.",
      "Record the work and move the job only through the result allowed by the current rework state.",
    ],
    rules: [
      "Rework Board jobs originate from a failure or approved disposition; the board is not a separate intake source.",
      "Each attempt must remain tied to the same unit and source Work Order.",
      "Do not skip required repair evidence or re-inspection when the process calls for it.",
    ],
    checklist: ["The correct board card is identified", "Attempt details and evidence are recorded", "The card reaches the correct result column"],
  },
  {
    title: "RD Tracking",
    slug: "rd-tracking",
    summary: "Follow repair and debug records across diagnosis, repair, rework, and final handoff.",
    importance: "Recommended",
    prerequisites: ["A debug, repair, or rework record"],
    flow: ["Set tracking scope", "Find the record", "Review linked stages", "Confirm the outcome"],
    steps: [
      "Open Mfg → Repair & Rework → RD Tracking.",
      "Search or filter by the available unit, Work Order, Product, status, or date criteria.",
      "Review the linked debug, repair, rework, attempt, and handoff history for the selected record.",
      "Confirm the latest status and open the source queue when follow-up work is needed.",
    ],
    rules: [
      "Use RD Tracking as the cross-stage history; perform changes in the owning queue or board.",
      "Serial, Work Order, and attempt links must stay consistent across stages.",
      "A missing handoff should be investigated in the source record before a new record is created.",
    ],
    checklist: ["The correct tracking scope is applied", "All linked stages are reviewed", "The latest outcome and owner are clear"],
  },
  {
    title: "Customer Returns",
    slug: "customer-returns",
    summary: "Register and follow customer-returned units through receipt, triage, repair, replacement, or closure.",
    importance: "Conditional",
    prerequisites: ["A returned unit and its customer or shipment context"],
    flow: ["Identify the return", "Record receipt details", "Triage the unit", "Track resolution"],
    steps: [
      "Open Mfg → Repair & Rework → Customer Returns.",
      "Find or add the returned unit using the available serial, Product, customer, shipment, and return details.",
      "Record the reported symptom, return reason, received condition, and supporting evidence.",
      "Send the return to the approved debug, repair, replacement, or closure path and track the result.",
    ],
    rules: [
      "Keep the returned identity linked to its customer and shipment context when available.",
      "A customer-reported symptom is not the same as a confirmed repair cause.",
      "Do not close the return until its disposition and outcome are recorded.",
    ],
    checklist: ["The returned unit is correctly identified", "Receipt and reported issue are recorded", "The disposition and outcome are traceable"],
  },
  {
    title: "RMA Tracking",
    slug: "rma-tracking",
    summary: "Track return authorizations from approval and receipt through repair, replacement, and final resolution.",
    importance: "Conditional",
    prerequisites: ["An RMA or authorized return process"],
    flow: ["Find the RMA", "Verify authorization", "Track received units", "Close the resolution"],
    steps: [
      "Open Mfg → Repair & Rework → RMA Tracking.",
      "Search by the available RMA, customer, serial, Product, status, or date criteria.",
      "Review authorization, receipt, linked units, repair or replacement progress, and supporting records.",
      "Confirm the final resolution and close the RMA only when all included units are accounted for.",
    ],
    rules: [
      "RMA authorization and physical receipt are separate milestones.",
      "Every returned unit must remain linked to the correct RMA.",
      "Do not close an RMA while included units still have unresolved work.",
    ],
    checklist: ["Authorization and receipt are visible", "All returned units are linked", "The final resolution is complete"],
  },
  {
    title: "Alerts",
    slug: "repair-alerts",
    summary: "Configure and monitor repair and rework conditions that warn, block, or escalate work.",
    importance: "Recommended",
    prerequisites: ["Know the repair condition and response that the rule should control"],
    flow: ["Choose the condition", "Set the threshold", "Choose the action", "Monitor triggered alerts"],
    steps: [
      "Open Mfg → Repair & Rework → Alerts.",
      "Choose the repair or rework condition, scope, threshold, and attempt limit that should be evaluated.",
      "Select the required response, such as alert, block, or block and propose scrap, then save the rule in the correct active state.",
      "Monitor triggered alerts and resolve the underlying job before clearing or closing the alert.",
    ],
    rules: [
      "Attempt-limit rules are configured in Alerts, not on the Rework Board.",
      "Use blocking actions only when exceeding the threshold must stop work.",
      "An alert does not replace the repair, quality, hold, or scrap record required by the event.",
    ],
    checklist: ["The condition and scope are correct", "The threshold and action match policy", "Triggered alerts have a clear owner"],
  },
  {
    title: "Repair Config",
    slug: "repair-config",
    summary: "Control automatic repair intake, the default Repair Station, and repair operating limits.",
    importance: "Recommended",
    prerequisites: ["Know whether automatically created tickets require default Station routing"],
    flow: ["Open configuration", "Set automatic intake", "Review default Station", "Save and verify"],
    steps: [
      "Open Mfg → Repair & Rework → Repair Config.",
      "Enable Auto-create repair on failure only when failed units should enter repair automatically.",
      "Select a Default Repair Station when automatically created tickets must be routed there, and configure the repair limits required by the operating model.",
      "Save the configuration and verify a new eligible failure follows the expected intake path.",
    ],
    rules: [
      "Auto-create repair can be enabled while Default Repair Station is blank in the verified SIT screen; set a Station when the operating model requires automatic station routing.",
      "Leave automatic intake disabled when failures must be reviewed in Debug Queue first.",
      "Configuration changes affect future intake; review active jobs separately.",
    ],
    checklist: ["Automatic intake matches the operating policy", "Default Station routing is configured when required", "A test failure follows the expected path"],
  },
  {
    title: "Rework Symptoms",
    slug: "rework-symptoms",
    summary: "Maintain a consistent symptom list for what operators or customers observe before diagnosis.",
    importance: "Recommended",
    prerequisites: ["Agree on the symptom vocabulary used by the plant"],
    flow: ["Review existing symptoms", "Add a clear symptom", "Set its state", "Use it consistently"],
    steps: [
      "Open Mfg → Repair & Rework → Rework Symptoms.",
      "Search existing entries before adding a new symptom to avoid duplicate wording.",
      "Create or update the symptom with a clear name, description, and available active state.",
      "Use the standard symptom when recording debug, repair, rework, or customer-return information.",
    ],
    rules: [
      "A symptom describes what was observed; it does not confirm the root cause.",
      "Use short, distinct names that operators can select consistently.",
      "Deactivate obsolete symptoms instead of creating near-duplicates.",
    ],
    checklist: ["No duplicate symptom exists", "The wording describes an observation", "The state matches current use"],
  },
  {
    title: "Rework Reasons",
    slug: "rework-reasons",
    summary: "Maintain standard rework reasons so causes and dispositions are reported consistently.",
    importance: "Recommended",
    prerequisites: ["Agree on the reason or cause vocabulary used by the plant"],
    flow: ["Review existing reasons", "Add a clear reason", "Set its state", "Apply it to rework"],
    steps: [
      "Open Mfg → Repair & Rework → Rework Reasons.",
      "Search the existing list before creating a new reason.",
      "Create or update the reason with a clear name, description, and available active state.",
      "Use the standard reason when recording the confirmed rework cause or disposition.",
    ],
    rules: [
      "A reason records the confirmed cause or disposition; keep it separate from the observed symptom.",
      "Use controlled wording so analytics group equivalent causes together.",
      "Deactivate obsolete reasons instead of deleting history or adding duplicate labels.",
    ],
    checklist: ["No equivalent reason already exists", "The wording represents a cause or disposition", "The state matches current use"],
  },
];

type LocalizedRepairCopy = Pick<
  RepairGuidePage,
  "summary" | "prerequisites" | "flow" | "steps" | "rules" | "checklist"
>;

const taCopy: Record<string, LocalizedRepairCopy> = {
  "repair-dashboard": {
    summary: "Repair workload, status, ageing, மற்றும் queue movement அனைத்தையும் ஒரே இடத்தில் கண்காணிக்கவும்.",
    prerequisites: ["Dashboard-ல் பயனுள்ள தகவல் வர repair அல்லது rework records இருக்க வேண்டும்"],
    flow: ["Dashboard திறக்கவும்", "Scope அமைக்கவும்", "Repair load பார்க்கவும்", "சரியான queue-ஐ திறக்கவும்"],
    steps: [
      "Mfg → Repair & Rework → Repair Dashboard செல்லுங்கள்.",
      "தேவையான date, status, Product, Line, Station அல்லது கிடைக்கும் filters-ஐ அமைக்கவும்.",
      "Workload, ageing, priority, மற்றும் status movement-ஐ பார்த்து கவனம் தேவைப்படும் jobs-ஐ கண்டுபிடிக்கவும்.",
      "Action தேவைப்படும் record-க்கு தொடர்பான queue அல்லது board-ஐ திறக்கவும்.",
    ],
    rules: [
      "Dashboard values தேர்ந்தெடுத்த filters மற்றும் கிடைக்கும் repair data-ஐப் பொறுத்தது.",
      "Dashboard monitoring-க்கு; operational changes-ஐ அந்த queue அல்லது board-ல் செய்யுங்கள்.",
      "Ageing மற்றும் high-priority jobs-ஐ முதலில் review செய்யுங்கள்.",
    ],
    checklist: ["Review scope சரியாக உள்ளது", "தாமதமான அல்லது high-priority work கண்டறியப்பட்டது", "Action-க்கு சரியான queue திறக்கப்பட்டது"],
  },
  "debug-queue": {
    summary: "Failed units-ஐ review செய்து, diagnosis பதிவு செய்து, சரியான repair அல்லது rework path-ஐ தேர்வு செய்யுங்கள்.",
    prerequisites: ["Failed unit, defect, அல்லது production exception"],
    flow: ["Failed unit கண்டுபிடிக்கவும்", "Failure evidence பார்க்கவும்", "Diagnosis பதிவு செய்யவும்", "Next path தேர்வு செய்யவும்"],
    steps: [
      "Mfg → Repair & Rework → Debug Queue செல்லுங்கள்.",
      "Serial, Work Order, Product, status, Line அல்லது Station மூலம் failed unit-ஐ தேடுங்கள்.",
      "Diagnosis செய்வதற்கு முன் failure, route context, defect evidence, மற்றும் பழைய attempts-ஐ review செய்யுங்கள்.",
      "Diagnosis பதிவு செய்து available triage decision மூலம் unit-ஐ approved next path-க்கு அனுப்புங்கள்.",
    ],
    rules: [
      "Diagnosis original unit மற்றும் Work Order-உடன் link ஆகவேண்டும்.",
      "Active repair record ஏற்கனவே இருந்தால் duplicate உருவாக்காதீர்கள்.",
      "Repair Queue அல்லது Rework Board-க்கு அனுப்பும் முன் diagnosis முடிக்கவும்.",
    ],
    checklist: ["சரியான failed unit தேர்வு செய்யப்பட்டது", "Failure evidence மற்றும் history review செய்யப்பட்டது", "Approved next path பதிவு செய்யப்பட்டது"],
  },
  "repair-and-rework": {
    summary: "Manual repair intake மற்றும் existing repair jobs-ஐ work evidence மற்றும் handoff வரை நிர்வகிக்கவும்.",
    prerequisites: ["Existing repair job அல்லது manual intake-க்கு identifiable defective unit", "Station assignment தேவைப்பட்டால் valid Repair Station"],
    flow: ["Intake review அல்லது create", "Job priority", "Repair work பதிவு", "Handoff முடித்தல்"],
    steps: [
      "Mfg → Repair & Rework → Repair Queue செல்லுங்கள். Existing job-ஐ தேடுங்கள்; active repair record இல்லாத defective unit-க்கு மட்டும் New Intake பயன்படுத்துங்கள்.",
      "Job-ஐ திறந்து failure evidence, assigned Station, attempt history, மற்றும் status-ஐ உறுதிசெய்யுங்கள்.",
      "Repair action, labor, மாற்றிய material, cost, notes, மற்றும் தேவையான evidence-ஐ பதிவு செய்யுங்கள்.",
      "Available repair action-ஐ complete செய்து unit Repair Out அல்லது configured next step-க்கு சென்றதா பார்க்கவும்.",
    ],
    rules: [
      "ஒவ்வொரு repair job-மும் original unit மற்றும் Work Order-உடன் link ஆகவேண்டும்.",
      "Automatic intake மற்றும் default Station Repair Config-ல் அமைக்கப்படும்.",
      "Attempt-limit alerts மற்றும் blocking Alerts-ல் அமைக்கப்படும்.",
    ],
    checklist: ["சரியான job மற்றும் attempt திறந்துள்ளது", "Repair evidence முழுமையாக உள்ளது", "Unit expected outbound state-க்கு சென்றுள்ளது"],
  },
  "repair-out": {
    summary: "Quality verification-ல் உள்ள repaired units-ன் outbound status மற்றும் evidence-ஐ review செய்யுங்கள்.",
    prerequisites: ["Repair work outbound-ready state-ஐ அடைந்திருக்க வேண்டும்"],
    flow: ["Repaired work தேடவும்", "Repair evidence verify செய்யவும்", "Available state action பயன்படுத்தவும்", "Recorded outcome confirm செய்யவும்"],
    steps: [
      "Mfg → Repair & Rework → Repair Out செல்லுங்கள்.",
      "Repaired unit-ஐ search அல்லது filter செய்து current status, repair status, repair level, failure reason, Product, மற்றும் Work Order-ஐ review செய்யுங்கள்.",
      "Detail page வெற்றிகரமாக load ஆனால் record-ஐ திறந்து lifecycle, timeline, repair result, costs, notes, மற்றும் evidence-ஐ உறுதிசெய்யுங்கள்.",
      "Record-ன் current state-க்கு Forge காட்டும் quality, release, அல்லது routing action மட்டும் பயன்படுத்துங்கள்; available actions status மற்றும் configuration-ஐப் பொறுத்து மாறலாம்.",
      "Refresh செய்து resulting status மற்றும் timeline-ஐ உறுதிசெய்யுங்கள். Forge error காட்டினால் operation-ஐ நிறுத்தி escalate செய்யுங்கள்; handoff வெற்றியடைந்தது என்று கருதாதீர்கள்.",
    ],
    rules: [
      "Repair Out actions state-dependent; record காட்டாத outbound destination-ஐ assume செய்யாதீர்கள்.",
      "Release அல்லது routing outcome repair result, quality decision, மற்றும் configured route-க்கு பொருந்த வேண்டும்.",
      "Unresolved work-ஐ force complete செய்யாமல் சரியான repair அல்லது debug path-க்கு திருப்புங்கள்.",
    ],
    checklist: ["Repair மற்றும் quality evidence complete", "Displayed action current state-க்கு valid", "Resulting status timeline-ல் உள்ளது"],
  },
  "rework-board": {
    summary: "Rework jobs-ஐ board stages வழியாக track செய்து unit, Work Order, attempt history-ஐ இணைத்தே வைத்திருங்கள்.",
    prerequisites: ["Rework உருவாக்கும் failure அல்லது approved disposition"],
    flow: ["Board columns பார்க்கவும்", "Rework card review செய்யவும்", "Attempt பதிவு செய்யவும்", "Result-க்கு நகர்த்தவும்"],
    steps: [
      "Mfg → Repair & Rework → Rework Board செல்லுங்கள்.",
      "Board columns மற்றும் filters மூலம் Pending, In Progress, Pending Re-inspection அல்லது Failed work-ஐ தேடுங்கள்.",
      "Card-இன் serial, Work Order, mechanism, attempt number, மற்றும் failure evidence-ஐ review செய்யுங்கள். Job update செய்யத் தயாரானபோது மட்டும் Record work தேர்ந்தெடுக்கவும்.",
      "Work-ஐ பதிவு செய்து current state அனுமதிக்கும் result-க்கு மட்டும் job-ஐ நகர்த்துங்கள்.",
    ],
    rules: [
      "Rework Board jobs failure அல்லது approved disposition-லிருந்து வரும்; இது தனி intake source அல்ல.",
      "ஒவ்வொரு attempt-மும் அதே unit மற்றும் source Work Order-உடன் link ஆகவேண்டும்.",
      "Required evidence அல்லது re-inspection-ஐ skip செய்யாதீர்கள்.",
    ],
    checklist: ["சரியான board card அடையாளம் காணப்பட்டது", "Attempt details மற்றும் evidence பதிவு செய்யப்பட்டது", "Card சரியான result column-ஐ அடைந்தது"],
  },
  "rd-tracking": {
    summary: "Debug, repair, rework, மற்றும் final handoff முழுவதும் records-ஐ ஒரே history-ஆகப் பின்தொடருங்கள்.",
    prerequisites: ["Debug, repair, அல்லது rework record"],
    flow: ["Tracking scope", "Record தேடல்", "Linked stages review", "Outcome confirm"],
    steps: [
      "Mfg → Repair & Rework → RD Tracking செல்லுங்கள்.",
      "Unit, Work Order, Product, status அல்லது date criteria மூலம் தேடுங்கள்.",
      "Selected record-ன் debug, repair, rework, attempt, மற்றும் handoff history-ஐ review செய்யுங்கள்.",
      "Latest status-ஐ உறுதிசெய்து follow-up தேவைப்பட்டால் source queue-ஐ திறக்கவும்.",
    ],
    rules: [
      "RD Tracking cross-stage history-க்கு; changes-ஐ owning queue அல்லது board-ல் செய்யுங்கள்.",
      "Serial, Work Order, மற்றும் attempt links எல்லா stages-லும் ஒரே மாதிரி இருக்க வேண்டும்.",
      "Missing handoff இருந்தால் புதிய record உருவாக்கும் முன் source record-ஐ ஆய்வு செய்யுங்கள்.",
    ],
    checklist: ["சரியான tracking scope", "எல்லா linked stages review செய்யப்பட்டது", "Latest outcome மற்றும் owner தெளிவாக உள்ளது"],
  },
  "customer-returns": {
    summary: "Customer திருப்பிய units-ஐ receipt முதல் triage, repair, replacement அல்லது closure வரை track செய்யுங்கள்.",
    prerequisites: ["Returned unit மற்றும் அதன் customer அல்லது shipment context"],
    flow: ["Return identify", "Receipt details", "Unit triage", "Resolution track"],
    steps: [
      "Mfg → Repair & Rework → Customer Returns செல்லுங்கள்.",
      "Serial, Product, customer, shipment, மற்றும் return details மூலம் returned unit-ஐ find அல்லது add செய்யுங்கள்.",
      "Reported symptom, return reason, received condition, மற்றும் supporting evidence-ஐ பதிவு செய்யுங்கள்.",
      "Return-ஐ approved debug, repair, replacement அல்லது closure path-க்கு அனுப்பி result-ஐ track செய்யுங்கள்.",
    ],
    rules: [
      "Returned identity-ஐ customer மற்றும் shipment context-உடன் link ஆக வைத்திருங்கள்.",
      "Customer சொன்ன symptom confirmed repair cause அல்ல.",
      "Disposition மற்றும் outcome பதிவு செய்யாமல் return-ஐ close செய்யாதீர்கள்.",
    ],
    checklist: ["Returned unit சரியாக identify செய்யப்பட்டது", "Receipt மற்றும் reported issue பதிவு செய்யப்பட்டது", "Disposition மற்றும் outcome trace செய்யக்கூடியது"],
  },
  "rma-tracking": {
    summary: "Return authorization-ஐ approval மற்றும் receipt முதல் repair, replacement, final resolution வரை track செய்யுங்கள்.",
    prerequisites: ["RMA அல்லது authorized return process"],
    flow: ["RMA தேடல்", "Authorization verify", "Received units track", "Resolution close"],
    steps: [
      "Mfg → Repair & Rework → RMA Tracking செல்லுங்கள்.",
      "RMA, customer, serial, Product, status அல்லது date மூலம் தேடுங்கள்.",
      "Authorization, receipt, linked units, repair அல்லது replacement progress, மற்றும் records-ஐ review செய்யுங்கள்.",
      "எல்லா units-மும் accounted for ஆன பிறகே final resolution-ஐ confirm செய்து RMA-ஐ close செய்யுங்கள்.",
    ],
    rules: [
      "RMA authorization மற்றும் physical receipt இரண்டு தனி milestones.",
      "ஒவ்வொரு returned unit-மும் சரியான RMA-உடன் link ஆக வேண்டும்.",
      "Unresolved units இருந்தால் RMA-ஐ close செய்யாதீர்கள்.",
    ],
    checklist: ["Authorization மற்றும் receipt தெரிகிறது", "எல்லா returned units link ஆகி உள்ளன", "Final resolution complete"],
  },
  "repair-alerts": {
    summary: "Repair மற்றும் rework conditions-க்கு warning, block, அல்லது escalation rules-ஐ அமைத்து monitor செய்யுங்கள்.",
    prerequisites: ["Rule கட்டுப்படுத்த வேண்டிய repair condition மற்றும் response தெரிந்திருக்க வேண்டும்"],
    flow: ["Condition தேர்வு", "Threshold அமைப்பு", "Action தேர்வு", "Triggered alerts monitor"],
    steps: [
      "Mfg → Repair & Rework → Alerts செல்லுங்கள்.",
      "Repair அல்லது rework condition, scope, threshold, மற்றும் attempt limit-ஐ தேர்வு செய்யுங்கள்.",
      "Alert, block, அல்லது block and propose scrap response-ஐ தேர்வு செய்து சரியான Active state-ல் save செய்யுங்கள்.",
      "Triggered alerts-ஐ monitor செய்து alert close செய்வதற்கு முன் source job issue-ஐ சரிசெய்யுங்கள்.",
    ],
    rules: [
      "Attempt-limit rules Rework Board-ல் அல்ல; Alerts-ல் configure செய்யப்படும்.",
      "Threshold கடந்தால் work நிற்க வேண்டும் என்றால் மட்டுமே blocking action பயன்படுத்துங்கள்.",
      "Alert வந்ததால் தேவையான repair, quality, hold அல்லது scrap record தேவையில்லை என்று அர்த்தமில்லை.",
    ],
    checklist: ["Condition மற்றும் scope சரி", "Threshold மற்றும் action policy-க்கு பொருந்துகிறது", "Triggered alert-க்கு owner உள்ளது"],
  },
  "repair-config": {
    summary: "Automatic repair intake, default Repair Station, மற்றும் repair operating limits-ஐ கட்டுப்படுத்துங்கள்.",
    prerequisites: ["Automatically created tickets-க்கு default Station routing தேவையா என்று தெரிந்திருக்க வேண்டும்"],
    flow: ["Config திறக்கவும்", "Automatic intake அமைக்கவும்", "Default Station review", "Save செய்து verify"],
    steps: [
      "Mfg → Repair & Rework → Repair Config செல்லுங்கள்.",
      "Failed units தானாக repair-க்கு வர வேண்டுமெனில் மட்டும் Auto-create repair on failure enable செய்யுங்கள்.",
      "Automatically created tickets அந்த Station-க்கு route ஆக வேண்டுமெனில் Default Repair Station தேர்வு செய்து, operating model-க்கு தேவையான repair limits-ஐ அமைக்கவும்.",
      "Save செய்து புதிய eligible failure expected intake path-ஐ பின்பற்றுகிறதா பார்க்கவும்.",
    ],
    rules: [
      "Verified SIT screen-ல் Default Repair Station காலியாக இருந்தபோதும் Auto-create repair enabled ஆக இருந்தது; operating model automatic station routing கேட்கும் போது Station அமைக்கவும்.",
      "Failures முதலில் Debug Queue-ல் review செய்ய வேண்டுமெனில் automatic intake disable ஆக இருக்க வேண்டும்.",
      "Config changes future intake-ஐ பாதிக்கும்; active jobs-ஐ தனியாக review செய்யுங்கள்.",
    ],
    checklist: ["Automatic intake policy-க்கு பொருந்துகிறது", "தேவைப்பட்டால் Default Station routing configured", "Test failure expected path-ஐ பின்பற்றியது"],
  },
  "rework-symptoms": {
    summary: "Diagnosis-க்கு முன் operator அல்லது customer கவனித்ததை பதிவு செய்ய ஒரே மாதிரி symptom list-ஐ பராமரிக்கவும்.",
    prerequisites: ["Plant பயன்படுத்தும் symptom vocabulary ஒப்புக்கொள்ளப்பட்டிருக்க வேண்டும்"],
    flow: ["Existing symptoms review", "Clear symptom add", "State அமைக்கவும்", "Consistent use"],
    steps: [
      "Mfg → Repair & Rework → Rework Symptoms செல்லுங்கள்.",
      "Duplicate wording தவிர்க்க புதிய symptom சேர்ப்பதற்கு முன் existing list-ஐ search செய்யுங்கள்.",
      "Clear name, description, மற்றும் கிடைக்கும் Active state-உடன் symptom-ஐ create அல்லது update செய்யுங்கள்.",
      "Debug, repair, rework, அல்லது customer return record செய்யும்போது standard symptom-ஐ பயன்படுத்துங்கள்.",
    ],
    rules: [
      "Symptom observed issue-ஐ மட்டும் சொல்கிறது; root cause-ஐ confirm செய்யாது.",
      "Operators ஒரே மாதிரி select செய்ய short, clear names பயன்படுத்துங்கள்.",
      "Near-duplicate உருவாக்காமல் obsolete symptom-ஐ deactivate செய்யுங்கள்.",
    ],
    checklist: ["Duplicate symptom இல்லை", "Wording observation-ஐ சொல்கிறது", "State current use-க்கு பொருந்துகிறது"],
  },
  "rework-reasons": {
    summary: "Rework causes மற்றும் dispositions ஒரே மாதிரி report ஆக standard reason list-ஐ பராமரிக்கவும்.",
    prerequisites: ["Plant பயன்படுத்தும் reason அல்லது cause vocabulary ஒப்புக்கொள்ளப்பட்டிருக்க வேண்டும்"],
    flow: ["Existing reasons review", "Clear reason add", "State அமைக்கவும்", "Rework-ல் பயன்படுத்தவும்"],
    steps: [
      "Mfg → Repair & Rework → Rework Reasons செல்லுங்கள்.",
      "புதிய reason உருவாக்கும் முன் existing list-ஐ search செய்யுங்கள்.",
      "Clear name, description, மற்றும் கிடைக்கும் Active state-உடன் reason-ஐ create அல்லது update செய்யுங்கள்.",
      "Confirmed rework cause அல்லது disposition பதிவு செய்ய standard reason-ஐ பயன்படுத்துங்கள்.",
    ],
    rules: [
      "Reason confirmed cause அல்லது disposition-ஐ சொல்கிறது; observed symptom-இலிருந்து தனியாக வைத்திருங்கள்.",
      "Analytics equivalent causes-ஐ ஒன்றாக group செய்ய controlled wording பயன்படுத்துங்கள்.",
      "History-ஐ delete செய்யாமல் obsolete reasons-ஐ deactivate செய்யுங்கள்.",
    ],
    checklist: ["Equivalent reason ஏற்கனவே இல்லை", "Wording cause அல்லது disposition-ஐ சொல்கிறது", "State current use-க்கு பொருந்துகிறது"],
  },
};

const teCopy: Record<string, LocalizedRepairCopy> = {
  "repair-dashboard": {
    summary: "Repair workload, status, ageing, మరియు queue movement అన్నింటినీ ఒకేచోట monitor చేయండి.",
    prerequisites: ["Dashboard‌లో ఉపయోగకరమైన data కోసం repair లేదా rework records ఉండాలి"],
    flow: ["Dashboard తెరవండి", "Scope సెట్ చేయండి", "Repair load చూడండి", "సరైన queue తెరవండి"],
    steps: [
      "Mfg → Repair & Rework → Repair Dashboard తెరవండి.",
      "అవసరమైన date, status, Product, Line, Station లేదా అందుబాటులో ఉన్న filters సెట్ చేయండి.",
      "Workload, ageing, priority, మరియు status movement చూసి దృష్టి అవసరమైన jobs గుర్తించండి.",
      "Action అవసరమైన record‌కు సంబంధించిన queue లేదా board తెరవండి.",
    ],
    rules: [
      "Dashboard values ఎంచుకున్న filters మరియు అందుబాటులో ఉన్న repair data పై ఆధారపడతాయి.",
      "Dashboard monitoring కోసం; operational changes‌ను సంబంధిత queue లేదా board‌లో చేయండి.",
      "Ageing మరియు high-priority jobs‌ను ముందుగా review చేయండి.",
    ],
    checklist: ["Review scope సరైనది", "Delayed లేదా high-priority work గుర్తించబడింది", "Action కోసం సరైన queue తెరవబడింది"],
  },
  "debug-queue": {
    summary: "Failed units‌ను review చేసి, diagnosis నమోదు చేసి, సరైన repair లేదా rework path ఎంచుకోండి.",
    prerequisites: ["Failed unit, defect, లేదా production exception"],
    flow: ["Failed unit కనుగొనండి", "Failure evidence చూడండి", "Diagnosis నమోదు చేయండి", "Next path ఎంచుకోండి"],
    steps: [
      "Mfg → Repair & Rework → Debug Queue తెరవండి.",
      "Serial, Work Order, Product, status, Line లేదా Station ద్వారా failed unit వెతకండి.",
      "Diagnosis ముందు failure, route context, defect evidence, మరియు పాత attempts review చేయండి.",
      "Diagnosis నమోదు చేసి available triage decision ద్వారా unit‌ను approved next path‌కు పంపండి.",
    ],
    rules: [
      "Diagnosis original unit మరియు Work Order‌కు link అయి ఉండాలి.",
      "Active repair record ఇప్పటికే ఉంటే duplicate సృష్టించవద్దు.",
      "Repair Queue లేదా Rework Board‌కు పంపే ముందు diagnosis పూర్తి చేయండి.",
    ],
    checklist: ["సరైన failed unit ఎంచుకున్నారు", "Failure evidence మరియు history review చేశారు", "Approved next path నమోదు చేశారు"],
  },
  "repair-and-rework": {
    summary: "Manual repair intake మరియు existing repair jobs‌ను work evidence మరియు handoff వరకు నిర్వహించండి.",
    prerequisites: ["Existing repair job లేదా manual intake కోసం identifiable defective unit", "Station assignment అవసరమైతే valid Repair Station"],
    flow: ["Intake review లేదా create", "Job priority", "Repair work నమోదు", "Handoff పూర్తి"],
    steps: [
      "Mfg → Repair & Rework → Repair Queue తెరవండి. Existing job వెతకండి; active repair record లేని defective unit కోసం మాత్రమే New Intake ఉపయోగించండి.",
      "Job తెరిచి failure evidence, assigned Station, attempt history, మరియు status నిర్ధారించండి.",
      "Repair action, labor, మార్చిన material, cost, notes, మరియు అవసరమైన evidence నమోదు చేయండి.",
      "Available repair action పూర్తి చేసి unit Repair Out లేదా configured next step‌కు వెళ్లిందో చూడండి.",
    ],
    rules: [
      "ప్రతి repair job original unit మరియు Work Order‌కు link అయి ఉండాలి.",
      "Automatic intake మరియు default Station Repair Config‌లో సెట్ చేయాలి.",
      "Attempt-limit alerts మరియు blocking Alerts‌లో సెట్ చేయాలి.",
    ],
    checklist: ["సరైన job మరియు attempt తెరిచారు", "Repair evidence పూర్తిగా ఉంది", "Unit expected outbound state‌కు వెళ్లింది"],
  },
  "repair-out": {
    summary: "Quality verification‌లో ఉన్న repaired units outbound status మరియు evidence‌ను review చేయండి.",
    prerequisites: ["Repair work outbound-ready state చేరాలి"],
    flow: ["Repaired work వెతకండి", "Repair evidence verify", "Available state action ఉపయోగించండి", "Recorded outcome confirm"],
    steps: [
      "Mfg → Repair & Rework → Repair Out తెరవండి.",
      "Repaired unit‌ను search లేదా filter చేసి current status, repair status, repair level, failure reason, Product, మరియు Work Order review చేయండి.",
      "Detail page విజయవంతంగా load అయితే record తెరిచి lifecycle, timeline, repair result, costs, notes, మరియు evidence నిర్ధారించండి.",
      "Record current state‌కు Forge చూపించే quality, release, లేదా routing action మాత్రమే ఉపయోగించండి; available actions status మరియు configuration‌పై ఆధారపడతాయి.",
      "Refresh చేసి resulting status మరియు timeline నిర్ధారించండి. Forge error చూపిస్తే operation ఆపి escalate చేయండి; handoff విజయవంతమైందని ఊహించవద్దు.",
    ],
    rules: [
      "Repair Out actions state-dependent; record చూపని outbound destination‌ను assume చేయవద్దు.",
      "Release లేదా routing outcome repair result, quality decision, మరియు configured route‌కు సరిపోవాలి.",
      "Unresolved work‌ను force complete చేయకుండా సరైన repair లేదా debug path‌కు పంపండి.",
    ],
    checklist: ["Repair మరియు quality evidence complete", "Displayed action current state‌కు valid", "Resulting status timeline‌లో ఉంది"],
  },
  "rework-board": {
    summary: "Rework jobs‌ను board stages‌లో track చేస్తూ unit, Work Order, attempt history‌ను link‌గా ఉంచండి.",
    prerequisites: ["Rework సృష్టించే failure లేదా approved disposition"],
    flow: ["Board columns చూడండి", "Rework card review చేయండి", "Attempt నమోదు", "Result‌కు move"],
    steps: [
      "Mfg → Repair & Rework → Rework Board తెరవండి.",
      "Board columns మరియు filters ద్వారా Pending, In Progress, Pending Re-inspection లేదా Failed work వెతకండి.",
      "Card‌లోని serial, Work Order, mechanism, attempt number, మరియు failure evidence review చేయండి. Job update‌కు సిద్ధమైనప్పుడు మాత్రమే Record work ఎంచుకోండి.",
      "Work నమోదు చేసి current state అనుమతించే result‌కు మాత్రమే job‌ను move చేయండి.",
    ],
    rules: [
      "Rework Board jobs failure లేదా approved disposition నుంచి వస్తాయి; ఇది వేరే intake source కాదు.",
      "ప్రతి attempt అదే unit మరియు source Work Order‌కు link అయి ఉండాలి.",
      "Required evidence లేదా re-inspection‌ను skip చేయవద్దు.",
    ],
    checklist: ["సరైన board card గుర్తించారు", "Attempt details మరియు evidence నమోదు చేశారు", "Card సరైన result column చేరింది"],
  },
  "rd-tracking": {
    summary: "Debug, repair, rework, మరియు final handoff అంతటా records‌ను ఒకే history‌గా follow చేయండి.",
    prerequisites: ["Debug, repair, లేదా rework record"],
    flow: ["Tracking scope", "Record search", "Linked stages review", "Outcome confirm"],
    steps: [
      "Mfg → Repair & Rework → RD Tracking తెరవండి.",
      "Unit, Work Order, Product, status లేదా date criteria ద్వారా వెతకండి.",
      "Selected record యొక్క debug, repair, rework, attempt, మరియు handoff history review చేయండి.",
      "Latest status నిర్ధారించి follow-up అవసరమైతే source queue తెరవండి.",
    ],
    rules: [
      "RD Tracking cross-stage history కోసం; changes‌ను owning queue లేదా board‌లో చేయండి.",
      "Serial, Work Order, మరియు attempt links అన్ని stages‌లో consistent‌గా ఉండాలి.",
      "Missing handoff ఉంటే కొత్త record సృష్టించే ముందు source record చూడండి.",
    ],
    checklist: ["సరైన tracking scope", "అన్ని linked stages review చేశారు", "Latest outcome మరియు owner స్పష్టంగా ఉన్నాయి"],
  },
  "customer-returns": {
    summary: "Customer తిరిగి పంపిన units‌ను receipt నుంచి triage, repair, replacement లేదా closure వరకు track చేయండి.",
    prerequisites: ["Returned unit మరియు దాని customer లేదా shipment context"],
    flow: ["Return identify", "Receipt details", "Unit triage", "Resolution track"],
    steps: [
      "Mfg → Repair & Rework → Customer Returns తెరవండి.",
      "Serial, Product, customer, shipment, మరియు return details ద్వారా returned unit‌ను find లేదా add చేయండి.",
      "Reported symptom, return reason, received condition, మరియు supporting evidence నమోదు చేయండి.",
      "Return‌ను approved debug, repair, replacement లేదా closure path‌కు పంపి result track చేయండి.",
    ],
    rules: [
      "Returned identity‌ను customer మరియు shipment context‌కు link‌గా ఉంచండి.",
      "Customer చెప్పిన symptom confirmed repair cause కాదు.",
      "Disposition మరియు outcome నమోదు చేయకుండా return close చేయవద్దు.",
    ],
    checklist: ["Returned unit సరిగ్గా identify అయింది", "Receipt మరియు reported issue నమోదు అయ్యాయి", "Disposition మరియు outcome trace చేయవచ్చు"],
  },
  "rma-tracking": {
    summary: "Return authorization‌ను approval మరియు receipt నుంచి repair, replacement, final resolution వరకు track చేయండి.",
    prerequisites: ["RMA లేదా authorized return process"],
    flow: ["RMA search", "Authorization verify", "Received units track", "Resolution close"],
    steps: [
      "Mfg → Repair & Rework → RMA Tracking తెరవండి.",
      "RMA, customer, serial, Product, status లేదా date ద్వారా వెతకండి.",
      "Authorization, receipt, linked units, repair లేదా replacement progress, మరియు records review చేయండి.",
      "అన్ని units accounted for అయిన తర్వాతే final resolution confirm చేసి RMA close చేయండి.",
    ],
    rules: [
      "RMA authorization మరియు physical receipt వేర్వేరు milestones.",
      "ప్రతి returned unit సరైన RMA‌కు link అయి ఉండాలి.",
      "Unresolved units ఉన్నప్పుడు RMA close చేయవద్దు.",
    ],
    checklist: ["Authorization మరియు receipt కనిపిస్తున్నాయి", "అన్ని returned units link అయ్యాయి", "Final resolution complete"],
  },
  "repair-alerts": {
    summary: "Repair మరియు rework conditions‌కు warning, block, లేదా escalation rules సెట్ చేసి monitor చేయండి.",
    prerequisites: ["Rule నియంత్రించాల్సిన repair condition మరియు response తెలిసి ఉండాలి"],
    flow: ["Condition ఎంచుకోండి", "Threshold సెట్", "Action ఎంచుకోండి", "Triggered alerts monitor"],
    steps: [
      "Mfg → Repair & Rework → Alerts తెరవండి.",
      "Repair లేదా rework condition, scope, threshold, మరియు attempt limit ఎంచుకోండి.",
      "Alert, block, లేదా block and propose scrap response ఎంచుకుని సరైన Active state‌లో save చేయండి.",
      "Triggered alerts monitor చేసి alert close చేసే ముందు source job issue పరిష్కరించండి.",
    ],
    rules: [
      "Attempt-limit rules Rework Board‌లో కాదు; Alerts‌లో configure చేయాలి.",
      "Threshold దాటితే work ఆగాల్సినప్పుడే blocking action ఉపయోగించండి.",
      "Alert వచ్చినా అవసరమైన repair, quality, hold లేదా scrap record‌ను తప్పక నమోదు చేయాలి.",
    ],
    checklist: ["Condition మరియు scope సరైనవి", "Threshold మరియు action policy‌కు సరిపోతాయి", "Triggered alert‌కు owner ఉంది"],
  },
  "repair-config": {
    summary: "Automatic repair intake, default Repair Station, మరియు repair operating limits‌ను నియంత్రించండి.",
    prerequisites: ["Automatically created tickets‌కు default Station routing అవసరమా తెలుసుకోవాలి"],
    flow: ["Config తెరవండి", "Automatic intake సెట్", "Default Station review", "Save చేసి verify"],
    steps: [
      "Mfg → Repair & Rework → Repair Config తెరవండి.",
      "Failed units స్వయంచాలకంగా repair‌కు రావాలంటే మాత్రమే Auto-create repair on failure enable చేయండి.",
      "Automatically created tickets ఆ Station‌కు route కావాలంటే Default Repair Station ఎంచుకుని, operating model‌కు అవసరమైన repair limits సెట్ చేయండి.",
      "Save చేసి కొత్త eligible failure expected intake path‌ను follow చేస్తుందో చూడండి.",
    ],
    rules: [
      "Verified SIT screen‌లో Default Repair Station ఖాళీగా ఉన్నప్పటికీ Auto-create repair enabled‌గా ఉంది; operating model automatic station routing కోరినప్పుడు Station సెట్ చేయండి.",
      "Failures‌ను ముందుగా Debug Queue‌లో review చేయాలంటే automatic intake disabled‌గా ఉంచండి.",
      "Config changes future intake‌ను ప్రభావితం చేస్తాయి; active jobs‌ను విడిగా review చేయండి.",
    ],
    checklist: ["Automatic intake policy‌కు సరిపోతుంది", "అవసరమైతే Default Station routing configured", "Test failure expected path‌ను follow చేసింది"],
  },
  "rework-symptoms": {
    summary: "Diagnosis‌కు ముందు operator లేదా customer గమనించినదాన్ని నమోదు చేయడానికి consistent symptom list నిర్వహించండి.",
    prerequisites: ["Plant ఉపయోగించే symptom vocabularyపై అంగీకారం ఉండాలి"],
    flow: ["Existing symptoms review", "Clear symptom add", "State సెట్", "Consistent use"],
    steps: [
      "Mfg → Repair & Rework → Rework Symptoms తెరవండి.",
      "Duplicate wording రాకుండా కొత్త symptom ముందు existing list search చేయండి.",
      "Clear name, description, మరియు అందుబాటులో ఉన్న Active state‌తో symptom create లేదా update చేయండి.",
      "Debug, repair, rework, లేదా customer return record చేసేప్పుడు standard symptom ఉపయోగించండి.",
    ],
    rules: [
      "Symptom observed issue‌ను మాత్రమే చెబుతుంది; root cause‌ను confirm చేయదు.",
      "Operators consistent‌గా select చేయడానికి short, clear names ఉపయోగించండి.",
      "Near-duplicate సృష్టించకుండా obsolete symptom deactivate చేయండి.",
    ],
    checklist: ["Duplicate symptom లేదు", "Wording observation‌ను చెబుతుంది", "State current use‌కు సరిపోతుంది"],
  },
  "rework-reasons": {
    summary: "Rework causes మరియు dispositions consistent‌గా report కావడానికి standard reason list నిర్వహించండి.",
    prerequisites: ["Plant ఉపయోగించే reason లేదా cause vocabularyపై అంగీకారం ఉండాలి"],
    flow: ["Existing reasons review", "Clear reason add", "State సెట్", "Rework‌లో use"],
    steps: [
      "Mfg → Repair & Rework → Rework Reasons తెరవండి.",
      "కొత్త reason సృష్టించే ముందు existing list search చేయండి.",
      "Clear name, description, మరియు అందుబాటులో ఉన్న Active state‌తో reason create లేదా update చేయండి.",
      "Confirmed rework cause లేదా disposition నమోదు చేయడానికి standard reason ఉపయోగించండి.",
    ],
    rules: [
      "Reason confirmed cause లేదా disposition‌ను చెబుతుంది; observed symptom నుంచి వేరుగా ఉంచండి.",
      "Analytics equivalent causes‌ను group చేయడానికి controlled wording ఉపయోగించండి.",
      "History delete చేయకుండా obsolete reasons deactivate చేయండి.",
    ],
    checklist: ["Equivalent reason ఇప్పటికే లేదు", "Wording cause లేదా disposition‌ను చెబుతుంది", "State current use‌కు సరిపోతుంది"],
  },
};

const ta: RepairGuidePage[] = en.map((page) => ({ ...page, ...taCopy[page.slug] }));
const te: RepairGuidePage[] = en.map((page) => ({ ...page, ...teCopy[page.slug] }));

const pages: Record<CookbookLang, RepairGuidePage[]> = { en, ta, te };

export function getForgeRepairPages(lang: CookbookLang): RepairGuidePage[] {
  return pages[lang];
}
