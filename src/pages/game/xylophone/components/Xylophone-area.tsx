import React from 'react';
import { useDrop } from 'react-dnd';
import './Xylophone-styles.scss';
import XylophoneBar1 from './XylophoneBars/XylophoneBar1';
import XylophoneBar2 from './XylophoneBars/XylophoneBar2';
import XylophoneBar3 from './XylophoneBars/XylophoneBar3';
import XylophoneBar4 from './XylophoneBars/XylophoneBar4';
import XylophoneBar5 from './XylophoneBars/XylophoneBar5';
import XylophoneBar6 from './XylophoneBars/XylophoneBar6';
import XylophoneBar7 from './XylophoneBars/XylophoneBar7';
import XylophoneBar8 from './XylophoneBars/XylophoneBar8';

interface XylophoneAreaProps {
  areaId: number;
  onDrop: (item: any, areaId: number) => void;
  onRemove: (item: any, areaId: number) => void;
  onPlaySound: (keyId: number) => void;
  style?: React.CSSProperties;
  placedKey?: any;
  highlighted?: boolean;
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

const areaMainColors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#00baff",
  "#0049ff",
  "#8B00FF",
  "#FF0000",
];

const areaDarkColors = [
  "#a80202",
  "#9a4e02",
  "#9a9a03",
  "#018c01",
  "#027098",
  "#0039CC",
  "#4e0293",
  "#950101"
];

const highlightColors = [
  "#FF6B6B",
  "#FFB347",
  "#FFFACD",
  "#90EE90",
  "#87CEFA",
  "#7B68EE",
  "#DDA0DD",
  "#FF6B6B"
];

const highlightDarkColors = [
  "#FF3B3B",
  "#FF8C00",
  "#FFD700",
  "#32CD32",
  "#1E90FF",
  "#4169E1",
  "#9400D3",
  "#FF3B3B"
];

export const XylophoneArea: React.FC<XylophoneAreaProps> = ({
  areaId,
  onDrop,
  onRemove,
  onPlaySound,
  style,
  placedKey,
  highlighted = false
}) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'KEY',
    drop: (draggedItem) => onDrop(draggedItem, areaId),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
  }), [areaId, onDrop]);

  const getPlaceColor = () => {
    if (!placedKey) return "#897c7c";
    if (highlighted) return highlightColors[areaId] || "#FFD700";
    return areaMainColors[areaId] || "#44FF44";
  };

  const getDarkColor = () => {
    if (!placedKey) return "#6B5F5F";
    if (highlighted) return highlightDarkColors[areaId] || "#FFA500";
    return areaDarkColors[areaId] || "#33CC33";
  };

  const handleClick = () => {
    if (placedKey && placedKey.id && onPlaySound) {
      onPlaySound(placedKey.id);
    }
  };

  return (
    <div
      ref={dropRef}
      className={`areaStyle ${highlighted ? 'highlighted-area' : ''}`}
      style={{
        ...style,
        border: isOver ? '2px solid blue' : '1px dashed gray',
        cursor: placedKey ? 'pointer' : 'default',
        position: 'relative',
        boxShadow: highlighted ? '0 0 15px rgba(255, 215, 0, 0.8)' : 'none',
        transition: 'box-shadow 0.3s ease',
        zIndex: highlighted ? 10 : 1
      }}
    >
      {placedKey ? (
        <div 
          className="forHandleClick" 
          onClick={handleClick}
          style={{
            animation: highlighted ? 'pulse 0.5s infinite alternate' : 'none'
          }}
        >
          {(() => {
            const BarComponent = bars[(placedKey.id - 1) % 8];
            return <BarComponent color={getPlaceColor()} subcolor={getDarkColor()}/>;
          })()}
        </div>
      ) : (
        <div style={{ color: '#999', fontSize: '12px' }}>Сюда</div>
      )}
    </div>
  );
};