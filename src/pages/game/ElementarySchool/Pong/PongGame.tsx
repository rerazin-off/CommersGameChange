import React, { useState } from 'react';
import Game from './components/game'
import { Button } from '../../../../components/Button/Button';
import classes from './PongGame.module.scss'

const PongGame = () => {
  const buttons = ['Легкий', 'Средний', 'Сложный']
  const [onClickActive, setClickActive] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const speed = [5, 8, 10]
  const list_lvl = ['Легкий', 'Средний', 'Сложный']
  const Dif = (id) => {
    setDifficulty(id);
    setClickActive(true);
  }
  return (
    <div className={classes.container1}>

      {!onClickActive && (<h1 className={classes.h1}>Выберите уровень сложности</h1>)}
      {!onClickActive && (
        <div className={classes.buttons}>
          {buttons.map((button, index) => (
            <button className={classes.button} onClick={() => Dif(index)} key={index}>{button}</button>
          ))}
        </div>
      )}

      {onClickActive && <Game className={classes.Convas} difficulty={speed[difficulty]} lvl={list_lvl[difficulty]}/>}
    </div>
  );
}

export default PongGame;