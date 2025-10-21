import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tabData = [
  {
    id: 'mid-market',
    label: 'Mid-Market',
    title: 'Mid-Market',
    subtitle: 'Scale with confidence',
    description: "The power of an ERP, with none of the legacy baggage. Campfire gives mid-market finance & accounting teams an intuitive platform for audit-readiness, multi-entity consolidations, close management, and financial reporting. Everything you need for your next phase of growth, on a platform you'll actually enjoy using.",
    buttonText: 'For Mid-Market',
    arrows: 15
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    title: 'Enterprise',
    subtitle: 'Built for complexity',
    description: "Handle the most demanding financial operations with ease. Our enterprise solution provides advanced automation, real-time consolidations across unlimited entities, and compliance-ready reporting. Scale from hundreds to thousands of entities without compromising performance or control.",
    buttonText: 'For Enterprise',
    arrows: 20
  },
  {
    id: 'partners',
    label: 'Partners',
    title: 'Partners',
    subtitle: 'Grow together',
    description: "Join our ecosystem of accounting firms, consultants, and technology partners. Access dedicated support, co-marketing opportunities, and revenue share programs. Help your clients succeed while building a thriving partnership with Campfire.",
    buttonText: 'Partner With Us',
    arrows: 12
  }
];

const WhyChooseUsFade = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevTab, setPrevTab] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
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
          setPrevTab(activeTab);
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
    const isScrollingDown = activeTab > prevTab;
    const tl = gsap.timeline();
    
    if (isScrollingDown) {
      tl.to(cardRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.4,
        ease: 'power2.in'
      })
      .set(cardRef.current, {
        y: 100
      })
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      tl.to(cardRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.4,
        ease: 'power2.in'
      })
      .set(cardRef.current, {
        y: -100
      })
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    }

  }, [activeTab, prevTab]);

  const currentTab = tabData[activeTab];

  return (
    <div className="bg-white">

      {/* Main component */}
      <div 
        ref={containerRef}
        className="min-h-screen  flex items-center justify-center p-8"
      >
        <div className="bg-darkGreen w-[85rem] px-10 py-5 rounded-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-white space-y-8">
              <div className="inline-block px-4 py-2 bg-[#2a4a3f] rounded-full text-sm text-gray-300">
                Solutions
              </div>

              <div>
                <h1 className="text-5xl lg:text-6xl font-light mb-4">
                  Built for your<br />
                  next stage of<br />
                  <span className="text-[#a8c5a0]">growth.</span>
                </h1>
                <p className="text-xl text-gray-300 mt-6">
                  The next-gen financial platform<br />
                  powering modern companies.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-gray-600">
                {tabData.map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`pb-4 text-lg transition-colors relative ${
                      activeTab === index 
                        ? 'text-[#a8c5a0]' 
                        : 'text-gray-400'
                    }`}
                  >
                    {tab.label}
                    {activeTab === index && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#a8c5a0]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Card */}
            <div 
              ref={cardRef}
              className="bg-[#6b8573] rounded-3xl p-10 min-h-[500px] flex flex-col justify-between"
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
                      className="w-6 h-6 text-[#2a4a3f] opacity-60"
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

              <button className="bg-[#c5e5b4] hover:bg-[#b5d5a4] text-[#1a2e2a] font-medium px-8 py-4 rounded-full transition-colors self-start text-lg">
                {currentTab.buttonText}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

     
  );
}

export default WhyChooseUsFade;