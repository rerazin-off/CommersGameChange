import React from 'react';
import { Button } from '../../components/Button/Button';
import classes from './Yur.module.scss';

// Импорт изображений
import shelfImg from '../../assets/img/shelf.svg';
import piggyBankImg from '../../assets/img/piggybank.svg';
import hammerImg from '../../assets/img/hammer.svg';
import glassesNoteImg from '../../assets/img/sheet.svg';

const Shelf = () => (
  <div
    className={`${classes.component} ${classes.shelf}`}
    style={{ backgroundImage: `url(${shelfImg})` }}
  />
);

const PiggyBank = () => (
  <div
    className={`${classes.component} ${classes.piggyBank}`}
    style={{ backgroundImage: `url(${piggyBankImg})` }}
  />
);

const Hammer = () => (
  <div
    className={`${classes.component} ${classes.hammer}`}
    style={{ backgroundImage: `url(${hammerImg})` }}
  />
);

const GlassesNote = () => (
  <div
    className={`${classes.component} ${classes.glassesNote}`}
    style={{ backgroundImage: `url(${glassesNoteImg})` }}
  />
);

export const Yur = () => {
  return (
    <div className={classes.container}>
      <Shelf />
      <PiggyBank />
      <Hammer />
      <GlassesNote />
      <Button className={classes.fixedButton} type="type1v2" bgColor="pink">
        Назад
      </Button>
    </div>
  );
};