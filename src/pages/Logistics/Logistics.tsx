import React, { useState } from 'react';
import classes from './Logistics.module.scss';
import truckImage from '../../assets/img/truck.svg'; //грузовик
import hologramImage from '../../assets/img/hologram.svg'; //сфера
import backgroundImage from '../../assets/img/background.svg'; //фон
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

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
      <div className={classes.arrow}>
        <Link to={'/3'}>
          <Button
            type="back_arrow"
            imageSrc="src/assets/img/buttons/white/back_arrow.svg"
            bgColor="white"
          />
        </Link>
      </div>
      <div className={classes.gallery}>
        <Button
          type="gallery"
          imageSrc="src/assets/img/buttons/white/Gallery.svg"
          bgColor="white"
        />
      </div>
      <div className={classes.meditation}>
        <Button
          type="meditation"
          imageSrc="src/assets/img/buttons/white/Gallery.svg"
          bgColor="white"
        />
      </div>

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
  )
}

