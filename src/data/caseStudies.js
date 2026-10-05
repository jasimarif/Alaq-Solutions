// Case Studies Data
// Uses ONLY the five approved source case studies. Clients remain strictly anonymous.
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice, lead with customer pain.
// Unconfirmed metrics, video durations, and placeholders use [PLACEHOLDER] or [X].

export const CASE_STUDIES_CONTENT = {
  hero: {
    badge: "Verified Deployments",
    title: "Real operations results from the shop floor",
    subtitle: "We do not believe in theoretical AI demos. Here are five real automations we engineered for NetSuite teams, showing the exact problem, what we built, and the clean division between AI and deterministic code.",
  },

  caseStudies: [
    {
      id: "case-dealer-orders",
      title: "Dealer purchase orders to Sales Orders, no re-keying",
      client: "Steel building manufacturer on NetSuite",
      industry: "Construction & Steel Buildings",
      problem: "Dealers sent purchase orders as PDFs. Staff opened each one, found or created the customer, typed the sales order line by line, and opened a support case for a welcome call. The process was slow and vulnerable to re-keying errors.",
      whatWeBuilt: "An intake tool where the team drops the PDF into Claude. The AI extracts customer, site address, building specs, pricing, and dealer info, then a custom NetSuite tool reuses the customer if it exists, creates the Sales Order, and opens the Welcome case in one pass. Uncertain fields get flagged for a human.",
      aiVsCodeSplit: {
        aiRole: "Claude extracts customer information, delivery site address, building specifications, pricing, and dealer info from unstructured dealer PDFs.",
        codeRole: "Custom NetSuite tool checks if the customer exists, creates the Sales Order, and opens the Welcome support case in one pass.",
        humanApproval: "Uncertain fields get flagged for a human to review before any record is finalized.",
      },
      whatYouSend: [
        "Dealer purchase orders in PDF format",
        "Dealer email instructions and notes",
      ],
      whatYouGet: [
        "Validated NetSuite Sales Orders",
        "Reused or newly created customer records",
        "Automated Welcome support cases linked to the order",
      ],
      result: "[X] orders processed, intake time from [X] to [X].",
      video: {
        title: "Order Intake Screen Recording Demo [PLACEHOLDER]",
        duration: "[PLACEHOLDER] 30 to 60 seconds",
        caption: "[PLACEHOLDER] Screen recording showing a dealer PDF dropped into Claude and posting a completed Sales Order and Welcome case directly to NetSuite.",
      },
    },
    {
      id: "case-quote-to-work-order",
      title: "Quote configuration to work order and cut list",
      client: "Steel building manufacturer on NetSuite",
      industry: "Construction & Steel Buildings",
      problem: "Materials lived in a CPQ spreadsheet. Turning a sold building into a work order meant running the config through the workbook and copying the cut list into NetSuite, creating bottlenecks and risk of calculation error.",
      whatWeBuilt: "We rebuilt the calculation as a tested deterministic engine that takes the building config (PDF, drawing packet, or typed description) and computes every item and quantity. Claude reads the order, the engine does the math, and a NetSuite tool creates the work order and checks it against the sales order. The system was validated against existing work orders before touching production.",
      aiVsCodeSplit: {
        aiRole: "Claude reads the building configuration from a PDF, drawing packet, or typed description.",
        codeRole: "Deterministic engine computes every item and quantity, and a NetSuite tool creates the work order and verifies it against the sales order.",
        humanApproval: "Production staff reviews the generated work order summary before releasing to the shop floor.",
      },
      whatYouSend: [
        "Building configurations from PDFs, drawing packets, or typed descriptions",
        "Approved quote details and specifications",
      ],
      whatYouGet: [
        "NetSuite Work Orders with every item and quantity computed",
        "Cut lists verified against the original Sales Order",
        "Work orders validated against historical production benchmarks",
      ],
      result: "Work orders in [X minutes] instead of [X], quantities match every time.",
      video: {
        title: "Quote to Work Order Screen Recording Demo [PLACEHOLDER]",
        duration: "[PLACEHOLDER] 30 to 60 seconds",
        caption: "[PLACEHOLDER] Screen recording demonstrating building configuration intake, deterministic calculation, and NetSuite Work Order generation.",
      },
    },
    {
      id: "case-assembly-builds",
      title: "Assembly builds from released work orders",
      client: "Steel building manufacturer on NetSuite",
      industry: "Construction & Steel Buildings",
      problem: "Builds were created manually after fabrication and often forgotten, so inventory and costing were wrong at month-end.",
      whatWeBuilt: "We added a build tool that finds every released work order, warns on duplicates and component shortages, asks for confirmation, and creates the builds in one sweep.",
      aiVsCodeSplit: {
        aiRole: "Identifies work order completion notes and flags unusual component usage patterns.",
        codeRole: "Finds every released work order, checks for duplicate builds and component shortages, and creates the assembly builds in NetSuite in one sweep.",
        humanApproval: "Asks for confirmation from the inventory manager before creating the builds.",
      },
      whatYouSend: [
        "Shop floor completion sign-offs",
        "Released NetSuite work orders",
      ],
      whatYouGet: [
        "NetSuite Assembly Builds created in one sweep",
        "Accurate inventory relief without forgotten builds",
        "Correct costing at month-end",
      ],
      result: "[X] builds a week in one command.",
      video: {
        title: "Assembly Builds Sweep Demo [PLACEHOLDER]",
        duration: "[PLACEHOLDER] 30 to 60 seconds",
        caption: "[PLACEHOLDER] Screen recording demonstrating the build tool finding released work orders, verifying shortages, and creating assembly builds in one sweep.",
      },
    },
    {
      id: "case-csv-importer",
      title: "Bulk data import that catches errors before they hit the ledger",
      client: "Finance teams across multiple NetSuite accounts",
      industry: "Finance & Operations",
      problem: "Finance teams importing journal entries, customers, and vendor bills from CSV found bad rows after the fact, forcing tedious manual cleanups.",
      whatWeBuilt: "Our CSV Importer validates every row, resolves names to NetSuite IDs, shows bad rows in an editable grid for inline fixes, then submits clean records.",
      aiVsCodeSplit: {
        aiRole: "Assists with mapping column headers and normalizing text formatting from incoming spreadsheets.",
        codeRole: "Validates every row against live NetSuite records and resolves text names to NetSuite internal IDs before submission.",
        humanApproval: "Presents bad rows in an editable grid so users can make inline fixes directly before submitting.",
      },
      whatYouSend: [
        "CSV files of journal entries, customer lists, or vendor bills",
        "Spreadsheet exports with unmapped text names",
      ],
      whatYouGet: [
        "First-try clean NetSuite imports",
        "Names resolved to NetSuite IDs automatically",
        "Editable grid showing any bad row for quick inline correction",
      ],
      result: "First-Try Clean Imports",
      video: {
        title: "CSV Importer Screen Recording Demo [PLACEHOLDER]",
        duration: "[PLACEHOLDER] 30 to 60 seconds",
        caption: "[PLACEHOLDER] Screen recording showing pre-validation, the editable error grid, and clean import into NetSuite.",
      },
    },
    {
      id: "case-rev-rec",
      title: "Revenue recognition automation for digital media",
      client: "[PLACEHOLDER] Digital media company on NetSuite",
      industry: "Media & Subscription Services",
      problem: "[PLACEHOLDER] Revenue recognition automation details to follow.",
      whatWeBuilt: "[PLACEHOLDER] Automated revenue recognition workflow for digital media contracts in NetSuite. Details to follow.",
      aiVsCodeSplit: {
        aiRole: "[PLACEHOLDER] Details to follow.",
        codeRole: "[PLACEHOLDER] Details to follow.",
        humanApproval: "[PLACEHOLDER] Details to follow.",
      },
      whatYouSend: [
        "[PLACEHOLDER] Contract and delivery documentation",
      ],
      whatYouGet: [
        "[PLACEHOLDER] Automated revenue recognition entries in NetSuite",
      ],
      result: "[PLACEHOLDER] Details to follow.",
      video: {
        title: "Revenue Recognition Demo [PLACEHOLDER]",
        duration: "[PLACEHOLDER] 30 to 60 seconds",
        caption: "[PLACEHOLDER] Screen recording demo to follow.",
      },
    },
  ],
};
