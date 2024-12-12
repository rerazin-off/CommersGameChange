import classes from './MusiciansRoom.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';

const gameData: Record<string, { title: string; body: string }> = {
  drumsGame: {
    title: '',
    body: '',
  },
  xylophoneGame: {
    title: '',
    body: '',
  },
  notesGame: {
    title: '',
    body: '',
  },
};

export const MusiciansRoom = () => {

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
      fon={'thirdPlanet1'} link={'3'}
      cat={"-30px"}
      mar={"-430px"}
      title={'Добро пожаловать на специальность ' +
        '53.02.01 Музыкальное образование!'} body={"Здесь происходит организация и преподование" +
      " музыкальных занятий и музыкального досуга в дошкольных и общеобразовательных организциях"}>
    </Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.drums} onClick={() => handleGameClick('drumsGame')}></div>
          <div className={classes.xylophone} onClick={() => handleGameClick('xylophoneGame')}></div>
          <div className={classes.notes} onClick={() => handleGameClick('notesGame')}></div>
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
          <Link to={'/'}>
            <Button
              type='gallery'
              bgColor='white'
            />
          </Link>
        </div>
        <div className={classes.meditation}>
          <Link to={'/psih'}>
            <Button
              type='meditation'
              bgColor='white'
            />
          </Link>
        </div>
      </div>
    </div>
  )
    ;
};