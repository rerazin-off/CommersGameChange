import React, { useCallback, useEffect, useState } from 'react';
import classes from './VictoryScreen.module.scss'
import { useNavigate } from 'react-router-dom';



const VictoryScreen = ({level, onNextLevel, onMenu }) => {
  const [confetti, setConfetti] = useState([]);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    localStorage.setItem('fromGame', 'true');
    navigate('/ElemShool');
  }, [navigate]);


  useEffect(() => {
    // Создаем конфетти
    const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      color: i % 3 === 0 ? '#00c8ff' : i % 3 === 1 ? '#64ffda' : '#ffffff'
    }));
    setConfetti(confettiPieces);

    // Создаем звезды
    const victoryStars = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: 2 + Math.random() * 3
    }));
    setStars(victoryStars);
  }, []);


  return (
    <div className={classes.victory_overlay}>
      {/* Конфетти */}
      <div className={classes.confetti}>
        {confetti.map(piece => (
          <div
            key={piece.id}
            className={classes.confetti_piece}
            style={{
              left: `${piece.left}%`,
              background: `linear-gradient(45deg, ${piece.color}, ${piece.color}dd)`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`
            }}
          />
        ))}
      </div>

      {/* Звезды */}
      <div className={classes.victory_stars}>
        {stars.map(star => (
          <div
            key={star.id}
            className={classes.victory_star}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
          />
        ))}
      </div>

      <div className={classes.victory_panel}>
        <h2 className={classes.victory_title}>ПОБЕДА!</h2>
        <p className={classes.victory_subtitle}>Миссия выполнена успешно</p>


        <div className={classes.level_progress}>
          <div className={classes.progress_item}>
            <div className={classes.progress_value}>{level}</div>
            <div className={classes.progress_label}>Уровень пройден</div>
          </div>
        </div>



        <div className={classes.victory_buttons}>
          <button className={classes.next_level_button} onClick={() => handleBack()}>
            в меню
          </button>

        </div>

        <p className={classes.victory_message}>
          "Космос покоряется смелым! Готовьтесь к следующему вызову среди звезд..."
        </p>
      </div>
    </div>
  );
};
export default VictoryScreen;

