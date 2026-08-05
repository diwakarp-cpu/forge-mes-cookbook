export type ForgeTaskGuide = {
  navigationPath: string;
  steps: string[];
};

const guide = (navigationPath: string, steps: string[]): ForgeTaskGuide => ({
  navigationPath,
  steps,
});

const TASK_GUIDES: Record<string, ForgeTaskGuide> = {
  "complete-setup-journey": guide("Fynd ERP Dashboard", [
    "**Open the setup journey:** Use the left navigation to work through Setup, Process & Engineering, Production, and Traceability in order.",
    "**Create the factory records:** Create Sites, Lines, operation Stations, Repair Stations, and Shift Definitions.",
    "**Create the product records:** Create the Project, Product Family, Components, Product, Variants, and BOM Version.",
    "**Prepare execution:** Activate the BOM, create and validate the Routing, and assign the Product to eligible Lines.",
    "**Launch a trial order:** Create a small Work Order, confirm unit serials, select capacity and Routing, run validation, and select Release.",
  ]),
  sites: guide("Manufacturing → Setup → Sites", [
    "**Open Sites:** In the Fynd ERP left navigation, open **Setup** and select **Sites**.",
    "**Start a new record:** Select **Create Site** in the upper-right corner.",
    "**Enter the required identity:** Complete **Name** and a unique **Code**. Use only uppercase letters, numbers, and hyphens in the code.",
    "**Add location details when needed:** Select **Country** to enable **State**, then select **State** to enable **City**.",
    "**Add optional metadata carefully:** Keep metadata within the 32 KB limit and add tags only when they improve search or grouping.",
    "**Save and verify:** Select **Save**, then confirm the Site appears in the Sites list.",
  ]),
  lines: guide("Manufacturing → Process & Engineering → Line", [
    "**Open Lines:** In the Fynd ERP left navigation, open **Process & Engineering** and select **Line**.",
    "**Start a new line:** Select **Create Line** in the upper-right corner.",
    "**Enter the required details:** Complete **Name**, unique **Code**, and **Line Type**. Select the Site when the Line belongs to one.",
    "**Set capacity:** Enter realistic values. **Capacity Per Shift** must exceed **Capacity Per Hour**, and **Task Queue Capacity** must be a whole number from 1 to 100,000.",
    "**Choose the starting behavior:** Turn on **Is Starting Line** only when newly released Production Tasks may begin on this Line.",
    "**Create the line:** Keep the Line active, review the values, and select **Create Line**.",
  ]),
  "stations-and-repair-stations": guide(
    "Manufacturing → Process & Engineering → Stations",
    [
      "**Open Stations:** Open **Process & Engineering** and select **Stations**.",
      "**Create an operation Station:** Select **Create Station**, then enter the required **Name**, unique **Code**, **Site**, and **Station Category**.",
      "**Validate the identity:** Use a name with at least two characters. Station codes allow letters, numbers, and hyphens; names and codes must be unique within the Plant.",
      "**Place and classify it:** Select the correct **Site** and choose the Station type that matches how work is performed.",
      "**Configure execution:** Add devices, tools, or automation settings only when the Station requires them.",
      "**Create the Repair Station:** Repeat the process and choose the Repair type for the dedicated failure-handling Station.",
      "**Save and verify:** Select **Save** and confirm both Stations are active and available in Routing operations.",
    ],
  ),
  shifts: guide("Manufacturing → Shifts & Labor → Shift Definitions", [
    "**Open Shift Definitions:** Open **Shifts & Labor** and select **Shift Definitions**.",
    "**Start a shift:** Select **Create Shift**.",
    "**Enter the required schedule:** Add **Name**, unique **Code**, **Shift Type**, **Start Time**, and **End Time**. Codes use uppercase letters, numbers, and hyphens.",
    "**Use valid times:** Enter time in 24-hour **HH:mm** format; overnight Shifts are supported.",
    "**Configure breaks:** Every break needs a name, type, and at least one minute. Unpaid breaks reduce net working time.",
    "**Add calendar rules:** Use **Shift Schedules** or **Shift Calendar** when the working pattern changes by day.",
    "**Save the shift:** Select **Create Shift** or **Save**, then confirm it is available in the Shift list.",
  ]),
  "factory-readiness": guide(
    "Manufacturing → Factory setup and Process & Engineering",
    [
      "**Check Sites:** Open **Sites** and confirm every physical manufacturing location is represented.",
      "**Check Lines:** Open **Line** and confirm the intended first production Line has **Is Starting Line** enabled.",
      "**Check capacity:** Open each Line and review **Task Queue Capacity**, hourly capacity, and shift capacity.",
      "**Check Stations:** Open **Stations** and confirm every Routing operation and failure path has an active Station.",
      "**Run a small validation:** Use a small Work Order quantity to confirm the factory model can accept and route Production Tasks.",
    ],
  ),
  "projects-and-product-families": guide("Manufacturing → Setup → Projects", [
    "**Open Projects:** Open **Setup** and select **Projects**.",
    "**Create a Project:** Select **Create Project**, enter the Project identity and ownership details, then save it.",
    "**Open the Project:** Select the new Project and find its **Product Families** section.",
    "**Create a Product Family:** Select **Create Product Family**, enter its name and code, and save.",
    "**Verify the hierarchy:** Confirm the Product Family appears under the intended Project and can be selected during Product creation.",
  ]),
  components: guide("Manufacturing → Setup → Item Master", [
    "**Open Item Master:** Open **Setup** and select **Item Master**.",
    "**Start a component:** Select the create action and choose manual item creation.",
    "**Enter the required identity:** Complete **Name**, unique **Code**, and **Unit**. Name and code must contain at least two characters.",
    "**Select tracking before creation:** Choose **Serialized**, **Consumable**, or **Fixed Serial** as appropriate; these modes are mutually exclusive. Fixed Serial also requires a permanent barcode or QR value.",
    "**Set stock thresholds:** Maximum stock must exceed minimum stock, and the reorder level must fall between them.",
    "**Review locked settings:** Unit and tracking settings cannot be changed after the Component is created.",
    "**Save the component:** Select **Create Component**, then confirm it can be searched while editing a BOM.",
  ]),
  "products-and-variants": guide("Manufacturing → Production → Products", [
    "**Open Products:** Open **Production** and select **Products**.",
    "**Start a product:** Select **Create Product**.",
    "**Enter basic information:** Complete a unique **Name** of at least two characters and a unique **SKU** of at least three characters; select the Product Family when used.",
    "**Add Variants when needed:** Variants are optional, but when enabled the Product needs at least two.",
    "**Configure production:** Add a shared BOM or BOM coverage for every Variant. Shared rows apply to every Variant; matching Variant rows override their quantities.",
    "**Create the product:** Review validation messages and select **Create Product**.",
  ]),
  "bill-of-materials": guide(
    "Manufacturing → Production → Products → Product detail → BOM",
    [
      "**Open the Product:** Open **Production → Products**, search for the Product, and select it.",
      "**Open the BOM:** Select the Product's **BOM** or **BOM Versions** section and open the draft version.",
      "**Add Components:** Select **Add Component**, search for each Component, and enter the required quantity.",
      "**Set coverage:** Use shared entries for common material and Variant entries only where requirements differ.",
      "**Review quantities:** Every quantity must be positive. A Component cannot be added twice in the same scope, and the optional unit override must match the production requirement.",
      "**Save the version:** Select **Save** and resolve any missing-coverage validation before activation.",
    ],
  ),
  "activate-bom": guide(
    "Manufacturing → Production → Products → Product detail → BOM Versions",
    [
      "**Open BOM Versions:** Open the Product and select **BOM Versions**.",
      "**Choose the draft:** Open the version that production should use.",
      "**Review the items:** Confirm at least one Component exists and every Variant has valid BOM coverage.",
      "**Release the version:** Select **Release BOM Version** and confirm the warning. Releasing locks further editing, and only one BOM Version is active for the Product at a time.",
      "**Verify the result:** Confirm the status shows **Active**, editing controls are removed, and **Create Routing** is available.",
    ],
  ),
  "material-tracking": guide(
    "Inventory → Inventory and Manufacturing → Production",
    [
      "**Open the Component:** Search the component catalogue and open the required Component.",
      "**Choose its tracking rule:** Select serial tracking for individual identities or lot/quantity tracking for bulk material.",
      "**Receive inventory:** Use the inventory receipt flow to capture serials, supplier lots, internal lots, and quantities.",
      "**Add it to the BOM:** Open the Product BOM, select the Component, and enter the required quantity.",
      "**Test consumption:** Run a small operation and scan a serial or enter a quantity to confirm genealogy is recorded.",
    ],
  ),
  "create-routing": guide("Manufacturing → Process & Engineering → Routing", [
    "**Open Routing:** Open **Process & Engineering** and select **Routing**.",
    "**Start a Routing:** Select **Create Routing**, then choose the Product, active BOM Version, name, and applicable Variants.",
    "**Build the flow:** Add one **Start** node, the required operation nodes, and one **End** node.",
    "**Assign Stations:** Select a main Station and a different Repair Station for every operation that can fail.",
    "**Connect and configure:** Connect every operation from **Start** to **End**, use a unique operation name, and assign every required Component with its full BOM quantity.",
    "**Validate and activate:** Select **Validate** and resolve every blocking error. **Save** remains unavailable until validation passes; then save and set the Routing to **Active**.",
  ]),
  "product-line-assignment": guide(
    "Manufacturing → Production → Products → Product detail → Lines",
    [
      "**Open the Product:** Open **Production → Products**, search for the Product, and select it.",
      "**Find Line assignments:** Open the **Lines**, **Assigned Lines**, or production assignment section.",
      "**Add a Line:** Select **Assign Line** or **Add Line**, then choose an active Line that can build the Product.",
      "**Add alternatives carefully:** Select additional Lines only when the same Product may start or run on them.",
      "**Save and verify:** Save the assignment and confirm at least one eligible Line has **Is Starting Line** enabled.",
    ],
  ),
  "starting-lines-and-capacity": guide(
    "Manufacturing → Process & Engineering → Line",
    [
      "**Open the Line:** Open **Process & Engineering → Line**, search for the Line, and select **Edit**.",
      "**Set starting eligibility:** Turn on **Is Starting Line** only if Production Tasks may begin there.",
      "**Set queue capacity:** Enter **Task Queue Capacity** for the maximum pending and active tasks the Line can safely hold.",
      "**Set production capacity:** Review **Capacity Per Hour** and **Capacity Per Shift** and enter realistic values.",
      "**Save and test:** Select **Save**, then open Work Order capacity planning and confirm the Line shows the expected headroom.",
    ],
  ),
  "product-identifiers": guide(
    "Manufacturing → Process & Engineering → Identifier Management",
    [
      "**Open Identifier Management:** Open **Process & Engineering** and select **Identifier Management**.",
      "**Create a mapping:** Select the create action and enter the required key, display name, and definition or range.",
      "**Validate the key:** Use uppercase letters, numbers, and underscores only.",
      "**Choose the source:** Use a controlled **Range** for generated values. External identifiers disable automatic generation.",
      "**Set generation timing:** Generate on task creation, task start, or a configured Routing step, and enable uniqueness when values must never be reused.",
      "**Save and verify availability:** Save the mapping and confirm enough unused values exist for the planned Work Order quantity.",
    ],
  ),
  "create-work-order": guide("Manufacturing → Production → Work Orders", [
    "**Open Work Orders:** Open **Production** and select **Work Orders**.",
    "**Start an order:** Select **Create Work Order**.",
    "**Select demand:** Choose the Production Order when used, then select the Client, Product, and Variant.",
    "**Enter execution details:** Complete the unique name, quantity, priority, future due date, and at least one Shift.",
    "**Validate the schedule:** Quantity must be a positive whole number, the due date cannot be in the past, and at least one active Shift is required before start.",
    "**Review readiness:** Confirm the Product has an active BOM, active Routing, and eligible Line assignment. Inventory shortfalls allow creation but must be resolved before release.",
    "**Create the order:** Select **Create Work Order** and open the new record to continue the start journey.",
  ]),
  "generate-unit-serials": guide(
    "Manufacturing → Production → Work Orders → Work Order detail",
    [
      "**Open the Work Order:** Search the Work Orders list and select the draft Work Order.",
      "**Open the start journey:** Select **Start**, **Prepare**, or the available production-start action.",
      "**Generate serials:** Open **Serial Numbers** and select **Generate** using the configured Product template or supported method.",
      "**Review the batch:** Validate every proposed value for uniqueness, remove invalid duplicates, and create the batch.",
      "**Confirm the batch:** Generated serials are not usable until the batch is confirmed.",
      "**Match the quantity:** Verify the confirmed serial count exactly equals the final Work Order quantity.",
    ],
  ),
  "capacity-and-routing": guide(
    "Manufacturing → Production → Work Orders → Work Order start journey",
    [
      "**Confirm serials first:** Complete and confirm the unit-serial batch before allocating Line capacity or selecting a Routing.",
      "**Open Capacity and Lines:** Open the draft Work Order's start journey and select **Capacity and Lines**.",
      "**Review eligible Lines:** Compare current task load and available headroom on Starting Lines.",
      "**Choose assignment mode:** Select automatic balancing or choose manual assignment.",
      "**Complete manual assignments:** When manual mode is used, select **Add Line Assignment** until the full quantity is allocated.",
      "**Select the Routing:** Choose an active Routing that covers the selected Product and Variant, then save the plan and review inventory, identifier, and Station blockers.",
    ],
  ),
  "pre-start-validation": guide(
    "Manufacturing → Production → Work Orders → Work Order start journey",
    [
      "**Open Pre-start validation:** Open the prepared Work Order and select the validation step.",
      "**Run validation:** Select **Validate** after serials, Line capacity, and Routing are complete.",
      "**Resolve blockers:** Open each failed check and correct Product, BOM, serial, identifier, inventory, or capacity data.",
      "**Re-run the checks:** Select **Validate** again until no blocking result remains.",
      "**Release production:** Review warnings, then select **Release Work Order** and confirm the action.",
    ],
  ),
  "production-tasks": guide("Manufacturing → Production → Production Tasks", [
    "**Open Production Tasks:** Open **Production** and select **Production Tasks**.",
    "**Find a unit:** Search by finished-unit serial, Work Order, Product, Line, or status.",
    "**Open the Task:** Select the task to view its current operation, assigned Line, Station, and Routing position.",
    "**Review status and history:** Open status details and Route Logs to see completed and pending operations.",
    "**Take the valid action:** Use the available start, hold, repair, reassign, or completion action based on the current state.",
  ]),
  "operator-flow": guide("Manufacturing → Station work area", [
    "**Open the Station work area:** Select the operator's Station and scan or enter the finished-unit serial.",
    "**Review the operation:** Read the instructions, required Components, tools, and quality gates.",
    "**Capture inputs:** Scan each serialised Component and enter the exact quantity for bulk Components.",
    "**Record the result:** Complete required checks and select the pass, fail, hold, or repair outcome.",
    "**Finish the operation:** Select **Complete** so Fynd ERP records the Route Log and moves the unit to its next valid step.",
  ]),
  "material-consumption": guide(
    "Manufacturing → Station work area → Current operation",
    [
      "**Open the unit:** At the Station work area, scan the finished-unit serial and open the current operation.",
      "**Open Materials:** Select the Components or material-consumption section.",
      "**Scan serialised material:** Scan every required Component serial and verify the matched Component.",
      "**Enter bulk quantities:** Select the lot or location and enter the quantity consumed for non-serialised material.",
      "**Complete the operation:** Review the captured material and select **Complete** to write consumption and genealogy.",
    ],
  ),
  "statuses-and-route-logs": guide(
    "Manufacturing → Production → Work Orders or Production Tasks",
    [
      "**Find the record:** Search for the Work Order or Production Task and open it.",
      "**Review the current status:** Check the status chip and current Routing operation.",
      "**Open Route Logs:** Select the history, timeline, or **Route Logs** tab.",
      "**Inspect an event:** Open an entry to review Station, operator, result, timestamps, Components, and exceptions.",
      "**Filter or export:** Apply the available filters or export the history when it is needed for investigation.",
    ],
  ),
  "quality-controls": guide(
    "Manufacturing → Quality → Quality Settings or Quality Inspections",
    [
      "**Open Control Points:** Open **Quality** and select **Control Points**.",
      "**Create the control:** Enter the inspection name and the required **Control Type**, **Frequency**, and **Failure Action**.",
      "**Select the scope:** Bind the control to the applicable Product, production Line, Station, or Routing operation.",
      "**Define outcomes:** Configure measurable pass criteria and the required failure behavior, such as quarantine and automatic Hold.",
      "**Save and test:** Save the control and run a small unit through the operation to confirm it appears.",
    ],
  ),
  "inspection-to-capa": guide("Manufacturing → Quality", [
    "**Create the inspection:** Open **Quality Inspections** and start an Inspection from a production source.",
    "**Select valid production:** Choose a started Work Order or valid lot and enter the affected quantity.",
    "**Capture the issue:** On failure, create or link a **Defect** with symptom, severity, source, evidence, and affected unit.",
    "**Control the output:** Open **NCR Reports**, formalise the non-conformance, and record its Disposition.",
    "**Escalate when required:** Open **CAPA**, assign corrective or preventive action, and track it through verification.",
  ]),
  "repair-and-rework": guide("Manufacturing → Repair & Rework", [
    "**Record the decision:** Open **Quality → Dispositions**, select the affected record, and enter the required rationale and action.",
    "**Preserve the source:** Confirm the original serial, Defect, and Disposition remain linked.",
    "**Open Rework Board:** Open **Repair & Rework → Rework Board** and create the tracked Rework job or Work Order.",
    "**Record the work:** Enter symptoms, diagnosis, repair or rework actions, and replacement Components where applicable.",
    "**Reinspect and close:** Complete the required reinspection before returning the unit to an allowed Routing point or closing the job.",
  ]),
  "hold-scrap-teardown": guide("Manufacturing → Quality or Scrap & Teardown", [
    "**Open the affected unit:** Find the Production Task, quality record, or material record.",
    "**Choose the exception:** Select **Hold**, **Scrap**, or **Teardown** according to the approved decision.",
    "**Enter the reason:** Select the configured reason and add notes, evidence, affected quantity, and ownership.",
    "**Confirm the action:** Review the irreversible impact before selecting **Confirm**. Scrap progresses through approval and execution states.",
    "**Complete follow-up:** Release a Hold only after resolution. Teardown becomes available after executed Scrap is dispatched; record recovered Components with their donor-unit context.",
  ]),
  packaging: guide("Manufacturing → Packaging & Shipping → Packaging", [
    "**Open Packaging:** Open **Packaging & Shipping** and select **Packaging**.",
    "**Start or find a container:** Scan an existing container or select the action to create one using the correct Container Type.",
    "**Add finished units:** Scan each eligible finished-unit serial into the container.",
    "**Run checks:** Complete the configured Container Type, quantity, weight, declarations, and label verification.",
    "**Close the container:** Keep the container open until every configured check passes, then print the label and select the close or complete action.",
  ]),
  "containers-and-labels": guide("Manufacturing → Packaging & Shipping", [
    "**Open packaging configuration:** Open Container Types, packaging rules, and label templates for the Product.",
    "**Build the hierarchy:** Configure the allowed leaf-to-parent sequence, such as unit, box, carton, and pallet.",
    "**Bind identities:** The leaf container binds the finished-unit serial; each parent accepts only its configured child UID.",
    "**Create the label:** Add the template variables required for product, unit, container, quantity, and shipment scanning.",
    "**Test and audit:** Print a test label and confirm label history and reprints remain traceable.",
  ]),
  "shipment-verification": guide(
    "Manufacturing → Packaging & Shipping → Shipment Verification",
    [
      "**Open Shipment Verification:** Open **Packaging & Shipping** and select **Shipment Verification**.",
      "**Select the shipment first:** Choose the Shipment before verification begins; **Container Type** remains unavailable until a Shipment is selected.",
      "**Select the Container Type and verify:** Scan or select each expected container UID and review Verified, Mismatched, and Pending counts.",
      "**Review governing rules:** Confirm the active Shipment Rule permits the container count and weight, and that the Shipping Gate has enough approved PO quantity.",
      "**Resolve differences:** Correct mismatches before completion, then use the client-specific ASN template when an export is required.",
    ],
  ),
  "traceability-genealogy-recall": guide(
    "Manufacturing → Traceability → Master Traceability",
    [
      "**Open Master Traceability:** Open **Traceability** and select **Master Traceability**.",
      "**Set the dossier scope:** Combine the available filters or paste an identifier list; an identifier list overrides the other scope filters.",
      "**Choose report sheets:** Select the required unit, route, quality, genealogy, packaging, shipment, or audit sheets and generate the dossier.",
      "**Use Stage Timeline correctly:** Enter start and end dates, select at least one Work Order, and choose 1–50 Operations.",
      "**Follow genealogy:** Open **Batch Genealogy** to search upstream or downstream, or use **Find Affected Units** for a material lot or Component.",
      "**Start containment when needed:** Open **Recall Notices** and preserve severity, status, reason, and the affected-unit population.",
    ],
  ),
  dashboards: guide(
    "Manufacturing → Dashboard, Work Orders, Production Tasks, and Route Logs",
    [
      "**Review the Plant dashboard:** Use readiness, active Work Order, Station, Product, and target metrics for the current Plant.",
      "**Open Work Orders:** Review status, priority, and due date to find schedule risk.",
      "**Open Production Tasks:** Search by serial and review its Product, Routing, assigned Line, and task status.",
      "**Open Route Logs:** Verify execution evidence, including operator, Station, Line, timestamp, and quality result.",
      "**Investigate the source:** Open the underlying Work Order, Task, or Route Log before taking corrective action.",
    ],
  ),
  "shift-operations": guide("Manufacturing → Shifts & Labor", [
    "**Review Shift Definitions:** Confirm timing, break definitions, and the calculated net working duration.",
    "**Review Shift Schedules:** Configure the effective dates and weekly pattern, then activate the Schedule when it is ready for operations; new Schedules remain Draft until activation.",
    "**Create the handover:** Open **Shift Handovers**, then enter the date, Shift, Line, outgoing operator, incoming operator, status, and notes.",
    "**Record current conditions:** Include WIP, holds, downtime, material risk, quality issues, and any unresolved actions.",
    "**Check Break Compliance:** Review planned versus actual duration, violations, and compliance; export is available only when the filtered report has results.",
  ]),
  "tools-and-maintenance": guide(
    "Manufacturing → Process & Engineering → Tools and Equipments",
    [
      "**Open Tools:** Open **Process & Engineering → Tools and Equipments** and select **Tools**.",
      "**Create or find the Tool:** Select the create action or search for the existing Tool record.",
      "**Review control details:** Confirm identity, manufacturer/model, category, assigned Station, and availability status.",
      "**Review Maintenance Alerts:** Check priority, owner, affected Tool or equipment, Line, and current status; trigger a maintenance check when required.",
      "**Use Maintenance Work Orders:** Track maintenance type, priority, assigned owner, scheduled start, and completion status.",
      "**Protect production:** Do not use a Tool for execution while its availability or maintenance state makes it unsuitable.",
    ],
  ),
  "reports-and-audit": guide(
    "Traceability → Master Traceability; Production → Work Orders",
    [
      "**Build a traceability report:** Open **Master Traceability**, set the required scope, and choose the dossier sheets needed for the investigation.",
      "**Generate the dossier:** Review the selected unit, route, quality, genealogy, identifier, tool, packaging, and shipment evidence.",
      "**Export operational records:** Open **Work Orders**, keep the intended filters, and select **Export Work Orders**.",
      "**Open change history:** Select **View all changes** to open the entity's Recent Changes history.",
      "**Review the evidence:** Confirm actor, action, entity, changed fields, and timestamp before returning to the affected record.",
    ],
  ),
  "first-production-run": guide("Manufacturing → Production → Work Orders", [
    "**Create a trial Work Order:** Select **Create Work Order** and use a small but realistic quantity.",
    "**Prepare and release:** Confirm serials, capacity, Routing, material, and identifiers, then select **Release Work Order**.",
    "**Run the normal path:** Complete at least one unit through every required operation.",
    "**Test an exception:** Fail one controlled operation and complete its Repair or Rework path.",
    "**Finish and trace:** Complete applicable quality, packaging, and shipment steps, then search the unit in **Master Traceability**.",
  ]),
  troubleshooting: guide("The affected Fynd ERP module", [
    "**Open the failed record:** Return to the Product, Routing, Work Order, Production Task, or shipment showing the error.",
    "**Read the validation message:** Expand the failed check and note the exact missing field, relationship, status, or quantity.",
    "**Check prerequisites:** Verify active BOM, Stations, Repair Stations, Shift, Line assignment, capacity, serials, inventory, and identifiers as applicable.",
    "**Correct the source record:** Open the linked configuration, make the required change, and select **Save**.",
    "**Retry the action:** Return to the original record and select **Validate**, **Create**, **Release**, or **Complete** again.",
  ]),
};

import type { CookbookLang } from "./forge-i18n";
import { TASK_GUIDES_TA } from "./forge-task-guides.ta";
import { TASK_GUIDES_TE } from "./forge-task-guides.te";

const TASK_GUIDES_BY_LANG: Record<
  CookbookLang,
  Record<string, ForgeTaskGuide>
> = {
  en: TASK_GUIDES,
  ta: TASK_GUIDES_TA,
  te: TASK_GUIDES_TE,
};

export function getForgeTaskGuide(
  slug: string,
  lang: CookbookLang = "en",
): ForgeTaskGuide | undefined {
  return (TASK_GUIDES_BY_LANG[lang] ?? TASK_GUIDES)[slug] ?? TASK_GUIDES[slug];
}
