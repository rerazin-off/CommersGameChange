import classes from './special-kindergarden.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';

const gameData: Record<string, { title: string; body: string }> = {
  flowersGame: {
    title: 'Росток',
    body: 'Интерактивное приложение Росток. Вам будет необходимо вырастить цветок!',
  },
  tentGame: {
    title: 'Дом',
    body: 'Интерактивное приложение Дом. Вам будет необходимо построить дом из предложенных программой элементов!',
  },
};

export const SpecialKidergarden = () => {

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
      <Assistant
        mar={"-470px"}
        title={'Добро пожаловать на специальность ' +
        '44.02.04 Специальное дошкольное образование!'} body={"Здесь происходит организация мероприятий, " +
        "направленных на укрепление здоровья и физическое развитие" +
        "детей с ограниченными возможностями здоровья" +
        "и сохранным развитием."}>
      </Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.flowers} onClick={() => handleGameClick('flowersGame')}></div>
          <div className={classes.tent} onClick={() => handleGameClick('tentGame')}></div>
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