import React, { useState, useEffect } from 'react';
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
  const [sequence, setSequence] = useState([]);
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [instruments, setInstruments] = useState(InstrumentArr);

  const [areas, setAreas] = useState([
    { title: 'string', imageUrl: string, items: [] },
    { title: 'hit', imageUrl: hit, items: [] },
    { title: 'wind', imageUrl: wind, items: [] },
    { title: 'keyboard', imageUrl: keyboard, items: [] },
  ]);

  useEffect(() => {
    const shuffledInstruments = InstrumentArr.sort(() => Math.random() - 0.5);
    setSequence(shuffledInstruments);
  }, []);

  useEffect(() => {
    if (sequence.length > 0) {
      setCurrentInstrument(sequence[0]); // Устанавливаем первый объект в качестве текущего
    } else {
      setCurrentInstrument(null); // Если объектов больше нет, устанавливаем null
    }
  }, [sequence]);

  const nextInstrument = () => {
    if (sequence.length > 0) {
      setSequence(prevSequence => prevSequence.slice(1)); // Убираем первый объект из массива
    }
  };

  const renderObject = () => {
    if (currentInstrument) {
      return (
        <Instruments
          key={currentInstrument.id}
          asset={currentInstrument.url}
          index={currentInstrument.id}
          onRemove={() => nextInstrument()}
        />
      );
    }
    return null;
  };

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

    console.log(updatedAreas);
  };

  const touchBackendOptions = {
    enableMouseEvents: true,
  };

  return (
    <DndProvider backend={TouchBackend} options={touchBackendOptions}>
      <CustomDragLayer /> {/* Подключаем слой */}
      <div className={classes.container}>
        <div className={classes.object}>{renderObject()}</div>
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
