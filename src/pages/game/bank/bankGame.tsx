import React, { useState, useEffect } from "react";
import classes from "./bankGame.module.scss";
import {Button} from "../../../components/Button/Button";
import { Link } from 'react-router-dom';

const bags = [
  { id: 1, label: "Звонок в банк", image: "/src/assets/img/bag-call.png" },
  { id: 2, label: "Заблокировать карту", image: "/src/assets/img/bag-block.png" },
  { id: 3, label: "Следовать указаниям оператора", image: "/src/assets/img/bag-operator.png" },
  { id: 4, label: "Посетить банк", image: "/src/assets/img/bag-visit.png" },
  { id: 5, label: "Предъявить документы", image: "/src/assets/img/bag-documents.png" },
  { id: 6, label: "Написать заявление", image: "/src/assets/img/bag-application.png" },
  { id: 7, label: "Ждать выплат", image: "/src/assets/img/bag-wait.png" },
];

const correctOrder = [1, 2, 3, 4, 5, 6, 7];

export const BankGame: React.FC = () => {
  const [positions, setPositions] = useState<number[]>(Array(7).fill(0));
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
      current.map((pos, idx) => (pos === correctOrder[idx] ? pos : 0))
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        {positions.map((pos, i) => (
          <div key={i} className={classes.circle}>
            <span>{i + 1}</span>
            {pos > 0 && (
              <img src={bags.find((bag) => bag.id === pos)?.image} alt={bags[pos - 1].label} />
            )}
          </div>
        ))}
      </div>

      <div className={classes.bags}>
        {bags.map((bag) => (
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
        <Link to={"/bank"}><Button bgColor={'purple'} type={"type1v2"}>НАЗАД</Button></Link>
      </div>
    </div>
  );
};