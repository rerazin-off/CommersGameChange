import React from 'react';
import { useDragLayer } from 'react-dnd';
import classes from './Drag.module.scss';


export default function Drag()  {
  const { item, currentOffset, isDragging } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const style = {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
  };

  return (
    <div className={classes.dragLayer}>
      <div style={style}>
        <img src={item.image} alt="" className={classes.preview} />
      </div>
    </div>
  );
};


