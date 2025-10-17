import { useEffect, useRef, useState } from "react";
import {
  Branch,
  NodeTypes,
  TIMELINE,
  ItemSize,
} from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const svgColor = "#9CA3AF";
const animColor = "#FCD34D";
const separation = 450;
const strokeWidth = 2;
const leftBranchX = 13;
const curveLength = 150;
const dotSize = 26;

const TimelineSection = () => {
  const [svgWidth, setSvgWidth] = useState(400);
  const [rightBranchX, setRightBranchX] = useState(109);

  const svgCheckpointItems = TIMELINE.filter(
    (item) => item.type === NodeTypes.CHECKPOINT && item.shouldDrawLine
  );

  const svgLength = svgCheckpointItems?.length * separation;

  const timelineSvg = useRef(null);
  const svgContainer = useRef(null);
  const screenContainer = useRef(null);

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
    return `<rect class='dot' width=${dotSize} height=${dotSize} fill='#111827' x=${
      x - dotSize / 2
    } y=${
      y - dotSize / 2
    } ></rect><circle cx=${x} cy=${y} r='7' stroke=${svgColor} class='dot' ></circle>`;
  };

  const drawDot = (timelineNode, y, isDiverged) => {
    const { next, alignment } = timelineNode;

    // Diverging
    if (next && next.type === NodeTypes.DIVERGE) {
      y = y - curveLength + 6 * dotSize;
    }

    // Converging
    if (next && next.type === NodeTypes.CONVERGE) {
      y = y + curveLength - 6 * dotSize;
    }

    const dotString = getDotString(
      alignment === Branch.LEFT ? leftBranchX : rightBranchX,
      y
    );

    const textString = addText(timelineNode, y, isDiverged);

    return `${textString}${dotString}`;
  };

  const addText = (timelineNode, y, isDiverged) => {
    const { title, subtitle, size, image } = timelineNode;

    const offset = isDiverged ? rightBranchX : 10;
    const foreignObjectX = dotSize / 2 + 10 + offset;
    const foreignObjectY = y - dotSize / 2;
    const foreignObjectWidth = svgWidth - (dotSize / 2 + 10 + offset);

    const titleSizeClass = size === ItemSize.LARGE ? "text-6xl" : "text-2xl";
    const logoString = image
      ? `<img src='${image}' class='h-8 mb-2' loading='lazy' width='100' height='32' alt='${image}' />`
      : "";
    const subtitleString = subtitle
      ? `<p class='text-xl mt-2 text-gray-200 font-medium tracking-wide'>${subtitle}</p>`
      : "";

    return `<foreignObject x=${foreignObjectX} y=${foreignObjectY} width=${foreignObjectWidth}
        height=${separation}>${logoString}<p class='${titleSizeClass}'>${title}</p>${subtitleString}</foreignObject>`;
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
    const containerWidth = svgContainer.current.clientWidth;
    setSvgWidth(containerWidth);

    const resultSvgString = generateTimelineSvg(TIMELINE);
    timelineSvg.current.innerHTML = resultSvgString;

    if (window.innerWidth < 768) {
      setRightBranchX(70);
    }
  };

  const setSlidesAnimation = (timeline) => {
    svgCheckpointItems.forEach((_, index) => {
      // all except the first slide
      if (index !== 0) {
        timeline.fromTo(
          screenContainer.current.querySelector(`.slide-${index + 1}`),
          { opacity: 0 },
          { opacity: 1 }
        );
      }

      // all except the last slide
      if (index !== svgCheckpointItems.length - 1) {
        timeline.to(
          screenContainer.current.querySelector(`.slide-${index + 1}`),
          {
            opacity: 0,
            delay: 2.35,
          }
        );
      }
    });
  };

  const initScrollTrigger = () => {
    const timeline = gsap
      .timeline({ defaults: { ease: "none", duration: 0.44 } })
      .addLabel("start");

    let duration;
    let trigger;
    let start;
    let end;
    let additionalConfig = {};

    // Slide as a trigger for Desktop
    if (window.innerWidth >= 768) {
      // Animation for right side slides
      setSlidesAnimation(timeline);

      const platformHeight =
        screenContainer.current.getBoundingClientRect().height;

      trigger = screenContainer.current;
      start = `top ${(window.innerHeight - platformHeight) / 2}`;
      end = `+=${svgLength - platformHeight}`;
      additionalConfig = {
        pin: true,
        pinSpacing: true,
      };
      duration = timeline.totalDuration() / svgCheckpointItems.length;
    } else {
      // Mobile configuration
      trigger = svgContainer.current;
      start = "top center";
      end = `+=${svgLength}`;
      duration = 3;
    }

    ScrollTrigger.create({
      ...additionalConfig,
      trigger,
      start,
      end,
      scrub: 0,
      animation: timeline,
    });
    return { timeline, duration };
  };

  useEffect(() => {
    setTimelineSvg(svgContainer, timelineSvg);

    const { timeline, duration } = initScrollTrigger();

    animateTimeline(timeline, duration);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderSlides = () => {
    return (
      <div
        className="max-w-full h-96 shadow-xl bg-gray-800 rounded-2xl overflow-hidden"
        ref={screenContainer}
      >
        <div className="w-full h-8 bg-gray-700"></div>
        <div className="relative h-full w-full -mt-2 bg-gray-900 overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full">
            {svgCheckpointItems.map((item, index) => (
              <img
                key={`${item.title}-${index}`}
                className={`w-full h-full absolute top-0 object-cover slide-${index + 1}`}
                src={item.slideImage || ""}
                alt={item.title || "Timeline"}
                loading="lazy"
              />
            ))}
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
    ></svg>
  );

  const renderSectionTitle = () => (
    <div className="flex flex-col">
      <p className="text-sm text-yellow-400 font-medium tracking-widest seq">MILESTONES</p>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 seq mt-2">Timeline</h1>
      <h2 className="text-2xl md:max-w-2xl w-full text-gray-600 font-medium seq mt-2">
        A quick recap of proud moments
      </h2>
    </div>
  );

  return (
    <section
      className="w-full relative select-none min-h-screen py-20 px-6 md:px-12 flex flex-col justify-center bg-white font-poppins"
      id="timeline"
    >
      {renderSectionTitle()}
      <div className="grid grid-cols-12 gap-4 mt-20">
        <div className="col-span-12 md:col-span-6 line-svg" ref={svgContainer}>
          {renderSVG()}
        </div>
        <div className="col-span-12 md:col-span-6">
          {renderSlides()}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
