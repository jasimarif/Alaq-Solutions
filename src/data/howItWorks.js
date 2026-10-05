// How It Works Data
// Explains the "wedge" architecture: AI reads and validates input, deterministic code writes records,
// AI never posts directly to the ledger, and uncertain items are flagged for a human.
// Technical terms (SuiteScript, MCP, RESTlets) are allowed on this page only.
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice.

import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from './config';

export const HOW_IT_WORKS_CONTENT = {
  hero: {
    badge: "The Safe Wedge Architecture",
    title: "How we keep AI out of your financial ledger",
    subtitle: "Most operations managers are skeptical of AI, and they should be. AI models hallucinate, make subtle rounding errors, and cannot be trusted with an accounting database. Here is how our architecture guarantees ledger safety.",
    ctaLabel: BOOKING_CTA_LABEL,
    ctaUrl: BOOKING_CTA_URL,
  },

  principles: [
    {
      title: "AI never touches the ledger",
      description: "AI is strictly restricted to reading, extracting, and normalizing incoming paperwork. It has zero permissions to post directly to your NetSuite financial database.",
    },
    {
      title: "Deterministic code does the writing",
      description: "Every record created in your ERP is constructed and validated by audited, hard-coded software logic using official NetSuite SuiteScript and RESTlets.",
    },
    {
      title: "Humans approve exceptions",
      description: "Any value with low confidence, an unknown item, or an unmapped field is flagged for a human to review before any record is created.",
    },
  ],

  sections: {
    whatAiDoes: {
      badge: "01. Intake Layer",
      title: "What the AI does",
      subtitle: "Handling the chaos of human paperwork that traditional software cannot read.",
      points: [
        "Ingests incoming dealer purchase orders, quote acceptance emails, and PDF attachments via Model Context Protocol (MCP) tooling.",
        "Extracts tabular data across diverse customer layouts, recognizing multi-line items, descriptions, and custom specifications.",
        "Translates customer descriptions into clean, structured data without requiring brittle custom document templates for every new dealer.",
        "Identifies uncertain fields and prepares structured payloads for deterministic validation.",
      ],
    },

    whatCodeDoes: {
      badge: "02. Verification & Execution Layer",
      title: "What deterministic code does",
      subtitle: "The unbreakable mathematical rules that enforce ERP business logic.",
      points: [
        "Verifies that customer accounts, shipping addresses, and order details match existing NetSuite records before touching any transaction.",
        "Cross-references extracted items against your active NetSuite item catalog.",
        "Executes calculation formulas with exact precision, eliminating rounding drift in cut lists and bill of material counts.",
        "Submits validated records into NetSuite using native SuiteScript scripts and custom RESTlets.",
        "Enforces database constraints and transaction checks to prevent duplicate record creation.",
      ],
    },

    whereHumansApprove: {
      badge: "03. Governance & Quality Control",
      title: "Where humans approve",
      subtitle: "Retaining total operational oversight at critical decision points.",
      points: [
        "Valid orders flow into staged NetSuite Sales Orders or Work Orders, ready for normal operations sign-off.",
        "Uncertain items or ambiguous lines get flagged for a human to review instead of guessing.",
        "When an incoming item code is unrecognized, staff confirms the matching internal NetSuite item [CONFIRM WITH JASIM: mapping workflow].",
        "Staff can review, adjust, or reject flagged entries before any record is finalized.",
      ],
    },

    badInputHandling: {
      badge: "04. Resilience & Error Handling",
      title: "What happens when input is bad",
      subtitle: "How our pipelines handle corrupted files, missing information, and conflicting orders.",
      points: [
        "If an input file is corrupted, unreadable, or missing required order details, the pipeline halts and alerts your team with the original document attached.",
        "If an order contains conflicting pricing or unmapped items, code refuses to post and flags the record for human review [CONFIRM WITH JASIM: optional price variance threshold].",
        "If cut list dimensions or formulas do not resolve cleanly, the calculation engine flags the geometry discrepancy before production [CONFIRM WITH JASIM: dimensional validation limits].",
        "Errors never corrupt your database. Because deterministic code validates the full record before calling the NetSuite API, bad input simply stays in review.",
      ],
    },
  },
};
