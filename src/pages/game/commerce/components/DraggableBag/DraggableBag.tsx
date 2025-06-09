import { useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';

type DraggableBagProps = {
  bag?: Bag;
import { useRef, useEffect } from 'react';

type DraggableBagProps = {
  bag?: Bag; // Делаем пропс опциональным
  onRemove?: () => void;
  isInSlot?: boolean;
};

const DraggableBag = ({ bag, onRemove, isInSlot = false }: DraggableBagProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingTouch, setIsDraggingTouch] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  // Настройка drag-and-drop для мыши
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id },
  const imgRef = useRef<HTMLImageElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id }, // Добавляем проверку на существование bag
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(containerRef);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setTouchOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsDraggingTouch(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingTouch || !containerRef.current) return;

    const touch = e.touches[0];
    const newX = touch.clientX - touchOffset.x;
    const newY = touch.clientY - touchOffset.y;

    setPosition({ x: newX, y: newY });
    containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDraggingTouch(false);
    if (containerRef.current) {
      containerRef.current.style.transform = 'none';
    }
  };

  if (!bag) return null;

  return (
    <div
      ref={containerRef}
      className={`${classes.draggableContainer} ${isInSlot ? classes.inSlot : ''}`}
      style={{
        opacity: isDragging || isDraggingTouch ? 0.8 : 1,
        position: isDraggingTouch ? 'fixed' : 'relative',
        zIndex: isDraggingTouch ? 1000 : 'auto',
        left: isDraggingTouch ? `${position.x}px` : 'auto',
        top: isDraggingTouch ? `${position.y}px` : 'auto',
        touchAction: 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
  useEffect(() => {
    if (imgRef.current) {
      preview(imgRef.current, {
        offsetX: 10,
        offsetY: 10,
      });
    }
  }, [preview]);

  if (!bag) return null; // Если bag не передан, не рендерим компонент

  return (
    <div
      ref={drag}
      className={`${classes.draggableContainer} ${isInSlot ? classes.inSlot : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        ref={imgRef}
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