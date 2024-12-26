import classes from './Economist.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  doskaGame: {
    title: 'Бухгалтерия',
    body: 'Вам необходимо распределить расходы на те, которые организация может произвести и на те, которые не может',
    // url: '../../../production/buhuchet/buh2/index.html',
    url: 'gbuh2',
  },
  stolGame: {
    title: 'Лото',
    body: 'Вам будут необходимо выбрать вариант ответа, после нажатия на выбранный вариант он исчезнет и более будет не доступен, выбирайте внимательно!',
    url: '../../../production/buhuchet/loto/lotov.2/index.html',
  },
};

export const Economist: React.FC = () => {
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
        fon={'firstPlanet2'}
        link={'1'}
        cat={'-160px'}
        mar={'-545px'}
        title={
          'Добро пожаловать на специальность 38.02.01 Экономика и бухгалтерский учет!'
        }
        body={
          <>
            Эта специальность готовит специалистов для работы в сфере
            бухгалтерского учета, финансов <br /> и налогообложения. Студенты
            учат экономику, бухгалтерию, налоги, аудит и анализ
            <br /> деятельности компаний.
          </>
        }
      ></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div
            className={classes.doska}
            onClick={() => handleGameClick('doskaGame')}
          ></div>
          <div
            className={classes.stol}
            onClick={() => handleGameClick('stolGame')}
          ></div>
        </div>
        <div className={classes.card}>
          <Card
            type={'game'}
            title={cardData.title}
            backLink={'economist'}
            body={cardData.body}
            game={cardData.url}
            isOpen={openIsCard}
            onClose={closeCard}
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
