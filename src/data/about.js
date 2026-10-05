// About Page Data
// Location: Windsor, Ontario, Canada. Coverage: Ontario and Michigan.
// Writing rules: no em dashes, no double hyphens, plain warm "we" voice.

import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from './config';

export const ABOUT_CONTENT = {
  header: {
    title: "About ALAQ Solutions",
    intro: "We are a Canadian team that helps businesses replace outdated, manual workflows with practical AI automation.",
    image: "/images/header-about.webp",
    imageMobile: "/images/header-about-mobile.webp",
  },

  whoWeAre: {
    title: "Who we are",
    paragraphs: [
      "ALAQ Solutions is based in Windsor, Ontario, Canada. We provide AI automation solutions for businesses that still run on manual, repetitive work: retyping data, moving information between spreadsheets, and chasing paperwork between teams and systems.",
      "We keep our approach practical. We start with one real workflow, automate it properly, and build from there. Our team has a strong NetSuite background, and we work comfortably across the tools you already use.",
    ],
  },

  whatWeDo: {
    title: "What we do",
    cards: [
      {
        id: "ai-workflow-automation",
        title: "AI workflow automation",
        description: "We find the outdated, repetitive workflows slowing your team down and automate them with AI, so information moves on its own instead of being retyped.",
      },
      {
        id: "excel-spreadsheet-automation",
        title: "Excel and spreadsheet automation",
        description: "A lot of business work lives in spreadsheets. We automate the cleaning, checking, and moving of spreadsheet data, so your team stops copying and pasting between files and systems.",
      },
      {
        id: "erp-accounting-automation",
        title: "ERP and accounting automation",
        description: "We automate work inside ERP and accounting systems such as NetSuite and QuickBooks, creating records and updates without manual data entry.",
      },
      {
        id: "social-media-marketing",
        title: "Social media marketing",
        description: "We also run social media marketing for businesses that want to grow their reach and their brand online.",
        learnMoreLink: "/#social-media",
        learnMoreLabel: "Learn more",
      },
    ],
  },

  howWeWork: {
    title: "How we work",
    items: [
      {
        number: "01",
        title: "Practical, not hype",
        description: "We build automations that solve a specific problem, and we explain them in plain language.",
      },
      {
        number: "02",
        title: "Inside your business",
        description: "We work alongside your team like an operator, not a distant vendor.",
      },
      {
        number: "03",
        title: "Start small",
        description: "Send us one messy order or workflow, and we will show you what the automated version looks like.",
      },
    ],
  },

  beyondAutomation: {
    title: "Beyond automation",
    text: "ALAQ also operates in automotive trading, including car trading. It is a separate line of work from our automation services, and it extends what we do as a business.",
  },

  closingCta: {
    heading: "Ready to automate the work that slows you down?",
    text: "Book a 20-minute workflow audit and we will look at one of your workflows together.",
    buttonLabel: BOOKING_CTA_LABEL,
    buttonUrl: BOOKING_CTA_URL,
  },
};
