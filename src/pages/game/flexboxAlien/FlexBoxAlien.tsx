import React, { useEffect, useState } from 'react';
import classes from './flexboxAlien.module.scss';
import InformPanel from './components/InformPanel';
import { Levels } from './Data';
import GamePanel from './components/GamePanel';
import { Button } from '../../../components/Button/Button';
import { RoutesEnum } from '../../../app/routes';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/Card/Card';

const FlexBoxAlien = () => {
  const getInitialValues = () => ({
    1: 'flex-start',
    2: 'flex-start',
    3: 'row',
    4: 'nowrap',
  });

  const [selectedLevel, setSelectedLevel] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [selectedValues, setSelectedValues] = useState<Record<number, string>>(getInitialValues());
  const currentLevel = Levels[selectedLevel];
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);

  const selectChange = (commandId: number, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [commandId]: value
    }));
  };

  useEffect(() => {
    if (selectedLevel!==Levels.length-1){
      const checkAnswer: boolean = Object.keys(selectedValues).every((key: string) : boolean=>selectedValues[key]===currentLevel.correctAnswer[Number(key)-1]);
      setDisabledBtn(!checkAnswer);
    } else{
      setShowCard(true);
    }
  }, [selectedValues]);

  console.log(selectedLevel!==Levels.length-1);

  useEffect(() => {
    setSelectedValues(getInitialValues())
  }, [selectedLevel]);


  return (
    <div className={classes.game}>
      <InformPanel
        currentLevel={currentLevel}
        selectedValues={selectedValues}
        onSelectChange={selectChange}
        switchNextLevel={() => setSelectedLevel(prev => prev + 1)}
        disabledBtn={disabledBtn}
      />
      <GamePanel selectedValue={selectedValues} currentLevel={currentLevel} />
      <div className={classes.backButton}>
        <Button
          bgColor="pink"
          type="type1v2"
          onClick={() => {
            localStorage.setItem('fromGame', 'true');
            navigate(RoutesEnum.PROGRAMMERS)
          }}
        >
          НАЗАД
        </Button>
      </div>
      <Card
        title={'Поздравляем!'}
        body={'Вы прошли эту игру !'}
        isOpen={showCard}
        type={'gameOver'}
        game = 'Programmers'
      />
    </div>
  );
};

export default FlexBoxAlien;