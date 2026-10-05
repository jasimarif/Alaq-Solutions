// Industries Page Data
// Target sectors: Construction and steel buildings, Manufacturing and fabrication, Distribution (light).
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice, lead with customer pain.
// Unconfirmed metrics use bracketed placeholders such as [X hours/week].

import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from './config';

export const INDUSTRIES_CONTENT = {
  hero: {
    badge: "Specialized Industry Expertise",
    title: "ERP automations tailored to your shop's reality",
    subtitle: "Generic automation tools break when faced with construction cut lists or complex dealer orders. We engineer pipelines built specifically for the operational workflows of steel buildings, manufacturing, and distribution.",
    ctaLabel: BOOKING_CTA_LABEL,
    ctaUrl: BOOKING_CTA_URL,
  },

  industries: [
    {
      id: "construction-steel-buildings",
      title: "Construction & Steel Buildings",
      tagline: "Pre-Engineered Metal Buildings, Structural Components, & Trusses",
      problem: "Independent dealers email orders across diverse custom layouts with varying dimensions, pitch specifications, and accessories. Estimators spend days copying dimensions into cut lists and re-typing orders into NetSuite.",
      solution: "We ingest dealer purchase orders, extract building specifications, run cut list math through a deterministic engine, and generate NetSuite Sales Orders and production work orders without manual re-keying.",
      workflows: [
        "Dealer purchase order PDF extraction to NetSuite Sales Orders",
        "Automated customer account lookup, order creation, and Welcome case generation",
        "Deterministic cut list math and BOM computation from building configs",
        "Assembly builds generated in one sweep from released work orders",
      ],
      whatYouSend: [
        "Dealer purchase orders in PDF format",
        "Building configurations from PDFs, drawing packets, or typed descriptions",
        "Shop floor completion sign-offs",
      ],
      whatYouGet: [
        "Validated NetSuite Sales Orders with matched inventory",
        "Ready-to-cut production work orders",
        "NetSuite Assembly Builds posted without manual data entry",
      ],
      impact: "Cuts order-to-production kickoff from [X days] to [X minutes]",
    },
    {
      id: "manufacturing-fabrication",
      title: "Manufacturing & Fabrication",
      tagline: "Custom Metal Fabrication, Industrial Equipment, & Assemblies",
      problem: "High-mix shops struggle with the paperwork gap between CAD or CPQ designs and shop floor work orders. Assemblies are fabricated on the floor, but assembly builds are logged days late in the ERP, throwing costing and inventory into chaos.",
      solution: "Our pipelines convert approved estimating spreadsheets and cut lists directly into verified NetSuite work orders, and trigger automated assembly builds to relieve inventory the moment jobs finish.",
      workflows: [
        "Estimating spreadsheet conversion to NetSuite work orders",
        "Validation of work order quantities against sales orders before production",
        "Build tool that warns on component shortages and creates builds in one sweep",
        "Bulk CSV data import with inline grid validation for item and vendor batches",
      ],
      whatYouSend: [
        "Estimator spreadsheets and CPQ workbooks",
        "Cut lists and dimension schedules",
        "Shop floor completion sign-offs",
      ],
      whatYouGet: [
        "NetSuite Work Orders with precise component allocations",
        "Accurate Assembly Builds posted without manual data entry",
        "Accurate real-time inventory relief and month-end costing",
      ],
      impact: "Reduces job packet preparation time by [X%]",
    },
    {
      id: "distribution",
      title: "Distribution (Light)",
      tagline: "Industrial Supplies, Building Materials, & Wholesale Equipment",
      problem: "Distributors receive customer purchase orders in varied PDF formats and vendor bills with freight charges. Staff spends days cross-referencing lines, keying orders, and fixing bad CSV imports.",
      solution: "We automate PDF order intake, match customer item numbers to your NetSuite catalog, verify vendor bills against purchase orders, and pre-validate bulk data imports.",
      workflows: [
        "Customer purchase order parsing and NetSuite Sales Order creation",
        "Matching vendor bills against purchase orders [CONFIRM WITH JASIM: 3-way matching]",
        "Delivery receipt matching to accelerate customer invoicing [CONFIRM WITH JASIM: proof of delivery matching]",
        "CSV Importer for first-try clean customer and vendor bill uploads",
      ],
      whatYouSend: [
        "Customer purchase orders in PDF or spreadsheet format",
        "Vendor bills and delivery paperwork",
        "Batch CSV files for customers, items, and bills",
      ],
      whatYouGet: [
        "Validated NetSuite Sales Orders created without re-keying",
        "Pre-matched vendor bills ready for payment review [CONFIRM WITH JASIM]",
        "First-try clean CSV imports without post-import ledger cleanups",
      ],
      impact: "Saves [X hours/week] across customer service and accounting [CONFIRM WITH JASIM: metric]",
    },
  ],
};
