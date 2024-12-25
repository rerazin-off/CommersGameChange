import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggebleEl from '../rocket/components/DraggebleEl/DraggebleEl';
import DropArea from '../rocket/components/DropArea/DropArea';
import { RocketElements } from '../rocket/RocketElements';
import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import btnClose from '@/assets/img/game_assets/game-rocket-img/btnClose.svg'
import classes from './gameRocket.module.scss'

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [elements, setElements] = useState(RocketElements.window);
  const [droppedEl, setDroppedEl] = useState({
    bodies:[RocketElements.src],
    windows: [],
    glass: [],
    wings:[],
    bolts:[],
    reactors: []
  });
  let elGroups=[
    {index:'windows', el: RocketElements.window, next: RocketElements.glass},
    {index:'glass', el: RocketElements.glass, next: RocketElements.wings},
    {index:'wings', el: RocketElements.wings, next: RocketElements.bolt},
    {index:'bolts', el: RocketElements.boltGroup, next: RocketElements.reactor},
    {index:'reactors', el: RocketElements.reactor, next: []}
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
  let btnCheckView=Object.values(droppedEl).every((el)=>el.length>0)
  let checkDroppedEl = () => {
    const filteredDroppedEl = {
      bodies: droppedEl.bodies.filter(src => RocketElements.correctEl.includes(src)),
      windows: droppedEl.windows.filter(src => RocketElements.correctEl.includes(src)),
      glass: droppedEl.glass.filter(src => RocketElements.correctEl.includes(src)),
      wings: droppedEl.wings.filter(src => RocketElements.correctEl.includes(src)),
      bolts: droppedEl.bolts.filter(src => RocketElements.correctEl.includes(src)),
      reactors: droppedEl.reactors.filter(src => RocketElements.correctEl.includes(src)),
    };
    setDroppedEl(filteredDroppedEl);
    if (filteredDroppedEl.windows.length<1){
      setElements(RocketElements.window)
    }
    else if (filteredDroppedEl.glass.length<1){
      setElements(RocketElements.glass)
    }
    else if (filteredDroppedEl.wings.length<1){
      setElements(RocketElements.wings)
    }
    else if (filteredDroppedEl.bolts.length<1){
      setElements(RocketElements.bolt)
    }
    else if (filteredDroppedEl.reactors.length<1){
      setElements(RocketElements.reactor)
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
            droppedReactorSrc={droppedEl.reactors}
          />
        )}
        <button className={classes.btnDrawing} onClick={clickBtn}>
          <img src={icon} />
        </button>
        {showDrawing && (
          <div className={`${classes.drawing} ${classes.jcE}`} >
            <img src={btnClose} className={classes.close} onClick={clickDrawing}/>
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