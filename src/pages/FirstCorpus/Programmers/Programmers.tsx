import classes from './Programmers.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';

const gameData: Record<string, { title: string; body: string }> = {
  computerGame: {
    title: 'ПЕНСИОННЫЙ ФОНД',
    body: 'Описание для компьютерной игры.',
  },
  robotGame: {
    title: 'Игра с роботами',
    body: 'Описание для игры с роботами.',
  },
  spaceGame: {
    title: 'Космическая игра',
    body: 'Описание для космической игры.',
  },
};

export const Programmers: React.FC = () => {

  const [openIsCard, setOpenIsCard] = useState(false);
  const [currentGame, setGame] = useState<string>('')

  const cardData = gameData[currentGame] || { title: '', body: '' };

  const handleGameClick = (param: string) => {
    setOpenIsCard(true);
    setGame(param);
  };

  const closeCard = useCallback(() => {
    setOpenIsCard(false);
    setGame('');
  }, []);
  // const handleCloseTask = () => setOpenCard(null);

  return (
  <div className={classes.cont}>
    <div className={classes.progs}>
      <div className={classes.container}>
        <div className={classes.comp} onClick={() => handleGameClick('computerGame')}></div>
        <div className={classes.robot} onClick={() => handleGameClick('robotGame')}></div>
      </div>
      <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={currentGame}
                                          isOpen={openIsCard} onClose={closeCard} /></div>

    </div>
    <div className={classes.buttons}>
      <Link to={"/1"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
      <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
      <Link to={"/"}><Button bgColor={'white'} type={"meditation"} /></Link>
    </div>
  </div>
)
  ;
};
