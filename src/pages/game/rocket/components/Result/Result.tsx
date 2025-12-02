import  { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import fire from '@/assets/img/game_assets/game-rocket-img/fire.svg';
import classes from '../../Rocket.module.scss'
import Card from '../../../../../components/Card/Card'

export default function Result ({position}) {
  const [showCard, setShowCard] = useState<boolean>(false)

  const handleClick = () => {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 110, scalar: 2 };

    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
      setShowCard(true)
    }, 250);
  };

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <div>
      <img
        src={fire}
        className={classes.fire}
        style={{
          transform: `translateY(-${position}vh)`,
          transition: 'transform 0.05s ease-out'
        }}/>
      <button onClick={() => location.reload()}>Заново</button>
      <Card
        title={'Поздравляем!'}
        body={'Вы правильно собрали ракету по представленному чертежу!'}
        isOpen={showCard}
        type={'gameOver'}
        game = 'SpecialKinder'
      />
    </div>
  );
};
