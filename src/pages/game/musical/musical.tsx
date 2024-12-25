import React, { useState } from 'react';
import classes from './musical.module.scss';
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
import Instruments from './DragabbleInstr';
import CustomDragLayer from './CustomDragLayer';

const instrumentsImg = [
  { id: 0, url: guitar },
  { id: 1, url: bayan },
  { id: 2, url: buben },
  { id: 3, url: drums },
  { id: 4, url: dudelka },
  { id: 5, url: dudelka2 },
  { id: 6, url: acousic },
  { id: 7, url: guitarpiano },
  { id: 8, url: kselophone },
  { id: 9, url: piano },
  { id: 10, url: violonchel },
  { id: 11, url: dudelochka },
];

export const Musical = () => {
  const [areas, setAreas] = useState([
    { title: 'string', imageUrl: string, items: [] },
    { title: 'hit', imageUrl: hit, items: [] },
    { title: 'wind', imageUrl: wind, items: [] },
    { title: 'keyboard', imageUrl: keyboard, items: [] },
  ]);

  const [instruments, setInstruments] = useState(instrumentsImg);

  const removeInstrumentFromList = id => {
    setInstruments(prevInstruments =>
      prevInstruments.filter(instrument => instrument.id !== id)
    );
  };

  const updateAreaItems = (index: number, newItemId) => {
    const updatedAreas = [...areas];
    const instrumentToMove = instruments.find(
      instrument => instrument.id === newItemId
    );

    if (!instrumentToMove) return;

    updatedAreas[index].items.push(instrumentToMove);
    setAreas(updatedAreas);

    // Удаляем инструмент из общего массива, чтобы он больше не мог быть использован
    removeInstrumentFromList(newItemId);

    console.log(newItemId);
    console.log(updatedAreas);
  };

  return (
    <DndProvider backend={TouchBackend}>
      <CustomDragLayer /> {/* Подключаем слой */}
      <div className={classes.container}>
        <div className={classes.object}>
          {instruments.map(instrument => (
            <Instruments
              key={instrument.id}
              asset={instrument.url}
              index={instrument.id}
            />
          ))}
        </div>
        <div className={classes.categories}>
          {areas.map(({ imageUrl, items }, index) => (
            <Area
              key={index}
              imageUrl={imageUrl}
              items={items}
              setItems={newItems => updateAreaItems(index, newItems)}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
