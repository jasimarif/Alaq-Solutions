// Contact Page Data
// Location: Windsor, Ontario. Coverage: Ontario and Michigan.
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice.

import { BOOKING_CTA_URL, BOOKING_CTA_LABEL, COMPANY } from './config';

export const CONTACT_CONTENT = {
  hero: {
    badge: "Direct Operations Channel",
    title: "Let's talk about your shop floor paperwork",
    subtitle: "Whether you want to audit an order intake bottleneck, test our parser on a messy dealer purchase order, or book a quick intro conversation, we are here to help.",
  },

  messyOrderOffer: {
    badge: "Free Proof of Concept",
    title: "Send us one messy order",
    description: "Redact your customer confidential prices if you prefer. Send us the PDF or spreadsheet that causes your team the most headaches. We will run it through our parser and show you the clean NetSuite records that come out the other side.",
    points: [
      "No software installation or system access required",
      "Redact confidential customer pricing or names as desired",
      "See what structured extraction and NetSuite records look like",
    ],
  },

  bookingSection: {
    badge: "20-Minute Direct Call",
    title: "Prefer to pick a time directly?",
    description: "Choose a 20-minute window on our calendar. We will review your current order flow, ask a few questions about your ERP setup, and tell you plainly if our automation wedge is a practical fit.",
    ctaLabel: BOOKING_CTA_LABEL,
    ctaUrl: BOOKING_CTA_URL,
  },

  contactInfo: {
    title: "Regional Operations Presence",
    companyName: COMPANY.name,
    location: COMPANY.location,
    coverage: COMPANY.coverageArea,
    email: COMPANY.email,
    phone: COMPANY.phone,
    note: "Serving operations throughout Ontario and Michigan.",
  },
};
