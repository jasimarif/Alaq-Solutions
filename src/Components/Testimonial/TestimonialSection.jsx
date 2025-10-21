import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const words = textRef.current.querySelectorAll('.word');

    if (!words.length) return;

    gsap.set(words, { color: '#ffffff' });

    gsap.fromTo(textRef.current,
      {
        scale: 0.5,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      }
    });

    words.forEach((word, index) => {
      const startTime = index * 0.02;
      tl.to(word, {
        color: '#60a5fa',
        duration: 0.1,
        ease: 'none'
      }, startTime);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const testimonialText = `We migrated from Sage Intacct to Campfire to accelerate our close process. It's the only solution in the market that is modern, yet has the power to support our global operations across multiple legal entities and currencies.`;

  const words = testimonialText.split(' ');

  return (
    <div ref={containerRef} className="h-screen flex items-center pl-28 p-8 bg-[#1a202c] font-poppins">
      <div className="max-w-6xl w-full">
        <div className="">
          <h2
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-16 text-center tracking-tight"
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
                  src={null}
                  alt="Jasim Arif Ali"
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
                <span className="text-sm text-gray-300 font-medium">OaksVille</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">Jasim Arif Ali</h3>
              <p className="text-gray-300">CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;