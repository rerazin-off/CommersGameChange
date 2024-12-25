import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggebleEl from '../rocket/components/DraggebleEl/DraggebleEl';
import DropArea from '../rocket/components/DropArea/DropArea';
import { RocketElements } from '../rocket/RocketElements';
import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import classes from './gameRocket.module.scss'

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [elements, setElements] = useState(RocketElements.window);
  const [droppedEl, setDroppedEl] = useState({
    bodies:[RocketElements.src],
    windows: [],
    glass: [],
    wings:[],
    bolts:[]
  });
  let elGroups=[
    {index:'windows', el: RocketElements.window, next: RocketElements.glass},
    {index:'glass', el: RocketElements.glass, next: RocketElements.wings},
    {index:'wings', el: RocketElements.wings, next: RocketElements.bolt},
    {index:'bolts', el: RocketElements.boltGroup, next: []}
  ]

  let clickBtn = () => {
    setShowDrawing(true);
  };
  let clickDrawing = () => {
    setShowDrawing(false);
  };
  let moveElement = (id: string) => {
    for (const { index, el, next } of elGroups) {
      const foundElement = el.find(el => el.id==id);
      if (foundElement) {
        setDroppedEl(prev => ({
          ...prev,
          [index]: [foundElement.src],
        }));
        setElements(next);
      }
    }
  };
  let btnCheckView=Object.values(droppedEl).every((el)=>el.length>0);
  let checkDroppedEl = (id :string) => {
    if(droppedEl.windows!=RocketElements.correctEl[0]){
      setDroppedEl(prev=>({
        ...prev,
        windows: [],
        glass: [],
        wings: [],
        bolts:[]
      }))
      setElements(RocketElements.window);
    }
    else if(droppedEl.glass!=RocketElements.correctEl[1]){
      setDroppedEl(prev=>({
        ...prev,
        ...prev,
        glass: [],
        wings: [],
        bolts:[]
      }))
      setElements(RocketElements.glass);
    }
    else if(droppedEl.wings!=RocketElements.correctEl[2]){
      setDroppedEl(prev=>({
        ...prev,
        ...prev,
        ...prev,
        wings: [],
        bolts:[]
      }))
      setElements(RocketElements.wings);
    }
    else if(droppedEl.bolts!=RocketElements.correctEl[3]){
      setDroppedEl(prev=>({
        ...prev,
        ...prev,
        ...prev,
        ...prev,
        bolts:[]
      }))
      setElements(RocketElements.bolt);
    }
  };
  return (
    <DndProvider backend={TouchBackend}>
      <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : classes.background}>
        {!showDrawing && (
            <div className={classes.rocketElements}>
              {elements.map((el) => (
                <DraggebleEl key={el.id} src={el.src} id={el.id} moveElement={moveElement} />
              ))}
            </div>
          )}
        {showDrawing === false && (
          <DropArea
            droppedBodySrc={droppedEl.bodies}
            droppedWindowSrc={droppedEl.windows}
            droppedGlassSrc={droppedEl.glass}
            droppedWingsSrc={droppedEl.wings}
            droppedBoltSrc={[droppedEl.bolts]}
          />
        )}
        <button className={classes.btnDrawing} onClick={clickBtn}>
          <img src={icon} />
        </button>
        {showDrawing && (
          <div className={classes.drawing} onClick={clickDrawing}>
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