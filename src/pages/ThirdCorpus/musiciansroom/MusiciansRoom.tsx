import classes from './MusiciansRoom.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Indicator } from '../../../components/Indicator/Indicator';

const gameData: Record<string, { title: string; body: string; url: string }> = {
  drumsGame: {
    title: 'ЗвукоСорт',
    body: 'В мире музыки существует определенный порядок и классификация музыкальных инструментов. Выделяют четыре большие группы: струнные, клавишные, ударные, духовые. Вам предстоит распределить музыкальные инструменты по этим четырем категориям.',
    url: 'musicalcategories',
  },
  xylophoneGame: {
    title: 'ЗвукоРяд',
    body: 'В мире музыки существует множество интересных музыкальных инстурментов \n' +
      'Собери клавиши ксилофона в порядке нотного ряда, выбери сложность и повтори мелодию!',
    url: 'xylophonesounds',
  },
  notesGame: {
    title: 'Концерт',
    body: 'В мире музыки сущесвует множество различных звуков, которые в совокупности образуют разносторонние концерты \n' +
    'Прослушай отрезок мелодии и угадай музыканта на сцене!',
    url: 'concertsounds',
  },
};

const MusiciansRoom = () => {
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
        cat={'-140px'}
        mar={'-535px'}
        title={
          'Добро пожаловать на специальность ' +
          '53.02.01 Музыкальное образование!'
        }
        body={
          'Эта специальность обучает педагогов - музыкантов для работы в образовательных учреждениях. Студенты изучают теорию музыки, вокал, игру на инструментах и методику преподавания.'
        }
      ></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div
            className={classes.drums}
            onClick={() => handleGameClick('drumsGame')}
          >
            <Indicator></Indicator>
          </div>
          <div
            className={classes.xylophone}
            onClick={() => handleGameClick('xylophoneGame')}
          >
            <Indicator></Indicator>
          </div>
          <div
            className={classes.notes}
            onClick={() => handleGameClick('notesGame')}
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
            backLink={'MusiciansRoom'}
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

export default MusiciansRoom;
