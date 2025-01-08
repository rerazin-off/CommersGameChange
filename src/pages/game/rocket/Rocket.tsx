import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';

import classes from '../rocket/Rocket.module.scss';
import DraggebleEl from '../rocket/components/DraggebleEl/DraggebleEl';
import DropArea from '../rocket/components/DropArea/DropArea';
import Custom from '../rocket/components/Custom/Custom';
import { Button } from '../../../components/Button/Button';
import { RocketElements } from '../rocket/RocketElements';

import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import btnClose from '@/assets/img/game_assets/game-rocket-img/btnClose.svg';
import fire from '@/assets/img/game_assets/game-rocket-img/fire.svg';
import confetti from '@/assets/img/game_assets/game-rocket-img/confetti.svg';

type ElementsRocket = {
  index: string,
  el:  Array<{ id: string, src: any }>
}

const initialState = [
  {index: 'upper_part', el: RocketElements.upper_part},
  {index:'windows', el: RocketElements.window},
  {index:'glass', el: RocketElements.glass},
  {index:'wings', el: RocketElements.wings},
  {index:'bolts', el: RocketElements.bolt},
  {index:'reactors', el: RocketElements.reactor}
]

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing] = useState<boolean>(false);
  const [elements1, setElements1] = useState<Array<ElementsRocket>>(initialState);
  const [showWinning, setShowWinning] = useState<boolean>(false);
  const [answer, setAnswer] = useState({
    bodies:[RocketElements.body],
    upper_part:[],
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
      const foundElement = el.find(item => item.id==id);

      if (foundElement) {
        const boltDroppedImg = /bolt.*\d+/.test(foundElement.id);
        const arrayItem=RocketElements.boltGroup.map((el)=>el.src);
        const itemArrayId = Number(foundElement.id[foundElement.id.length - 1]) - 1;
        const srcImg = boltDroppedImg ?  arrayItem[itemArrayId] : foundElement.src;

        setAnswer(prev => ({
          ...prev,
          [index]: [...prev[index], srcImg],
        }));

        setElements1(prevState => {
          const updatedElements = [...prevState];
          updatedElements.shift();
          return updatedElements;
        });
      }
    }
  };

  const btnCheckView=Object.values(answer).every((el)=>el.length>0);

  const checkAnswer = () => {
    setAnswer(prevState => {
      const updatedDroppedEl = Object.entries(prevState).reduce((acc, [key,el]) => {
        acc[key] = RocketElements.correctEl.includes(el[0]) ? el : [];
        return acc;
      }, {});

      const removedElements =initialState.filter((item)=>
        updatedDroppedEl[item.index].length==0
      );

      if (removedElements.length>0) {
        setElements1(removedElements);
      }
      else{
        setShowWinning(true);
      }

      return updatedDroppedEl;
    });
  };
  const navigate = useNavigate();
  // const checkAnswer = () => {
  //   setAnswer(prevState => {
  //     const updatedDroppedEl = Object.keys(prevState).reduce((acc, index) => {
  //       const el = prevState[index];
  //       acc[index] = RocketElements.correctEl.includes(el[0]) ? el : [];
  //       return acc;
  //       }, {});
  //     const arr=[];
  //     for (const key in updatedDroppedEl){
  //       if (updatedDroppedEl[key].length==0) {
  //         const foundDeleted=initialState.find(el=>el.index==key);
  //         arr.push(foundDeleted)
  //         setElements1(arr)
  //       }
  //     }
  //     return updatedDroppedEl;
  //   });
  // };

  return (
    <DndProvider backend={TouchBackend} >
      <Custom/>
      <div
        className={
          showDrawing
            ? `${classes.dark} ${classes.jcC} ${classes.aiC}`
            : classes.background
        }
      >
        {!showDrawing && (
          <div className={classes.rocketElements}>
            {elements1[0]?.el.map(el => (
              <DraggebleEl
                key={el.id}
                src={el.src}
                id={el.id}
                moveElement={moveElement}
              />
            ))}
          </div>
        )}
        {showDrawing === false && (
          <DropArea
            droppedBodySrc={answer.bodies}
            droppedUpperPartSrc={answer.upper_part}
            droppedWindowSrc={answer.windows}
            droppedGlassSrc={answer.glass}
            droppedWingsSrc={answer.wings}
            droppedBoltSrc={[answer.bolts]}
            droppedReactorSrc={answer.reactors}
          />
        )}
        <button className={classes.btnDrawing} onClick={clickBtn}>
          <img src={icon} />
        </button>
        {showDrawing && (
          <div className={`${classes.drawing} ${classes.jcE}`}>
            <img
              src={btnClose}
              className={classes.close}
              onClick={clickDrawing}
            />
          </div>
        )}
        {btnCheckView && (
          <button className={classes.btnCheck} onClick={checkAnswer}>
            <img src={btnCheck} />
            <h5>ПРОВЕРИТЬ</h5>
          </button>
        )}
        {showWinning &&
          <img src={fire} className={classes.fire} />
        }
        {showWinning && (
          <img src={confetti} className={classes.confetti} />
        )}
        <div className={classes.backButton}>
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => navigate(RoutesEnum.SPECIALKINDERGARDEN)}
          >
            НАЗАД
          </Button>
        </div>
      </div>
    </DndProvider>
  );
};