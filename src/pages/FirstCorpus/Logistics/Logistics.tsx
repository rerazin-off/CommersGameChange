import classes from './Logistics.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  truckGame: {
    title: 'Цепочка',
    body: 'Интерактивное приложение Логистическая цепочка. Вам будет необходимо расставить' +
      ' в правильном порядке все элементы транспортировки!',
    // url: '../../../production/dopolnenie/koni/index.html'
    url: 'gamelogist'
  },
  hologramGame: {
    title: 'Спаси королевство',
    body: 'Ваша задача спасти королевство за минимальное время и минимальные расходы.',
    url: '../../../production/logic/index.html'
  },

};

export const Logistics: React.FC = () => {

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
      <Assistant fon={'firstPlanet2'} link={'1'} cat={"-130px"} title={" Добро пожаловать на специальность 38.02.03 Операционная деятельность в логистике! "} body={"Эта специальность готовит специалистов для организации и управления материальными потоками, включая транспортировку, складирование и управление запасами."} mar={"-490px"}></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.hologram} onClick={() => handleGameClick('hologramGame')}><Indicator></Indicator></div>
          <div className={classes.truck} onClick={() => handleGameClick('truckGame')}><Indicator></Indicator></div>

        </div>
        <div className={classes.card}><Card type={'game'} title={cardData.title} body={cardData.body} game={cardData.url} backLink={'logistics'}
                                            isOpen={openIsCard} onClose={closeCard} /></div>

      </div>
      <div className={classes.buttons}>
        <Link to={"/1"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        <Link to={"/Psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
      </div>
    </div>
  )
    ;
};
