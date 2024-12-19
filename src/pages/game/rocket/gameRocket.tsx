import React ,{useState} from 'react';
import classes from './gameRocket.module.scss';
import icon from '../../../assets/img/game_assets/game-rocket-img/icon.svg';
import drawing from '../../../assets/img/game_assets/game-rocket-img/drawing.svg';
import btnCheck from '../../../assets/img/game_assets/game-rocket-img/btn-check.svg';
import body1 from '../../../assets/img/game_assets/game-rocket-img/body1.svg';
import body2 from '../../../assets/img/game_assets/game-rocket-img/body2.svg';
import body3 from '../../../assets/img/game_assets/game-rocket-img/body3.svg';
import body4 from '../../../assets/img/game_assets/game-rocket-img/body4.svg';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';

export const Rocket: React.FC = () => {
  const [showDrawing, setShowDrawing]=useState(false);
  function clickBtn(){
    setShowDrawing(true);
  }
  function clickDrawing(){
    setShowDrawing(false);
  }
  return (
    <div className={showDrawing ? `${classes.dark} ${classes.jcC} ${classes.aiC}` : `${classes.background}`}>
      {showDrawing == false && (
        <div className={classes.rocketElements}>
          <img src={body1} />
          <img src={body2} />
          <img src={body3} />
          <img src={body4} />
        </div>
      )};
      <button className={classes.btnDrawing} onClick={clickBtn}>
        <img src={icon} />
      </button>
      <button className={classes.btnCheck}>
        <img src={btnCheck} />
      </button>
      {showDrawing && (
        <div className={classes.drawing} onClick={clickDrawing}>
          <img src={drawing} />
        </div>
      )}
    </div>
  );
};

