import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectTile from './ProjectTile';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    name: "Project One",
    description: "Innovative solution for modern challenges",
    color: "#DCD6EA",
    url: "#",
  },
  {
    name: "Project Two",
    description: "Building the future of technology",
    color: "#DCD6EA",
    url: "#",
  },
  {
    name: "Project Three",
    description: "Transforming ideas into reality",
    color: "#EADFD2",
    url: "#",
  },
  {
    name: "Project Four",
    description: "Empowering businesses with innovation",
    color: "#EADFD2",
    url: "#",
  },
  {
    name: "Project Five",
    description: "Creating seamless user experiences",
    color: "#D5E8D9",
    url: "#",
  },
  {
    name: "Project Six",
    description: "Driving digital transformation",
    color: "#D5E8D9",
    url: "#",
  },
];

const Projects = () => {
  const targetSectionRef = useRef(null);
  const sectionTitleElementRef = useRef(null);
  const [willChange, setWillChange] = useState(false);
  const [horizontalAnimationEnabled, setHorizontalAnimationEnabled] = useState(false);

  useEffect(() => {
    const checkDesktop = () => window.innerWidth >= 768;
    const isDesktop = checkDesktop();
    const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setHorizontalAnimationEnabled(isDesktop && !preferReducedMotion);

    let projectsScrollTrigger;
    let projectsTimeline;
    let revealScrollTrigger;
    let revealTimeline;

    if (isDesktop && !preferReducedMotion) {
      // Reveal animation
      revealTimeline = gsap.timeline({ defaults: { ease: 'none' } });
      revealTimeline.from(
        targetSectionRef.current.querySelectorAll('.seq'),
        { opacity: 0, duration: 0.5, stagger: 0.5 }
      );

      revealScrollTrigger = ScrollTrigger.create({
        trigger: targetSectionRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0,
        animation: revealTimeline,
      });

      // Horizontal scroll animation
      projectsTimeline = gsap.timeline({ defaults: { ease: 'none' } });
      const sidePadding =
        document.body.clientWidth -
        targetSectionRef.current.querySelector('.inner-container').clientWidth;
      const elementWidth =
        sidePadding +
        targetSectionRef.current.querySelector('.project-wrapper').clientWidth;
      targetSectionRef.current.style.width = `${elementWidth}px`;
      const width = window.innerWidth - elementWidth;
      const duration = `${(elementWidth / window.innerHeight) * 100}%`;

      projectsTimeline
        .to(targetSectionRef.current, { x: width })
        .to(sectionTitleElementRef.current, { x: -width }, '<');

      projectsScrollTrigger = ScrollTrigger.create({
        trigger: targetSectionRef.current,
        start: 'top top',
        end: duration,
        scrub: 0,
        pin: true,
        animation: projectsTimeline,
        pinSpacing: 'margin',
        onToggle: (self) => setWillChange(self.isActive),
      });
    } else {
      // Mobile setup
      const projectWrapper = targetSectionRef.current.querySelector('.project-wrapper');
      const parentPadding = window
        .getComputedStyle(targetSectionRef.current)
        .getPropertyValue('padding-left');

      targetSectionRef.current.style.setProperty('width', '100%');
      projectWrapper.classList.add('overflow-x-auto');
      projectWrapper.style.setProperty('width', 'calc(100vw)');
      projectWrapper.style.setProperty('padding', `0 ${parentPadding}`);
      projectWrapper.style.setProperty('transform', `translateX(-${parentPadding})`);

      // Reveal animation for mobile
      revealTimeline = gsap.timeline({ defaults: { ease: 'none' } });
      revealTimeline.from(
        targetSectionRef.current.querySelectorAll('.seq'),
        { opacity: 0, duration: 0.5, stagger: 0.5 }
      );

      revealScrollTrigger = ScrollTrigger.create({
        trigger: targetSectionRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0,
        animation: revealTimeline,
      });
    }

    return () => {
      if (projectsScrollTrigger) projectsScrollTrigger.kill();
      if (projectsTimeline) projectsTimeline.kill();
      if (revealScrollTrigger) revealScrollTrigger.kill();
      if (revealTimeline) revealTimeline.progress(1);
    };
  }, []);

  return (
    <section
      ref={targetSectionRef}
      className="w-full relative select-none section-container flex flex-col py-8 justify-center min-h-screen font-poppins z-0"
      id="projects"
    >
      <div
        className={`flex flex-col inner-container ${willChange ? 'will-change-transform' : ''}`}
        ref={sectionTitleElementRef}
      >
        <p className="text-sm font-medium text-darkGreen tracking-widest seq">PROJECTS</p>
        <h1 className="text-5xl md:text-6xl font-bold text-darkGreen mt-2 seq tracking-tighter">Our Works</h1>
        <h2 className="text-2xl text-darkGreen  md:max-w-3xl w-full max-w-sm mt-2 seq tracking-tighter">
          We have contributed in over 20+ projects ranging from Frontend development, UI/UX design, and Digital Solutions
        </h2>
      </div>

      <div className="tall:mt-12 mt-6 grid grid-flow-col auto-cols-max md:gap-10 tracking-tighter gap-6 project-wrapper w-fit seq snap-x scroll-pl-6 snap-mandatory">
        {PROJECTS_DATA.map((project) => (
          <ProjectTile
            key={project.name}
            project={project}
            animationEnabled={horizontalAnimationEnabled}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
