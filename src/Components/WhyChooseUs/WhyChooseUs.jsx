import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tabData = [
  {
    id: 'experienced-team',
    label: 'Experienced Team',
    title: 'Experienced Team',
    subtitle: 'Scale with confidence',
    description: "Our industry veterans bring deep expertise in business transformation, technology implementation, and solution optimization. We've successfully guided hundreds of organizations through complex digital evolutions.",
    buttonText: 'For Experienced Team',
    arrows: 15,
    colors: {
      main: '#121827',
      card: '#374151',
      button: '#60a5fa',
      badge: '#2d3748',
      accent: '#60a5fa',
      activeTab: '#60a5fa'
    }
  },
  {
    id: 'strategies',
    label: 'Strategies',
    title: 'Strategies',
    subtitle: 'Built for complexity',
    description: "We develop customized strategies aligned with your business goals, leveraging proven methodologies and industry best practices to ensure optimal outcomes. Our approach combines innovation with practical execution.",
    buttonText: 'For Strategies',
    arrows: 20,
    colors: {
      main: '#0f1419',
      card: '#4b5563',
      button: '#f59e0b',
      badge: '#374151',
      accent: '#f59e0b',
      activeTab: '#f59e0b'
    }
  },
  {
    id: 'partners',
    label: 'Partners',
    title: 'Partners',
    subtitle: 'Grow together',
    description: "Join our ecosystem of accounting firms, consultants, and technology partners. Access dedicated support, co-marketing opportunities, and revenue share programs. Help your clients succeed while building a thriving partnership with Campfire.",
    buttonText: 'Partner With Us',
    arrows: 12,
    colors: {
      main: '#1e293b',
      card: '#475569',
      button: '#8b5cf6',
      badge: '#334155',
      accent: '#8b5cf6',
      activeTab: '#8b5cf6'
    }
  }
];

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const mainBgRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const badgeRef = useRef(null);
  const accentRef = useRef(null);
  const activeTabLineRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    const container = containerRef.current;
    if (!isDesktop || !container) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${window.innerHeight * (tabData.length - 1)}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const newTab = Math.min(
          Math.floor(progress * tabData.length),
          tabData.length - 1
        );
        setActiveTab((prev) => (prev !== newTab ? newTab : prev));
      },
    });

    const handleResize = () => {
      if (window.innerWidth < 1024 && scrollTrigger) {
        scrollTrigger.kill();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollTrigger) scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    // Animate card content change and colors
    const tl = gsap.timeline();
    const currentColors = tabData[activeTab].colors;
    
    tl.to([contentRef.current, buttonRef.current], {
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: 'power2.in'
    })
    .to(mainBgRef.current, {
      backgroundColor: currentColors.main,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to(cardRef.current, {
      backgroundColor: currentColors.card,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to(buttonRef.current, {
      backgroundColor: currentColors.button,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to(badgeRef.current, {
      backgroundColor: currentColors.badge,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to(accentRef.current, {
      color: currentColors.accent,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to(activeTabLineRef.current, {
      backgroundColor: currentColors.activeTab,
      duration: 0.4,
      ease: 'power2.inOut'
    }, 0)
    .to([contentRef.current, buttonRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    });

  }, [activeTab]);

  const currentTab = tabData[activeTab];

  return (
    <div className="bg-[#1a202c]">
      {/* Main component */}
      <div 
        ref={containerRef}
        className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-8 font-poppins"
      >
        <div 
          ref={mainBgRef}
          className="w-full max-w-7xl rounded-3xl sm:rounded-4xl lg:rounded-[3.5rem] p-6 sm:p-10 lg:p-14 mx-auto transition-colors duration-500 shadow-2xl border border-gray-700/40"
          style={{ backgroundColor: currentTab.colors.main }}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-12">
            {/* Left side - Text content */}
            <div className="text-white space-y-6 sm:space-y-8 w-full lg:w-1/2 flex flex-col justify-center">
              <div 
                ref={badgeRef}
                className="inline-block px-4 py-1.5 font-medium rounded-full text-xs sm:text-sm text-gray-300 transition-colors duration-500 self-start"
                style={{ backgroundColor: currentTab.colors.badge }}
              >
                Why Choose Us
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light mb-4 tracking-tight leading-tight">
                  Your success<br />
                  is our number 1<br />
                  <span 
                    ref={accentRef}
                    className="transition-colors duration-500 font-normal"
                    style={{ color: currentTab.colors.accent }}
                  >
                    Priority
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mt-4 sm:mt-6 tracking-normal">
                  We deliver exceptional value by powering modern companies through:
                </p>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto gap-4 sm:gap-8 border-b border-gray-600 tracking-tight pb-1 no-scrollbar w-full">
                {tabData.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`pb-3 text-base sm:text-lg transition-colors relative whitespace-nowrap font-medium ${
                      activeTab === index 
                        ? '' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                    style={{ color: activeTab === index ? currentTab.colors.activeTab : undefined }}
                  >
                    {tab.label}
                    {activeTab === index && (
                      <div 
                        ref={activeTabLineRef}
                        className="transition-colors duration-500 absolute rounded-full bottom-0 left-0 right-0 h-[3px] transform translate-y-1/2"
                        style={{ backgroundColor: currentTab.colors.activeTab }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Card */}
            <div 
              ref={cardRef}
              className="rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 min-h-[420px] sm:min-h-[500px] w-full lg:w-[460px] xl:w-[500px] flex flex-col justify-between transition-colors duration-500 shadow-xl border border-white/10"
              style={{ backgroundColor: currentTab.colors.card }}
            >
              <div ref={contentRef}>
                <h2 className="text-2xl sm:text-4xl font-light text-white mb-2">
                  {currentTab.title}
                </h2>
                <p className="text-gray-200 mb-6 text-base sm:text-lg font-medium">
                  {currentTab.subtitle}
                </p>

                {/* Arrow pattern */}
                <div className="mb-6 flex flex-wrap gap-3">
                  {Array.from({ length: Math.min(currentTab.arrows, 16) }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-black/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  ))}
                </div>

                <p className="text-white text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  {currentTab.description}
                </p>
              </div>

              <button 
                ref={buttonRef}
                className="font-medium px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all self-start text-base sm:text-lg hover:opacity-90 text-white shadow-lg"
                style={{ backgroundColor: currentTab.colors.button }}
              >
                {currentTab.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyChooseUs;