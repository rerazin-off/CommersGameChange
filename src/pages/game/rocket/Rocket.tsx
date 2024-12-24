import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggebleEl from './components/DraggebleEl';
import DropArea from './components/DropArea';
import { RocketElements } from './components/RocketElements';
import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import drawing from '@/assets/img/game_assets/game-rocket-img/drawing.svg';
import classes from './gameRocket.module.scss'

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [elements, setElements] = useState(RocketElements.body);
  const [droppedBodies, setDroppedBodies] = useState([]);
  const [droppedWindows, setDroppedWindows] = useState([]);
  const [droppedGlass, setDroppedGlass] = useState([]);
  const [droppedWings, setDroppedWings] = useState([]);
  const [droppedBolt, setDroppedBolt]=useState([]);

  let clickBtn = () => {
    setShowDrawing(true);
  };
  let clickDrawing = () => {
    setShowDrawing(false);
  };
  let moveElement = (id: string) => {
    const bodyElement = RocketElements.body.find(element => element.id==id);
    if (bodyElement) {
      setDroppedBodies([bodyElement.src]);
      setElements(RocketElements.window);
    }
    const windowElement = RocketElements.window.find(element => element.id==id);
    if (windowElement) {
      setDroppedWindows([windowElement.src]);
      setElements(RocketElements.glass);
    }
    const glassElement = RocketElements.glass.find(element => element.id==id);
    if (glassElement) {
      setDroppedGlass([glassElement.src]);
      setElements(RocketElements.wings);
    }
    const wingsElement = RocketElements.wings.find(element => element.id==id);
    if (wingsElement) {
      setDroppedWings([wingsElement.src]);
      setElements(RocketElements.bolt);
    }
    const boltElement = RocketElements.bolt.find(element => element.id==id);
    if (boltElement) {
      const boltGroupEl=RocketElements.boltGroup.find(group=>group.id==boltElement.id);
      setDroppedBolt(boltGroupEl.src);
      setElements([]);
    }
  };
  let btnCheckView=
    droppedBodies.length>0 &&
    droppedWindows.length>0 &&
    droppedGlass.length>0 &&
    droppedWings.length>0 &&
    droppedBolt.length>0;
  let checkDroppedEl = () => {
    const a=RocketElements.correctEl;
    console.log(droppedBodies);
    console.log(a);
  }
  return (
    <DndProvider backend={TouchBackend}>
      <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : classes.background}>
        {showDrawing === false && (
          <div className={classes.rocketElements}>
            {elements.map((el) => (
              <DraggebleEl key={el.id} src={el.src} id={el.id} moveElement={moveElement} />
            ))}
          </div>
        )}
        {showDrawing === false && (
          <DropArea
            droppedBodySrc={droppedBodies}
            droppedWindowSrc={droppedWindows}
            droppedGlassSrc={droppedGlass}
            droppedWingsSrc={droppedWings}
            droppedBoltSrc={[droppedBolt]}
          />
        )}
        <button className={classes.btnDrawing} onClick={clickBtn}>
          <img src={icon} />
        </button>
        {showDrawing && (
          <div className={classes.drawing} onClick={clickDrawing}>
            <img src={drawing} />
          </div>
        )}
        {btnCheckView && (
          <button className={classes.btnCheck} onClick={checkDroppedEl}>
            <img src={btnCheck} />
            <h5>ПРОВЕРИТЬ</h5>
          </button>
        )}
      </div>
    </DndProvider>
  );
};