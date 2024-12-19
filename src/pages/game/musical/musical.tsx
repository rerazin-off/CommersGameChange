import React from 'react';
import classes from './musical.module.scss';
import { Button, button } from '../../../components/Button/Button';
import { Link, link } from 'react-router-dom';
import guitar from '../../../assets/img/game_assets/musicalgame-categories/guitar.svg';
import bayan from '../../../assets/img/game_assets/musicalgame-categories/bayan.svg';
import buben from '../../../assets/img/game_assets/musicalgame-categories/buben.svg';
import drums from '../../../assets/img/game_assets/musicalgame-categories/drums.svg';
import dudelka from '../../../assets/img/game_assets/musicalgame-categories/dudelka.svg';
import dudelka2 from '../../../assets/img/game_assets/musicalgame-categories/dudelka2.svg';
import acousic from '../../../assets/img/game_assets/musicalgame-categories/guitaracoustic.svg';
import guitarpiano from '../../../assets/img/game_assets/musicalgame-categories/guitarpiano.svg';
import kselophone from '../../../assets/img/game_assets/musicalgame-categories/kselophone.svg';
import piano from '../../../assets/img/game_assets/musicalgame-categories/piano.svg';
import violonchel from '../../../assets/img/game_assets/musicalgame-categories/violonchel.svg';
import dudelochka from '../../../assets/img/game_assets/musicalgame-categories/dudelochks.svg';

export const Musical = () => {
  const instruments = [
    {id: 1, asset: guitar},
    {id: 2, asset: bayan},
    {id: 3, asset: buben},
    {id: 4, asset: drums},
    {id: 5, asset: dudelka},
    {id: 6, asset: dudelka2},
    {id: 7, asset: acousic},
    {id: 8, asset: guitarpiano},
    {id: 9, asset: kselophone},
    {id: 10, asset: piano},
    {id: 11, asset: violonchel},
    {id: 12,asset: dudelochka,}
  ]

  return (
    <div className={classes.container}>
      <div className={classes.categoryString}>
        <img src={'/src/assets/img/game_assets/musicalgame-categories/category1.svg'} />
      </div>
      <div className={classes.categoryHit}>
        <img src={'/src/assets/img/game_assets/musicalgame-categories/category2.svg'} />
      </div>
      <div className={classes.categoryWind}>
        <img src={'/src/assets/img/game_assets/musicalgame-categories/category3.svg'} />
      </div>
      <div className={classes.categoryKeyboard}>
        <img src={'/src/assets/img/game_assets/musicalgame-categories/category4.svg'} />
      </div>
      <div className={classes.backButton}>
        <Link to={'/music'}>
          <Button bgColor={'pink'} type={'type1v2'}>
            НАЗАД
          </Button>
        </Link>
      </div>
    </div>
  );
};
