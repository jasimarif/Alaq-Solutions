import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll('.word');

    gsap.set(words, { color: 'rgba(209, 213, 219, 0.2)' }); 

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      }
    });

    tl.to(words, {
      color: '#ffffff',
      duration: 0.5,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const testimonialText = `We migrated from Sage Intacct to Campfire to accelerate our close process. It's the only solution in the market that is modern, yet has the power to support our global operations across multiple legal entities and currencies.`;

  const words = testimonialText.split(' ');

  return (
    <div ref={containerRef} className="h-screen flex items-center pl-28 p-8 bg-darkGreen font-poppins">
      <div className="max-w-6xl w-full">
        <div className="">
          <h2
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-16 text-center"
          >
            {words.map((word, index) => (
              <span key={index} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h2>

          <div className="flex items-center justify-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40"></div>
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                  alt="Andrea Burton"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
                <span className="text-sm text-gray-500 font-medium">Delphia</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Andrea Burton, CPA</h3>
              <p className="text-gray-600">Director of Finance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;