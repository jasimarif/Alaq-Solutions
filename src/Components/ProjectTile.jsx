import React, { useRef } from 'react';

const ProjectTile = ({ project, animationEnabled }) => {
  const projectCard = useRef(null);
  const { name, description, color, url } = project;

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
        className="rounded-3xl relative p-6 flex flex-col justify-between max-w-full"
        style={{
          height: '22rem',
          width: '38rem',
          backgroundColor: color,
        }}
      >
        <div
         
        />

      </div>
    </a>
  );
};

export default ProjectTile;
