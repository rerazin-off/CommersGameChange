import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggebleEl from '../rocket/components/DraggebleEl/DraggebleEl';
import DropArea from '../rocket/components/DropArea/DropArea';
import { RocketElements } from '../rocket/RocketElements';
import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import btnClose from '@/assets/img/game_assets/game-rocket-img/btnClose.svg';
import fire from '@/assets/img/game_assets/game-rocket-img/fire.svg';
import confetti from '@/assets/img/game_assets/game-rocket-img/confetti.svg';
import classes from './gameRocket.module.scss';

type ElementsRocket = {
  index: string,
  el:  Array<{ id: string, src: any }>
}
const initialState = [
  {index:'windows', el: RocketElements.window},
  {index:'glass', el: RocketElements.glass},
  {index:'wings', el: RocketElements.wings},
  {index:'bolts', el: RocketElements.bolt},
  {index:'reactors', el: RocketElements.reactor},
  {index:'last', el:[]}
]
export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState(false);
  const [elements1, setElements1] = useState<Array<ElementsRocket>>(initialState);
  const [answer, setAnswer] = useState<Array<string>>([]);
  const [droppedEl, setDroppedEl] = useState({
    bodies:[RocketElements.src],
    windows: [],
    glass: [],
    wings:[],
    bolts:[],
    reactors: []
  });
  const clickBtn = () => {
    setShowDrawing(true);
  };
  const  clickDrawing = () => {
    setShowDrawing(false);
  };

  const moveElement = (id: string) => {
    for (const { index, el } of initialState) {
      const foundElement = el.find(item => item.id === id);
      if (foundElement) {
        const boltDroppedImg = /bolt.*\d+/.test(foundElement.id);
        const arrayItem=RocketElements.boltGroup.map((el)=>el.src);
        const itemArrayId = Number(foundElement.id[foundElement.id.length - 1]) - 1;
        const srcImg = boltDroppedImg ?  arrayItem[itemArrayId] : foundElement.src;
        setDroppedEl(prev => ({
          ...prev,
          [index]: [...prev[index], srcImg],
        }));
        setElements1(prevState => {
          const updatedElements = [...prevState];
          const deletedEl=updatedElements.shift();
          return updatedElements;
        });
        setAnswer(prev => [...prev, srcImg]);
      }
    }
  };
  const btnCheckView=Object.values(droppedEl).every((el)=>el.length>0);

  const checkDroppedEl = () => {
    for (const { index, el } of initialState) {
      setDroppedEl(prevState => {
        const updatedDroppedEl = Object.keys(prevState).reduce((acc, index) => {
          const el = prevState[index];
          acc[index] = RocketElements.correctEl.includes(el[0]) ? el : [];
          return acc;
        }, {});
        return updatedDroppedEl;
      });
    }
  };

  return (
    <DndProvider backend={TouchBackend}>
      <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : classes.background}>
        {!showDrawing && (
            <div className={classes.rocketElements}>
              {elements1[0].el.map((el) => (
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
          {/*<img src={fire} className={classes.fire}/>*/}
          {/*<img src={confetti} className={classes.confetti}/>*/}
      </div>
    </DndProvider>
  );
};