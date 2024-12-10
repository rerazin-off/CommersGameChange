import classes from './Programmers.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string }> = {
  computerGame: {
    title: 'Собери компьютер',
    body: 'Интерактивное приложение Материнская Плата. Вам будет необходимо правильно расставить компоненты материнской платы по слотам',
  },
  robotGame: {
    title: 'Игра с роботом',
    body: 'Интерактивное приложение Робота. Вам будет неоходимо запрограмировать роюота так, чтобы он смог дойти до сундука не столкнувшись с разными препятствиями!',
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
    <Assistant mar={"-470px"} title={"Добро пожаловать на специальность 09.02.07 Информационные системы и программирование!"} body={"Задумались, как сделать пульсирующий элемент на чистом css/html. В данной статей, мы покажем самый простой пример того, как реализоваться анимацию пульсацию, используя html и css."}></Assistant>
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
