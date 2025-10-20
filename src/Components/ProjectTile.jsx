import React, { useRef } from 'react';
import DirectionPad from './AnimatedArrows';

const ProjectTile = ({ project, animationEnabled }) => {
  const projectCard = useRef(null);
  const { name, description, color, url, textColor } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="overflow-hidden rounded-3xl snap-start cursor-none font-poppins"
      style={{
        maxWidth: animationEnabled ? 'calc(100vw - 2rem)' : 'calc(100vw - 4rem)',
        flex: '1 0 auto',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      }}
    >
      <div
        ref={projectCard}
        className="rounded-3xl relative p-6 flex flex-col space-y-6  max-w-full"
        style={{
          height: '22rem',
          width: '38rem',
          backgroundColor: color,
        }}
      >

        <h1 className={`text-3xl font-semibold tracking-tighter text-${textColor}`}>{name}</h1>
        <div><DirectionPad bgColor={`bg-${textColor}`}/></div>
        <p className={`text-${textColor} text-lg`}>{description}</p>
        <div
         
        />

      </div>
    </a>
  );
};

export default ProjectTile;
