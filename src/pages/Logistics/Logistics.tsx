import React, { useState } from 'react';
import classes from './Logistics.module.scss';
import truckImage from '../../assets/img/truck.svg'; //грузовик
import hologramImage from '../../assets/img/hologram.svg'; //сфера
import backgroundImage from '../../assets/img/background.svg'; //фон
import {Button} from '../../components/Button/Button';

export const Logistics: React.FC = () => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const handleTruckClick = () => setActiveTask('truckTask');
  const handleHologramClick = () => setActiveTask('hologramTask');
  const handleCloseTask = () => setActiveTask(null);

  return (
    <div className={classes.container}>
      {/* Фон */}
      <div
        className={classes.background}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Сфера на подставке */}
      <img
        src={hologramImage}
        alt="Сфера"
        className={classes.hologram}
        onClick={handleHologramClick}
      />

      {/* Грузовик */}
      <img
        src={truckImage}
        alt="Грузовик"
        className={classes.truck}
        onClick={handleTruckClick}
      />

      {/* Кнопка "Назад" */}
        <Button
          className={classes.fixedButton} // Используем новый класс для позиционирования
          type="type1v2"
          bgColor="pink"
        >
          Назад
        </Button>
      {/* Модальное окно для задания */}
      {activeTask && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h2>{activeTask === 'truckTask' ? 'Задание для грузовика' : 'Задание для сферы'}</h2>
            <p>Задание.</p>
            <button onClick={handleCloseTask}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

