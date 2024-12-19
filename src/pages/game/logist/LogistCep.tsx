import React, { useState, useEffect } from "react";
import classes from "./logistCep.module.scss";
import {Button} from "../../../components/Button/Button";
import { Link } from 'react-router-dom';

const containers = [
  { id: 1, label: "Компьютер - информация о заказе", image: "/src/assets/img/game_assets/logist/comp.svg" },
  { id: 3, label: "Заказ", image: "/src/assets/img/game_assets/logist/zakaz.svg" },
  { id: 5, label: "Корабль", image: "/src/assets/img/game_assets/logist/corabl.svg" },
  { id: 7, label: "Погрузчик", image: "/src/assets/img/game_assets/logist/pogruzchik.svg" },
  { id: 10, label: "Дом", image: "/src/assets/img/game_assets/logist/home.svg" },
  { id: 2, label: "Коробка", image: "/src/assets/img/game_assets/logist/korobka.svg" },
  { id: 4, label: "Кран", image: "/src/assets/img/game_assets/logist/kran.svg" },
  { id: 6, label: "Две коробки", image: "/src/assets/img/game_assets/logist/twokorobki.svg" },
  { id: 8, label: "Глобус", image: "/src/assets/img/game_assets/logist/globus.svg" },
  { id: 9, label: "Грузовик", image: "/src/assets/img/game_assets/logist/gruzovik.svg" },
];

const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const LogistCep: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(Array(10).fill(0));
  const [showCheckButton, setShowCheckButton] = useState<boolean>(false);

  // Проверяем, если все позиции заняты, то показываем кнопку "Проверить"
  useEffect(() => {
    if (positions.every((pos) => pos > 0)) setShowCheckButton(true);
    else setShowCheckButton(false);
  }, [positions]);

  const handleDrop = (index: number, id: number) => {
    const newPositions = [...positions];
    newPositions[index] = id;
    setPositions(newPositions);
  };

  const checkResults = () => {
    setPositions((current) =>
      current.map((pos, idx) => (pos === correctOrder[idx] ? pos :0))
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {positions.map((pos, i) => (
          <div key={i} className={classes.circle}>
            <span>{i + 1}</span>
            {pos > 0 && (
              <img src={containers.find((bag) => bag.id === pos)?.image} alt={containers[pos - 1].label} />
            )}
          </div>
        ))}
      </div>

      <div className={classes.containerss}>
        {containers.map((bag) => (
          <img
            key={bag.id}
            src={bag.image}
            alt={bag.label}
            draggable
            onDragEnd={() => handleDrop(positions.indexOf(0), bag.id)}
            className={classes.bag}
          />
        ))}
      </div>

      {showCheckButton && (
        <div onClick={checkResults} className={classes.checkButton}>
          <Button bgColor={'pink'} type={"type1v2"}>ПРОВЕРИТЬ</Button>
        </div>
      )}


      <div className={classes.backButton}>
        <Link to={"/logistics"}><Button bgColor={'purple'} type={"type1v2"}>НАЗАД</Button></Link>
      </div>
    </div>
  );
};