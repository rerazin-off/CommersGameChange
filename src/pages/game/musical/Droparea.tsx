import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { classNames } from '../../../helpers/classNames/classNames';
import './musical.module.scss';

interface DragAreaProps {
  imageUrl: string;
  items: number[];
  setItems: (newItems: number[]) => void;
  className?: string;
}

export default function Area(props: DragAreaProps) {
  const { imageUrl, items, setItems, className } = props;

  const onDrop = useCallback(
    (item: { index: number }) => {
      // Добавляем перетащенный элемент в список
      const updatedItems = [...items, item.index];
      setItems(updatedItems); // Обновляем в родительском состоянии
    },
    [items, setItems]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'INSTR',
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={classNames(
        'drop-area',
        { 'is-over': isOver, 'can-drop': canDrop },
        [className]
      )}
    >
      <img src={imageUrl} alt="Область" />
      <ul>
        {items.map((id, index) => (
          <li key={index}>{`Инструмент ${id + 1}`}</li>
        ))}
      </ul>
    </div>
  );
}
