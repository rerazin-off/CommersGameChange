import React from 'react';
import classes from './musical.module.scss';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import Instruments from './DragabbleInstr.tsx';
import Area from './Droparea';
import guitar from '@/assets/img/game_assets/musicalgame-categories/guitar.svg';
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
import string from '/src/assets/img/game_assets/musicalgame-categories/category1.svg';
import hit from '/src/assets/img/game_assets/musicalgame-categories/category2.svg';
import wind from '/src/assets/img/game_assets/musicalgame-categories/category3.svg';
import keyboard from '/src/assets/img/game_assets/musicalgame-categories/category4.svg';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

const instrumentsImg = [
  guitar,
  bayan,
  buben,
  drums,
  dudelka,
  dudelka2,
  acousic,
  guitarpiano,
  kselophone,
  piano,
  violonchel,
  dudelochka,
];

export const Musical = () => {
  const areas = [
    { title: 'string', imageUrl: string, items: [] },
    { title: 'hit', imageUrl: hit, items: [] },
    { title: 'wind', imageUrl: wind, items: [] },
    { title: 'keyboard', imageUrl: keyboard, items: [] },
  ];

  return (
    <DndProvider backend={TouchBackend}>
      <div className={classes.container}>
        <div className={classes.object}>
          {instrumentsImg.map((asset, i) => (
            <Instruments key={i} asset={asset} index={i} />
          ))}
        </div>

        <div className={classes.categories}>
          {areas.map(({ imageUrl, items }, index) => (
            <div key={index} className={`classes.category+${title}`}>
              <Area imageUrl={imageUrl} items={items} setItems={items} />
            </div>
          ))}
        </div>

        <div className={classes.backButton}>
          <Link to={'/music'}>
            <Button bgColor={'pink'} type={'type1v2'}>
              НАЗАД
            </Button>
          </Link>
        </div>
      </div>
    </DndProvider>
  );
};
