import classes from './dou.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';


const gameData: Record<string, { title: string; body: string; url: string }> = {
  laptopGame: {
    title: 'Документы',
    body: 'Вам необходимо расположить в правильное последовательности этапы работы с документом',
    url: ''
  },
  shelfsGame: {
    title: 'Документы',
    body: 'Вам необходимо расположить в правильное последовательности этапы работы с документом',
    url: 'doyGame'
  },

};

export const Dou: React.FC = () => {

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
        <Assistant fon={'secondPlanet1'} link={'2'} cat={"-170px"} title={"Добро пожаловать на специальность 46.02.01 Документационное обеспечение упраленияя и архивоведение!"} body={"Эта специальность обучает работе с документацией и архивами. Студенты изучают оформление документов, документооборот и использование IT-технологий."} mar={"-535px"}></Assistant>
        <div className={classes.container}>
          <div className={classes.laptop} onClick={() => handleGameClick('laptopGame')}></div>
          <div className={classes.shelfs} onClick={() => handleGameClick('shelfsGame')}></div>
        </div>
        <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={cardData.url} backLink={'dou'} isOpen={openIsCard} onClose={closeCard}/></div>
      </div>
      <div className="image-cact">{}</div>
      <div className={classes.buttons}>
        <Link to={"/2"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        <Link to={"/psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
      </div>
    </div>
  )
    ;
};
