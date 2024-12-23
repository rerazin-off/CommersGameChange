import React, { useState, useEffect, useCallback } from 'react';
import classes from "./logistCep.module.scss";
import { Button } from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import Card from '../../../components/Card/Card';

const bags = [
  { id: 1, label: "Компьютер - информация о заказе", image: "/src/assets/img/game_assets/logist/comp.svg" },
  { id: 2, label: "Коробка - упаковка заказа", image: "/src/assets/img/game_assets/logist/korobka.svg" },
  { id: 3, label: "Заказ - оформление документов на отгрузку", image: "/src/assets/img/game_assets/logist/zakaz.svg" },
  { id: 4, label: "Кран", image: "/src/assets/img/game_assets/logist/kran.svg" },
  { id: 5, label: "Корабль", image: "/src/assets/img/game_assets/logist/corabl.svg" },
  { id: 6, label: "Две коробки", image: "/src/assets/img/game_assets/logist/twokorobki.svg" },
  { id: 7, label: "Погрузчик", image: "/src/assets/img/game_assets/logist/pogruzchik.svg" },
  { id: 8, label: "Глобус - доставка в место назначения", image: "/src/assets/img/game_assets/logist/globus.svg" },
  { id: 9, label: "Грузовик - доставка до двери", image: "/src/assets/img/game_assets/logist/gruzovik.svg" },
  { id: 10, label: "Дом - получение покупателем", image: "/src/assets/img/game_assets/logist/home.svg" },
];

const correctOrder = [1, 2, 3, 4 ,5 , 6, 7, 8, 9, 10];


export const LogistCep: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(Array(10).fill(0));
  const [shuffledBags, setShuffledBags] = useState<typeof bags>([]);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState<number>(0); // Новый счетчик попыток

  const cardData = {
    title: 'Поздравляем!',
    body: <>Вы успешно завершили игру! <br/> Количество попыток: {attempts}</>,
    url: 'logistics',
  };

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
    setAttempts(prevAttempts => prevAttempts + 1); // Увеличиваем количество попыток на 1
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
            <span className={classes.circleNumber}>{i + 1}</span>
            {pos > 0 && (
              <img
                src={bags.find((bag) => bag.id === pos)?.image}
                alt={bags[pos - 1].label}
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
                alt={bag.label}
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
          <Button bgColor={"blue"} type={"type1v2"}>
            ПРОВЕРИТЬ
          </Button>
        </div>
      )}



      <div className={classes.backButton}>
        <Link to={"/logistics"}>
          <Button bgColor={"pink"} type={"type1v2"}>
            НАЗАД
          </Button>
        </Link>
      </div>
      {openIsCard &&
        <Card
          title={cardData.title}
          body={cardData.body}
          game={cardData.url}
          backLink={'/logistics'}
          isOpen={openIsCard}
          onClose={closeCard}
          type={'gameOver'}
        />
      }
    </div>
  );
};