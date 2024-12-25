import React, { useState } from 'react';
import classes from './musical.module.scss';
import Area from './components/DropArea/Droparea';
import InstrumentArr from './Instruments';
import string from '@/assets/img/game_assets/musicalgame-categories/category1.svg';
import hit from '@/assets/img/game_assets/musicalgame-categories/category2.svg';
import wind from '@/assets/img/game_assets/musicalgame-categories/category3.svg';
import keyboard from '@/assets/img/game_assets/musicalgame-categories/category4.svg';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import Instruments from './components/DragabbleInstruments/DragabbleInstr';
import CustomDragLayer from './components/CustomDragLayer/CustomDragLayer';

export const MusicalGameCategories = () => {
  const [areas, setAreas] = useState([
    { title: 'string', imageUrl: string, items: [] },
    { title: 'hit', imageUrl: hit, items: [] },
    { title: 'wind', imageUrl: wind, items: [] },
    { title: 'keyboard', imageUrl: keyboard, items: [] },
  ]);

  const [instruments, setInstruments] = useState(InstrumentArr);

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
