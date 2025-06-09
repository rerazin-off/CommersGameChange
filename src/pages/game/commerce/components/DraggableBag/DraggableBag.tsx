import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';
import { useRef, useEffect } from 'react';

type DraggableBagProps = {
  bag?: Bag; // Делаем пропс опциональным
  onRemove?: () => void;
  isInSlot?: boolean;
};

const DraggableBag = ({ bag, onRemove, isInSlot = false }: DraggableBagProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'bag',
    item: { id: bag?.id }, // Добавляем проверку на существование bag
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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