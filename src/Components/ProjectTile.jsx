import React, { useEffect, useRef } from 'react';

const ProjectTile = ({ project, animationEnabled }) => {
  const projectCard = useRef(null);
  const { name, description, gradient: [stop1, stop2], url } = project;

  useEffect(() => {
    const card = projectCard.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="overflow-hidden rounded-3xl snap-start cursor-none"
      style={{
        maxWidth: animationEnabled ? 'calc(100vw - 2rem)' : 'calc(100vw - 4rem)',
        flex: '1 0 auto',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      }}
    >
      <div
        ref={projectCard}
        className="rounded-3xl relative p-6 flex flex-col justify-between max-w-full transition-transform duration-300 ease-out"
        style={{
          height: '22rem',
          width: '38rem',
          background: `linear-gradient(90deg, ${stop1} 0%, ${stop2} 100%)`,
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px)',
        }}
      >
        {/* Background pattern overlay */}
        <div
          className="absolute w-full h-full top-0 left-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
          }}
        />

        {/* Top gradient overlay */}
        <div
          className="absolute top-0 left-0 w-full h-20"
          style={{
            background: `linear-gradient(180deg, ${stop1} 0%, rgba(0,0,0,0) 100%)`,
          }}
        />

        {/* Empty card area  */}
        <div
          className="absolute top-8 right-8 rounded-xl shadow-2xl bg-white/10 backdrop-blur-sm"
          style={{
            width: '16.8rem',
            height: '20rem',
            transform: 'rotate(-22.5deg) translateZ(1rem)',
          }}
        />

        {/* Project name */}
        <h1
          className="text-2xl sm:text-3xl z-10 pl-2 text-white font-bold"
          style={{ transform: 'translateZ(3rem)' }}
        >
          {name}
        </h1>

        {/* Description */}
        <h2
          className="text-lg z-10 tracking-wide font-medium text-white/90"
          style={{ transform: 'translateZ(0.8rem)' }}
        >
          {description}
        </h2>

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-32"
          style={{
            background: `linear-gradient(0deg, ${stop1} 10%, rgba(0,0,0,0) 100%)`,
          }}
        />
      </div>
    </a>
  );
};

export default ProjectTile;
