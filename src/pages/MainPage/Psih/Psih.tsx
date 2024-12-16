import classes from './Psih.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string }> = {
  floursGame: {
    title: 'Внутренний монстр',
    body: 'Наше подсознание таит в себе много неизведанного и неожиданного, даже для нас самих. Чтобы определить это, предлогаем пройти тест. Выберите фигуру, которая вам нравится!',
  },
  pillowGame: {
    title: 'Собери человечка',
    body: 'Вам необходимо собрать человечка из различных фигур. В результате будет определён ваш тип!',
  },
  pillowsGame: {
    title: 'Тест',
    body: 'Вам необходимо ответить на вопросы. В конце, основываясь на ваших ответах будет указан тип человека, к которому вы относитесь.',
  },

};

export const Psih: React.FC = () => {

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
      <Assistant fon={'psih'} link={'1'} cat={"-80px"} title={" Добро пожаловать в комнату психологической разгрузки!"} body={"Здесь вы найдете поддержку, уютное пространство для восстановления и сможете поговорить с нашим педагогом-психологом по предварительной записи. "} mar={"-495px"}></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.flours} onClick={() => handleGameClick('floursGame')}></div>
          <div className={classes.pillow} onClick={() => handleGameClick('pillowGame')}></div>
          <div className={classes.pillows} onClick={() => handleGameClick('pillowsGame')}></div>

        </div>
        <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={currentGame}
                                            isOpen={openIsCard} onClose={closeCard} /></div>

      </div>
      <div className={classes.buttons}>
        <Link to={"/"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
      </div>
    </div>
  )
    ;
};
