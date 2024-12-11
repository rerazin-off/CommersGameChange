import classes from './dou.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';


const gameData: Record<string, { title: string; body: string }> = {
  laptopGame: {
    title: 'Документы',
    body: 'Вам необходимо расположить в правильное последовательности этапы работы с документом',
  },
  shelfsGame: {
    title: 'Документы',
    body: 'Вам необходимо расположить в правильное последовательности этапы работы с документом',
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
        <Assistant fon={'secondPlanet1'} link={'2'} cat={"-160px"} title={"Документационное обеспечение упраленияя и архивоведение 46.02.01"} body={"Организация архивной и справочно-информационной работы по документам организации; Осуществление документационного обеспечения управления и архивного дела с использованием программных средств учета, обработки и поиска документов."} mar={"-550px"}></Assistant>
        <div className={classes.container}>
          <div className={classes.laptop} onClick={() => handleGameClick('laptopGame')}></div>
          <div className={classes.shelfs} onClick={() => handleGameClick('shelfsGame')}></div>
        </div>
        <div className={classes.card}><Card title={cardData.title} body={cardData.body} game={currentGame}
                                            isOpen={openIsCard} onClose={closeCard} /></div>
      </div>
      <div className="image-cact">{}</div>
      <div className={classes.buttons}>
        <Link to={"/2"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"meditation"} /></Link>
      </div>
    </div>
  )
    ;
};
