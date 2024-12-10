import classes from "./Torgashi.module.scss";
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string }> = {
  computerGame: {
    title: 'Бухгалтерия',
    body: 'Вам необходимо распределить расходы на те, которые организация может произвести и на те, которые не может',
  },
  robotGame: {
    title: 'Лото',
    body: 'Вам будут необходимо выбрать вариант ответа, после нажатия на выбранный вариант он исчезнет и более будет не доступен, выбирайте внимательно!',
  },
  spaceGame: {
    title: 'Космическая игра',
    body: 'Описание для космической игры.',
  },
};

export const Torgashi: React.FC = () => {

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
      <Assistant cat={"-80px"} mar={"-470px"} title={"Добро пожаловать на специальность 38.02.08 Торговое дело!"} body={"Эта специальность  готовит специалистов для работы в сфере торговли. Студенты изучают экономику, маркетинг, товароведение и организацию торговых процессов."}></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.prilavok} onClick={() => handleGameClick('computerGame')}></div>
          <div className={classes.teleska} onClick={() => handleGameClick('robotGame')}></div>
        </div>
        <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={currentGame} isOpen={openIsCard} onClose={closeCard} /></div>
      </div>
      <div className={classes.buttons}>
        <Link to={"/2"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"meditation"} /></Link>
      </div>
    </div>
  )
    ;
};