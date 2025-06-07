import React from 'react';
import classes from './TransportCard.module.scss';


const TransportCard = ({transport, onBuy, active}) => {
  return (
    <div className={classes.card}>
      {!active && <div className={classes.inactiveCard}></div>}
      <div className={classes.windowCard}>
        <img src={transport.img}/>
      </div>
      <p>Вместимость: {transport.capacity} чел.</p>
      <p>Расход топлива: {transport.amountFuel} л/день</p>
      <p>Цена: {transport.cost} руб.</p>
      <button onClick={() => onBuy(transport)}>купить</button>
    </div>
  );
};

export default TransportCard;