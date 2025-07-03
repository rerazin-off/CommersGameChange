import { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';

type DraggableBagProps = {
  bag?: Bag;
  isInSlot?: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
  onDragEnd?: () => void;
  onRemove?: () => void;
};

const DraggableBag = ({
                        bag,
                        isInSlot = false,
                        isCorrect = false,
                        disabled = false,
                        onDragEnd,
                        onRemove,
                      }: DraggableBagProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingTouch, setIsDraggingTouch] = useState(false);
  const [isDraggingLocal, setIsDraggingLocal] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id },
    end: (item, monitor) => {
      if (monitor.didDrop() && onDragEnd) {
        onDragEnd();
      }
      setIsDraggingLocal(false);
      removePreview(); // Гарантированное удаление превью
    },
    canDrag: !disabled,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Создание и управление превью для touch-событий
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

  // Инициализация drag и preview
  useEffect(() => {
    if (containerRef.current) {
      drag(containerRef.current);
      preview(containerRef.current, { captureDraggingState: true });
    }
    return removePreview; // Очистка при размонтировании
  }, [drag, preview]);

  useEffect(() => {
    setIsDraggingLocal(isDragging || isDraggingTouch);
  }, [isDragging, isDraggingTouch]);

  // Обработчики touch-событий
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || isInSlot || disabled) return;
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
      className={`${classes.draggableContainer} 
        ${isInSlot ? classes.inSlot : ''} 
        ${isCorrect ? classes.correct : ''}
        ${disabled ? classes.disabled : ''}
        ${isDraggingLocal ? classes.dragging : ''}`}
      style={{
        opacity: isDraggingLocal ? 0 : 1, // Прячем оригинал при перетаскивании
        cursor: disabled ? 'not-allowed' : 'grab',
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