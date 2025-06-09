import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';
import { useRef, useState } from 'react';

type DraggableBagProps = {
  bag?: Bag;
import { useRef, useEffect } from 'react';

type DraggableBagProps = {
  bag?: Bag; // Делаем пропс опциональным
  onRemove?: () => void;
  isInSlot?: boolean;
};

const DraggableBag = ({ bag, onRemove, isInSlot = false }: DraggableBagProps) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDraggingTouch, setIsDraggingTouch] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  // Настройка DnD (для мыши)
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

  // Присоединяем DnD-реф к элементу
  drag(dragRef);

  // Обработка касания
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setTouchOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
    setIsDraggingTouch(true);
    e.preventDefault(); // Блокируем скролл страницы
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingTouch) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - touchOffset.x,
      y: touch.clientY - touchOffset.y,
    });
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDraggingTouch(false);
  };

  if (!bag) return null;

  return (
    <div
      ref={dragRef}
      className={`${classes.draggableContainer} ${isInSlot ? classes.inSlot : ''}`}
      style={{
        opacity: isDragging || isDraggingTouch ? 0.8 : 1,
        transform: isDraggingTouch
          ? `translate(${position.x}px, ${position.y}px)`
          : 'none',
        position: isDraggingTouch ? 'fixed' : 'relative',
        zIndex: isDraggingTouch ? 1000 : 'auto',
        touchAction: 'none', // Отключаем стандартное поведение браузера
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