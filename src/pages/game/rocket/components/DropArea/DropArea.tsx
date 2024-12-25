import React from 'react';
import { useDrop } from 'react-dnd';
import classes from '../DropArea/DropArea.module.scss';

export default function DropArea({ droppedBodySrc, droppedWindowSrc, droppedGlassSrc, droppedWingsSrc, droppedBoltSrc, droppedReactorSrc}) {
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: ['EL'],
    drop: () => {},
    canDrop: () => true,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div ref={dropRef} className={classes.dropArea}>
      {droppedBodySrc.map((src, i) => (
        <img key={i} src={src} className={classes.rocketBody} />
      ))}
      {droppedWindowSrc.map((src, i) => (
        <img key={i} src={src} className={classes.rocketWindow} />
      ))}
      {droppedGlassSrc.map((src, i) => (
        <img key={i} src={src} className={classes.rocketGlass} />
      ))}
      {droppedWingsSrc.map((src, i) => (
        <img key={i} src={src} className={classes.rocketWings} />
      ))}
      {droppedBoltSrc.map((src, i) => (
        <img key={i} src={src} className={classes.rocketBolts}/>
      ))}
      {droppedReactorSrc.map((src, i) => (
        <img key={i} src={src} className={classes.rocketReactor}/>
      ))}
    </div>
  );
}

