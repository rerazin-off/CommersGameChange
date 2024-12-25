import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Expense from "./Expense";
import styles from "./BuhgalGame.module.scss";
import Zone from './Zone';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const expensesData = [
  { id: "1", name: "Транспортные затраты", image: 'src/assets/img/game_assets/buhsorter/transport.svg', correct: "star" },
  { id: "2", name: "Обед директора", image: 'src/assets/img/game_assets/buhsorter/obed.svg', correct: "blackhole" },
  { id: "3", name: "Канцтовары", image: 'src/assets/img/game_assets/buhsorter/kanctovary.svg', correct: "star" },
  { id: "4", name: "Путевка на Марс", image: 'src/assets/img/game_assets/buhsorter/pytevka.svg', correct: "blackhole" },
  {id: "5", name: "Загородный дом", image: 'src/assets/img/game_assets/buhsorter/dom.svg', correct: "blackhole" },
  {id: "6", name: "Страховые выплаты", image: 'src/assets/img/game_assets/buhsorter/strahovka.svg', correct: "star" },
  {id: "7", name: "Налоги", image: 'src/assets/img/game_assets/buhsorter/taxes.svg', correct: "star" },
  {id: "8", name: "Аренда офиса", image: 'src/assets/img/game_assets/buhsorter/office.svg', correct: "star" },
  {id: "9", name: "Зарплата", image: 'src/assets/img/game_assets/buhsorter/salary.svg', correct: "star" },
  {id: "10", name: "Телефон", image: 'src/assets/img/game_assets/buhsorter/phone.svg', correct: "star" },
  {id: "11", name: "Стоимость продукции", image: 'src/assets/img/game_assets/buhsorter/priceproduct.svg', correct: "star" }
];

const zonesData = [
  { id: "star", name: "Звезда" },
  { id: "blackhole", name: "Черная дыра" },
];

const ExpenseSorterGame: React.FC = () => {
  const [expenses, setExpenses] = useState(
    expensesData.map((expense) => ({ ...expense, zone: undefined }))
  );
  const [zones, setZones] = useState(zonesData);

  const handleDrop = (id: string, targetZoneId: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, zone: targetZoneId } : expense
      )
    );
  };

  const handleCheck = () => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => {
        const correctZone = zones.find((zone) => zone.id === expense.correct);
        return expense.zone === correctZone?.id;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.gameContainer}>
        <div className={styles.zonesContainer}>
          {zones.map((zone) => (
            <Zone
              key={zone.id}
              zone={zone}
              expenses={expenses.filter((expense) => expense.zone === zone.id)}
              onDrop={handleDrop}
            />
          ))}
        </div>
        <button className={styles.checkButton} onClick={handleCheck}>
          Проверить
        </button>
        <div className={styles.expensesContainer}>
          {expenses.filter((expense) => !expense.zone).map((expense) => (
            <Expense key={expense.id} id={expense.id} name={expense.name} image={expense.image} />
          ))}
        </div>
      </div>
    </DndProvider>

  );
};

export default ExpenseSorterGame;