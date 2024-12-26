import classes from "./Torgashi.module.scss";
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  prilavokGame: {
    title: 'Время хранения',
    body: 'Расположите продукты по их временю хранения!',
    url: '../../../production/komercia/Time/index.html'
  },
  teleskaGame: {
    title: 'Оборудование',
    body: 'Распределите оборудование по отдулам магазина правильно!',
    url: '../../../production/komercia/index.html'
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
          <Assistant fon={'secondPlanet1'} link={'2'} cat={"-110px"} mar={"-490px"} title={"Добро пожаловать на специальность 38.02.08 Торговое дело!"} body={"Эта специальность  готовит специалистов для работы в сфере торговли. Студенты изучают экономику, маркетинг, товароведение и организацию торговых процессов."}></Assistant>
          <div className={classes.progs}>
            <div className={classes.container}>
              <div className={classes.prilavok} onClick={() => handleGameClick('prilavokGame')}>
                <Indicator></Indicator>
              </div>
              <div className={classes.teleska} onClick={() => handleGameClick('teleskaGame')}>
                <Indicator></Indicator>
              </div>
            </div>
            <div className={classes.card}><Card type={'game'} title={cardData.title} body={cardData.body} game={cardData.url} backLink={'tovaroveds'}
                                                isOpen={openIsCard} onClose={closeCard} /></div>
          </div>
          <div className={classes.buttons}>
            <Link to={"/2"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
            <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
            <Link to={"/psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
          </div>
        </div>
  );
};