import { useDrop } from 'react-dnd';
import React, { useCallback, useState } from 'react';

export default function Area({ imageUrl, items, setItems }) {
  const [droppedItemIds, setDroppedItemIds] = useState(items);

  const onDrop = useCallback(
    item => {
      setDroppedItemIds(prevItems => [...prevItems, item.id]); // обновляем список сброшенных элементов
      setItems(droppedItemIds); // передаем изменения родительскому компоненту
    },
    [setDroppedItemIds]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'INSTR',
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }), // проверяем, находится ли курсор над элементом
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <img src={imageUrl} alt="Область" />
      <ul>
        {droppedItemIds.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
}
