import React from 'react';

type InstrumentName = 'pipe' | 'drum' | 'flute' | 'contrabass' | 'guitar';

interface UniDarkSvgProps {
  instrument: InstrumentName;
  onClick?: () => void;
  className?: string;
  width?: number;
  height?: number;
  highlighted?: boolean;
  isUsed?: boolean;
}

import PipeSvg from './color-pipe';
import DrumSvg from './color-drum';
import FluteSvg from './color-flute';
import ContrabassSvg from './color-contrabass'
import GuitarSvg from './color-guitar'

const UniColorSvg: React.FC<UniDarkSvgProps> = ({ 
  instrument, 
  onClick, 
  className = '', 
  width = 125,
  height = 316,
  highlighted = false,
  isUsed = false
}) => {
  
  const instrumentComponents: Record<InstrumentName, React.FC<{ width?: number; height?: number; highlighted?: boolean }>> = {
    pipe: (props) => <PipeSvg {...props} />,
    drum: (props) => <DrumSvg {...props} />,
    flute: (props) => <FluteSvg {...props} />,
    contrabass: (props) => <ContrabassSvg {...props} />,
    guitar: (props) => <GuitarSvg {...props} />
  };

  const InstrumentComponent = instrumentComponents[instrument];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick && !isUsed) onClick();
  };

  return (
    <div 
      className={`instrument-svg-wrapper ${className} ${isUsed ? 'used' : ''} ${highlighted ? 'highlighted' : ''}`}
      onClick={handleClick}
      style={{
        cursor: isUsed ? 'not-allowed' : 'pointer',
        opacity: isUsed ? 0.5 : 1,
        pointerEvents: isUsed ? 'none' : 'auto',
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <InstrumentComponent 
        width={width} 
        height={height}
        highlighted={highlighted}
      />
    </div>
  );
};

export default UniColorSvg;