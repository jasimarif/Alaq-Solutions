// Products Page Data
// Products: CSV Importer SuiteApp, customer and vendor self-service portals, bank reconciliation tool.
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice, lead with customer pain.
// Unconfirmed metrics or features use [PLACEHOLDER] or [CONFIRM WITH JASIM].

import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from './config';

export const PRODUCTS_CONTENT = {
  hero: {
    badge: "SuiteApps & Utilities",
    title: "Purpose-built tools for NetSuite operations",
    subtitle: "In addition to bespoke automation pipelines, we build specialized NetSuite SuiteApps and operational utilities that solve repetitive accounting and data management bottlenecks.",
    ctaLabel: BOOKING_CTA_LABEL,
    ctaUrl: BOOKING_CTA_URL,
  },

  products: [
    {
      id: "csv-importer",
      title: "CSV Importer SuiteApp",
      category: "Native NetSuite SuiteApp",
      tagline: "Pre-validation and inline grid fixes before anything hits the ledger",
      problem: "Finance teams importing journal entries, customers, and vendor bills from CSV find bad rows after the fact, forcing tedious manual cleanups.",
      solution: "Our CSV Importer validates every row against your live NetSuite records, resolves names to NetSuite IDs, shows bad rows in an editable grid for inline fixes, then submits clean records on the first try.",
      features: [
        "Pre-validates every row against live NetSuite schemas before committing",
        "Resolves customer, vendor, and item names directly to internal NetSuite IDs",
        "Editable error grid allows instant cell corrections in the browser",
        "Eliminates failed rows and duplicate batch re-uploads",
        "Built for journal entries, customer lists, vendor bills, and inventory adjustments [CONFIRM WITH JASIM: supported record types]",
      ],
      netsuiteIntegration: "Deploys directly within your NetSuite account, adhering to all role-based permissions and standard governance rules.",
      status: "Available for deployment across NetSuite accounts.",
    },
    {
      id: "self-service-portals",
      title: "Customer & Vendor Self-Service Portals",
      category: "NetSuite Connected Web Application",
      tagline: "Let dealers and suppliers check status without calling your front desk",
      problem: "Operations and customer service staff lose hours every day answering phone calls and emails from dealers asking where their order is and vendors checking bill payment status.",
      solution: "Self-service portals connected directly to your NetSuite system. Dealers can track order status, download approved specifications, and retrieve invoices. Vendors can upload bills and check payment statuses.",
      features: [
        "Order status tracking directly linked to NetSuite work orders [CONFIRM WITH JASIM: portal features]",
        "Customer repository for cut sheets, approvals, and invoices [CONFIRM WITH JASIM]",
        "Vendor bill upload portal with automated PO number matching [CONFIRM WITH JASIM]",
        "Custom branding tailored to your company visual identity [CONFIRM WITH JASIM]",
        "Secure access without requiring full NetSuite user licenses for external parties",
      ],
      netsuiteIntegration: "Communicates securely with NetSuite via authenticated RESTlets without consuming full user licenses.",
      status: "Available as a custom implementation [CONFIRM WITH JASIM: packaging status].",
    },
    {
      id: "bank-reconciliation",
      title: "Bank Reconciliation Tool",
      category: "Finance SuiteApp Utility",
      tagline: "Automated statement parsing and transaction match scoring",
      problem: "Month-end bank reconciliation in NetSuite requires downloading statement files from multiple banking portals, formatting dates, and manually matching cleared checks and transfers.",
      solution: "An automated bank reconciliation tool that ingests bank statement feeds and CSV files [CONFIRM WITH JASIM: supported bank statement formats], matches transactions against open NetSuite bank accounts, and flags variances.",
      features: [
        "Automated parsing of standard bank statement files and CSV exports [CONFIRM WITH JASIM: formats]",
        "Intelligent matching rules for check numbers, amounts, and vendor references",
        "Multi-currency support with exchange rate variance calculations [CONFIRM WITH JASIM: multi-currency support]",
        "One-click reconciliation confirmation for verified items",
        "Variance and exception reporting for unmatched adjustments",
      ],
      netsuiteIntegration: "Integrates with standard NetSuite banking and reconciliation modules.",
      status: "Available as an implementation tool [CONFIRM WITH JASIM: product availability].",
    },
  ],
};
