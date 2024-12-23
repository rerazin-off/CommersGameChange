import classes from './doy.module.scss';
import { Button } from '../../../components/Button/Button';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Card from '../../../components/Card/Card';

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
const cardData = {
  title: 'Поздравляем!',
  body: 'Вы успешно завершили игру. Отличная работа!',
  url: '',
};

export const Doy: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(Array(9).fill(0));
  const [shuffledBags, setShuffledBags] = useState<typeof bags>([]);
  const [openIsCard, setOpenIsCard] = useState(false);

  useEffect(() => {
    const shuffled = [...bags].sort(() => Math.random() - 0.5);
    setShuffledBags(shuffled);
  }, []);

  const handleDrop = (index: number, bagId: number) => {
    const newPositions = [...positions];
    newPositions[index] = bagId;
    setPositions(newPositions);
  };

  const handleDragStart = (bagId: number) => {
    sessionStorage.setItem("draggedBagId", String(bagId));
  };

  const handleDragEnd = () => {
    sessionStorage.removeItem("draggedBagId");
  };

  const checkResults = () => {
    if (JSON.stringify(positions) === JSON.stringify(correctOrder)) {
      setOpenIsCard(true); // Показать модальное окно при полном успехе
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

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {positions.map((pos, i) => (
          <div
            key={i}
            className={classes.circle}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const draggedBagId = Number(sessionStorage.getItem("draggedBagId"));
              handleDrop(i, draggedBagId);
            }}
          >
            {pos > 0 && (
              <img
                src={bags.find((bag) => bag.id === pos)?.image}
                draggable
                onDragStart={() => handleDragStart(pos)}
                onDragEnd={() => {
                  const newPositions = [...positions];
                  newPositions[i] = 0;
                  setPositions(newPositions);
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className={classes.bags}>
        {shuffledBags.map(
          (bag) =>
            !positions.includes(bag.id) && (
              <img
                key={bag.id}
                src={bag.image}
                draggable
                onDragStart={() => handleDragStart(bag.id)}
                onDragEnd={handleDragEnd}
                className={classes.bag}
              />
            )
        )}
      </div>


      {positions.every((pos) => pos > 0) && (
        <div onClick={checkResults} className={classes.checkButton}>
          <Button bgColor={"pink"} type={"type1v2"}>
            ПРОВЕРИТЬ
          </Button>
        </div>
      )}

      <div className={classes.card}>
        <Card
          title={cardData.title}
          body={cardData.body}
          game={cardData.url}
          backLink={'bank'}
          isOpen={openIsCard}
          onClose={closeCard}
        />
      </div>

      <div className={classes.backButton}>
        <Link to={"/bank"}>
          <Button bgColor={"pink"} type={"type1v2"}>
            НАЗАД
          </Button>
        </Link>
      </div>
    </div>
  );
};