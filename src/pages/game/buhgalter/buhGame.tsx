import React, { useState } from 'react';
import styles from './buhGame.module.scss';

// Определение типа для элементов
type Item = {
  id: number;
  name: string;
  type: 'correct' | 'incorrect';
};

// Начальные элементы
const initialItems: Item[] = [
  { id: 1, name: 'Item 1', type: 'correct' },
  { id: 2, name: 'Item 2', type: 'incorrect' },
  // Добавьте остальные элементы
];

const SorterGame: React.FC = () => {
  // Состояния для управления элементами и состоянием игры
  const [items, setItems] = useState<Item[]>(initialItems);
  const [starItems, setStarItems] = useState<Item[]>([]);
  const [blackHoleItems, setBlackHoleItems] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Функция для обработки перемещения элемента в одну из зон
  const handleDrop = (target: 'star' | 'blackHole') => {
    const currentItem = items[currentIndex];
    if (target === 'star') {
      setStarItems([...starItems, currentItem]);
    } else {
      setBlackHoleItems([...blackHoleItems, currentItem]);
    }
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Функция для проверки правильности размещения элементов
  const handleCheck = () => {
    setShowResult(true);
  };

  // Функция для отображения результата
  const renderResult = () => {
    const incorrectStarItems = starItems.filter(item => item.type === 'incorrect');
    const incorrectBlackHoleItems = blackHoleItems.filter(item => item.type === 'correct');

    if (incorrectStarItems.length === 0 && incorrectBlackHoleItems.length === 0) {
      return <div className={styles.success}>Молодец!</div>;
    } else {
      // Удаление неправильных элементов
      setStarItems(starItems.filter(item => item.type === 'correct'));
      setBlackHoleItems(blackHoleItems.filter(item => item.type === 'incorrect'));
      return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Отображение текущего элемента */}
      <div className={styles.item}>{items[currentIndex].name}</div>
      <div className={styles.dropZones}>
        {/* Зоны для перемещения элементов */}
        <div className={styles.dropZone} onTouchStart={() => handleDrop('star')}></div>
        <div className={styles.dropZone} onTouchStart={() => handleDrop('blackHole')}></div>
      </div>
      {/* Кнопка проверки, отображается после размещения всех элементов */}
      {(starItems.length + blackHoleItems.length === 11) && (
        <button className={styles.checkButton} onTouchStart={handleCheck}>Проверить</button>
      )}
      {/* Отображение результата */}
      {showResult && renderResult()}
    </div>
  );
};

export default SorterGame;