import { useEffect, useRef, useState } from "react";
import {
  Branch,
  NodeTypes,
  TIMELINE,
  ItemSize,
} from "../../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { DirectionPad, SlidingButton } from "../index";
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Award, Target, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const svgColor = "#FFFFFF";
const animColor = "#60a5fa";
const separation = 450;
const strokeWidth = 2;
const leftBranchX = 13;
const curveLength = 150;
const dotSize = 26;

const MILESTONE_PHASES = [
  {
    id: "expertise",
    phaseNumber: "01",
    badge: "Core Expertise",
    title: "Enterprise Architecture",
    tagline: "Building Digital Solutions That Scale",
    description: "Our certified NetSuite veterans craft high-performance financial systems that modernize complex operations and drive sustainable growth.",
    icon: Award,
    highlights: [
      "200+ Successful Enterprise NetSuite Deployments",
      "Specialized Domain Knowledge: FinTech, SaaS & E-Com",
      "Proactive Risk Assessment & Governance Framework",
      "Certified NetSuite Solutions Architects & Developers"
    ],
    stat: "98%",
    statLabel: "Client Satisfaction Rate",
    ctaText: "EXPLORE EXPERTISE",
    accent: "#60a5fa"
  },
  {
    id: "methodology",
    phaseNumber: "02",
    badge: "Delivery Methodology",
    title: "Start to Finish Partnership",
    tagline: "Predictable, Agile & Secure Execution",
    description: "From target operating model discovery to automated integration and 24/7 post-launch monitoring, we provide hands-on partnership at every milestone.",
    icon: Target,
    highlights: [
      "Strategic Business Process Mapping & Discovery",
      "Rapid Prototyping & Custom SuiteApp Development",
      "Automated Testing, Security Audits & SOC-2 Compliance",
      "24/7 Continuous Monitoring & Hypercare Support"
    ],
    stat: "95%",
    statLabel: "On-Time & On-Budget Delivery",
    ctaText: "OUR METHODOLOGY",
    accent: "#38bdf8"
  },
  {
    id: "wonders",
    phaseNumber: "03",
    badge: "Measurable Impact",
    title: "Let's Do Wonders!",
    tagline: "Experience Next-Gen ERP Intelligence",
    description: "Experience the power of an integrated AI-first business management platform that grows with your business and accelerates financial close.",
    icon: Rocket,
    highlights: [
      "40% Average Boost in Operational Efficiency",
      "10x Faster Month-End Financial Close Cycles",
      "25% Increase in Scaled Net Revenue Velocity",
      "Continuous Real-Time Financial Ledger Accuracy"
    ],
    stat: "+40%",
    statLabel: "Operational Efficiency Gain",
    ctaText: "Schedule Consultation",
    accent: "#34d399"
  }
];

