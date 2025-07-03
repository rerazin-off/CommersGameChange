import React from 'react';
import PropTypes from 'prop-types';

interface ImageCardProps {
  src: string;
  alt: string;
  number?: number;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  isMatched?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
                                               src,
                                               alt,
                                               number,
                                               draggable = false,
                                               onDragStart = () => {},
                                               onDrop = () => {},
                                               onDragEnd = () => {},
                                               isMatched = false,
                                               style = {},
                                               className = '',
                                             }) => {
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      onDragOver={handleDragOver}
      style={{
        cursor: draggable ? 'grab' : 'default',
        position: 'relative',
        ...style
      }}
      className={className}
      aria-dropeffect={draggable ? "move" : undefined}
      aria-grabbed={draggable ? "false" : undefined}
    >
      <img
        src={src}
        alt={alt}
        id={number?.toString()}
        draggable="false"
        style={{
          maxWidth: '85%',
          maxHeight: '85%',
          objectFit: 'contain',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  number: PropTypes.number,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  isMatched: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default ImageCard;