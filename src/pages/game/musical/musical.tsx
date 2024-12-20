import React from 'react';
import classes from './musical.module.scss';
import {button} from '../../../components/Button/Button';
import {link} from 'react-router-dom';
import meow from '../../../assets/img/bac.svg'

export const Musical = () => {
  return (
    <div className={classes.meow}>
      <img src={meow}/>
    </div>
  );
};
