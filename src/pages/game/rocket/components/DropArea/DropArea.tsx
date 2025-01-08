import React from 'react';
import { useDrop } from 'react-dnd';
import classes from '../DropArea/DropArea.module.scss';
import { classNames } from 'src/helpers/classNames/classNames';

export default function DropArea({ droppedBodySrc, droppedUpperPartSrc, droppedWindowSrc, droppedGlassSrc, droppedWingsSrc, droppedBoltSrc, droppedReactorSrc}) {
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: ['EL'],
    drop: () => {},
    canDrop: () => true,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const renderImgs=(srcArray: string[], className: string)=>
    srcArray.map((src,i)=><img key={i} src={src} className={className} alt="" />);

  return (
    <div ref={dropRef} className={classes.dropArea}>
      {renderImgs(droppedBodySrc,classes.rocketBody)}
      {renderImgs(droppedUpperPartSrc,classes.rocketUpPart)}
      {renderImgs(droppedWindowSrc,classes.rocketWindow)}
      {renderImgs(droppedGlassSrc,classes.rocketGlass)}
      {renderImgs(droppedWingsSrc,classes.rocketWings)}
      {renderImgs(droppedBoltSrc,classes.rocketBolts)}
      {renderImgs(droppedReactorSrc,classes.rocketReactor)}
    </div>
  );
}

