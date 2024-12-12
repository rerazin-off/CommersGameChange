import classes from "./Bank.module.scss";
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string }> = {
  papkaGame: {
    title: 'Бухгалтерия',
    body: 'Вам необходимо распределить расходы на те, которые организация может произвести и на те, которые не может',
  },
  listGame: {
    title: 'Лото',
    body: 'Вам будут необходимо выбрать вариант ответа, после нажатия на выбранный вариант он исчезнет и более будет не доступен, выбирайте внимательно!',
  },
  ekranGame: {
    title: 'Космическая игра',
    body: 'Описание для космической игры.',
  },
  koshelGame: {
    title: 'Космическая игра',
    body: 'Описание для космической игры.',
  },
};

export const Bank: React.FC = () => {

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
      <Assistant fon={'secondPlanet1'} link={'2'} cat={"-120px"} mar={"-490px"} title={"Добро пожаловать на специальность 38.02.07 Банковское дело!"} body={"Эта специальность обучает студентов основам экономики, банковского законодательства, кредитных и депозитных операций, валютного обмена и управления рисками."}></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.papka} onClick={() => handleGameClick('papkaGame')}></div>
          <div className={classes.list} onClick={() => handleGameClick('listGame')}></div>
          <div className={classes.ekran} onClick={() => handleGameClick('ekranGame')}></div>
          <div className={classes.koshel} onClick={() => handleGameClick('koshelGame')}></div>
        </div>
        <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={currentGame}
                                            isOpen={openIsCard} onClose={closeCard} /></div>

      </div>
      <div className={classes.buttons}>
        <Link to={"/2"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        <Link to={"/psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
      </div>
    </div>
  )
    ;
};