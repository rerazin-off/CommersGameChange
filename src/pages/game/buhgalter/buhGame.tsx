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

import React, { useState, useRef, useEffect } from 'react';
import styles from './buhGame.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';


// Тип для описания расхода
type Expense = {
  id: number;
  name: string;
  image: string;
  isCorrect: boolean; // Правильный ли это расход
};

// Начальные расходы
const initialExpenses: Expense[] = [
  { id: 1, name: 'Expense1', image: 'src/assets/img/game_assets/buhsorter/dom.svg', isCorrect: false },
  { id: 2, name: 'Expense2', image: 'src/assets/img/game_assets/buhsorter/kanctovary.svg', isCorrect: true },
  { id: 3, name: 'Expense3', image: 'src/assets/img/game_assets/buhsorter/strahovka.svg', isCorrect: true },
  { id: 4, name: 'Expense4', image: 'src/assets/img/game_assets/buhsorter/taxes.svg', isCorrect: true },
  { id: 5, name: 'Expense5', image: 'src/assets/img/game_assets/buhsorter/office.svg', isCorrect: true },
  { id: 6, name: 'Expense6', image: 'src/assets/img/game_assets/buhsorter/salary.svg', isCorrect: true },
  { id: 7, name: 'Expense7', image: 'src/assets/img/game_assets/buhsorter/transport.svg', isCorrect: true },
  { id: 8, name: 'Expense8', image: 'src/assets/img/game_assets/buhsorter/obed.svg', isCorrect: false },
  { id: 9, name: 'Expense9', image: 'src/assets/img/game_assets/buhsorter/phone.svg', isCorrect: false },
  { id: 10, name: 'Expense10', image: 'src/assets/img/game_assets/buhsorter/priceproduct.svg', isCorrect: true },
  { id: 11, name: 'Expense11', image: 'src/assets/img/game_assets/buhsorter/pytevka.svg', isCorrect: false },
];

