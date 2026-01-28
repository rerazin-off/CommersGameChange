import classes from './Yur.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  shelfGame: {
    title: 'Тест по праву',
    body: 'Правовые аспекты трудоустройства несовершеноллетних!',
    url: '../../../production/site_pravo/index.html',
  },
  piggyBankGame: {
    title: 'Пенсионый фонд',
    body:
      'В этой игре вы почувствуете себя сотрудником пенсионного фонда. Перед вами будут предложены ситуации, ' +
      'вам необходимо принять верное решение и набрать как можно больше всего баллов!',
    url: '../../../production/dopolnenie/pensia/index.html',
  },
  sheetGame: {
    title: 'Право',
    body:
      'Интерактивное приложение право и организация социального обеспечения. Вам будет необходимо правильно' +
      'составить заявку в МФЦ, основываясь на примере!',
    url: '../../../production/pravo/pwork/index.html',
  },
  hammerGame: {
    title: 'Сказочный суд',
    body:
    'Определите какие правонарушения были допущены в литературных произведениях, выберите оптимальное решение и найдите возможные улики.',
    url: 'magicalCrimes',
  },
};

const Yur: React.FC = () => {
  const [openIsCard, setOpenIsCard] = useState(false);
  const [currentGame, setGame] = useState<string>('');

  const cardData = gameData[currentGame] || { title: '', body: '', url: '' };

  const handleGameClick = (gameId: string) => {
    setOpenIsCard(true);
    setGame(gameId);
  };

  const closeCard = useCallback(() => {
    setOpenIsCard(false);
    setGame('');
  }, []);
  // const handleCloseTask = () => setOpenCard(null);

  return (
    <div className={classes.cont}>
      <Assistant
        fon={'firstPlanet1'}
        link={'1'}
        cat={'-190px'}
        title={
          ' Добро пожаловать на специальность 40.02.01 Право и организация социального обеспечения!'
        }
        body={
          'Эта специальность обучает студентов правовым аспектам и организации социальной защиты. Они изучают назначение пенсий, пособий и работу с соответствующими документами. Выпускники работают в органах соцзащиты, пенсионных фондах и страховых компаниях.'
        }
        mar={'-575px'}
      ></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          {/*<div*/}
          {/*  className={classes.shelf}*/}
          {/*  onClick={() => handleGameClick('shelfGame')}*/}
          {/*>*/}
          {/*  <Indicator></Indicator>*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  className={classes.piggyBank}*/}
          {/*  onClick={() => handleGameClick('piggyBankGame')}*/}
          {/*>*/}
          {/*  <Indicator></Indicator>*/}
          {/*</div>*/}
          {/*<div*/}
          {/*  className={classes.sheet}*/}
          {/*  onClick={() => handleGameClick('sheetGame')}*/}
          {/*>*/}
          {/*  <Indicator></Indicator>*/}
          {/*</div>*/}
          <div
            className={classes.hammer}
            onClick={() => handleGameClick('hammerGame')}
          >
            <Indicator></Indicator>
          </div>
        </div>

        <div className={classes.card}>
          <Card
            title={cardData.title}
            body={cardData.body}
            game={cardData.url}
            isOpen={openIsCard}
            onClose={closeCard}
            backLink={'Yur'}
            type={'game'}
          />
        </div>
      </div>
      <div className={classes.buttons}>
        <Link to={'/1'}>
          <Button bgColor={'white'} type={'back_arrow'} />
        </Link>
        <Link to={'/'}>
          <Button bgColor={'white'} type={'gallery'} />
        </Link>
        <Link to={'/psih'}>
          <Button bgColor={'white'} type={'meditation'} />
        </Link>
      </div>
    </div>
  );
};

export default Yur;
