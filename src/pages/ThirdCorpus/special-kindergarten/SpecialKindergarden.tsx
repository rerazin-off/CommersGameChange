import classes from './special-kindergarden.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  flowersGame: {
    title: 'Росток',
    body: 'Интерактивное приложение Росток. Вам будет необходимо вырастить цветок!',
    url: 'rast',
  },
  tentGame: {
    title: 'Ракета',
    body: 'Интерактивное приложение Ракета. Вам будет необходимо построить ракету из предложенных программой элементов!',
    url: 'rocket',
  },
};

export const SpecialKidergarden: React.FC = () => {
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
        fon={'thirdPlanet2'}
        link={'3'}
        cat={'-90px'}
        mar={'-490px'}
        title={
          'Добро пожаловать на специальность ' +
          '44.02.04 Специальное дошкольное образование!'
        }
        body={
          'Здесь происходит организация мероприятий, ' +
          'направленных на укрепление здоровья и физическое развитие' +
          'детей с ограниченными возможностями здоровья ' +
          'и сохранным развитием.'
        }
      ></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div
            className={classes.flowers}
            onClick={() => handleGameClick('flowersGame')}
          >
            <Indicator></Indicator>
          </div>
          <div
            className={classes.tent}
            onClick={() => handleGameClick('tentGame')}
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
            isOpen={openIsCard}
            onClose={closeCard}
            backLink={'SpecialKinder'}
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
