// Home Page Content
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice, lead with customer pain.
// Unconfirmed metrics use bracketed placeholders such as [X hours/week].

import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from './config';

export const HOME_CONTENT = {
  hero: {
    badge: "Shop Floor to ERP Automation",
    // Two statements: line 1 renders in white, line 2 in the light blue accent
    headlineLine1: "Transform Workflows.",
    headlineLine2: "Automate What Matters.",
    subheadline: "AI-powered automation that streamlines repetitive processes and helps your business operate smarter.",
    primaryCta: {
      label: BOOKING_CTA_LABEL,
      url: "#contact",
      isExternal: false,
    },
    secondaryCta: null,
    trustPoints: [
      "AI reads and validates inputs",
      "Deterministic code writes to NetSuite",
      "AI never touches your general ledger",
    ],
  },

  problemSection: {
    badge: "The Operational Bottleneck",
    title: "The paperwork trap between customer orders and your shop floor",
    subtitle: "When dealer orders, custom quotes, and cut lists arrive in different formats, your skilled operations staff gets stuck doing manual data entry instead of keeping the line moving.",
    problems: [
      {
        number: "01",
        title: "Dealer purchase orders in every imaginable PDF layout",
        description: "Every customer formats their purchase orders differently. Line items, part descriptions, and shipping addresses must be manually scrutinized, typed into NetSuite, and cross-checked against your item master.",
        symptoms: [
          "Orders sit in email inboxes waiting for manual entry",
          "Wrong part numbers slip through and trigger shop floor rework",
          "Peak order spikes cause fulfillment delays across the shop",
        ],
        impact: "[X hours/week] spent re-keying customer PDFs",
      },
      {
        number: "02",
        title: "Cut lists and bills of material disconnected from work orders",
        description: "Quotes built in spreadsheets or CAD software do not transfer cleanly into your ERP. Estimators export cut lists, but someone has to manually build the multi-level assembly builds and work orders.",
        symptoms: [
          "Engineers spend half their week translating CAD lines into ERP lines",
          "Mismatched unit of measure conversions cause scrap and inventory variances",
          "Shop floor starts jobs before inventory availability is verified",
        ],
        impact: "[X days] average delay between approved quote and job kickoff",
      },
      {
        number: "03",
        title: "Re-keying errors that multiply across assembly and invoicing",
        description: "A simple typo on a custom length or paint specification during order intake ripples through manufacturing, assembly builds, and final customer invoicing.",
        symptoms: [
          "Customer invoices get rejected due to line-item description mismatches",
          "Accounting spends days chasing billing discrepancies at month-end",
          "Costly shipping returns for fabricated items made to the wrong spec",
        ],
        impact: "[X% error rate] on complex multi-line custom orders",
      },
    ],
  },

  automationsSection: {
    badge: "Core Automations",
    title: "Three workflows we automate directly into NetSuite",
    subtitle: "Practical pipelines built for high-mix manufacturers and steel fabricators. No tech hype, just reliable pipelines with strict human approval gates.",
    automations: [
      {
        title: "Order Intake Automation",
        tagline: "PDF to Sales Order",
        description: "Ingests incoming dealer purchase orders from email, parses multi-line order tables, validates customer terms and credit limits, and stages clean Sales Orders ready for approval.",
        inputLabel: "Dealer PDF purchase orders and scanned quote acceptances",
        outputLabel: "NetSuite Sales Orders with matched item IDs and pricing",
        features: [
          "Handles varied dealer PDF templates without template building",
          "Validates inventory availability and customer credit terms",
          "Flags unmapped parts or pricing discrepancies for human review",
        ],
        metrics: "Processed in [X minutes] vs [X hours] manual",
        link: "/solutions#order-intake",
      },
      {
        title: "Quote-to-Work-Order Pipeline",
        tagline: "Estimating to Shop Floor",
        description: "Takes approved estimating spreadsheets or CAD cut lists and automatically generates production work orders, assembly builds, and routing steps.",
        inputLabel: "Spreadsheet cut lists, dimension schedules, and CAD exports",
        outputLabel: "NetSuite Work Orders and Assembly Builds ready for the shop",
        features: [
          "Maps custom dimensions directly to bill of material components",
          "Calculates scrap allowances and routing schedules automatically",
          "Eliminates duplicate engineering data entry before fabrication",
        ],
        metrics: "Generates job packets in [X seconds]",
        link: "/solutions#quote-to-work-order",
      },
      {
        title: "Finance Automation",
        tagline: "Billing & Proof of Delivery",
        description: "Matches shop floor completion logs, bills of lading, and customer purchase orders to generate clean invoices and reconcile vendor bills.",
        inputLabel: "Signed delivery receipts, packing slips, and vendor invoices",
        outputLabel: "NetSuite Customer Invoices and matched Vendor Bills",
        features: [
          "Verification between purchase orders, delivery receipts, and invoices [CONFIRM WITH JASIM: 3-way matching]",
          "Automated variance checking on invoices and vendor bills [CONFIRM WITH JASIM: surcharge detection]",
          "Speeds up month-end close and cash collection cycles",
        ],
        metrics: "Accelerates billing by [X days]",
        link: "/solutions#finance-automation",
      },
    ],
  },

  wedgeStrip: {
    badge: "The Safe Wedge",
    title: "Why operations leaders trust our architecture",
    subtitle: "We separate intelligent interpretation from ledger execution. AI does the reading; deterministic code does the writing.",
    steps: [
      {
        step: "01",
        title: "AI Reads & Normalizes",
        description: "LLM extraction models parse messy tables, irregular line items, and inconsistent customer formats into structured JSON.",
      },
      {
        step: "02",
        title: "Deterministic Validation",
        description: "Hard-coded rules enforce strict NetSuite schema, verified item catalogs, and existing customer accounts.",
      },
      {
        step: "03",
        title: "Human Approval Gate",
        description: "If confidence is below threshold or an item code is ambiguous, it is flagged for one-click human approval.",
      },
      {
        step: "04",
        title: "Code Posts to Ledger",
        description: "Verified records are committed via official NetSuite SuiteScript and RESTlets. AI never posts directly to your financial ledger.",
      },
    ],
  },

  featuredCaseStudiesSection: {
    badge: "Proven Results",
    title: "Real-world shop floor automation",
    subtitle: "Real results from operations and finance teams on NetSuite.",
    caseStudies: [
      {
        id: "case-dealer-orders",
        title: "Dealer purchase orders to Sales Orders, no re-keying",
        client: "Steel building manufacturer on NetSuite",
        industry: "Construction & Steel Buildings",
        problemSummary: "Dealers sent purchase orders as PDFs. Staff manually opened each one, searched or created the customer, typed the order line by line, and opened a support case for the welcome call.",
        solutionSummary: "Built an intake pipeline: staff drops the PDF into Claude, AI extracts all specs and pricing, and a custom NetSuite tool reuses existing customers, creates the Sales Order, and opens the Welcome case in one pass.",
        resultMetric: "[X] orders processed, intake time from [X] to [X]",
        highlights: [
          "Automates customer lookup, Sales Order creation, and Welcome case",
          "Uncertain fields flagged for immediate human review",
          "Zero manual re-keying of multi-line PDF specifications",
        ],
        link: "/case-studies#case-dealer-orders",
      },
      {
        id: "case-csv-importer",
        title: "Bulk data import that catches errors before they hit the ledger",
        client: "Finance teams across multiple NetSuite accounts",
        industry: "Finance & Operations",
        problemSummary: "Finance teams importing journal entries, customers, and vendor bills via CSV repeatedly discovered bad rows after posting, creating messy reconciliation headaches.",
        solutionSummary: "Our CSV Importer validates every row, resolves names to NetSuite IDs, shows bad rows in an editable grid for inline fixes, then submits clean records.",
        resultMetric: "First-try clean imports",
        highlights: [
          "Pre-validates every row before touching the ledger",
          "Resolves text names directly to NetSuite internal IDs",
          "Editable grid allows inline fixes without re-uploading",
        ],
        link: "/case-studies#case-csv-importer",
      },
    ],
  },

  beyondAutomation: {
    title: "Beyond automation",
    text: "ALAQ also operates in automotive trading, including car trading. It is a separate line of work from our automation services, and it extends what we do as a business.",
  },

  ctaBanner: {
    title: "Ready to get paperwork off your shop floor?",
    subtitle: "Send us one messy dealer order, cut list, or note below. Our engineering team in Windsor will review it and show you what automated ERP entry looks like.",
  },
};
