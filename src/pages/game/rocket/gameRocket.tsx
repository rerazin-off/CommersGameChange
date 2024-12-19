import React, { useState } from 'react';
import classes from './gameRocket.module.scss';
import icon from '../../../assets/img/game_assets/game-rocket-img/icon.svg';
import drawing from '../../../assets/img/game_assets/game-rocket-img/drawing.svg';
import btnCheck from '../../../assets/img/game_assets/game-rocket-img/btn-check.svg';
import body1 from '../../../assets/img/game_assets/game-rocket-img/body1.svg';
import body2 from '../../../assets/img/game_assets/game-rocket-img/body2.svg';
import body3 from '../../../assets/img/game_assets/game-rocket-img/body3.svg';
import body4 from '../../../assets/img/game_assets/game-rocket-img/body4.svg';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const RocketBodies = [
  body1,
  body2,
  body3,
  body4
];

const DraggableBody = ({ src, index, moveBodyToDropArea }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'BODY',
    item: { id: src, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        moveBodyToDropArea(item.index);
      }
    }
  }));

  return (
    <img ref={dragRef} src={src}/>
  );
}

const DropArea = ({ droppedBodySrc }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: 'BODY',
    drop: () => {},
    canDrop: () => true,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  }));

  return (
    <div ref={dropRef} className={classes.dropArea}>
      {droppedBodySrc && <img src={droppedBodySrc} alt="dropped-body"/>}
    </div>
  );
}

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [droppedBodyIndex, setDroppedBodyIndex] = useState(null);

  function clickBtn() {
    setShowDrawing(true);
  }

  function clickDrawing() {
    setShowDrawing(false);
  }

  function moveBodyToDropArea(index) {
    setDroppedBodyIndex(index);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : `${classes.background}`}>
        {showDrawing === false && (
          <div className={classes.rocketElements}>
            {RocketBodies.map((src, i) => (
              <DraggableBody key={i} src={src} index={i} moveBodyToDropArea={moveBodyToDropArea} />
            ))}
          </div>
        )}
        <DropArea droppedBodySrc={droppedBodyIndex !== null ? RocketBodies[droppedBodyIndex] : null} />
        <button className={classes.btnDrawing} onClick={clickBtn}>
          <img src={icon} />
        </button>
        <button className={classes.btnCheck}>
          <img src={btnCheck} />
        </button>
        {showDrawing && (
          <div className={classes.drawing} onClick={clickDrawing}>
            <img src={drawing} />
          </div>
        )}
      </div>
    </DndProvider>
  );
};