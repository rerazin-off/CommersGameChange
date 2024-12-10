import classes from './Logistics.module.scss';
import React, { useCallback, useState } from 'react';
import Card from '../../../components/Card/Card';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import { Assistant } from '../../../components/Assistant/Assistant';

const gameData: Record<string, { title: string; body: string }> = {
  truckGame: {
    title: 'Цепочка',
    body: 'Интерактивное приложение Логистическая цепочка. Вам будет необходимо расставить' +
      ' в правильном порядке все элементы транспортировки!',
  },
  hologramGame: {
    title: 'Спаси королевство',
    body: 'Ваша задача спасти королевство за минимальное время и минимальные расходы.',
  },

};

export const Logistics: React.FC = () => {

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
      <Assistant title={" Операционная деятельность в логистике 38.02.03 "} body={"Планирование и организация логистического процесса в организациях (в подразделениях) различных сфер деятельности; Управление логистическими процессами в закупках, производстве и распределении; Оптимизация ресурсов организации(подразделения),связанных с управлением потоками:"} mar={"-550px"}></Assistant>
      <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.hologram} onClick={() => handleGameClick('hologramGame')}></div>
          <div className={classes.truck} onClick={() => handleGameClick('truckGame')}></div>

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
