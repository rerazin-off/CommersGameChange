import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';

type DraggableBagProps = {
  bag?: Bag;
  onRemove?: () => void;
  isInSlot?: boolean;
};

const DraggableBag = ({ bag, onRemove, isInSlot = false }: DraggableBagProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingTouch, setIsDraggingTouch] = useState(false);
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(containerRef);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    setTouchOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsDraggingTouch(true);

    // Фиксируем начальную позицию
    containerRef.current.style.position = 'fixed';
    containerRef.current.style.left = `${rect.left}px`;
    containerRef.current.style.top = `${rect.top}px`;
    containerRef.current.style.zIndex = '1000';
    containerRef.current.style.width = `${rect.width}px`;
    containerRef.current.style.height = `${rect.height}px`;

    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingTouch || !containerRef.current) return;

    const touch = e.touches[0];
    const newX = touch.clientX - touchOffset.x;
    const newY = touch.clientY - touchOffset.y;

    containerRef.current.style.left = `${newX}px`;
    containerRef.current.style.top = `${newY}px`;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDraggingTouch(false);
    if (containerRef.current) {
      containerRef.current.style.position = '';
      containerRef.current.style.left = '';
      containerRef.current.style.top = '';
      containerRef.current.style.zIndex = '';
      containerRef.current.style.width = '';
      containerRef.current.style.height = '';
    }
  };

  if (!bag) return null;

  return (
    <div
      ref={containerRef}
      className={`${classes.draggableContainer} ${isInSlot ? classes.inSlot : ''}`}
      style={{
        opacity: isDragging || isDraggingTouch ? 0.8 : 1,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={bag.image}
        alt={bag.label}
        className={classes.bagImage}
        draggable={false}
      />
      {onRemove && (
        <button
          className={classes.removeButton}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default DraggableBag;