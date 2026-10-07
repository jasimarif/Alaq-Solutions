import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectTile } from '../index';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    name: "Portals Management",
    description: "Revolutionize your vendor & customer management with our expert NetSuite Portal integration services ensuring seamless transition, automated approvals, and customized enterprise implementation.",
    color: "#161f30",
    url: "#",
    tag: "NetSuite ERP",
    accent: "#38bdf8",
  },
  {
    name: "System Integrations",
    description: "Streamline your business operations with our expert NetSuite integration services, seamlessly syncing CRM, multi-currency banking, Shopify, and warehouse operations into a unified real-time ledger.",
    color: "#151d2d",
    url: "#",
    tag: "Data Pipelines",
    accent: "#60a5fa",
  },
  {
    name: "AI Financial Assistants",
    description: "Revolutionize your close cycle with intelligent anomaly detection, automated variance analysis, and conversational AI copilots built specifically for finance and accounting leaders.",
    color: "#171c2f",
    url: "#",
    tag: "AI Automation",
    accent: "#a855f7",
  },
  {
    name: "Custom SuiteApps",
    description: "Enhance your NetSuite experience with bespoke SuiteApps designed for complex industry workflows, real-time KPI visibility, and multi-entity executive consolidation.",
    color: "#131f2b",
    url: "#",
    tag: "SuiteApps",
    accent: "#34d399",
  },
  {
    name: "Revenue Automation",
    description: "Automate ASC 606 & IFRS 15 revenue recognition, complex multi-element contract schedules, and recurring subscription billing with audit-proof compliance.",
    color: "#1c1c2b",
    url: "#",
    tag: "Revenue AI",
    accent: "#f59e0b",
  },
  {
    name: "Cloud Security & Audit",
    description: "Enterprise-grade SOC-2 Type II compliant cloud architecture featuring automated continuous auditing, granular role-based security, and zero-trust ERP data governance.",
    color: "#141e2e",
    url: "#",
    tag: "Cloud Governance",
    accent: "#06b6d4",
  },
];

const Projects = () => {
  const targetSectionRef = useRef(null);
  const projectWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const [horizontalAnimationEnabled, setHorizontalAnimationEnabled] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canAnimate = isDesktop && !preferReducedMotion;

    setHorizontalAnimationEnabled(canAnimate);

    let projectsScrollTrigger;
    let projectsTween;
    let headerTween;

    const section = targetSectionRef.current;
    const wrapper = projectWrapperRef.current;

    if (canAnimate && section && wrapper) {
      // Calculate exact scroll distance needed so last card aligns at the right margin without extra space
      const getScrollDistance = () => {
        const wrapperWidth = wrapper.scrollWidth;
        const viewportWidth = window.innerWidth;
        const padding = viewportWidth >= 1024 ? 64 : 16;
        return Math.max(0, wrapperWidth - viewportWidth + padding * 2);
      };

      // Header entrance animation
      if (headerRef.current) {
        headerTween = gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Tween moving only the cards track
      projectsTween = gsap.to(wrapper, {
        x: () => -getScrollDistance(),
        ease: 'none',
      });

      // Pin section and scrub horizontally, unpinning immediately when the last card is aligned
      projectsScrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 0.5,
        animation: projectsTween,
        invalidateOnRefresh: true,
      });
    }

    return () => {
      if (projectsScrollTrigger) projectsScrollTrigger.kill();
      if (projectsTween) projectsTween.kill();
      if (headerTween) headerTween.kill();
      if (wrapper) {
        gsap.set(wrapper, { clearProps: 'transform' });
      }
    };
  }, []);

  return (
    <section
      ref={targetSectionRef}
      className="w-full relative select-none py-14 sm:py-20 flex flex-col justify-center min-h-screen font-poppins z-10 overflow-hidden bg-bg-dark"
      id="projects"
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12"
      >
        <div>
          <p className="text-xs sm:text-sm font-semibold text-accent-soft tracking-widest uppercase">
            OUR WORKS
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mt-2 tracking-tight">
            Core <span className="text-accent-soft">ERP</span> Excellence
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mt-3 tracking-normal leading-relaxed">
            We have contributed to 20+ enterprise deployments spanning revenue automation, NetSuite integrations, custom SuiteApps, and AI financial workflows.
          </p>
        </div>

        {/* Counter Badge */}
        <div className="hidden lg:flex items-center space-x-3 bg-slate-900/70 border border-border-dark/60 rounded-full px-4 py-2 text-xs text-gray-300">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Enterprise Portfolio</span>
          <span className="text-accent-soft font-mono font-semibold">6 Deployments</span>
        </div>
      </div>

      {/* Cards Track: Slides cleanly from left to right */}
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div
          ref={projectWrapperRef}
          className={`flex gap-6 sm:gap-8 flex-nowrap w-max will-change-transform ${
            !horizontalAnimationEnabled ? 'overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 max-w-full' : ''
          }`}
        >
          {PROJECTS_DATA.map((project, index) => (
            <ProjectTile
              key={index}
              project={project}
              animationEnabled={horizontalAnimationEnabled}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
