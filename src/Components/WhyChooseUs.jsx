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
      main: '#1a2e2a',
      card: '#6b8573',
      button: '#c5e5b4',
      badge: '#2a4a3f',
      accent: '#a8c5a0',
      activeTab: '#a8c5a0'
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
      main: '#301805',
      card: '#8A6240',
      button: '#F7A061',
      badge: '#4a2810',
      accent: '#F7A061',
      activeTab: '#F7A061'
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
      main: '#1A0948',
      card: '#645A7D',
      button: '#C5B4F3',
      badge: '#2d1560',
      accent: '#C5B4F3',
      activeTab: '#C5B4F3'
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
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${window.innerHeight * (tabData.length - 1)}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const newTab = Math.min(
          Math.floor(progress * tabData.length),
          tabData.length - 1
        );
        
        if (newTab !== activeTab) {
          setActiveTab(newTab);
        }
        
        if (progress >= 0.99) {
          setIsScrollLocked(false);
        } else {
          setIsScrollLocked(true);
        }
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [activeTab]);

  useEffect(() => {
    // Animate card content change and colors
    const tl = gsap.timeline();
    const currentColors = tabData[activeTab].colors;
    
    tl.to([contentRef.current, buttonRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(mainBgRef.current, {
      backgroundColor: currentColors.main,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to(cardRef.current, {
      backgroundColor: currentColors.card,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to(buttonRef.current, {
      backgroundColor: currentColors.button,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to(badgeRef.current, {
      backgroundColor: currentColors.badge,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to(accentRef.current, {
      color: currentColors.accent,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to(activeTabLineRef.current, {
      backgroundColor: currentColors.activeTab,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 0)
    .to([contentRef.current, buttonRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

  }, [activeTab]);

  const currentTab = tabData[activeTab];

  return (
    <div className="bg-white">

      {/* Main component */}
      <div 
        ref={containerRef}
        className="min-h-screen flex items-center justify-center p-8 font-poppins"
      >
        <div 
          ref={mainBgRef}
          className="w-[80rem] py- px-6 rounded-[4rem] mx-auto transition-colors duration-500"
          style={{ backgroundColor: currentTab.colors.main }}
        >
          <div className="flex items-center justify-between">
            {/* Left side - Text content */}
            <div className="text-white space-y-8 py-24 ml-24">
              <div 
                ref={badgeRef}
                className="inline-block px-4 py-2 font-medium rounded-full text-sm text-gray-300 transition-colors duration-500"
                style={{ backgroundColor: currentTab.colors.badge }}
              >
                Why Choose Us
              </div>

              <div>
                <h1 className="text-5xl lg:text-6xl font-light mb-4 tracking-tighter">
                  Your success<br />
                  is our number 1<br />
                  <span 
                    ref={accentRef}
                    className="transition-colors duration-500"
                    style={{ color: currentTab.colors.accent }}
                  >
                    Priority
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mt-6 tracking-tight">
                  We deliver exceptional value by<br />
                  powering modern companies through:
                </p>
              </div>

              {/* Tabs */}
              <div className="inline-flex gap-8 border-b border-gray-600 tracking-tighter">
                {tabData.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`pb-4 text-lg transition-colors relative ${
                      activeTab === index 
                        ? '' 
                        : 'text-gray-400'
                    }`}
                    style={{ color: activeTab === index ? currentTab.colors.activeTab : undefined }}
                  >
                    {tab.label}
                    {activeTab === index && (
                      <div 
                        ref={activeTabLineRef}
                        className=" transition-colors duration-500 absolute rounded-2xl bottom-0 left-0 right-0 h-[3px] transform translate-y-1/2"
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
              className="rounded-[3rem] p-10 min-h-[550px] w-[500px] flex flex-col justify-between transition-colors duration-500"
              style={{ backgroundColor: currentTab.colors.card }}
            >
              <div ref={contentRef}>
                <h2 className="text-4xl font-light text-white mb-2">
                  {currentTab.title}
                </h2>
                <p className="text-gray-200 mb-8 text-lg">
                  {currentTab.subtitle}
                </p>

                {/* Arrow pattern */}
                <div className="mb-8 flex flex-wrap gap-4">
                  {Array.from({ length: currentTab.arrows }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-black/30"
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

                <p className="text-white leading-relaxed mb-8">
                  {currentTab.description}
                </p>
              </div>

              <button 
                ref={buttonRef}
                className="font-medium px-8 py-4 rounded-full transition-all self-start text-lg hover:opacity-90"
                style={{ backgroundColor: currentTab.colors.button, color: '#1a2e2a' }}
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