// import React, { useState } from 'react';
// import classes from './buhGame.module.scss';
// import {Button} from "../../../components/Button/Button";
// import { Link } from 'react-router-dom';
//
// // Определение типа для элементов
// type Item = {
//   id: number;
//   image: image;
//   type: 'correct' | 'incorrect';
// };
//
// // Начальные элементы
// const initialItems: Item[] = [
//   { id: 1, image: '/src/assets/img/bag-call.png', type: 'correct' },
//   { id: 2, image: '', type: 'incorrect' },
//   // Добавьте остальные элементы
// ];
//
// export const SorterGame: React.FC = () => {
//   // Состояния для управления элементами и состоянием игры
//   const [items, setItems] = useState<Item[]>(initialItems);
//   const [starItems, setStarItems] = useState<Item[]>([]);
//   const [blackHoleItems, setBlackHoleItems] = useState<Item[]>([]);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [showResult, setShowResult] = useState<boolean>(false);
//
//   // Функция для обработки перемещения элемента в одну из зон
//   const handleDrop = (target: 'star' | 'blackHole') => {
//     const currentItem = items[currentIndex];
//     if (target === 'star') {
//       setStarItems([...starItems, currentItem]);
//     } else {
//       setBlackHoleItems([...blackHoleItems, currentItem]);
//     }
//     if (currentIndex < items.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };
//
//   // Функция для проверки правильности размещения элементов
//   const handleCheck = () => {
//     setShowResult(true);
//   };
//
//   // Функция для отображения результата
//   const renderResult = () => {
//     const incorrectStarItems = starItems.filter(item => item.type === 'incorrect');
//     const incorrectBlackHoleItems = blackHoleItems.filter(item => item.type === 'correct');
//
//     if (incorrectStarItems.length === 0 && incorrectBlackHoleItems.length === 0) {
//       return <div className={classes.success}>Молодец!</div>;
//     } else {
//       // Удаление неправильных элементов
//       setStarItems(starItems.filter(item => item.type === 'correct'));
//       setBlackHoleItems(blackHoleItems.filter(item => item.type === 'incorrect'));
//       return null;
//     }
//   };
//
//   return (
//     <div className={classes.container}>
//       {/* Отображение текущего элемента */}
//       <div className={classes.item}>{items[currentIndex].image}</div>
//       <div className={classes.dropZones}>
//         {/* Зоны для перемещения элементов */}
//         <div className={classes.dropZone} onTouchStart={() => handleDrop('star')}></div>
//         <div className={classes.dropZone} onTouchStart={() => handleDrop('blackHole')}></div>
//       </div>
//       {/* Кнопка проверки, отображается после размещения всех элементов */}
//       {(starItems.length + blackHoleItems.length === 11) && (
//         <button className={classes.checkButton} onTouchStart={handleCheck}>Проверить</button>
//       )}
//       {/* Отображение результата */}
//       {showResult && renderResult()}
//
//       <div className={classes.backButton}>
//         <Link to={"/economist"}><Button bgColor={'purple'} type={"type1v2"}>НАЗАД</Button></Link>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import styles from './buhGame.module.scss';
import {Button} from "../../../components/Button/Button";
import { Link } from 'react-router-dom';

// Тип для описания расхода
type Expense = {
  id: number;
  name: string;
  image: string;
  isCorrect: boolean; // Правильный ли это расход
};

// Начальные расходы
const initialExpenses: Expense[] = [
  { id: 1, name: 'Expense1', image: 'src/assets/img/game_assets/buhsorter/dom.svg', isCorrect: true },
  { id: 2, name: 'Expense2', image: 'src/assets/img/game_assets/buhsorter/kanctovary.svg', isCorrect: false },
  // Добавьте остальные расходы
];

export const SorterGame: React.FC = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0);
  const [star, setStar] = useState<Expense[]>([]);
  const [blackhole, setBlackhole] = useState<Expense[]>([]);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event: React.TouchEvent) => {
    setDragging(true);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!dragging) return;
    const touch = event.touches[0];
    setPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (target: 'star' | 'blackhole') => {
    setDragging(false);
    const expense = expenses[currentExpenseIndex];
    if (target === 'star' && star.length < 7) {
      setStar([...star, expense]);
    } else if (target === 'blackhole' && blackhole.length < 4) {
      setBlackhole([...blackhole, expense]);
    }
    setCurrentExpenseIndex((prevIndex) => prevIndex + 1);
  };

  const handleCheck = () => {
    const incorrectInStar = star.filter((e) => !e.isCorrect);
    const incorrectInBlackhole = blackhole.filter((e) => e.isCorrect);

    if (incorrectInStar.length === 0 && incorrectInBlackhole.length === 0) {
      alert('Молодец!');
    } else {
      setStar(star.filter((e) => e.isCorrect));
      setBlackhole(blackhole.filter((e) => !e.isCorrect));
    }
  };

  const currentExpense = expenses[currentExpenseIndex];

  return (
    <div className={styles.container}>
      {currentExpense && (
        <img
          src={currentExpense.image}
          alt={currentExpense.name}
          className={styles.draggable}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => handleTouchEnd('star')}
        />
      )}
      <div className={styles.zone} onTouchEnd={() => handleTouchEnd('star')}>
        <div className={styles.star}>
          {star.map((expense) => (
            <img key={expense.id} src={expense.image} alt={expense.name} />
          ))}
        </div>
      </div>
      <div className={styles.zone} onTouchEnd={() => handleTouchEnd('blackhole')}>
        <div className={styles.blackhole}>
          {blackhole.map((expense) => (
            <img key={expense.id} src={expense.image} alt={expense.name} />
          ))}
        </div>
      </div>
      {star.length === 7 && blackhole.length === 4 && (
        <button onClick={handleCheck} className={styles.checkButton}>Проверить</button>
      )}
    </div>
  );
};


