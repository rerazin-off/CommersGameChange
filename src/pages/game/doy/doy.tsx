import classes from './doy.module.scss';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import second from '../../../assets/img/game_assets/doy/second.svg';
import Check from '../../../assets/img/game_assets/doy/Check.svg';
import Decoration from '../../../assets/img/game_assets/doy/Decoration.svg';
import Compilation from '../../../assets/img/game_assets/doy/Compilation.svg';
import Signing from '../../../assets/img/game_assets/doy/Signing.svg';
import Addressing from '../../../assets/img/game_assets/doy/Addressing.svg';
import Agreement from '../../../assets/img/game_assets/doy/Agreement.svg';
import Date from '../../../assets/img/game_assets/doy/Date.svg';
import Registration from '../../../assets/img/game_assets/doy/Registration.svg';
import React, { useState, useRef, useEffect } from 'react';

export const Doy = () => {

  return (

    <div className={classes.conteiner}>
      <div className={classes.game}>
        <div className={classes.shelves}>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
          <div className={classes.shelv}></div>
        </div>
        <div className={classes.boxes}>
          <div className={classes.box}><img src={second} /></div>
          <div className={classes.box}><img src={Check} /></div>
          <div className={classes.box}><img src={Decoration} /></div>
          <div className={classes.box}><img src={Compilation} /></div>
          <div className={classes.box}><img src={Signing} /></div>
          <div className={classes.box}><img src={Addressing} /></div>
          <div className={classes.box}><img src={Agreement} /></div>
          <div className={classes.box}><img src={Date} /></div>
          <div className={classes.box}><img src={Registration} /></div>
        </div>
      </div>
      <div className={classes.button}><Link to={'/dou'}><Button bgColor={'pink'} type={'type1v2'}>НАЗАД</Button></Link>
      </div>
    </div>
  );
};

