import classes from './KinderGarden.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';

const gameData: Record<string, { title: string; body: string }> = {
  wheelchairGame: {
    title: 'Дочки-матери',
    body: 'Интерактивная игра. Вам необходимо расставить подходящие игрушки на коврик, а лишнее убрать в сторону.',
  },
  сrescentGame: {
    title: 'Игрушки и часими',
    body: 'Интерактивные приложения. Вам будет необходимо расставить элементы на свои места в двух увлекательных играх!',
  },
  telescopeGame: {
    title: 'Я воспитатель',
    body: 'Вам предстоит пройти различные интерактивные игры, в каждой из которых нужно расставить элементы на свои места согласно заданию.',
  },
};

export const Kidergarden = () => {

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

        <div className={classes.cont}><Assistant
          mar={"-510px"}
          title={'Добро пожаловать на специальность ' +
            '44.02.01 Дошкольное образование!'} body={"Здесь происходит организация мероприятий," +
          " различных видов деятельности, занятий по" +
          " основным образовательным программам и" +
          " методическое обеспечение образовательного" +
          " процесса."}>
        </Assistant>
          <div className={classes.progs}>
            <div className={classes.container}>
              <div className={classes.wheelchair} onClick={() => handleGameClick('wheelchairGame')}></div>
              <div className={classes.telescope} onClick={() => handleGameClick('telescopeGame')}></div>
              <div className={classes.сrescent} onClick={() => handleGameClick('сrescentGame')}></div>
            </div>
            <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={currentGame}
                                                isOpen={openIsCard} onClose={closeCard} /></div>

          </div>
          <div className={classes.button}>
            <div className={classes.arrow}>
              <Link to={'/3'}>
                <Button
                  type='back_arrow'
                  bgColor='white'
                />
              </Link>
            </div>
            <div className={classes.gallery}>
              <Button
                type="gallery"
                bgColor="white"
              />
            </div>
            <div className={classes.meditation}>
              <Button
                type="meditation"
                bgColor="white"
              />
            </div>
          </div>
        </div>
  )
    ;
};