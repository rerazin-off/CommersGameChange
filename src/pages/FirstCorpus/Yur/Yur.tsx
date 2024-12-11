import classes from './Yur.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string }> = {
  shelfGame: {
    title: 'Тест по праву',
    body: 'Правовые аспекты трудоустройства несовершеноллетних!',
  },
  piggyBankGame: {
    title: 'Пенсионый фонд',
    body: 'В этой игре вы почувствуете себя сотрудником пенсионного фонда. Перед вами будут предложены ситуации, ' +
      'вам необходимо принять верное решение и набрать как можно больше всего баллов!',
  },
  sheetGame: {
    title: 'Право',
    body: 'Интерактивное приложение право и организация социального обеспечения. Вам будет необходимо правильно' +
      'составить заявку в МФЦ, основываясь на примере!',
  },
  hammerGame: {
    title: 'Игра суд',
    body: 'Вам будет необходимо выступить в роли судьи, выносящего приговор!' +
      'Помните, что от вашего решения зависит судьба человека!',
  },

};

export const Yur: React.FC = () => {

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
      <Assistant cat={"-160px"} title={"Право и организация социального обеспечения 40.02.01"} body={"Обеспечение реализации прав граждан в сфере пенсионного обеспечения и социальной защиты; Организация обеспечения деятельности учреждения социальной защиты населения и органов Пенсионного фонда РФ; Социально-правовая защита граждан;"} mar={"-550px"}></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.shelf} onClick={() => handleGameClick('shelfGame')}></div>
          <div className={classes.piggyBank} onClick={() => handleGameClick('piggyBankGame')}></div>
          <div className={classes.sheet} onClick={() => handleGameClick('sheetGame')}></div>
          <div className={classes.hammer} onClick={() => handleGameClick('hammerGame')}></div>
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
