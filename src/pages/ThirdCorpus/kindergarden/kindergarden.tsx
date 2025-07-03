import classes from './KinderGarden.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  wheelchairGame: {
    title: 'Гардероб',
    body: 'Детям часто трудно самостоятельно одеваться и поэтому воспитатель помогпет им с этим. \n' +
      'Помогите Илье собраться на летнюю прогулку в детском саду.',
    url:'childWardrobe',
  },
  сrescentGame: {
    title: 'Детский возраст',
    body: 'Дети растут так быстро! В каждый период жизни ребёнку нужны разные вещи и игрушки, которые помогают ему развиваться, учиться новому и просто радоваться миру. \n' +
      '\n' +
      'Задача: распределить предметы/игрушки согласно возрасту ребенка.',
    //
    url:'upbringing'
  },
  telescopeGame: {
    title: 'Угадай-ка',
    body: 'С раннего детства ребенок погружается в мир сказок и мультфильмов, где он переживает за любимых героев и учится важным жизненным урокам. \n' +
      'Предлагаем вам отправиться в увлекательное путешествие по знакомым сюжетам.\n' + '\n' +
      'Задача: По картинкам-подсказкам отгадайте, какой мультфильм или сказка изображена, и впишите свой ответ.',
    url: 'deti',
  },
};

export const Kidergarden = () => {
  const [openIsCard, setOpenIsCard] = useState(false);
  const [currentGame, setGame] = useState<string>('');

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
      <Assistant
        fon={'thirdPlanet1'}
        link={'3'}
        cat={'-130px'}
        mar={'-535px'}
        title={
          'Добро пожаловать на специальность ' +
          '44.02.01 Дошкольное образование!'
        }
        body={
          'Здесь происходит организация мероприятий,' +
          ' различных видов деятельности, занятий по' +
          ' основным образовательным программам и' +
          ' методическое обеспечение образовательного' +
          ' процесса.'
        }
      ></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div
            className={classes.wheelchair}
            onClick={() => handleGameClick('wheelchairGame')}
          >
            <Indicator></Indicator>
          </div>
          <div
            className={classes.telescope}
            onClick={() => handleGameClick('telescopeGame')}
          >
            <Indicator></Indicator>
          </div>
          <div
            className={classes.сrescent}
            onClick={() => handleGameClick('сrescentGame')}
          >
            <Indicator></Indicator>
          </div>
        </div>
        <div className={classes.card}>
          <Card
            type={'game'}
            title={cardData.title}
            body={cardData.body}
            game={cardData.url}
            backLink={'Kidergarden'}
            isOpen={openIsCard}
            onClose={closeCard}
          />
        </div>
      </div>
      <div className={classes.button}>
        <div className={classes.arrow}>
          <Link to={'/3'}>
            <Button type="back_arrow" bgColor="white" />
          </Link>
        </div>
        <div className={classes.gallery}>
          <Link to={'/'}>
            <Button type="gallery" bgColor="white" />
          </Link>
        </div>
        <div className={classes.meditation}>
          <Link to={'/psih'}>
            <Button type="meditation" bgColor="white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
