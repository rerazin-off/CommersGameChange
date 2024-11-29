import React from 'react';
import { StartButton } from '../../components/Button/StartButton.tsx';
import classes from './FirstCorpus.module.scss';


const FirstCorpus = () => {
  return (
    <div>
      <p className={classes.mypd}>планета 1 корпус</p>

      <StartButton>
        Старт
      </StartButton>
    </div>
  );
};

export default FirstCorpus;