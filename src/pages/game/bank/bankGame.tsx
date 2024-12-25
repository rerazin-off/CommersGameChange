import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
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
        <span className={classes.circleNumber}>{index + 1}</span>
        {currentBag && <DraggableBag bag={currentBag} />}
      </div>
    );
  };

  const DraggableBag = ({ bag }: { bag: typeof bags[number] }) => {
    const [, drag] = useDrag({
      type: 'bag',
      item: { id: bag.id },
    });

    return (
      <img
        ref={drag}
        src={bag.image}
        alt={bag.label}
        className={classes.bag}
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
            backLink="bank"
            isOpen={openIsCard}
            onClose={closeCard}
            type="gameOver"
          />
        </div>
      </div>
    </DndProvider>
  );
};