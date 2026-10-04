import React, { useState } from 'react';
import {ImageCardProps} from '../interfaces/interfaces';

export const ImageCards: React.FC<ImageCardProps> = ({
  src,
  alt,
  draggable = false,
  onDragStart = () => {},
  onDrop = () => {},
  onDragOver = () => {},
  onTouchStart = () => {},
  onTouchMove = () => {},
  onTouchEnd = () => {},
  isMatched = false,
  isCorrect = true,
  style = {}
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        height: '125px',
        width: '125px',
        position: 'relative',
        margin: '15px',
        cursor: draggable ? 'grab' : 'default',
        opacity: isMatched ? 0.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        touchAction: 'none',
        ...style
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          WebkitUserDrag: 'none',
        }}
      />
    </div>
  );
};