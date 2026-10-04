import React from 'react';
import type { GhostElements as GhostElementType } from '../interfaces/interfaces';

interface Props {
  ghost: GhostElementType | null;
}

export const GhostElement = ({ ghost }: Props) => {
  if (!ghost || !ghost.visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${ghost.x}px`,
        top: `${ghost.y}px`,
        width: '125px',
        height: '125px',
        zIndex: 1000,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={ghost.src}
        alt={ghost.alt}
        draggable={false}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default GhostElement;