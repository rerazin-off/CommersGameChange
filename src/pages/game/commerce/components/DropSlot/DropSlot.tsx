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
  // Убедимся, что currentItems всегда является массивом
  const currentItems = positions[index] || [];

  const [, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => handleDrop(index, item),
    // Добавляем canDrop для проверки, не содержится ли элемент уже в этом слоте
    canDrop: (item: { id: number }) => {
      return !currentItems.includes(item.id);
    },
  });

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  // Уникализируем элементы в слоте
  const uniqueItems = [...new Set(currentItems)];

  return (
    <div ref={dropRef} className={classes.circle}>
      {uniqueItems.map(bagId => {
        const bag = bags.find(b => b.id === bagId);
        return bag ? (
          <DraggableBag
            key={`${bag.id}-${index}`} // Добавляем индекс слота в ключ
            bag={bag}
            isInSlot={true}
          />
        ) : null;
      })}
    </div>
  );
};

export default DropSlot;