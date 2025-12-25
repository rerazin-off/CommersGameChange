import React from 'react';

type InstrumentName = 'pipe' | 'drum' | 'flute' | 'contrabass' | 'guitar';

interface UniDarkSvgProps {
  instrument: InstrumentName;
  onClick?: () => void;
  className?: string;
  width?: string;
  height?: string;
  highlighted?: boolean;
  isUsed?: boolean;
}

import PipeSvg from './pipe';
import DrumSvg from './drum';
import FluteSvg from './flute';
import ContrabassSvg from './contrabass'
import GuitarSvg from './guitar'

const UniDarkSvg: React.FC<UniDarkSvgProps> = ({
  instrument,
  onClick,
  className = '',
  width = '10vw',
  height = '45vh',
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
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <InstrumentComponent
        width={undefined}
        height={undefined}
        highlighted={highlighted}
      />
    </div>
  );
};

export default UniDarkSvg;
