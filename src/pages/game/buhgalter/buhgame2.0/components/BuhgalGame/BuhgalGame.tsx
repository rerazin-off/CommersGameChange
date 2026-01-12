import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import Expense from "../Expense/Expense";
import styles from "./BuhgalGame.module.scss";
import Zone from '../Zone/Zone';
import { Button } from '../../../../../../components/Button/Button';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import CustomDragLayer from "../CustomDragLayer/CustomDragLayer";
import { RoutesEnum } from '../../../../../../app/routes';
import { useNavigate } from 'react-router-dom';
import CardFinish from '../CardFinish/CardFinish';


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
  {id: "10", name: "Телефон", image: 'src/assets/img/game_assets/buhsorter/phone.svg', correct: "blackhole" },
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
  const [zones] = useState(zonesData);
  const [centerExpenses, setCenterExpenses] = useState<string[]>(
    expensesData.map((expense) => expense.id) // Инициализируем всеми элементами
  );
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0); // Индекс текущего элемента
  const [attempts, setAttempts] = useState(0); // Отслеживаем количество попыток
  const [isCardOpen, setIsCardOpen] = useState(false); // Состояние для отображения карточки

  useEffect(() => {
    console.log("Текущее состояние centerExpenses:", centerExpenses);
    console.log("Текущий индекс currentExpenseIndex:", currentExpenseIndex);
  }, [centerExpenses, currentExpenseIndex]);

  const handleDrop = (id: string, targetZoneId: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, zone: targetZoneId } : expense
      )
    );

    // Показываем следующий элемент, если он есть
    setCenterExpenses((prevCenterExpenses) =>
      prevCenterExpenses.filter((expenseId) => expenseId !== id)
    );

    setCurrentExpenseIndex((prevIndex) =>
      prevIndex >= centerExpenses.length - 1 ? 0 : prevIndex
    );
  };

  const handleCheck = () => {
    const incorrectExpenses: string[] = [];

    setAttempts((prevAttempts) => prevAttempts + 1); // Увеличиваем количество попыток


    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => {
        const correctZone = zones.find((zone) => zone.id === expense.correct);
        if (expense.zone !== correctZone?.id) {
          incorrectExpenses.push(expense.id);
          return { ...expense, zone: undefined };
        }
        return expense;
      })
    );

    // Если все элементы распределены верно, открываем карточку
    const allCorrect = expenses.every(
      (expense) => expense.zone === expense.correct
    );

    setCenterExpenses(incorrectExpenses); // Обновляем массив неправильных элементов
    setCurrentExpenseIndex(0); // Сбрасываем индекс

    if (allCorrect) {
      setIsCardOpen(true);
    }
  };

  const handleCloseCard = () => {
    setIsCardOpen(false); // Закрываем карточку
  };


  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  // Получаем текущий элемент для отображения
  const currentExpense =
    centerExpenses.length > currentExpenseIndex && !expenses.every((expense) => expense.zone !== undefined)
      ? expenses.find((expense) => expense.id === centerExpenses[currentExpenseIndex])
      : null;

  useEffect(() => {
    console.log("Текущий элемент для отображения:", currentExpense);
  }, [currentExpense]);

  // Определяем, показывать ли кнопку "Проверить"
  const allExpensesDistributed = expenses.every((expense) => expense.zone !== undefined);

  const navigate = useNavigate();

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
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
        {allExpensesDistributed && (
          <Button className={styles.checkButton} onClick={handleCheck}
                  bgColor="blue" type="type1v2">
            ПРОВЕРИТЬ
          </Button>
        )}
        <div className={styles.expensesContainer}>
          {currentExpense && (
            <Expense
              key={currentExpense.id}
              id={currentExpense.id}
              // name={currentExpense.name}
              image={currentExpense.image}
            />
          )}
        </div>
        <div className={styles.backButton}>
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => {
              localStorage.setItem('fromGame', 'true');
              navigate(RoutesEnum.ECONOMIST)
            }}
          >
            НАЗАД
          </Button>
        </div>
        <CustomDragLayer />
      </div>
      <CardFinish
        attempts={attempts}
        isOpenCard={isCardOpen}
        onClose={handleCloseCard}
      />
    </DndProvider>
  );
};

export default ExpenseSorterGame;