export const SorterGame: React.FC = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(0); // Индекс текущего расхода
  const [star, setStar] = useState<Expense[]>([]); // Массив расходов на звезде
  const [blackhole, setBlackhole] = useState<Expense[]>([]); // Массив расходов в черной дыре
  const [dragging, setDragging] = useState(false); // Флаг, показывающий, идет ли перетаскивание
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Текущая позиция перетаскиваемого элемента
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Смещение курсора относительно левого верхнего угла изображения
  const draggableRef = useRef<HTMLImageElement>(null); // Реф для перетаскиваемого элемента
  const [showModal, setShowModal] = useState(false);


  // Обработчик начала касания/нажатия на элемент
  const handleTouchStart = (event: React.TouchEvent) => {
    setDragging(true); // Устанавливаем флаг перетаскивания
    const touch = event.touches[0]; // Получаем данные о касании
    const rect = draggableRef.current!.getBoundingClientRect(); // Получаем размеры и позицию элемента

    // Вычисляем смещение, чтобы курсор был по центру элемента
    setOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });

    // Устанавливаем начальную позицию элемента
    setPosition({ x: rect.left, y: rect.top });
  };



  // Обработчик перемещения касания/курсора
  const handleTouchMove = (event: React.TouchEvent) => {
    if (!dragging) return; // Если не перетаскиваем или нет текущего расхода, выходим
    const touch = event.touches[0]; // Получаем данные о касании

    // Устанавливаем позицию элемента в соответствии с положением курсора
    setPosition({
      x: touch.clientX - offset.x,
      y: touch.clientY - offset.y,
    });
  };


  // Функция для проверки, находится ли элемент в пределах зоны
  const isInsideZone = (x: number, y: number, zoneElement: Element | null) => {
    if (!zoneElement) return false; // Если зона не существует, выходим
    const rect = zoneElement.getBoundingClientRect(); // Получаем размеры и позицию зоны
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom; // Проверяем, находится ли элемент внутри зоны
  };

  // Обработчик завершения касания/нажатия
  const handleTouchEnd = () => {
    if (!dragging) return;
    setDragging(false);

    const blackholeZoneElement = document.querySelector(`.blackholeZone`);
    const starZoneElement = document.querySelector(`.starZone`);

    if (isInsideZone(position.x, position.y, starZoneElement) && star.length < 7) {
      setStar([...star, currentExpense]);
      if(currentExpenseIndex < expenses.length - 1) {
        setCurrentExpenseIndex((prevIndex) => prevIndex + 1);
      }
    }

    if (isInsideZone(position.x, position.y, blackholeZoneElement) && blackhole.length < 4) {
      setBlackhole([...blackhole, currentExpense]);
      if(currentExpenseIndex < expenses.length - 1) {
        setCurrentExpenseIndex((prevIndex) => prevIndex + 1);
      }
    }
  };


  // Обработчик нажатия кнопки "Проверить"
  const handleCheck = () => {
    const incorrectInStar = star.filter((e) => !e.isCorrect); // Находим неправильные расходы в звезде
    const incorrectInBlackhole = blackhole.filter((e) => e.isCorrect); // Находим неправильные расходы в черной дыре

    // Если нет ошибок, показываем модальное окно
    if (incorrectInStar.length === 0 && incorrectInBlackhole.length === 0) {
      setShowModal(true);
    } else {
      // Удаляем неправильные элементы, оставляем только правильные
      setStar(star.filter((e) => e.isCorrect));
      setBlackhole(blackhole.filter((e) => !e.isCorrect));
    }

    // Сбрасываем текущий расход
    setCurrentExpenseIndex(0);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setShowModal(false);
    setStar([]);
    setBlackhole([]);
    setCurrentExpenseIndex(0)
  };

  const currentExpense = expenses[currentExpenseIndex]; // Получаем текущий расход
  const isGameFinished = star.length === 7 && blackhole.length === 4; // Проверяем, завершена ли игра

  // Эта часть кода обеспечивает плавное перемещение изображения, а также его изначальное расположение по центру
  useEffect(() => {
    if(currentExpense){
      const draggableElement = draggableRef.current;
      if (draggableElement) {
        const containerRect = document.querySelector(`.${styles.container}`)?.getBoundingClientRect();
        if (containerRect) {
          const initialX = containerRect.width / 2 - draggableElement.offsetWidth / 2;
          const initialY = containerRect.height / 2 - draggableElement.offsetHeight / 2;
          setPosition({ x: initialX, y: initialY });
        }
      }
    }
  }, [currentExpense, dragging]) // добавляем dragging в зависимости useEffect чтобы он обновлялся когда мы перетаскиваем расход
  return (
    <div className={styles.container}>
      {/* Текущий расход */}
      {currentExpense && (
        <img
          ref={draggableRef}
          src={currentExpense.image}
          alt={currentExpense.name}
          className={styles.draggable}
          style={{ left: position.x, top: position.y, cursor: dragging ? 'grabbing' : 'grab' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
      {/* Зона звезды */}
      <div className={`${styles.zone} starZone`}>
        <div className={styles.star}>
          {star.map((expense) => (
            <div key={expense.id} className={styles.expenseInZone}>
              <img src={expense.image} alt={expense.name} />
            </div>
          ))}
        </div>
      </div>
      {/* Зона черной дыры */}
      <div className={`${styles.zone} blackholeZone`}>
        <div className={styles.blackhole}>
          {blackhole.map((expense) => (
            <div key={expense.id} className={styles.expenseInZone}>
              <img src={expense.image} alt={expense.name} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.backButton}>
        <Link to={'/bank'}>
          <Button bgColor={'pink'} type={'type1v2'}>
            НАЗАД
          </Button>
        </Link>
      </div>
      {/* Кнопка "Проверить", которая отображается только после заполнения обеих зон */}
      {isGameFinished && (
        <div onClick={handleCheck} className={styles.checkButton}>
          <Button bgColor={'pink'} type={'type1v2'}>
            ПРОВЕРИТЬ
          </Button>
        </div>
  )
}
{/* Модальное окно "Молодец!" */
}
{
  showModal && (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Молодец!</h2>
            <button onClick={handleCloseModal}>Играть заново</button>
          </div>
        </div>
      )}
    </div>
  );
};


