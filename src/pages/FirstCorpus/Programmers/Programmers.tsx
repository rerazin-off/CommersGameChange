import classes from './Programmers.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  computerGame: {
    title: 'Собери компьютер',
    body: 'Интерактивное приложение Материнская Плата. Вам будет необходимо правильно расставить компоненты материнской платы по слотам',
    url: '../../../production/mat/index.html'
  },
  robotGame: {
    title: 'Игра с роботом',
    body: 'Интерактивное приложение Робота. Вам будет неоходимо запрограмировать роюота так, чтобы он смог дойти до сундука не столкнувшись с разными препятствиями!',
    url: '../../../production/robot/index.html'
  },
  siteBuild: {
    title: 'Создание сайта',
    body: 'Вам необходимо собрать веб-страницу из основных блоков — Header, Navigation, Main, Footer и других. Расположите элементы в правильном порядке, чтобы страница получилась корректной и логичной. Будьте внимательны: неправильная структура приведёт к ошибкам в макете!',
    url: 'siteBuilde'
  }
};

const Programmers: React.FC = () => {

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
    <Assistant fon={'firstPlanet1'} link={'1'} cat={"-140px"} mar={"-530px"} title={"Добро пожаловать на специальность 09.02.07 Информационные системы и программирование!"} body={"Эта специальность готовит специалистов по разработке, внедрению и сопровождению информационных систем и ПО. Студенты осваивают программирование, базы данных, сети, информационную безопасность и тестирование."}></Assistant>
    <div className={classes.progs}>
      <div className={classes.container}>
        <div className={classes.comp} onClick={() => handleGameClick('computerGame')}><Indicator></Indicator></div>
        <div className={classes.robot} onClick={() => handleGameClick('robotGame')}><Indicator></Indicator></div>
        <div className={classes.siteBuild} onClick={() => handleGameClick('siteBuild')}><Indicator></Indicator></div>
      </div>
      <div className={classes.card}><Card type={'game'} title={cardData.title} body={cardData.body} game={cardData.url} backLink={'programmers'}
                                          isOpen={openIsCard} onClose={closeCard} /></div>

    </div>
    <div className={classes.buttons}>
      <Link to={"/1"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
      <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
      <Link to={"/psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
    </div>
  </div>
)
  ;
};
export default Programmers;
