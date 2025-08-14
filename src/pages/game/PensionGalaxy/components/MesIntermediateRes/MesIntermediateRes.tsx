import React from 'react';
import classes from './MesIntermediateRes.module.scss';

const MesIntermediateRes = ({correctAnswer}) => {
  return (
    <div className={classes.effect}>
      <h2>
        <span className={`${classes.textEffect} ${correctAnswer ? classes.correct : classes.incorrect}`}>{correctAnswer ? 'Верно!' :'Неверно!'}</span>
      </h2>
    </div>
  );
};

export default MesIntermediateRes;