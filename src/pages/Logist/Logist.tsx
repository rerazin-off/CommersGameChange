  import React, { useState } from 'react';
  import classes from './Logist.module.scss';

  const Logist = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div className={classes.container}>
        <div className={classes.background}></div>

        <div className={classes.hologram} onClick={handleOpenModal}></div>

        <div className={classes.truck} onClick={handleOpenModal}></div>

        {isModalOpen && (
          <div className={classes.modal}>
            <div className={classes.modalContent}>
              <h2>Задание</h2>
              <p>Выполните задание</p>
              <button onClick={handleCloseModal}>Закрыть</button>
            </div>
          </div>
        )}

        <div className={classes.backButton}>
          <div className={classes.buttonContent}>Назад</div>
        </div>
      </div>
    );
  };
  export default Logist;
