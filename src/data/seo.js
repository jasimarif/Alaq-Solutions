// Central SEO metadata configuration
// Uses the live domain https://www.alaqsolution.com consistently
// Writing rules applied: no em dashes, no double hyphens, customer-first voice

export const DEFAULT_SEO = {
  siteName: "ALAQ Solutions",
  baseUrl: "https://www.alaqsolution.com",
  defaultImage: "https://www.alaqsolution.com/logo.png",
  twitterHandle: "@alaqsolutions", // [PLACEHOLDER]
};

export const PAGE_SEO = {
  home: {
    title: "ALAQ Solutions | Paperwork to ERP Automation for Manufacturing and Construction",
    description: "We build AI-assisted automations that take messy customer purchase orders, quotes, and cut lists straight into NetSuite and your ERP without manual re-keying.",
    canonical: "https://www.alaqsolution.com/",
    ogType: "website",
  },
  solutions: {
    title: "ERP Workflow Solutions | ALAQ Solutions",
    description: "Fixed-scope automation packages for order intake, quote-to-work-order, assembly builds, and financial paperwork across manufacturing and construction shops.",
    canonical: "https://www.alaqsolution.com/solutions",
    ogType: "website",
  },
  industries: {
    title: "Industries We Serve | Construction, Steel, and Manufacturing | ALAQ Solutions",
    description: "Specialized ERP paperwork automations for structural steel fabricators, commercial building component manufacturers, and industrial distributors.",
    canonical: "https://www.alaqsolution.com/industries",
    ogType: "website",
  },
  caseStudies: {
    title: "Customer Case Studies | ALAQ Solutions",
    description: "Read how manufacturing and steel building companies cut order processing from days to minutes while keeping their ERP clean and accurate.",
    canonical: "https://www.alaqsolution.com/case-studies",
    ogType: "website",
  },
  howItWorks: {
    title: "How It Works | The Safe AI Wedge for ERP | ALAQ Solutions",
    description: "Understand our architectural wedge: AI reads and normalizes messy incoming documents, while deterministic code validates and writes to the ERP ledger.",
    canonical: "https://www.alaqsolution.com/how-it-works",
    ogType: "website",
  },
  products: {
    title: "SuiteApps and Tools | ALAQ Solutions",
    description: "Purpose-built NetSuite SuiteApps and operational utilities including CSV Importer, customer and vendor self-service portals, and bank reconciliation tools.",
    canonical: "https://www.alaqsolution.com/products",
    ogType: "website",
  },
  about: {
    title: "About ALAQ Solutions | AI Workflow Automation in Canada",
    description: "Canadian team providing AI automation for outdated workflows: Excel automation, ERP automation (NetSuite, QuickBooks) and social media marketing.",
    canonical: "https://www.alaqsolution.com/about",
    ogType: "website",
  },
  contact: {
    title: "Contact Us and Send Us One Messy Order | ALAQ Solutions",
    description: "Get in touch with our team in Windsor, Ontario. Send us one messy customer order or quote, and we will show you how it enters NetSuite automatically.",
    canonical: "https://www.alaqsolution.com/contact",
    ogType: "website",
  },
  notFound: {
    title: "Page Not Found | ALAQ Solutions",
    description: "The page you are looking for could not be found. Return to ALAQ Solutions home.",
    canonical: "https://www.alaqsolution.com/404",
    ogType: "website",
  },
};
