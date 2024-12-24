import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import { classNames } from '../../../helpers/classNames/classNames';
import './musical.module.scss';

interface DragAreaProps {
  imageUrl: string;
  items: string[];
  setItems: (newItems: number[]) => void;
  className?: string;
}

export default function Area(props: DragAreaProps) {
  const { imageUrl, items, setItems, className } = props;

  const onDrop = useCallback(
    (item: { index: number }) => {
      // Преобразуем индекс в строку
      const itemString = String(item.index);

      // Добавляем перетащенный элемент в список
      const updatedItems = [...items, itemString];
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

      <div>
        {items.map((item, index) => (
          <img src={item} />
        ))}
      </div>

      {/*<ul>*/}
      {/*  {items.map(index => (*/}
      {/*    <li key={index}>*/}
      {/*      <img src={} />*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
}
