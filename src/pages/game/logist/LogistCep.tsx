import React, { useState, useEffect, useCallback } from 'react';
import classes from "./logistCep.module.scss";
import { Button } from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import Card from '../../../components/Card/Card';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import Drag from '../bank/Drag';

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
        alt={bag.label}
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
    url: 'logistics',
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
          <Link to="/logistics">
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
            backLink=""
            isOpen={openIsCard}
            onClose={closeCard}
            type="gameOver"
          />
        </div>
      </div>
    </DndProvider>
  );
};