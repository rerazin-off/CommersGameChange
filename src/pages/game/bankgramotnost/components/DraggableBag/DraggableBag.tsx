import { useRef, useState, useEffect } from 'react';
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
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingTouch, setIsDraggingTouch] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => {
      // Гарантированное удаление превью при любом завершении перетаскивания
      removePreview();
    }
  }));

  const createPreview = (x: number, y: number) => {
    if (!bag || isInSlot) return;

    const preview = document.createElement('div');
    preview.className = classes.dragPreview;

    const img = document.createElement('img');
    img.src = bag.image;
    img.alt = bag.label;
    preview.appendChild(img);

    preview.style.left = `${x - 25}px`;
    preview.style.top = `${y - 25}px`;

    document.body.appendChild(preview);
    previewRef.current = preview;
  };

  const removePreview = () => {
    if (previewRef.current && document.body.contains(previewRef.current)) {
      document.body.removeChild(previewRef.current);
    }
    previewRef.current = null;
    setIsDraggingTouch(false);
  };

  const updatePreviewPosition = (x: number, y: number) => {
    if (previewRef.current) {
      previewRef.current.style.left = `${x - 25}px`;
      previewRef.current.style.top = `${y - 25}px`;
    }
  };

  useEffect(() => {
    return () => {
      // Очистка при размонтировании компонента
      removePreview();
    };
  }, []);

  drag(containerRef);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || isInSlot) return;
    const touch = e.touches[0];
    createPreview(touch.clientX, touch.clientY);
    setIsDraggingTouch(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingTouch || !previewRef.current) return;
    const touch = e.touches[0];
    updatePreviewPosition(touch.clientX, touch.clientY);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    removePreview();
  };

  if (!bag) return null;

  return (
    <div
      ref={containerRef}
      className={`${classes.draggableContainer} ${isInSlot ? classes.inSlot : ''}`}
      style={{
        opacity: isDragging || isDraggingTouch ? 0 : 1,
        touchAction: 'none',
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