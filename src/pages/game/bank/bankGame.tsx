import React, { useState, useEffect, useCallback } from 'react';
import classes from "./bankGame.module.scss";
import { Button } from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import Card from '../../../components/Card/Card';

const bags = [
  { id: 1, label: "Звонок в банк", image: "/src/assets/img/bag-call.png" },
  { id: 2, label: "Заблокировать карту", image: "/src/assets/img/bag-block.png" },
  { id: 3, label: "Следовать указаниям оператора", image: "/src/assets/img/bag-operator.png" },
  { id: 4, label: "Посетить банк", image: "/src/assets/img/bag-visit.png" },
  { id: 5, label: "Предъявить документы", image: "/src/assets/img/bag-documents.png" },
  { id: 6, label: "Написать заявление", image: "/src/assets/img/bag-application.png" },
  { id: 7, label: "Ждать выплат", image: "/src/assets/img/bag-wait.png" },
];

const correctOrder = [1, 6, 4, 3, 2, 5, 7];

export const BankGame: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(Array(7).fill(0));
  const [shuffledBags, setShuffledBags] = useState<typeof bags>([]);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState<number>(0); // Новый счетчик попыток

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

  const cardData = {
    title: 'Поздравляем!',
    body: `Вы успешно завершили игру за ${attempts} ${attempts === 1 ? 'попытку' : 'попыток'}. Отличная работа!`,
    url: '',
  };


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