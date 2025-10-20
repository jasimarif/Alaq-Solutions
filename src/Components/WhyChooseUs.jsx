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
    arrows: 15
  },
  {
    id: 'strategies',
    label: 'Strategies',
    title: 'Strategies',
    subtitle: 'Built for complexity',
    description: "We develop customized strategies aligned with your business goals, leveraging proven methodologies and industry best practices to ensure optimal outcomes. Our approach combines innovation with practical execution.",
    buttonText: 'For Strategies',
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

export default function ScrollTabsComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    
    // Create scroll trigger for tab progression
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
        
        // Unlock scroll when reaching the end
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
    // Animate card content change
    const tl = gsap.timeline();
    
    tl.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in'
    })
    .set(contentRef.current, {
      // Content will be updated by React
    })
    .to(contentRef.current, {
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
        className="min-h-screen  flex items-center justify-center p-8 font-poppins"
      >
        <div className="bg-darkGreen w-[80rem] py-6 px-8 rounded-[4rem] mx-auto">
          <div className="flex items-center justify-between ">
            {/* Left side - Text content */}
            <div className="text-white space-y-8 py-24 ml-24" >
              <div className="inline-block px-4 py-2 bg-[#2a4a3f] font-medium rounded-full text-sm text-gray-300">
                Why Choose Us
              </div>

              <div>
                <h1 className="text-5xl lg:text-6xl font-light mb-4 tracking-tighter">
                  Your success<br />
                  is our number 1<br />
                  <span className="text-[#a8c5a0]">Priority</span>
                </h1>
                <p className="text-xl text-gray-300 mt-6">
                  We deliver exceptional value by<br />
                  powering modern companies through:
                </p>
              </div>

              {/* Tabs */}
              <div className="inline-flex gap-8 border-b border-gray-600">
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
              className="bg-[#6b8573] rounded-[3rem] p-10 min-h-[580px] w-[500px] flex flex-col justify-between"
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