export const Branch = {
  LEFT: "leftSide",
  RIGHT: "rightSide",
};

export const NodeTypes = {
  CONVERGE: "converge",
  DIVERGE: "diverge",
  CHECKPOINT: "checkpoint",
};

export const ItemSize = {
  SMALL: "small",
  LARGE: "large",
};

export const TIMELINE = [
  {
    type: NodeTypes.CHECKPOINT,
    title: "Our Expertise",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Building Digital Solutions That Matter",
    size: ItemSize.SMALL,
    subtitle:
      "We craft innovative technology solutions that transform businesses, enhance user experiences, and drive sustainable growth through cutting-edge development practices.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.DIVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Experienced Team",
    size: ItemSize.SMALL,
    subtitle:
      "Our industry veterans bring deep expertise in business transformation, technology implementation, and solution optimization. We've successfully guided hundreds of organizations through complex digital evolutions.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Proven Track Record",
    size: ItemSize.SMALL,
    subtitle:
      "With over 15 years of combined experience across Fortune 500 companies and emerging startups, our team delivers measurable results. We've completed 200+ successful projects with 98% client satisfaction rate.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Industry Expertise",
    size: ItemSize.SMALL,
    subtitle:
      "Specialized knowledge across healthcare, fintech, e-commerce, manufacturing, and SaaS industries. Our domain experts understand your unique challenges and regulatory requirements.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Best Case Strategies",
    size: ItemSize.SMALL,
    subtitle:
      "We develop customized strategies aligned with your business goals, leveraging proven methodologies and industry best practices to ensure optimal outcomes. Our approach combines innovation with practical execution.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Agile Methodology",
    size: ItemSize.SMALL,
    subtitle:
      "Iterative development with continuous feedback loops ensures rapid adaptation to changing requirements. Sprint-based delivery keeps projects on track and stakeholders engaged throughout the process.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Data-Driven Decisions",
    size: ItemSize.SMALL,
    subtitle:
      "Every strategy backed by comprehensive market research, competitive analysis, and performance metrics. We use advanced analytics to validate assumptions and optimize outcomes.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Risk Mitigation",
    size: ItemSize.SMALL,
    subtitle:
      "Proactive identification and management of potential project risks. Our comprehensive risk assessment framework ensures smooth execution and contingency planning for any scenario.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CONVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "With You - From Start to Finish",
    size: ItemSize.SMALL,
    subtitle:
      "Experience end-to-end partnership throughout your journey. From initial planning through implementation and ongoing optimization, we provide consistent support and guidance to maximize your success.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.DIVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Strategic Planning & Discovery",
    size: ItemSize.SMALL,
    subtitle:
      "Comprehensive business analysis, stakeholder interviews, and technical assessment. We map out your current state, define success metrics, and create detailed project roadmaps.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Design & Development",
    size: ItemSize.SMALL,
    subtitle:
      "User-centered design approach with rapid prototyping and iterative development. Our cross-functional teams ensure seamless integration between design vision and technical implementation.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Testing & Quality Assurance",
    size: ItemSize.SMALL,
    subtitle:
      "Rigorous testing protocols including automated testing, security audits, and performance optimization. We ensure your solution meets the highest standards before deployment.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Deployment & Launch",
    size: ItemSize.SMALL,
    subtitle:
      "Seamless deployment with minimal downtime. Our DevOps experts handle infrastructure setup, monitoring configuration, and launch strategy to ensure smooth go-live experience.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Ongoing Support & Optimization",
    size: ItemSize.SMALL,
    subtitle:
      "24/7 monitoring, regular performance reviews, and continuous improvement initiatives.",
    shouldDrawLine: true,
    alignment: Branch.RIGHT,
  },
  {
    type: NodeTypes.CONVERGE,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Success Metrics",
    size: ItemSize.LARGE,
    shouldDrawLine: false,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Client Satisfaction",
    size: ItemSize.SMALL,
    subtitle:
      "98% client satisfaction rate with 85% of clients engaging for additional projects. Our Net Promoter Score of 72 reflects our commitment to delivering exceptional value.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Project Success Rate",
    size: ItemSize.SMALL,
    subtitle:
      "95% of projects delivered on time and within budget. Our robust project management framework ensures predictable outcomes and transparent communication.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
  {
    type: NodeTypes.CHECKPOINT,
    title: "Business Impact",
    size: ItemSize.SMALL,
    subtitle:
      "Average 40% improvement in operational efficiency and 25% increase in revenue growth for our clients. Measurable ROI typically achieved within 6-12 months of implementation.",
    shouldDrawLine: true,
    alignment: Branch.LEFT,
  },
];
