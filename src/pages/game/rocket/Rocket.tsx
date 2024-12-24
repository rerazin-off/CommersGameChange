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
  const [droppedEl, setDroppedEl]=useState({
    bodies:[],
    windows:[],
    glass:[],
    wings:[],
    bolts:[],
  })
  let clickBtn = () => {
    setShowDrawing(true);
  };
  let clickDrawing = () => {
    setShowDrawing(false);
  };
  let moveElement = (id: string) => {
    const updateDroppesEl=(elements:any[], key: keyof typeof droppedEl)=>{
      const element=elements.find((el)=>el.id==id);
      if (element){
        setDroppedEl((prev)=>({
          ...prev,
          [key]: [...prev[key], element.src]
        }));
        return true;
      }
    }
    if (updateDroppesEl(RocketElements.body, 'bodies')){
      setElements(RocketElements.window);
    }
    if (updateDroppesEl(RocketElements.window, 'windows')){
      setElements(RocketElements.glass);
    }
    if (updateDroppesEl(RocketElements.glass, 'glass')){
      setElements(RocketElements.wings);
    }
    if (updateDroppesEl(RocketElements.wings, 'wings')){
      setElements(RocketElements.bolt);
    }
    if (updateDroppesEl(RocketElements.bolt, 'bolts')){
      let boltGroupEl=RocketElements.boltGroup.find((group)=>group.id==id);
      setDroppedEl((prev)=>({
        ...prev,
        bolts: [boltGroupEl.src]
      }));
      setElements([]);
    }
  };
  let btnView=
    droppedEl.bodies.length> 0 &&
    droppedEl.windows.length> 0 &&
    droppedEl.glass.length> 0 &&
    droppedEl.wings.length> 0 &&
    droppedEl.bolts.length> 0;
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
            droppedBodySrc={[droppedEl.bodies]}
            droppedWindowSrc={[droppedEl.windows]}
            droppedGlassSrc={[droppedEl.glass]}
            droppedWingsSrc={[droppedEl.wings]}
            droppedBoltSrc={[droppedEl.bolts]}
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
        {btnView && (
          <button className={classes.btnCheck}>
            <img src={btnCheck} />
          </button>
        )}
      </div>
    </DndProvider>
  );
};