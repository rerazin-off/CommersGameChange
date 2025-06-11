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
  const [dragPreview, setDragPreview] = useState<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(containerRef);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || isInSlot) return;

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    setTouchOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsDraggingTouch(true);

    // Создаем уменьшенное превью для перетаскивания
    const preview = document.createElement('div');
    const img = document.createElement('img');
    img.src = bag?.image || '';
    img.alt = bag?.label || '';
    img.style.width = '50px'; // Уменьшенный размер
    img.style.height = '50px';
    img.style.objectFit = 'contain';
    preview.appendChild(img);

    preview.style.position = 'fixed';
    preview.style.left = `${touch.clientX - 25}px`; // Центрируем превью
    preview.style.top = `${touch.clientY - 25}px`;
    preview.style.zIndex = '1000';
    preview.style.pointerEvents = 'none';
    preview.style.transform = 'scale(1.2)'; // Небольшое увеличение для видимости

    document.body.appendChild(preview);
    setDragPreview(preview);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingTouch || !dragPreview || isInSlot) return;

    const touch = e.touches[0];
    dragPreview.style.left = `${touch.clientX - 25}px`;
    dragPreview.style.top = `${touch.clientY - 25}px`;
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (dragPreview) {
      document.body.removeChild(dragPreview);
      setDragPreview(null);
    }
    setIsDraggingTouch(false);
  };

  if (!bag) return null;

  return (
    <div
      ref={containerRef}
      className={`${classes.draggableContainer} ${isInSlot ? classes.inSlot : ''}`}
      style={{
        opacity: isDragging || isDraggingTouch ? 0 : 1, // Полностью скрываем оригинал при перетаскивании
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