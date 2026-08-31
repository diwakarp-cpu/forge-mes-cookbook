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
    "**Open the manufacturing journey:** Use the left navigation to work through Production, Process & Engineering, Quality, and the downstream manufacturing modules in the order your process requires.",
    "**Create the factory records:** Create Sites, Lines, operation Stations, Repair Stations, and Shift Definitions.",
    "**Create the product records:** Create the Project, Product Family, Components, Product, Variants, and BOM Version.",
    "**Prepare execution:** Activate the BOM, create and validate the Routing, and assign the Product to eligible Lines.",
    "**Launch a trial order:** Create a small Work Order, confirm unit serials, select capacity and Routing, run validation, and select Release.",
  ]),
  sites: guide("Masters → Sites", [
    "**Open Sites:** In the Fynd ERP left navigation, open **Masters** and select **Sites**.",
    "**Start a new record:** Select **Create Site** in the upper-right corner.",
    "**Choose the creation method:** Select **Create Manually** to complete the form, or use the AI-assisted option when you want Fynd ERP to draft the details from a prompt.",
    "**Enter the required identity:** **Name** and **Code** are required. The code accepts letters, numbers, and hyphens only.",
    "**Add location details when needed:** Address fields are optional. Select **Country** before **State / Province / Region**; the available City values are filtered by the selected location.",
    "**Add optional metadata carefully:** Keep metadata within the 32 KB limit and add tags only when they improve search or grouping.",
    "**Create and verify:** Select **Create**, then confirm the Site appears in the Sites list and is available when a Station is created.",
  ]),
  lines: guide("Mfg → Process & Engineering → Line", [
    "**Open Lines:** Open **Mfg**, expand **Process & Engineering**, and select **Line**.",
    "**Start a new line:** Select **Create Line** in the upper-right corner.",
    "**Choose the creation method:** Select **Create Manually** to complete the form, or use the AI-assisted option to draft a Line from a prompt.",
    "**Enter the required details:** **Name**, **Code**, and **Line Type** are required. **Site** is optional; select it when the Line belongs to a specific location.",
    "**Set capacity:** Enter realistic values. **Capacity Per Shift** must exceed **Capacity Per Hour**, and **Task Queue Capacity** must be a whole number from 1 to 100,000.",
    "**Choose the starting behavior:** Turn on **Is Starting Line** only when this Line may receive the initial task assignment during capacity planning. The form confirms this behavior for eligible SMT and BLT starting Lines.",
    "**Create the Line:** Keep the Line active, review the values, and select **Create**. Confirm the new Line appears in the list with its Site, type, status, and hourly capacity.",
  ]),
  "stations-and-repair-stations": guide(
    "Mfg → Process & Engineering → Stations",
    [
      "**Open Stations:** Open **Mfg**, expand **Process & Engineering**, and select **Stations**.",
      "**Start a Station:** Select **Create Station**, then choose **Create Manually** or use the AI-assisted option to draft the record.",
      "**Enter the required details:** **Station Name**, **Station Code**, **Site Location**, and **Station Category** are required.",
      "**Classify the Station:** **Station Type** controls its production behavior; **Station Category** organizes it for production use. New Stations default to **Idle** and **Regular**.",
      "**Create the operation Station:** Select the Assembly Site and category for the SMT placement Station, then select **Create Station**.",
      "**Create the Repair Station:** Repeat the flow and set both **Station Type** and **Station Category** to **Repair** so the Station is available for repair and rework handling.",
      "**Verify both records:** Confirm the regular Assembly Station and Repair Station appear in the Stations list with the correct Site, type, category, and Idle status.",
    ],
  ),
  shifts: guide("Mfg → Shifts & Labor → Shift Definitions", [
    "**Open Shift Definitions:** Open **Mfg**, expand **Shifts & Labor**, and select **Shift Definitions**.",
    "**Start a Shift:** Select **Create Shift**, then choose **Create Manually** or use the AI-assisted option to draft the schedule.",
    "**Enter the required schedule:** **Shift Name**, **Code**, **Shift Type**, **Start Time**, and **End Time** are required. Codes accept uppercase letters, numbers, and hyphens.",
    "**Use the intended Shift Type:** Choose Morning, Afternoon, Night, General, Rotational, or Split. The selected type supplies a matching default color.",
    "**Set valid times:** The form calculates duration and net working time automatically. End times may cross midnight for overnight Shifts.",
    "**Configure breaks:** Select **Add Break** and enter a name, type, and duration of at least one minute. Break start time is optional; unpaid breaks reduce net working time.",
    "**Create and verify:** Keep the Shift active, select **Create**, and confirm the overview shows its identity, type, timing, net working time, and breaks.",
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
  "projects-and-product-families": guide("Mfg → Production → Product Families", [
    "**Open Product Families:** Open **Mfg**, expand **Production**, and select **Product Families**.",
    "**Review the list:** Use the available search and filters to find an existing Family before creating another one.",
    "**Start a Product Family:** Select the available create action and enter the required **Name** and **Code**.",
    "**Add classification:** Select the available Type, Status, Project, or other context only when it applies to the Product group.",
    "**Create and verify:** Save the Product Family and confirm its code, status, type, Project context, and product count in the list.",
    "**Recorded SIT navigation:** Projects was not a separate option under **Mfg → Production** during verification. Use the Project field or linked Project context only where the Product Family screen provides it, and recheck the target environment before a client demonstration.",
  ]),
  components: guide("Masters → Item Master", [
    "**Open Item Master:** Open **Masters**, select **Item Master**, and then select **Add Item**.",
    "**Enter the required identity:** Complete **Name**, unique **Code**, and **Unit**. The code accepts letters, numbers, and hyphens.",
    "**Review the permanent settings:** Unit, Track by Serial Number, Consumable Component, Fixed Serial, and Track by Non-Serialized cannot be changed after creation.",
    "**Configure tracking:** Enabling **Track by Serial Number** disables Consumable and Fixed Serial. **Track by Non-Serialized** can remain enabled at the same time for mixed serial and lot tracking.",
    "**Set stock thresholds:** The reorder point cannot exceed maximum stock; keep minimum stock at or below the reorder point.",
    "**Create and verify:** Select **Create Component/Part** and review the success summary for code, unit, serialized status, and non-serialized tracking.",
    "**Update mutable details:** Reopen the material from **Item Master** and edit allowed identity, stock, supplier, or descriptive fields as needed. Unit and the permanent tracking controls remain locked after creation.",
    "**Track inventory activity:** Use Inventory Lots, Serials, Usage History, and the related inventory views to receive stock and follow lot, serial, quantity, and consumption history.",
  ]),
  "products-and-variants": guide("Mfg → Production → Products", [
    "**Open Products:** Open **Mfg**, expand **Production**, and select **Products**.",
    "**Start a product:** Select **Create Product**, then choose **Create Manually** or use the AI-assisted option.",
    "**Enter required information:** **Product Name** and a unique **SKU** are required. Product Description and Product Family are optional.",
    "**Set the batch multiplier:** Multiplier defines units produced per batch and must be a whole number of 1 or more.",
    "**Add Variants when needed:** Variants are optional. For each distinct configuration, enter a unique Variant SKU, Status, and optional key-value attributes such as Storage and Color.",
    "**Meet the BOM prerequisite:** Add at least one Shared BOM component, or add a BOM to every Variant. The Product cannot be created without one of these coverage paths.",
    "**Create and verify:** Select **Create Product** and confirm the Product, SKU, active status, and Variant count in the Products list.",
  ]),
  "bill-of-materials": guide(
    "Mfg → Production → Products → Product detail → BOM Versions",
    [
      "**Open the Product:** Open **Mfg → Production → Products**, find the Product, and use **View** to open its details.",
      "**Open the draft version:** Under **BOM Versions**, open **Initial Version (V1)** with **View Version Details**. In the recorded SIT flow, Product creation generated this Draft from the entered BOM; verify that the target environment does the same.",
      "**Add a BOM item:** Select **Add Item**. Items can be added while the version is Draft.",
      "**Choose the scope:** Use **Shared** for material used by every Variant. Select a Variant BOM only for configuration-specific material.",
      "**Set quantity and unit:** Quantity is at least 1. **Unit Override** is optional and should be used only when production consumes a different compatible unit.",
      "**Select and add components:** Choose **Select Components** or **Bulk Upload**, select the Component records, and then select **Add Items**.",
      "**Verify the draft:** Confirm Total Items and the Shared or Variant BOM table show each Component, code, tracking type, quantity, and unit.",
    ],
  ),
  "activate-bom": guide(
    "Mfg → Production → Products → Product detail → BOM Versions",
    [
      "**Open BOM Versions:** Open the Product and use **View Version Details** on the Draft version production should use.",
      "**Review the draft:** Confirm the Usage Type, effective dates, Total Items, and Shared or Variant coverage are correct.",
      "**Release the version:** Select **Release**, then confirm **Release BOM Version**. Once released, the version cannot be edited.",
      "**Understand active-version behavior:** The confirmation identifies whether another active version will be affected. V1 becomes the Product's only active BOM version in this workflow.",
      "**Verify the result:** Confirm status is **Active**, item editing controls are removed, release audit fields are recorded, and **Create Routing** is available.",
    ],
  ),
  "material-tracking": guide(
    "Masters → Item Master → Component detail",
    [
      "**Set tracking before creation:** Track by Serial Number and Track by Non-Serialized are permanent after Component creation. Enabling both provides individual serial identity inside inventory lots.",
      "**Open the Component:** Open **Masters → Item Master**, find the Component, and open its details. Confirm Tracking Type and the **Inventory Lots** and **Serials** tabs.",
      "**Start a lot receipt:** Open **Inventory Lots**, select **Add Lot**, and choose **Create Manually** or the AI-assisted option.",
      "**Enter required receipt fields:** Lot Number, Quantity Received, Vendor, Location Type, and Storage Location are required. Vendor and destination location must already exist.",
      "**Create the lot:** Optional fields include Batch Number, dates, invoice, manufacturer data, notes, dimensions, and metadata. Select **Create** after review.",
      "**Register serialized stock:** For a serialized Component, the received quantity remains unavailable until serials are registered. Use **Manual Entry** or **Bulk Entry** in **Add Component Serials**.",
      "**Verify availability:** Confirm the lot shows its received serial count, available quantity, Vendor, and Storage Location; use Usage History later to review consumption and genealogy.",
    ],
  ),
  "create-routing": guide("Masters → Products → Product detail → Create Routing", [
    "**Start from the Product:** Open the Product detail and select **Create Routing**. The routing configurator uses that Product automatically.",
    "**Select the required configuration:** Select at least one Variant, continue, and select an **Active** BOM Version. Inactive BOM versions are not available here.",
    "**Name the workflow:** Enter a required Workflow Name, add an optional description, and leave **Active** on when the route should be available for production.",
    "**Add the operation:** Select **Add Stage → Create Manually**, choose the main Station, and enter a unique Operation Name. A Repair Station is required and must be different from the main Station.",
    "**Cover the BOM:** On **Components**, assign the required Components and quantities. Both BOM coverage indicators must reach **100%**.",
    "**Connect and validate:** Save the stage, arrange the nodes if needed, and connect **Start → every stage → End**. The editor validates automatically and enables **Save** only when the workflow is valid.",
    "**Confirm creation:** Select **Save**, review the workflow summary, then select **Confirm & Save**. Verify the Active status, Product, Variants, BOM Version, and Workflow Preview on the Routing detail page.",
  ]),
  "product-line-assignment": guide(
    "Manufacturing → Production → Products → Product detail → Assigned Lines",
    [
      "**Open the Product:** Open **Production → Products**, search for the Product, and select it.",
      "**Find Assigned Lines:** Scroll to **Assigned Lines**. This Product-level section enables multi-line Work Order execution.",
      "**Assign a Line:** Select **Assign Line**, open **Select Line**, choose an eligible manufacturing Line, and select **Assign**.",
      "**Read availability correctly:** The selector separates **Available Lines** from Lines already **Assigned to Other Products** and shows each Line code and Site.",
      "**Add valid alternatives:** Repeat the assignment only for additional Lines that can physically manufacture the same Product.",
      "**Verify the table:** Confirm the assigned Line name, code, status, capacity per hour, Site, and actions. Starting-Line eligibility is configured separately on the Line.",
    ],
  ),
  "starting-lines-and-capacity": guide(
    "Manufacturing → Process & Engineering → Line → Line detail → Edit",
    [
      "**Open the Line:** Open **Process & Engineering → Line**, search by Line name or code, open the Line detail, and select **Edit**.",
      "**Set throughput:** **Capacity Per Hour** and **Capacity Per Shift** are optional. When both are supplied, Capacity Per Shift must be greater than Capacity Per Hour.",
      "**Limit the task queue:** **Task Queue Capacity** is optional and sets the maximum pending and active tasks allowed on the Line. When supplied, use a whole number from 1 to 100,000.",
      "**Set starting eligibility:** Turn on **Is Starting Line** only when the Line may receive the initial task during capacity planning. The UI identifies the phase order as SMT → BLT → ASSEMBLY → TESTING → PACKING.",
      "**Save and verify:** Select **Save**, then confirm the Line detail shows the expected status, Site, Capacity Per Hour, Capacity Per Shift, and assigned Products.",
    ],
  ),
  templates: guide("Mfg → Process & Engineering → Templates", [
    "**Open Templates:** Open **Mfg**, expand **Process & Engineering**, and select **Templates**.",
    "**Start a Template:** Select **Create Template**, then choose **Create Manually** or use the AI-assisted option to draft the Template.",
    "**Enter the required identity:** **Template Name** and **Template Type** are required. Description is optional.",
    "**Choose the data scope:** **Context Type** is optional and controls which data sources are available as variables. Leave it empty only when the Template needs maximum flexibility.",
    "**Build the Template:** Enter the content, pattern, parser, or validation rule required by the selected type. PDF/HTML supports HTML, CSS, and Nunjucks variables; use **Load Sample** when a starter is useful.",
    "**Preview before activation:** Use Editor, Variables, and Data Preview to verify the output with representative data. Keep **Active** on only when the Template is ready for use.",
    "**Save and verify:** Select **Save**, then confirm the Templates list shows the correct name, type, status, creator, and creation date. Use **My Approvals** and change history when governance applies.",
  ]),
  "product-identifiers": guide(
    "Manufacturing → Process & Engineering → Identifier Management; Production → Products → Product detail → Product Identifiers",
    [
      "**Create the identifier definition:** Open **Process & Engineering → Identifier Management**, select **Create Identifier Range → Create Manually**, and enter the required Name. Description and Active status are optional controls.",
      "**Choose the source and type:** Select **Range**, **Template**, **External**, or **Manual**. For a Range source, select the identifier Type and use **Range** or **File Upload**; a single operation can process up to 10,000 identifiers.",
      "**Define the pool:** For an IMEI Range, enter the required Start and End values, confirm the calculated identifier count and optional Range Preview, then select **Create**.",
      "**Open Product Identifiers:** Open **Production → Products**, open the Product detail, scroll to **Product Identifiers**, and select **Add Identifier**.",
      "**Configure the mapping:** Select the identifier definition, enter the required Identifier Key and Display Name, and choose **Generated** or **External**. Keys are stored in uppercase.",
      "**Set assignment behavior:** Assign **On Task Creation**, **On Task Start**, or **At Route Step**. For a generated IMEI, enable **Auto-generate** and **Must be Unique** as required.",
      "**Save and verify:** Select **Add Identifier** and confirm the Product table shows the key, display name, type, source, assignment timing, and linked range.",
    ],
  ),
  "create-work-order": guide("Manufacturing → Production → Work Orders", [
    "**Open Work Orders:** Open **Production** and select **Work Orders**.",
    "**Start an order:** Select **Create Work Order** and enter the required unique Work Order Name.",
    "**Select the Product:** Choose a Product with a configured Routing, then select its required Product Variant. Project and Product Family are derived automatically.",
    "**Enter execution details:** Enter a positive Input Quantity, select the required Priority, and choose a Due Date that is not in the past. The UI calculates Total Computed Quantity as Input Quantity × Product Multiplier.",
    "**Assign production time:** Select one or more Shifts when known. Shift is optional while creating the record, but at least one Shift is required before the Work Order can start.",
    "**Review availability and test behavior:** Review Component Availability. Enable **Test Order** only for line setup or workflow testing because Test Orders are excluded from analytics.",
    "**Create and verify:** Select **Create Work Order** and confirm the success dialog shows the Work Order ID, Product hierarchy, quantity, due date, priority, and **PENDING** status.",
  ]),
  "create-production-order": guide(
    "Mfg → Production → Production Orders",
    [
      "**Open Production Orders:** Open **Mfg**, expand **Production**, and select **Production Orders**.",
      "**Start an order:** Select **Create Production Order**, then choose **Create Manually** or use the AI-assisted option to draft the record.",
      "**Enter the required identity:** **Name** and **Order Number** are required. Use an Order Number that uniquely identifies this grouping record.",
      "**Set optional Client scope:** Select **Client** only when the Production Order must contain Work Orders for that Client. Selecting a Client restricts eligible Work Orders.",
      "**Add planning context:** Description, Start Date, End Date, and metadata are optional. Add them when they improve scheduling, search, or reporting.",
      "**Create the grouping record:** Review the fields and select **Create Production Order**. The Production Order groups work; it does not create executable quantity or Production Tasks by itself.",
      "**Link and monitor Work Orders:** Open the Production Order, connect eligible related Work Orders, and monitor their combined progress, status, and planned date range.",
    ],
  ),
  "generate-unit-serials": guide(
    "Manufacturing → Production → Work Orders → Work Order detail",
    [
      "**Open the Work Order:** Search the Work Orders list and select the draft Work Order.",
      "**Open the start journey:** Select **Start Work Order**. The **Serial Numbers** step blocks progress until confirmed serials equal the Work Order quantity.",
      "**Choose the generation method:** Select **Generate Serial Numbers**. Use the Product Template when configured, choose another available Template, or use **Manual Upload** for CSV or Excel values.",
      "**Review the preview:** Confirm the preview count equals the Work Order quantity and select **Validate Uniqueness**. Every proposed serial must be unique.",
      "**Generate the batch:** Select **Generate _n_ Serial Numbers** and review the batch number, quantity, and **GENERATED** status.",
      "**Confirm the batch:** Select **Confirm & Complete**. A GENERATED batch is not ready for production until it is confirmed.",
      "**Verify the gate:** Confirm the start journey shows **CONFIRMED**, the exact _n_/_n_ serial count, and enables **Next**.",
    ],
  ),
  "capacity-and-routing": guide(
    "Manufacturing → Production → Work Orders → Work Order start journey",
    [
      "**Confirm serials first:** The start wizard enables **Capacity & Lines** only after confirmed serials match the Work Order quantity.",
      "**Configure capacity:** Select **Configure Capacity Planning**. Review Total Quantity, Available Capacity, Available Lines, and projected capacity on eligible Starting Lines.",
      "**Choose assignment mode:** Use the default system-optimized distribution or switch to manual assignment. In system mode, select **Proceed with System Assignment**.",
      "**Verify the capacity gate:** Confirm **Capacity planning completed** and that **Next** is enabled before continuing.",
      "**Select the Routing:** In **Production Route**, choose the eligible active Routing. The option shows the associated BOM status, route type, and item count.",
      "**Verify the route gate:** Confirm the Routing step is checked, overall progress reaches 60%, and **Next** is enabled for validation.",
    ],
  ),
  "pre-start-validation": guide(
    "Manufacturing → Production → Work Orders → Work Order start journey",
    [
      "**Open validation:** After Serial Numbers, Capacity & Lines, and Routing are complete, select **Next → Run Pre-Start Validation**.",
      "**Review every gate:** Validation checks Product assignment, BOM, generated and confirmed serials, Component Inventory, Station-Level Inventory, and Identifier Availability.",
      "**Resolve blocking shortages:** A first-stage Station shortage disables start even when plant-level Component Inventory is sufficient. Use **Transfer All** or the component transfer action.",
      "**Transfer carefully:** Transfer All prioritizes storage locations, then non-routing Stations, and may partially transfer when full coverage is unavailable. Use **Auto-Fill Shortage** for the exact remaining quantity.",
      "**Verify PASS:** Re-run or refresh validation until every gate passes and **Proceed to Start** is enabled.",
      "**Release production:** **Proceed to Start** releases immediately, creates Production Tasks, and changes the Work Order from **PENDING** to **IN PROGRESS**.",
    ],
  ),
  "production-tasks": guide("Manufacturing → Production → Production Tasks", [
    "**Review tasks from the Work Order:** Open the released Work Order and select **Production Tasks**. Fynd ERP creates one task per confirmed finished-unit serial.",
    "**Check distribution:** Confirm the task count, serial coverage, Line Type, assigned Line, and pending/completed distribution match capacity planning.",
    "**Open a unit Task:** Select the task detail action. The header shows Task status, assigned serial, Work Order, Product, Line, and Line Type.",
    "**Review execution readiness:** **Stage Progress** shows the current Routing stage and Station; **Bound Identifiers** shows the assigned unit identifier.",
    "**Review material readiness:** **BOM Progress** lists required versus used quantities. Components remain Pending until consumed during execution.",
    "**Review process context:** Open **Routing and Process Details** to confirm the active Routing, process step, and assigned Station.",
  ]),
  "operator-flow": guide("Manufacturing → Station work area", [
    "**Filter mapped Stations:** In **Operator**, select the Product first, choose **Mapped**, and use the Status filter when the Station is not shown under the default **Running** view.",
    "**Choose production context:** Open the Station, select an active Work Order, and choose an eligible Production Line.",
    "**Open the Task:** Scan or enter the Production Task ID or confirmed finished-unit serial, then select **Start Task**.",
    "**Validate required inputs:** Enter an available serial for every serialised BOM Component. Identifier validators still apply; the Battery Pack requires GS1 AI 01 and AI 10.",
    "**Complete the operation:** Confirm the result and select **Complete & Next**. Fynd ERP records the operator, Station, material identities, result, timestamps, and Route progress.",
  ]),
  "material-consumption": guide(
    "Manufacturing → Station work area → Current operation",
    [
      "**Make material available:** Transfer required stock to the execution Station before opening the operation; the Station inventory panel shows the available quantities and lots.",
      "**Open the Production Task:** Scan or enter the Task ID or confirmed finished-unit serial in the Station work area.",
      "**Capture serialised material:** Enter one available, unconsumed serial for every serialised BOM requirement.",
      "**Satisfy identifier validators:** Use the configured identifier format. In the Nova X1 flow, the Battery Pack requires GS1 AI 01 and AI 10.",
      "**Record consumption:** Select **Complete & Next** after every required input validates. The completed Task records material identities, inventory use, and genealogy.",
    ],
  ),
  "statuses-and-route-logs": guide(
    "Manufacturing → Work Orders and Route Execution Logs",
    [
      "**Check the Work Order:** Open the Work Order to review overall status, progress, Production Metrics, and task distribution. It becomes **COMPLETED** only after every Production Task finishes.",
      "**Open Route Execution Logs:** Use **Route Execution Logs** to review operation-level execution evidence.",
      "**Read the counters:** Compare **Total Logs**, **Passed**, **Failed**, and **In Progress** before investigating individual rows.",
      "**Filter the history:** Filter by status, date range, Work Order, Product, Routing, or Station. Search by log ID, notes, or Product when needed.",
      "**Review each result:** A log records the timestamp, Work Order, Product, Routing, Line, Station, operator, quality result, and execution status. Use **View Details** for the related production context.",
    ],
  ),
  "quality-controls": guide("Manufacturing → Quality → Control Points", [
    "**Open Control Points:** Open **Quality**, select **Control Points**, and choose **Create Control Point**.",
    "**Enter required identity:** Enter the unique **Code** and **Name**. Select the required **Control Type**, **Frequency**, and **On Failure** action.",
    "**Set conditional scope:** Select the **Production Line** first; **Station** remains unavailable until a Line is chosen.",
    "**Define failure behavior:** Choose **Stop Line**, **Quarantine**, **Hold Lot**, **Escalate**, or **Alert Only**. Enable **Auto-hold failed units** when failed output must be secured automatically.",
    "**Add inspection evidence:** Add checklist questions and their response type, then create the control. Confirm its Active status, scope, failure action, and saved checklist on the Configuration tab.",
  ]),
  "inspection-to-capa": guide("Manufacturing → Quality", [
    "**Configure inspections first:** Create and activate the applicable inspection configuration. A Plant configuration is the fallback; more specific scopes override it.",
    "**Select one production source:** Create the inspection from either a **Work Order** or an available, non-expired **Lot**—never both. Enter the required total quantity and sampling quantity.",
    "**Record each sample:** Enter the serial or lot sample and complete its checks. Saving a failed sample requires a **Defect code** and **Severity**.",
    "**Choose the hold scope:** When rejecting the inspection, hold only the failed serials or place the entire lot on hold. Inspection-local defects and records in the plant **Defects** list are separate.",
    "**Confirm deployment availability:** NCR and CAPA actions can vary by deployment and permission. If the target screen does not provide a working create action, confirm enablement with the implementation owner instead of presenting the workflow as available.",
  ]),
  "repair-and-rework": guide(
    "Mfg → Repair & Rework → Debug Queue, Repair Queue, Repair Out, and Rework Board",
    [
      "**Send a failed RSN to Repair:** In **Debug Queue**, open the failed RSN and review its failure evidence, route context, and previous attempts. Select **Send to Repair** only when Forge displays it, choose the Repair Level and available 4M cause details, add diagnosis notes, submit, and verify the status becomes **Queued for Repair**.",
      "**Start the repair:** In **Repair Queue**, find and open the same RSN. Confirm the failure evidence, Repair Station, attempt history, and current status. Select **Start Repair**, complete any prompted level or assignment fields, and verify that the job is **In Repair** before recording work.",
      "**Complete the repair:** Select **Complete Repair** only after the work is finished. Record the result such as **Repair Successful** or **No Fault Found**, the confirmed 4M category, repair minutes, labor or material cost, notes, and required evidence. Submit and verify **Pending QC**. In the verified flow, successful completion is the QC handoff; there is no separate Send to QC action.",
      "**Approve in QC:** In **Repair Out**, find the RSN in **Pending QC**, open it, and review the repair timeline, result, costs, notes, and evidence. Select **QC Pass** only when it is displayed, add the required notes, then refresh and verify **QC Passed** in the status and timeline.",
      "**Release after QC:** Use **Release** only when Forge displays it for the QC-passed record. Confirm the configured destination or next step, submit once, and verify the resulting released or routed status before leaving the record.",
      "**Reject in QC:** If evidence or verification fails, select **QC Reject** when available and record the required reason and notes. Refresh and verify the resulting status and timeline; do not assume whether Forge returned the RSN to Repair or Rework.",
      "**Return to Repair:** When the post-rejection status or displayed action sends the RSN back to Repair, reopen it in **Repair Queue**, start the new attempt, correct the issue, record new evidence, complete the repair, and verify that it returns to **Pending QC**.",
      "**Send to and complete Rework:** Use the displayed Rework disposition only when approved for the RSN. Select the controlled symptom, reason, and routing information requested by Forge, then track the card in **Rework Board**. Use **Record work**, capture the attempt and evidence, and verify the card moves to **Pending Re-inspection** or the other result Forge displays.",
      "**Use Scrap only for an approved disposition:** Select **Report Scrap** or another Scrap action only when it is available and approved. Record the controlled reason and evidence, preserve the approval trail, and verify the Scrap Register status instead of treating the click as completion.",
      "**Stop on any Forge error:** Do not repeat a state-changing action or assume success after an error. Stop, retain the RSN and visible status, and report the error for investigation.",
    ],
  ),
  "hold-scrap-teardown": guide("Manufacturing → Quality or Scrap & Teardown", [
    "**Create the correct hold:** Open **Quality → Hold Management → Create Hold**. Choose the Hold Level first; it changes the required target and the operational impact.",
    "**Complete required hold fields:** Select the target and a **Reason**. Notes are optional, and a Work Order hold can include an optional expected release date.",
    "**Follow approval rules:** Inventory lot, vendor, and date-code holds use **Submit for Approval** and remain inactive until Quality approves them. A Work Order hold pauses all production for that order.",
    "**Track scrap upstream:** Configure **Scrap Reasons** first. **Scrap Register** tracks Pending Approval, Approved, Executed, and Rejected dispatches; it has no create action.",
    "**Start teardown correctly:** A Teardown order appears only after an executed Scrap dispatch is sent with **Send to teardown**. The donor serial and scrap dispatch remain linked to recovered Components.",
  ]),
  "scrap-register": guide("Mfg → Scrap & Teardown → Scrap Register", [
    "**Open the register:** Open **Scrap & Teardown** and select **Scrap Register**. The register is a review queue; it has no create action.",
    "**Choose the status view:** Use **All**, **Pending Approval**, **Approved**, **Executed**, or **Rejected** to review the correct dispatch state.",
    "**Set the scope:** Filter by Source, Category, Reason, Line, Station, Work Order, Product, or Date Range, then use **Refresh** when the source data may have changed.",
    "**Review the dispatch evidence:** Confirm the dispatch number, source, unit or quantity, Product, Work Order, Station, reason, proposer, status, and age before taking any action in the owning workflow.",
    "**Preserve the approval flow:** Do not approve, execute, reject, or send a dispatch to teardown unless the record is in the eligible state and the required evidence has been reviewed. The recorded SIT walkthrough is intentionally read-only.",
  ]),
  "scrap-reasons": guide("Mfg → Scrap & Teardown → Scrap Reasons", [
    "**Open Scrap Reasons:** Open **Scrap & Teardown** and select **Scrap Reasons**. Use **Show inactive** only when obsolete categories or reasons must be reviewed.",
    "**Choose how to initialise the taxonomy:** Select **Seed industry defaults** to create the standard material, process, equipment, handling, operator, setup, and design categories, or select **Add category** to define one manually.",
    "**Enter a manual category:** **Code** and **Name** are required. Description is optional, and Sort Order controls where the category appears.",
    "**Maintain reason codes under the category:** Add concise, non-duplicate reasons and keep only currently selectable entries active so equivalent causes report consistently.",
    "**Recorded SIT state:** The verified walkthrough showed no scrap-reason categories. It does not seed or save categories, so existing data remains unchanged; recheck the target Plant before presenting the empty state as current.",
  ]),
  packaging: guide("Manufacturing → Packaging & Shipping → Packaging", [
    "**Open Packaging:** Open **Packaging & Shipping** and select **Packaging**.",
    "**Configure the product hierarchy:** Open **Packing Configuration**, select the Product, and define the product-specific container type. **Product**, **Name**, and **Code** are required; Code accepts 2–10 alphanumeric characters.",
    "**Choose leaf or parent behavior:** Leave **Child Container Type** empty for a leaf that binds finished-unit serials directly, or select the allowed child to build Device → Box → Carton → Pallet.",
    "**Create the container:** Return to the Packaging Dashboard and select **Create Container**. Choose the Product, then select the required **Container Type** and **Work Order ID**; Create remains disabled until both required values are present.",
    "**Review and complete packaging:** Open the generated UID to review device count, weight and dimensions, linked Work Order, label state, and History. A UID template is optional; without one, Fynd ERP uses the default format.",
  ]),
  shipments: guide("Mfg → Packaging & Shipping → Shipments", [
    "**Open Shipments:** Open **Packaging & Shipping** and select **Shipments**.",
    "**Find an existing shipment:** Search by ASN or destination, or filter by Work Order, Product, Status, and Date Range. The list shows ASN, Work Order, destination, contents, carrier, status, dates, and available actions.",
    "**Start a shipment only with valid source data:** Select **New Shipment**. Work Order is optional; **Product** and **Address line 1** are required. Complete the destination, carrier, optional invoice or vendor-lot details, and notes before submission.",
    "**Verify the created record:** Confirm the new shipment appears in the list with the expected destination, contents, carrier, status, and dates before continuing to shipment verification.",
    "**Recorded SIT state:** No Shipments were available in the verified walkthrough, and the form was not submitted to avoid creating client data. Treat shipment creation and the resulting verification handoff as unverified until they are tested with approved source records in the target environment.",
  ]),
  "containers-and-labels": guide("Manufacturing → Packaging & Shipping", [
    "**Build the container hierarchy:** In **Packing Configuration**, create the leaf first, then create each parent with its allowed **Child Container Type**. Selecting a child makes **Max child count** required.",
    "**Configure identity and limits:** Select a container-specific **UID Template**, sequence reset scope, dimensions, weight range, and tolerance. A reused unit-serial pattern can create UID collisions.",
    "**Create the parent container:** On the Packaging Dashboard, select the Product, parent Container Type, and completed Work Order. The generated UID follows the selected template.",
    "**Pack an eligible identity:** In **Pack by UID**, scan a finished serial, device UID, child UID, identifier, or task ID. A valid unit automatically creates the configured leaf container and packs it into the parent; capacity is enforced.",
    "**Print and verify the label:** Print the carton label and confirm carton UID, model, quantity, unit serial, and QR codes. Values unavailable from the source records remain blank; use History and Reprint for traceability.",
  ]),
  "shipment-verification": guide(
    "Manufacturing → Packaging & Shipping → Shipment Verification",
    [
      "**Select the Shipment first:** Open **Shipment Verification**. **Shipment** is required; **Container Type**, verification counts, container rows, and Export remain unavailable until a Shipment is selected.",
      "**Follow the governing rule:** An active **Shipment Rule** must include the selected container configuration and permit its container-count and maximum-weight limits; priority resolves which rule applies.",
      "**Check the Shipping Gate:** Confirm that the applicable approved Purchase Order quantity has a positive remaining balance before verification.",
      "**Configure ASN export when required:** ASN Excel columns come from a client- or product-scoped template. Confirm that the required template exists in the target environment before relying on Export.",
      "**Verify the prerequisite path:** The recorded SIT walkthrough had no selectable Shipment, so container verification and export were not exercised. Retest shipment creation, rule matching, gate balance, and ASN output with approved records before the client demonstration.",
    ],
  ),
  "traceability-genealogy-recall": guide(
    "Manufacturing → Traceability → Master Traceability",
    [
      "**Set a required dossier scope:** In **Master Traceability**, filters combine and dependent Product filters unlock from their parent selection. A specific identifier list overrides the other filters; **Generate Dossier** remains disabled until at least one scope is selected.",
      "**Choose the report output:** Select only the required unit, route, quality, genealogy, identifier, tool, checklist, packaging, or shipment sheets. Generation is asynchronous and completed files remain in **Recent exports**; the Nova X1 Work Order produced a two-unit dossier.",
      "**Complete every Stage Timeline requirement:** Select a date range, at least one Work Order, and 1–50 Operations. The recorded SIT form required the date range even though it was not marked with an asterisk; recheck the target environment if the form changes.",
      "**Follow genealogy in the correct direction:** The full tree accepts pallet, carton, box, device, product, Component, or batch identifiers. **Downstream** follows a finished identity to Components and lots; **Upstream** follows a lot toward finished units.",
      "**Find the affected population:** Search **Find Affected Units** by Batch/Lot Number or Component Serial. The Nova X1 battery lot returned `NOVA-X1-PHONE-000002` as an affected finished serial.",
      "**Verify Recall assignment before relying on it:** Recall creation requires Title and Severity. Confirm that the selected batch or tasks populate affected units and that the saved notice records them; the recorded SIT exercise did not complete affected-unit assignment.",
    ],
  ),
  dashboards: guide(
    "Manufacturing → Dashboard, Work Orders, Production Tasks, and Route Logs",
    [
      "**Start with the current Plant:** The Dashboard shows setup readiness, active Work Orders, production Stations, active Products, Clients, Projects, production completion, and quality targets for the selected Plant.",
      "**Identify schedule risk:** In **Work Orders**, use Status, Priority, and Due Date together. Past-due active records are marked **Delayed**; the Nova X1 list also separates the completed original Work Order from its in-progress repair Work Order.",
      "**Interpret Work Order metrics:** The completed Nova X1 Work Order shows 2/2 tasks, 2.9 units/hour, 20m 56s takt and cycle time, 100% yield, and 42m total execution time. Yield is passed quality steps divided by completed steps, with a displayed target of at least 95%.",
      "**Use the live progress board:** **Track Progress** auto-refreshes every 30 seconds by default and can filter by Station, highlight completed tasks, show samples only, change sorting, or enter fullscreen.",
      "**Confirm task context:** Production Tasks shows Serial, task ID, grouping, Work Order, Line, Product/Routing, and status. A serial can have more than one task record, including a later repair task, so confirm the Work Order and Line before acting.",
      "**Verify execution evidence:** Route Log totals reflect the current filters. Each log preserves Work Order, Product, Routing, Line, Station, operator, timestamp, quality status, and execution status; the two Nova X1 logs are Passed and Complete.",
    ],
  ),
  "shift-operations": guide("Manufacturing → Shifts & Labor", [
    "**Confirm net working time:** Shift duration is reduced by unpaid breaks. **Nova X1 Assembly Morning Shift** runs 06:00–14:00; its 15-minute unpaid tea break reduces 8 hours to 7h 45m net.",
    "**Verify Schedule coverage:** New Shift Schedules remain Draft until activated, but status alone does not prove coverage. Confirm the generated shifts per week and calendar coverage in the target environment.",
    "**Complete the required Handover fields:** **Shift** and **Handover Date** are required. Line, outgoing/incoming operators, production/quality/equipment summaries, notes, pending tasks, and checklist items are optional.",
    "**Record connected operating context:** The authorized Nova X1 Handover connects `NOVA-X1-SHIFT-A` to `NOVA_X1_LINE_01` and records completed production, passed Route Logs, equipment state, safety, and the two pending repair tasks.",
    "**Review before completion:** A new Handover is **Draft**. Confirm the Outgoing and Incoming Supervisors explicitly; **Complete** should be used only after the next Shift reviews the record.",
    "**Interpret Break Compliance carefully:** A recorded SIT view with zero Break Logs displayed 100% compliance and 0 violations, but that percentage is not evidence that compliant breaks occurred. Confirm the underlying logs in the target environment; **Export CSV** is available only when exportable records exist.",
  ]),
  "tools-and-maintenance": guide(
    "Manufacturing → Process & Engineering → Tools and Equipments",
    [
      "**Open the Tool register:** Expand **Process & Engineering → Tools and Equipments**, then open the child **Tools and Equipments** page.",
      "**Complete the required identity:** **Tool Name, Tool Code, Tool Category, Manufacturer, Model, Station, and Status** are required. The authorized SIT example is `NOVA-X1-TORQUE-01`, assigned to **Nova X1 Smartphone SMT Placement Station**.",
      "**Configure calibration only when governed:** Enabling **Requires Calibration** reveals the optional interval and provider fields. A governed Tool stays **Unknown** until a calibration record supplies the required **Calibration Date, Next Calibration Date, and Result**.",
      "**Record readiness evidence:** The Nova X1 Tool has an Initial, Passed calibration with certificate `NOVA-X1-CAL-2026-001` and a next due date. Calibration overrides, when used, remain visible in override history.",
      "**Evaluate Maintenance Alerts:** **Trigger Maintenance Check** evaluates configured maintenance rules. A result of 0 alerts may mean that no rule matched or that the required rules or source data are absent; verify both before relying on the result. **Export** requires alert rows.",
      "**Control the maintenance Work Order:** Only **Tool** and **Title** are required; Priority defaults to **Medium** and Maintenance Type to **Corrective**. The connected preventive order progresses **Draft → Submitted → Approved**, after which **Start** becomes available.",
      "**Protect production timing:** Keep Tool status, calibration, and maintenance readiness current. Do not start a future approved maintenance order before the planned window.",
    ],
  ),
  "reports-and-audit": guide(
    "Traceability → Master Traceability; Production → Work Orders",
    [
      "**Build the dossier scope:** Open **Traceability → Master Traceability → Dossier**. Scope filters are optional and combine; a serial-number list pasted or uploaded under **Specific identifiers** overrides the other scope filters.",
      "**Choose report sheets:** Select the required Unit Summary, Route Detail, tests, sampling, NCR/defects, repair, genealogy, identifiers, Tool Usage, checklist, packaging, and shipment sheets. The completed Nova X1 Work Order matches 2 units.",
      "**Generate and verify the dossier:** Select **Generate Dossier**, then wait for **Recent exports** to show **COMPLETED**, the unit count, and the XLSX filename before downloading.",
      "**Create a Work Order export:** From **Production → Work Orders**, select **Export Work Orders**. In the recorded SIT flow this opened **Settings → Files & Data → Exports** and a separate **Create Data Export** dialog. Verify the route in the target environment and re-apply Search, Status, and Priority when list-page filters are not inherited.",
      "**Verify export evidence:** Export Details retains type, format, status, file size, and applied filters. A job may show **COMPLETED** while Processed and Progress remain 0, so confirm the processed count and file contents before relying on it.",
      "**Use the available audit history:** **View all changes** and **Recent Changes** show the available actor, action, affected record, and timestamp evidence. Confirm that any separate full-history route works in the target environment before relying on it.",
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
