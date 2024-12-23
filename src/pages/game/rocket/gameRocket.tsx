import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggebleEl from './components/DraggebleEl';
import DropArea from './components/DropArea';
import classes from './gameRocket.module.scss';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import drawing from '@/assets/img/game_assets/game-rocket-img/drawing.svg';
import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import body1 from '@/assets/img/game_assets/game-rocket-img/body1.svg';
import body2 from '@/assets/img/game_assets/game-rocket-img/body2.svg';
import body3 from '@/assets/img/game_assets/game-rocket-img/body3.svg';
import body4 from '@/assets/img/game_assets/game-rocket-img/body4.svg';
// import window1 from '@/assets/img/game_assets/game-rocket-img/window1.svg';
// import window2 from '@/assets/img/game_assets/game-rocket-img/window2.svg';
// import window3 from '@/assets/img/game_assets/game-rocket-img/window3.svg';
// import window4 from '@/assets/img/game_assets/game-rocket-img/window4.svg';
// import glass1 from '@/assets/img/game_assets/game-rocket-img/glass1.svg';
// import glass2 from '@/assets/img/game_assets/game-rocket-img/glass2.svg';
// import glass3 from '@/assets/img/game_assets/game-rocket-img/glass3.svg';
// import glass4 from '@/assets/img/game_assets/game-rocket-img/glass4.svg';

const RocketElements = [
  body1,
  body2,
  body3,
  body4,
  // window1,
  // window2,
  // window3,
  // window4,
];

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [droppedBodyIndex, setDroppedBodyIndex] = useState(null);
  const [droppedWindowIndex, setDroppedWindowIndex] = useState(null);

  function clickBtn() {
    setShowDrawing(true);
  }

  function clickDrawing() {
    setShowDrawing(false);
  }

  function moveBodyToDropArea(index) {
    if (index < 4) {
      setDroppedBodyIndex(index);
    } else {
      setDroppedWindowIndex(index);
    }
  }

  return (
    <DndProvider backend={TouchBackend}>
      <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : classes.background}>
        {showDrawing === false && (
          <div className={classes.rocketElements}>
            {RocketElements.map((src, i) => (
              <DraggebleEl key={i} src={src} index={i} moveBodyToDropArea={moveBodyToDropArea} />
            ))}
          </div>
        )}
        {showDrawing==false &&(
          <DropArea
            droppedBodySrc={droppedBodyIndex !== null ? RocketElements[droppedBodyIndex] : null}
            droppedWindowSrc={droppedWindowIndex !== null ? RocketElements[droppedWindowIndex] : null}
          />
        )};
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