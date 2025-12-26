import classes from './GameOver.module.scss'
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




const GameOver = (props) => {

  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    localStorage.setItem('fromGame', 'true');
    navigate('/ElemShool');
  }, [navigate]);

  useEffect(() => {
    // Создаем частицы для фона
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={classes.game_overlay}>
      {/* Частицы фона */}
      <div className={classes.particles}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={classes.particle}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className={classes.game_over_panel}>
        <h2 className={classes.game_over_title}>МИССИЯ ПРОВАЛЕНА</h2>
        <p className={classes.game_over_subtitle}>Попробуйте еще раз</p>

        <div className={classes.level_display}>
          <div className={classes.stat_item}>
            <div className={classes.stat_value}>{props.level}</div>
            <div className={classes.stat_label}>Уровень</div>
          </div>
        </div>

        <div className={classes.game_over_buttons}>
          <button className={classes.retry_button} onClick={props.onRetry}>
            Начать заново
          </button>
          <button className={classes.menu_button} onClick={() => handleBack()}>
              В меню
          </button>


        </div>

        <p className={classes.mission_failed_text}>
          "Земля не была спасена, но битва продолжается..."
        </p>
      </div>
    </div>
  )
}
export default GameOver