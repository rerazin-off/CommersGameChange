import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
  isMatched?: boolean;
  style?: React.CSSProperties;
  isCorrect?: boolean;
  onClick?: () => void;
  onInfoClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
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
                                               style = {},
                                               onClick = () => {},
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
      onClick={onClick}
      style={{
        height: '220px',
        width: '220px',
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
          borderRadius: '16px',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default ImageCard;