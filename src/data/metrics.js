/**
 * Central repository for all operational metrics and performance numbers.
 * Rule: Values remain null until Jasim confirms the real numbers.
 * When a value is null, components render a plain-language fallback without [X].
 * When a value is provided, it automatically renders in the designated card.
 */

export const METRICS = {
  // Case Study 1: Dealer Purchase Order Intake
  dealer_orders_processing: {
    key: "dealer_orders_processing",
    label: "Dealer orders processed count and intake turnaround time",
    location: "CaseStudyCard (Dealer purchase order intake) & caseStudies.js",
    value: null,
    fallback: "Rapid PDF Order Intake",
    format: (val) => `${val.count} orders processed, intake time from ${val.from} to ${val.to}.`,
  },

  // Case Study 2: Quote to Work Order Conversion
  quote_to_work_order_time: {
    key: "quote_to_work_order_time",
    label: "Work order creation turnaround time and quantity accuracy",
    location: "CaseStudyCard (Quote to work order conversion) & caseStudies.js",
    value: null,
    fallback: "Instant Work Order Creation",
    format: (val) => `Work orders in ${val.time} instead of ${val.originalTime}, quantities match every time.`,
  },

  // Case Study 3: Assembly Builds Sweeper
  assembly_builds_sweeper: {
    key: "assembly_builds_sweeper",
    label: "Assembly builds swept and posted per week in one command",
    location: "CaseStudyCard (Assembly builds sweeper) & caseStudies.js",
    value: null,
    fallback: "Batch Assembly Builds",
    format: (val) => `${val.count} builds a week in one command.`,
  },

  // Industry 1: Structural Steel & Pre-Engineered Buildings
  construction_steel_kickoff: {
    key: "construction_steel_kickoff",
    label: "Order-to-production kickoff reduction time",
    location: "IndustryCard (construction-steel-buildings) & industries.js",
    value: null,
    fallback: "Cuts order-to-production kickoff from days to minutes",
    format: (val) => `Cuts order-to-production kickoff from ${val.from} to ${val.to}`,
  },

  // Industry 2: Custom Metal Fabrication & Job Shops
  fabrication_packet_time: {
    key: "fabrication_packet_time",
    label: "Job packet preparation time reduction percentage",
    location: "IndustryCard (manufacturing-fabrication) & industries.js",
    value: null,
    fallback: "Significantly reduces job packet preparation time",
    format: (val) => `Reduces job packet preparation time by ${val.percent}%`,
  },

  // Industry 3: Building Materials & Industrial Distribution
  distribution_accounting_savings: {
    key: "distribution_accounting_savings",
    label: "Hours per week saved across customer service and accounting",
    location: "IndustryCard (distribution) & industries.js",
    value: null,
    fallback: "Saves administrative hours across customer service and accounting",
    format: (val) => `Saves ${val.hours} hours/week across customer service and accounting`,
  },

  // Core Automation 1: Order Intake & Sales Order Creation
  automations_order_intake_speed: {
    key: "automations_order_intake_speed",
    label: "Order intake processing speed vs manual entry",
    location: "SolutionCard (Order Intake) & home.js",
    value: null,
    fallback: "Automated intake vs manual re-keying",
    format: (val) => `Processed in ${val.time} vs ${val.manualTime} manual`,
  },

  // Core Automation 2: Quote-to-Work-Order Automation
  automations_quote_packets_speed: {
    key: "automations_quote_packets_speed",
    label: "Job packet generation speed",
    location: "SolutionCard (Quote-to-Work-Order) & home.js",
    value: null,
    fallback: "Instant job packet generation",
    format: (val) => `Generates job packets in ${val.time}`,
  },

  // Core Automation 3: Finance & Invoicing Automation
  automations_finance_acceleration: {
    key: "automations_finance_acceleration",
    label: "Customer billing acceleration in days",
    location: "SolutionCard (Finance Automation) & home.js",
    value: null,
    fallback: "Accelerated customer billing and 3-way matching",
    format: (val) => `Accelerates billing by ${val.days} days`,
  },

  // Packages: Deployment timeline
  package_timeline: {
    key: "package_timeline",
    label: "Weeks to live production deployment",
    location: "PackageCard & solutions.js",
    value: null,
    fallback: "Fast-track to live production",
    format: (val) => `${val.weeks} weeks to live production`,
  },

  // Packages: Order volume threshold
  package_volume_threshold: {
    key: "package_volume_threshold",
    label: "Weekly dealer purchase orders volume threshold",
    location: "PackageCard & solutions.js",
    value: null,
    fallback: "High-volume dealer purchase orders per week",
    format: (val) => `${val.count} or more dealer purchase orders per week`,
  },
};

/**
 * Resolves a metric value safely.
 * Never renders "[X]" or "[X hours]" on screen.
 * If metric is null, returns the plain-language fallback.
 * If a custom raw string has "[X...]", cleans it into plain language.
 */
export const resolveMetric = (metricKey, fallbackString = null) => {
  if (metricKey && METRICS[metricKey]) {
    const item = METRICS[metricKey];
    if (item.value !== null && typeof item.format === 'function') {
      return item.format(item.value);
    }
    return item.fallback;
  }

  // Fallback string cleaner: if the string contains [X...], replace cleanly
  if (fallbackString && typeof fallbackString === 'string') {
    if (/\[X[^\]]*\]/i.test(fallbackString)) {
      // Clean standard patterns
      let cleaned = fallbackString
        .replace(/from\s+\[X\s*days?\]\s+to\s+\[X\s*minutes?\]/i, 'from days to minutes')
        .replace(/by\s+\[X%?\]/i, 'significantly')
        .replace(/\[X\s*hours?\/week\]/i, 'administrative hours')
        .replace(/\[X\s*minutes?\]\s+vs\s+\[X\s*hours?\]\s+manual/i, 'minutes vs manual hours')
        .replace(/in\s+\[X\s*seconds?\]/i, 'instantly')
        .replace(/by\s+\[X\s*days?\]/i, 'several days')
        .replace(/\[X\]\s+orders\s+processed,\s+intake\s+time\s+from\s+\[X\]\s+to\s+\[X\]\.?/i, 'Rapid PDF Order Intake')
        .replace(/Work\s+orders\s+in\s+\[X\s*minutes?\]\s+instead\s+of\s+\[X\],?\s+quantities\s+match\s+every\s+time\.?/i, 'Instant Work Order Creation')
        .replace(/\[X\]\s+builds\s+a\s+week\s+in\s+one\s+command\.?/i, 'Batch Assembly Builds')
        .replace(/\[X\s*weeks?\]/i, 'several weeks')
        .replace(/\[X\]/gi, '');

      return cleaned.replace(/\s+/g, ' ').trim();
    }
    return fallbackString;
  }

  return fallbackString;
};
