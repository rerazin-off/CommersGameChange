import classes from './doy.module.scss';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../../components/Card/Card';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import Drag from './Drag';

const bags = [
  { id: 9, image: "/src/assets/img/game_assets/doy/second.svg" },
  { id: 4, image: "/src/assets/img/game_assets/doy/Check.svg" },
  { id: 3, image: "/src/assets/img/game_assets/doy/Decoration.svg" },
  { id: 1, image: "/src/assets/img/game_assets/doy/Compilation.svg" },
  { id: 5, image: "/src/assets/img/game_assets/doy/Signing.svg" },
  { id: 8, image: "/src/assets/img/game_assets/doy/Addressing.svg" },
  { id: 2, image: "/src/assets/img/game_assets/doy/Agreement.svg" },
  { id: 7, image: "/src/assets/img/game_assets/doy/Date.svg" },
  { id: 6, image: "/src/assets/img/game_assets/doy/Registration.svg" },
];

const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Doy: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(Array(9).fill(0));
  const [shuffledBags, setShuffledBags] = useState<typeof bags>([]);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const shuffled = [...bags].sort(() => Math.random() - 0.5);
    setShuffledBags(shuffled);
  }, []);

  const handleDrop = (index: number | null, item: { id: number }) => {
    const newPositions = [...positions];
    if (index === null) {
      // Перемещение обратно в мешки
      const currentIndex = newPositions.findIndex((id) => id === item.id);
      if (currentIndex !== -1) newPositions[currentIndex] = 0;
    } else {
      // Перемещение в другую ячейку
      const currentIndex = newPositions.findIndex((id) => id === item.id);
      if (currentIndex !== -1) newPositions[currentIndex] = 0;
      newPositions[index] = item.id;
    }
    setPositions(newPositions);
  };

  const DropSlot = ({ index }: { index: number }) => {
    const [, drop] = useDrop({
      accept: 'bag',
      drop: (item: { id: number }) => handleDrop(index, item),
    });

    const currentBag = bags.find((bag) => bag.id === positions[index]);

    return (
      <div ref={drop} className={classes.circle}>
        {currentBag && <DraggableBag bag={currentBag} />}
      </div>
    );
  };

  const DraggableBag = ({ bag }: { bag: typeof bags[number] }) => {
    const [{ isDragging }, drag, preview] = useDrag({
      type: 'bag',
      item: { id: bag.id, image: bag.image },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <img
        ref={drag}
        src={bag.image}
        className={`${classes.bag} ${isDragging ? classes.dragging : ''}`}
        draggable={false}
      />
    );
  };

  const DropBagArea = () => {
    const [, drop] = useDrop({
      accept: 'bag',
      drop: (item: { id: number }) => handleDrop(null, item),
    });

    return (
      <div ref={drop} className={classes.bags}>
        {bags
          .filter((bag) => !positions.includes(bag.id))
          .map((bag) => (
            <DraggableBag key={bag.id} bag={bag} />
          ))}
      </div>
    );
  };

  const checkResults = () => {
    setAttempts((prev) => prev + 1);
    if (JSON.stringify(positions) === JSON.stringify(correctOrder)) {
      setOpenIsCard(true);
    } else {
      const newPositions = positions.map((pos, idx) =>
        pos === correctOrder[idx] ? pos : 0
      );
      setPositions(newPositions);
    }
  };

  const closeCard = useCallback(() => {
    setOpenIsCard(false);
  }, []);


  const cardData = {
    title: 'Поздравляем!',
    body: <>Вы успешно завершили игру! <br /> Количество попыток: {attempts}</>,
    url: 'bank',
  };

  const touchBackendOptions = {
    enableMouseEvents: true,
  };

  return (
    <DndProvider backend={TouchBackend} options={touchBackendOptions}>
      <Drag/>
      <div className={classes.container}>
        <div className={classes.grid}>
          {positions.map((_, i) => (
            <DropSlot key={i} index={i} />
          ))}
        </div>
        <DropBagArea />
        {positions.every((pos) => pos > 0) && (
          <div onClick={checkResults} className={classes.checkButton}>
            <Button bgColor="blue" type="type1v2">
              ПРОВЕРИТЬ
            </Button>
          </div>
        )}
        <div className={classes.backButton}>
          <Link to="/bank">
            <Button bgColor="pink" type="type1v2">
              НАЗАД
            </Button>
          </Link>
        </div>
        <div className={classes.card}>
          <Card
            title={cardData.title}
            body={cardData.body}
            game={cardData.url}
            backLink=" "
            isOpen={openIsCard}
            onClose={closeCard}
            type="gameOver"
          />
        </div>
      </div>
    </DndProvider>
  );
};