const TimelineSection = () => {
  const [svgWidth, setSvgWidth] = useState(400);
  const [rightBranchX, setRightBranchX] = useState(109);
  const [activePhase, setActivePhase] = useState(0);

  const svgCheckpointItems = TIMELINE.filter(
    (item) => item.type === NodeTypes.CHECKPOINT && item.shouldDrawLine
  );

  const svgLength = svgCheckpointItems?.length * separation;

  const timelineSvg = useRef(null);
  const svgContainer = useRef(null);
  const screenContainer = useRef(null);
  const cardContentRef = useRef(null);

  const addNodeRefsToItems = (timeline) => {
    return timeline.map((node, idx) => ({
      ...node,
      next: timeline[idx + 1],
      prev: timeline[idx - 1],
    }));
  };

  const generateTimelineSvg = (timeline) => {
    let index = 1;
    let y = dotSize / 2;
    const timelineStyle = `<style>.str, .dot{stroke-width: ${strokeWidth}px}.anim-branch{stroke-dasharray: 186}</style>`;
    let isDiverged = false;

    const timelineSvg = addNodeRefsToItems(timeline).reduce(
      (svg, node) => {
        const { type, next } = node;
        let lineY = y;
        let dotY = y + separation / 2;

        switch (type) {
          case NodeTypes.CHECKPOINT:
            {
              const { shouldDrawLine } = node;

              if (!next) {
                lineY = y - separation / 2;
              }

              if (!shouldDrawLine) {
                dotY = y;
              }

              if (shouldDrawLine) {
                svg = shouldDrawLine
                  ? `${drawLine(node, lineY, index, isDiverged)}${svg}`
                  : svg;
                y = y + separation;
                index++;
              }

              svg = svg.concat(drawDot(node, dotY, isDiverged));
            }
            break;
          case NodeTypes.DIVERGE:
            {
              isDiverged = true;
              svg = `${drawBranch(node, y, index)}${svg}`;
            }
            break;
          case NodeTypes.CONVERGE:
            {
              isDiverged = false;
              svg = `${drawBranch(node, y - separation, index - 1)}${svg}`;
            }
            break;
        }

        return svg;
      },
      timelineStyle
    );

    return timelineSvg;
  };

  const getDotString = (x, y) => {
    return `<rect class='dot' width=${dotSize} height=${dotSize} fill='#0f1419' x=${
      x - dotSize / 2
    } y=${
      y - dotSize / 2
    } ></rect><circle cx=${x} cy=${y} r='6' stroke=${svgColor} class='dot' ></circle>`;
  };

  const drawDot = (timelineNode, y, isDiverged) => {
    const { next, alignment } = timelineNode;

    if (next && next.type === NodeTypes.DIVERGE) {
      y = y - curveLength + 5 * dotSize;
    }

    if (next && next.type === NodeTypes.CONVERGE) {
      y = y + curveLength - 5 * dotSize;
    }

    const dotString = getDotString(
      alignment === Branch.LEFT ? leftBranchX : rightBranchX,
      y
    );

    const textString = addText(timelineNode, y, isDiverged);

    return `${textString}${dotString}`;
  };

  const addText = (timelineNode, y, isDiverged) => {
    const { title, subtitle, size } = timelineNode;

    const offset = isDiverged ? rightBranchX : 10;
    const foreignObjectX = dotSize / 2 + 10 + offset;
    const foreignObjectY = y - dotSize / 2;
    const foreignObjectWidth = svgWidth - (dotSize / 2 + 10 + offset);

    const titleSizeClass =
      size === ItemSize.LARGE
        ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
        : "text-sm sm:text-base md:text-lg font-semibold";
    const titleColorClass =
      title === "Our Expertise" || title === "Success Metrics"
        ? "text-white"
        : "text-[#60a5fa]";
    const subtitleString = subtitle
      ? `<p class='text-xs sm:text-sm mt-1 text-gray-400 font-medium tracking-normal line-clamp-2'>${subtitle}</p>`
      : "";

    return `<foreignObject x=${foreignObjectX} y=${foreignObjectY} width=${Math.max(
      foreignObjectWidth,
      200
    )} height=${separation}><p class='${titleSizeClass} ${titleColorClass}'>${title}</p>${subtitleString}</foreignObject>`;
  };

  const drawLine = (timelineNode, y, i, isDiverged) => {
    const { alignment, prev, next } = timelineNode;

    const isPrevDiverge = prev && prev.type === NodeTypes.DIVERGE;
    const isNextConverge = next && next.type === NodeTypes.CONVERGE;

    const lineY = Math.abs(y + separation);

    if (isPrevDiverge) {
      return `<line class='str' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${animColor} />`;
    }

    if (isNextConverge) {
      return `<line class='str' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${animColor} />`;
    }

    const lineX = alignment === Branch.LEFT ? leftBranchX : rightBranchX;

    let str = `<line class='str' x1=${lineX} y1=${y} x2=${lineX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${lineX} y1=${y} x2=${lineX} y2=${lineY} stroke=${animColor} />`;

    if (isDiverged) {
      const divergedLineX =
        alignment === Branch.LEFT ? rightBranchX : leftBranchX;
      str = str.concat(
        `<line class='str' x1=${divergedLineX} y1=${y} x2=${divergedLineX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${divergedLineX} y1=${y} x2=${divergedLineX} y2=${lineY} stroke=${animColor} />`
      );
    }
    return str;
  };

  const drawBranch = (timelineNode, y, i) => {
    const { type } = timelineNode;

    switch (type) {
      case NodeTypes.DIVERGE:
        return `<path class='str' d='M ${leftBranchX} ${y} C ${leftBranchX} ${
          y + curveLength / 2
        } ${rightBranchX} ${y + curveLength / 2} ${rightBranchX} ${
          y + curveLength
        }' stroke=${svgColor} /><line class='str' x1=${rightBranchX} y1=${
          y + curveLength
        } x2=${rightBranchX} y2=${
          y + separation
        } stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${leftBranchX} ${y} C ${leftBranchX} ${
          y + curveLength / 2
        } ${rightBranchX} ${y + curveLength / 2} ${rightBranchX} ${
          y + curveLength
        }' stroke=${animColor} /><line class='str branch-line-${i}' x1=${rightBranchX} y1=${
          y + curveLength
        } x2=${rightBranchX} y2=${y + separation} stroke=${animColor} />`;
      case NodeTypes.CONVERGE:
        return `<path class='str' d='M ${rightBranchX} ${
          y + separation - curveLength
        } C ${rightBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation
        }' stroke=${svgColor} /><line class='str' x1=${rightBranchX} y1=${y} x2=${rightBranchX} y2=${Math.abs(
          y + separation - curveLength
        )} stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${rightBranchX} ${
          y + separation - curveLength
        } C ${rightBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation
        }' stroke=${animColor} /><line class='str branch-line-${i}' x1=${rightBranchX} y1=${y} x2=${rightBranchX} y2=${Math.abs(
          y + separation - curveLength
        )} stroke=${animColor} />`;
      default:
        return "";
    }
  };

  const addLineSvgAnimation = (timeline, duration, index) => {
    const startTime = `start+=${duration * index}`;

    timeline.from(
      svgContainer.current.querySelectorAll(`.line-${index + 1}`),
      { scaleY: 0, duration },
      startTime
    );

    return timeline;
  };

  const addDivergingBranchLineAnimation = (timeline, duration, index) => {
    timeline
      .from(
        svgContainer.current.querySelector(`.line-${index + 1}`),
        { scaleY: 0, duration },
        `start+=${duration * index}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-${index + 1}`),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${duration * index}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-line-${index + 1}`),
        { scaleY: 0, duration: duration - 1 },
        `start+=${duration * (index + 1) - 2}`
      );

    return timeline;
  };

  const addConvergingBranchLineAnimation = (timeline, duration, index) => {
    timeline
      .from(
        svgContainer.current.querySelector(`.line-${index + 1}`),
        { scaleY: 0, duration },
        `start+=${duration * index}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-line-${index + 1}`),
        { scaleY: 0, duration: duration - 1 },
        `start+=${duration * index}`
      )
      .from(
        svgContainer.current.querySelector(`.branch-${index + 1}`),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${duration * (index + 1) - 1}`
      );

    return timeline;
  };

  const animateTimeline = (timeline, duration) => {
    let index = 0;

    addNodeRefsToItems(TIMELINE).forEach((item) => {
      const { type } = item;

      if (type === NodeTypes.CHECKPOINT && item.shouldDrawLine) {
        const { next, prev } = item;

        if (prev?.type === NodeTypes.DIVERGE) {
          addDivergingBranchLineAnimation(timeline, duration, index);
        } else if (next?.type === NodeTypes.CONVERGE) {
          addConvergingBranchLineAnimation(timeline, duration, index);
        } else {
          addLineSvgAnimation(timeline, duration, index);
        }

        index++;
      }
    });
  };

  const setTimelineSvg = (svgContainer, timelineSvg) => {
    if (!svgContainer.current || !timelineSvg.current) return;
    const containerWidth = svgContainer.current.clientWidth || 360;
    setSvgWidth(containerWidth);

    if (window.innerWidth < 768) {
      setRightBranchX(55);
    } else {
      setRightBranchX(109);
    }

    const resultSvgString = generateTimelineSvg(TIMELINE);
    timelineSvg.current.innerHTML = resultSvgString;
  };

  const initScrollTrigger = () => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return { timeline: null, duration: 0 };

    const timeline = gsap
      .timeline({ defaults: { ease: "none", duration: 0.44 } })
      .addLabel("start");

    const platformHeight =
      screenContainer.current?.getBoundingClientRect().height || 500;

    const trigger = screenContainer.current;
    const start = `top ${(window.innerHeight - platformHeight) / 2}`;
    const end = `+=${svgLength - platformHeight}`;
    const duration = 3;

    ScrollTrigger.create({
      trigger,
      start,
      end,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      animation: timeline,
      onUpdate: (self) => {
        const progress = self.progress;
        let phase = 0;
        if (progress >= 0.66) {
          phase = 2;
        } else if (progress >= 0.33) {
          phase = 1;
        }
        setActivePhase((prev) => (prev !== phase ? phase : prev));
      },
    });

    return { timeline, duration };
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      setTimelineSvg(svgContainer, timelineSvg);
      const { timeline, duration } = initScrollTrigger();
      if (timeline) {
        animateTimeline(timeline, duration);
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setTimelineSvg(svgContainer, timelineSvg);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleOpenContact = () => {
    const contactBtn = document.querySelector("nav button:last-of-type");
    if (contactBtn) contactBtn.click();
  };

  const currentPhaseData = MILESTONE_PHASES[activePhase];

  const renderSlides = () => {
    const IconComponent = currentPhaseData.icon;

    return (
      <div
        className="w-full max-w-full bg-gradient-to-br from-[#1b2537] via-[#162030] to-[#111827] rounded-3xl overflow-hidden p-6 sm:p-8 border border-blue-500/25 shadow-2xl relative transition-all duration-300"
        ref={screenContainer}
      >
        {/* Top ambient color bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${currentPhaseData.accent}, #60a5fa)`,
          }}
        ></div>

        {/* Phase Pill Header & Indicator */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center space-x-2">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border"
              style={{
                color: currentPhaseData.accent,
                borderColor: `${currentPhaseData.accent}40`,
                backgroundColor: `${currentPhaseData.accent}15`,
              }}
            >
              Phase {currentPhaseData.phaseNumber} • {currentPhaseData.badge}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {MILESTONE_PHASES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhase(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activePhase === idx
                    ? "w-6 bg-blue-400"
                    : "w-2 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to phase ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Card Content with animation */}
        <div ref={cardContentRef} className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-poppins font-bold tracking-tight text-2xl sm:text-3xl text-white">
                {currentPhaseData.title}
              </h2>
              <p
                className="text-xs sm:text-sm font-semibold mt-1"
                style={{ color: currentPhaseData.accent }}
              >
                {currentPhaseData.tagline}
              </p>
            </div>
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-blue-400 flex-shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed pt-1">
            {currentPhaseData.description}
          </p>

          {/* Highlights checklist */}
          <div className="space-y-2 py-2">
            {currentPhaseData.highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                <CheckCircle2
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: currentPhaseData.accent }}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Metric Stat Banner */}
          <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-700/50 flex items-center justify-between mt-4">
            <div>
              <div className="text-[11px] text-gray-400 uppercase font-medium tracking-wider">
                {currentPhaseData.statLabel}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {currentPhaseData.stat}
              </div>
            </div>
            <span className="text-xs text-blue-400 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Verified Metric
            </span>
          </div>

          {/* Action CTA Button & Step Controls */}
          <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              {activePhase === 2 ? (
                <SlidingButton
                  text={currentPhaseData.ctaText}
                  onClick={handleOpenContact}
                  className="w-full sm:w-auto justify-center"
                />
              ) : (
                <button
                  onClick={() =>
                    setActivePhase((prev) => (prev + 1) % MILESTONE_PHASES.length)
                  }
                  className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-300 hover:text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Next Phase</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Step Navigation Controls with Phase Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
              <span className="text-xs font-mono font-medium text-gray-400 bg-gray-800/80 border border-gray-700/60 px-2.5 py-1 rounded-full">
                0{activePhase + 1} / 0{MILESTONE_PHASES.length}
              </span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() =>
                    setActivePhase((prev) => (prev > 0 ? prev - 1 : MILESTONE_PHASES.length - 1))
                  }
                  className="p-2 rounded-full border border-gray-700 hover:border-blue-400/50 bg-gray-800/80 text-gray-300 hover:text-white transition cursor-pointer"
                  aria-label="Previous Phase"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActivePhase((prev) => (prev + 1) % MILESTONE_PHASES.length)
                  }
                  className="p-2 rounded-full border border-gray-700 hover:border-blue-400/50 bg-gray-800/80 text-gray-300 hover:text-white transition cursor-pointer"
                  aria-label="Next Phase"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSVG = () => (
    <svg
      width={svgWidth}
      height={svgLength}
      viewBox={`0 0 ${svgWidth} ${svgLength}`}
      fill="none"
      ref={timelineSvg}
      className="overflow-visible"
    ></svg>
  );

  const renderSectionTitle = () => (
    <div className="flex flex-col">
      <p className="text-xs sm:text-sm text-[#60a5fa] font-semibold tracking-widest uppercase seq">
        MILESTONES & EVOLUTION
      </p>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white seq mt-2 tracking-tight">
        Transformation Journey
      </h2>
      <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mt-3 tracking-normal leading-relaxed">
        From strategic architecture through end-to-end delivery, explore how we partner with enterprise teams to create lasting digital value.
      </p>
    </div>
  );

  return (
    <section
      className="w-full relative select-none py-14 sm:py-20 px-4 sm:px-8 md:px-12 flex flex-col justify-center bg-[#131b2a] font-poppins max-w-7xl mx-auto"
      id="timeline"
    >
      {renderSectionTitle()}

      {/* Mobile Interactive Phase Switcher */}
      <div className="lg:hidden mt-8 flex flex-wrap gap-2">
        {MILESTONE_PHASES.map((phase, idx) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(idx)}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activePhase === idx
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-800/80 text-gray-400 hover:text-gray-200 border border-gray-700/50"
            }`}
          >
            {phase.phaseNumber}. {phase.badge}
          </button>
        ))}
      </div>

      {/* Grid Layout: Desktop Left (SVG), Right (Dynamic Card). Mobile: Dynamic Card clean view */}
      <div className="grid grid-cols-12 gap-6 sm:gap-8 mt-6 sm:mt-12 items-start">
        {/* Desktop Interactive SVG Line (Hidden on Mobile to eliminate stuck 6,000px scroll) */}
        <div
          className="hidden lg:block lg:col-span-7 line-svg overflow-hidden"
          ref={svgContainer}
        >
          {renderSVG()}
        </div>

        {/* Dynamic Responsive Milestone Card (Pinned by GSAP on Desktop, fluid on Mobile) */}
        <div className="col-span-12 lg:col-span-5 w-full">
          {renderSlides()}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
