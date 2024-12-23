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
  const [droppedBodies, setDroppedBodies] = useState<string[]>([]);
  const [droppedWindows, setDroppedWindows] = useState<string[]>([]);
  const [droppedGlass, setDroppedGlass] = useState<string[]>([]);
  const [droppedWings, setDroppedWings] = useState<string[]>([]);
  const [droppedBolt, setDroppedBolt]=useState<string[]>([]);

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
      return;
    }
    const windowElement = RocketElements.window.find(element => element.id==id);
    if (windowElement) {
      setDroppedWindows([windowElement.src]);
      setElements(RocketElements.glass);
      return;
    }
    const glassElement = RocketElements.glass.find(element => element.id==id);
    if (glassElement) {
      setDroppedGlass([glassElement.src]);
      setElements(RocketElements.wings);
      return;
    }
    const wingsElement = RocketElements.wings.find(element => element.id==id);
    if (wingsElement) {
      setDroppedWings([wingsElement.src]);
      setElements(RocketElements.bolt);
      return;
    }
    const boltElement = RocketElements.bolt.find(element => element.id==id);
    if (boltElement) {
      const boltGroupEl=RocketElements.boltGroup.find(group=>group.id==boltElement.id);
      setDroppedBolt(boltGroupEl.src);
      setElements([]);
    }
  };
  return (
    <DndProvider backend={TouchBackend}>
      <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : classes.background}>
        {showDrawing === false && (
          <div className={classes.rocketElements}>
            {elements.map((el, i) => (
              <DraggebleEl key={el.id} src={el.src} id={el.id} moveElement={moveElement} />
            ))}
          </div>
        )}
        {showDrawing === false && (
          <DropArea
            droppedBodySrc={droppedBodies}
            droppedWindowSrc={[droppedWindows]}
            droppedGlassSrc={[droppedGlass]}
            droppedWingsSrc={[droppedWings]}
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
        <button className={classes.btnCheck}>
          <img src={btnCheck} />
        </button>
      </div>
    </DndProvider>
  );
};