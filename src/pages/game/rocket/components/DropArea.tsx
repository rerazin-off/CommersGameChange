import { useDrop } from 'react-dnd';
import React from 'react';
import classes from '../gameRocket.module.scss';

export default function DropArea ({ droppedBodySrc, droppedWindowSrc }) {
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: ['BODY', 'WINDOW'], // Триггер для двух типов
    drop: () => {},
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  }));

  return (
    <div ref={dropRef} className={classes.dropArea}>
      {droppedBodySrc && <img src={droppedBodySrc} alt="dropped-body" className={classes.rocketPart} />}
      {droppedWindowSrc && <img src={droppedWindowSrc} alt="dropped-window" className={classes.rocketWindow} />}
    </div>
  );
}