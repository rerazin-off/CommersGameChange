import { useDrop } from 'react-dnd';
import { bags } from '../../contstans';
import { DraggableBag } from '../index';
import classes from './DropSlot.module.scss';
import { useRef, useEffect } from 'react';

type DropSlotProps = {
  index: number;
  handleDrop: (index: number | null, item: { id: number }) => void;
  positions: number[][];
};

const DropSlot = ({ index, handleDrop, positions }: DropSlotProps) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const currentItems = positions[index] || [];

  const [, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => handleDrop(index, item),
    canDrop: (item: { id: number }) => {
      // Запрещаем дроп, если элемент уже есть в этом слоте
      return !currentItems.includes(item.id);
    },
  });

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  // Убираем дубликаты
  const uniqueItems = Array.from(new Set(currentItems));

  return (
    <div
      ref={dropRef}
      className={classes.circle}
      data-drop-target="true" // Для улучшенного определения drop-целей
    >
      {uniqueItems.map(bagId => {
        const bag = bags.find(b => b.id === bagId);
        return bag ? (
          <DraggableBag
            key={`${bag.id}-${index}`}
            bag={bag}
            isInSlot={true}
          />
        ) : null;
      })}
    </div>
  );
};

export default DropSlot;