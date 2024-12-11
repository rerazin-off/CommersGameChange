import classes from './ElementarySchool.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';

const gameData: Record<string, { title: string; body: string }> = {
  backpackGame: {
    title: '',
    body: '',
  },
  drumsGame: {
    title: '',
    body: '',
  },
};

export const ElementarySchool = () => {

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
      fon={'thirdPlanet3'} link={'3'}
      cat={"-120px"}
      mar={"-520px"}
      title={'Добро пожаловать на специальность ' +
        '44.02.02 Преподование в начальных классах!'} body={"Здесь происходит Организация внеурочной деятельности и общения младших школьников" +
      " по программе начального общего образования. Классное руководство, методическое обеспечение образовательного процесса."}>
    </Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.backpack} onClick={() => handleGameClick('backpackGame')}></div>
          <div className={classes.glass} onClick={() => handleGameClick('glassGame')}></div>
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