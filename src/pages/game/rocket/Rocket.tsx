import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';

import classes from '../rocket/Rocket.module.scss';
import DropArea from '../rocket/components/DropArea/DropArea';
import Custom from '../rocket/components/Custom/Custom';
import Result from '../rocket/components/Result/Result'
import { Button } from '../../../components/Button/Button';
import { RocketElements } from '../rocket/RocketElements';

import btnCheck from '@/assets/img/game_assets/game-rocket-img/btn-check.svg';
import icon from '@/assets/img/game_assets/game-rocket-img/icon.svg';
import btnClose from '@/assets/img/game_assets/game-rocket-img/btnClose.svg';
import fire from '@/assets/img/game_assets/game-rocket-img/fire.svg';
import ElementsPanel from './components/ElementsPanel/ElementsPanel';

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
  const [showDrawing, setShowDrawing] = useState<boolean>(true);
  const [elements1, setElements1] = useState<Array<ElementsRocket>>(initialState);
  const [showWinning, setShowWinning] = useState<boolean>(false);
  const [rocketPosition, setRocketPosition] = useState<number>(0);
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

  useEffect(() => {
    if (showWinning) {
      const flightInterval = setInterval(() => {
        setRocketPosition(prev => {
          if (prev > 100) {
            clearInterval(flightInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(flightInterval);
    }
  }, [showWinning]);

  const navigate = useNavigate();

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
          <ElementsPanel
            elements={elements1}
            onMoveElements={moveElement}
          />
        )}
        {showDrawing === false && (
          <div
            className={classes.dropAreaContainer}
            style={showWinning ? {
              transform: `translateY(-${rocketPosition}vh)`,
              transition: 'transform 0.05s ease-out'
            } : {}}
          >
            <DropArea
              droppedBodySrc={answer.bodies}
              droppedUpperPartSrc={answer.upper_part}
              droppedWindowSrc={answer.windows}
              droppedGlassSrc={answer.glass}
              droppedWingsSrc={answer.wings}
              droppedBoltSrc={[answer.bolts]}
              droppedReactorSrc={answer.reactors}
            />
          </div>
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
        {btnCheckView && !showWinning && (
          <button className={classes.btnCheck} onClick={checkAnswer}>
            <img src={btnCheck} />
            <h5>ПРОВЕРИТЬ</h5>
          </button>
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
      { showWinning && (
        <Result
          position={rocketPosition}
        />
      )}
    </DndProvider>
  );
};