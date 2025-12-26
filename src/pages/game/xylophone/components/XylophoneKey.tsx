import React from 'react';
import { useDrag } from 'react-dnd';
import './Xylophone-styles.scss';
import XylophoneBar1 from './XylophoneBars/XylophoneBar1';
import XylophoneBar2 from './XylophoneBars/XylophoneBar2';
import XylophoneBar3 from './XylophoneBars/XylophoneBar3';
import XylophoneBar4 from './XylophoneBars/XylophoneBar4';
import XylophoneBar5 from './XylophoneBars/XylophoneBar5';
import XylophoneBar6 from './XylophoneBars/XylophoneBar6';
import XylophoneBar7 from './XylophoneBars/XylophoneBar7';
import XylophoneBar8 from './XylophoneBars/XylophoneBar8';

interface XylophoneKeyProps {
  keyData: { id: number; name: string };
  isUsed?: boolean;
  highlighted?: boolean;
  onPlaySound: (keyId: number) => void;
}

const bars = [
  XylophoneBar1,
  XylophoneBar2,
  XylophoneBar3,
  XylophoneBar4,
  XylophoneBar5,
  XylophoneBar6,
  XylophoneBar7,
  XylophoneBar8
];

const XylophoneKey: React.FC<XylophoneKeyProps> = ({
  keyData,
  isUsed = false,
  highlighted = false,
  onPlaySound
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'KEY',
    item: { ...keyData },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    canDrag: !isUsed,
  }), [isUsed, keyData]);

  const BarComponent = bars[(keyData.id - 1) % 8];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isUsed && onPlaySound) onPlaySound(keyData.id);
  };

  return (
    <div
      onClick={handleClick}
      ref={drag}
      className={`xylophone-key ${highlighted ? 'highlighted' : ''}`}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: isUsed ? 'not-allowed' : 'grab',
        display: isUsed ? 'none' : 'block',
        pointerEvents: isUsed ? 'none' : 'auto'
      }}
    >
      <BarComponent color={highlighted ? '#FFD700' : '#C0C0C0'} />
    </div>
  );
};

export default XylophoneKey;
