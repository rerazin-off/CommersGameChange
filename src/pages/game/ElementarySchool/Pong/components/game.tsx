import React, {useEffect, useRef, useState, useCallback} from 'react'
import classes from '../PongGame.module.scss'
import GameOver from './GameOver'
import VictoryScreen from './VictoryScreen'

const game = (props) =>{

  const canvasRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Константы игры
  const CANVAS_WIDTH = 1000;
  const CANVAS_HEIGHT = 800;
  const PADDLE_WIDTH = 300;
  const PADDLE_HEIGHT = 30;
  const BALL_SIZE = 15;
  const BRICK_ROWS = 1;
  const BRICK_COLS = 1;
  const BRICK_WIDTH = 150;
  const BRICK_HEIGHT = 60;
  const BRICK_PADDING = 35;
  const BRICK_OFFSET_TOP = 80;
  const BRICK_OFFSET_LEFT = 50;
  const BALL_SPEED = -props.difficulty;

  // Состояние игры
  const [gameState, setGameState] = useState({
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 70,
      dx: BALL_SPEED,
      dy: -BALL_SPEED
    },
    paddle: {
      x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10
    },
    bricks: [],
    score: 0,
    lives: 3,
    gameOver: false,
    gameStarted: false,
    level: 1,
    victory: false
  });

  // Инициализация кирпичей-планет
  const initializeBricks = useCallback(() => {
    const bricks = [];
    const planetThemes = [
      {
        name: 'Математика',
        primary: '#ff6b6b',
        secondary: '#ff5252',
        accent: '#e55039',
        texture: '#ff8a80',
        ringColor: '#ffcdd2',
        type: 'brick-mars'
      },
      {
        name: 'Русский язык',
        primary: '#4ecdc4',
        secondary: '#26a69a',
        accent: '#009688',
        texture: '#80cbc4',
        ringColor: '#b2dfdb',
        type: 'brick-uranus'
      },
      {
        name: 'Окружающий мир',
        primary: '#ffe66d',
        secondary: '#ffd166',
        accent: '#ffb142',
        texture: '#fff59d',
        ringColor: '#fff9c4',
        type: 'brick-saturn'
      },
      {
        name: 'Труды',
        primary: '#ff9ff3',
        secondary: '#f368e0',
        accent: '#e91e63',
        texture: '#f8bbd9',
        ringColor: '#fce4ec',
        type: 'brick-venus'
      },
      {
        name: 'Музыка',
        primary: '#a29bfe',
        secondary: '#6c5ce7',
        accent: '#5d34af',
        texture: '#b39ddb',
        ringColor: '#d1c4e9',
        type: 'brick-neptune'
      },
      {
        name: 'Литература',
        primary: '#ffa726',
        secondary: '#ff9800',
        accent: '#f57c00',
        texture: '#ffcc80',
        ringColor: '#ffe0b2',
        type: 'brick-jupiter'
      },
      {
        name: 'Физкультура',
        primary: '#bdbdbd',
        secondary: '#9e9e9e',
        accent: '#757575',
        texture: '#e0e0e0',
        ringColor: '#f5f5f5',
        type: 'brick-mercury'
      },
      {
        name: 'Английский язык',
        primary: '#795548',
        secondary: '#6d4c41',
        accent: '#5d4037',
        texture: '#a1887f',
        ringColor: '#d7ccc8',
        type: 'brick-pluto'
      }
    ];

    for (let row = 0; row < BRICK_ROWS; row++) {
      bricks[row] = [];
      for (let col = 0; col < BRICK_COLS; col++) {
        const brickX = col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
        const brickY = row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
        const planet = planetThemes[(row * BRICK_COLS + col) % planetThemes.length];

        bricks[row][col] = {
          x: brickX,
          y: brickY,
          status: 1,
          theme: planet,
          damageAnimation: false,
          strength: props.difficulty, //props.difficulty
        };
      }
    }
    return bricks;
  }, []);

  // Функция для рисования планетарного кирпича
  const drawPlanetBrick = useCallback((ctx, brick) => {
    const { theme } = brick;
    const centerX = brick.x + BRICK_WIDTH / 2;
    const centerY = brick.y + BRICK_HEIGHT / 2;

    // Основной градиент кирпича
    const brickGradient = ctx.createLinearGradient(
      brick.x, brick.y,
      brick.x + BRICK_WIDTH, brick.y + BRICK_HEIGHT
    );
    brickGradient.addColorStop(0, theme.primary);
    brickGradient.addColorStop(0.5, theme.secondary);
    brickGradient.addColorStop(1, theme.accent);

    // Рисуем квадратный кирпич с закругленными углами
    const borderRadius = 8;
    ctx.fillStyle = brickGradient;
    ctx.beginPath();
    ctx.roundRect(
      brick.x,
      brick.y,
      BRICK_WIDTH,
      BRICK_HEIGHT,
      borderRadius
    );
    ctx.fill();

    // Планетарный круг в центре кирпича
    const planetRadius = Math.min(BRICK_WIDTH, BRICK_HEIGHT) / 3;
    const planetGradient = ctx.createRadialGradient(
      centerX - planetRadius * 0.2,
      centerY - planetRadius * 0.2,
      0,
      centerX,
      centerY,
      planetRadius
    );
    planetGradient.addColorStop(0, theme.texture);
    planetGradient.addColorStop(0.7, theme.secondary);
    planetGradient.addColorStop(1, theme.accent);

    // Рисуем планету в центре
    ctx.fillStyle = planetGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
    ctx.fill();

    // Добавляем текстуру планеты (кратеры/облака)
    ctx.fillStyle = theme.primary;
    const features = [
      { x: centerX - planetRadius * 0.3, y: centerY - planetRadius * 0.1, size: planetRadius * 0.15 },
      { x: centerX + planetRadius * 0.2, y: centerY + planetRadius * 0.2, size: planetRadius * 0.1 },
      { x: centerX - planetRadius * 0.1, y: centerY + planetRadius * 0.3, size: planetRadius * 0.12 }
    ];

    features.forEach(feature => {
      ctx.beginPath();
      ctx.arc(feature.x, feature.y, feature.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Кольца для некоторых планет
    if (theme.type === 'brick-saturn' || theme.type === 'brick-uranus') {
      const ringWidth = planetRadius * 1.8;
      const ringHeight = planetRadius * 0.2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-0.2);

      const ringGradient = ctx.createLinearGradient(
        -ringWidth / 2, 0,
        ringWidth / 2, 0
      );
      ringGradient.addColorStop(0, 'transparent');
      ringGradient.addColorStop(0.2, theme.ringColor);
      ringGradient.addColorStop(0.5, '#ffffff');
      ringGradient.addColorStop(0.8, theme.ringColor);
      ringGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = ringGradient;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(-ringWidth / 2, -ringHeight / 2, ringWidth, ringHeight);
      ctx.restore();
    }

    // Атмосфера вокруг планеты
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, planetRadius + 2, 0, Math.PI * 2);
    ctx.stroke();

    // Бордюр с свечением
    ctx.shadowColor = theme.primary;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = theme.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(
      brick.x,
      brick.y,
      BRICK_WIDTH,
      BRICK_HEIGHT,
      borderRadius
    );
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Внутренний блик
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(
      brick.x + 2,
      brick.y + 2,
      BRICK_WIDTH - 4,
      BRICK_HEIGHT - 4,
      borderRadius - 2
    );
    ctx.fill();

    // Отображение прочности и названия
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 4;

    // Прочность над планетой
    ctx.fillText(
      brick.strength.toString(),
      centerX,
      brick.y + 15
    );

    // Название предмета под планетой
    ctx.font = '18px Orbitron';
    ctx.fillText(
      theme.name,
      centerX,
      brick.y + BRICK_HEIGHT - 10
    );

    ctx.shadowBlur = 0;

    // Эффект повреждения
    if (brick.damageAnimation) {
      ctx.strokeStyle = '#ffffff';
      // ctx.lineWidth = 3;
      // ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.roundRect(
        brick.x - 2,
        brick.y - 2,
        BRICK_WIDTH + 4,
        BRICK_HEIGHT + 4,
        borderRadius + 2
      );
      ctx.stroke();
      ctx.setLineDash([]);
    }

  }, []);

  // Улучшенная функция проверки столкновения с кирпичом
  const checkBrickCollision = useCallback((ball, brick) => {
    if (brick.status !== 1) return null;

    const ballLeft = ball.x;
    const ballRight = ball.x + BALL_SIZE;
    const ballTop = ball.y;
    const ballBottom = ball.y + BALL_SIZE;

    const brickLeft = brick.x;
    const brickRight = brick.x + BRICK_WIDTH;
    const brickTop = brick.y;
    const brickBottom = brick.y + BRICK_HEIGHT;

    // Проверяем пересечение
    if (ballRight <= brickLeft || ballLeft >= brickRight ||
      ballBottom <= brickTop || ballTop >= brickBottom) {
      return null;
    }

    // Вычисляем перекрытия со всех сторон
    const overlapLeft = ballRight - brickLeft;
    const overlapRight = brickRight - ballLeft;
    const overlapTop = ballBottom - brickTop;
    const overlapBottom = brickBottom - ballTop;

    // Находим минимальное перекрытие
    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    // Определяем сторону столкновения и корректируем позицию
    let collisionSide = '';
    let correctionX = 0;
    let correctionY = 0;

    if (minOverlap === overlapLeft) {
      collisionSide = 'left';
      correctionX = brickLeft - ballRight - 1;
    } else if (minOverlap === overlapRight) {
      collisionSide = 'right';
      correctionX = brickRight - ballLeft + 1;
    } else if (minOverlap === overlapTop) {
      collisionSide = 'top';
      correctionY = brickTop - ballBottom - 1;
    } else {
      collisionSide = 'bottom';
      correctionY = brickBottom - ballTop + 1;
    }

    return {
      side: collisionSide,
      correctionX,
      correctionY,
      brick: brick
    };
  }, []);

  // Обработка всех столкновений с кирпичами
  const handleBrickCollisions = useCallback((ball, bricks) => {
    let newBall = { ...ball };
    let newBricks = bricks.map(row => row.map(brick => ({ ...brick })));
    let collisionOccurred = false;
    let scoreIncrement = 0;
    let collidedBricks = [];

    // Проверяем столкновения со всеми кирпичами
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        const brick = newBricks[row][col];
        const collision = checkBrickCollision(newBall, brick);

        if (collision && !collisionOccurred) {
          collisionOccurred = true;
          collidedBricks.push({ brick, collision });
        }
      }
    }

    // Обрабатываем первое столкновение (самое глубокое)
    if (collidedBricks.length > 0) {
      const { brick, collision } = collidedBricks[0];

      // Применяем корректировку позиции
      newBall.x += collision.correctionX;
      newBall.y += collision.correctionY;

      // Меняем направление в зависимости от стороны столкновения
      if (collision.side === 'left' || collision.side === 'right') {
        newBall.dx = -newBall.dx;
      } else {
        newBall.dy = -newBall.dy;
      }

      // Обрабатываем урон кирпичу
      brick.strength -= 1;
      brick.damageAnimation = true;

      if (brick.strength <= 0) {
        brick.status = 0;
        scoreIncrement += 10 * gameState.level;
      } else {
        scoreIncrement += 5 * gameState.level;
      }
    }

    return {
      ball: newBall,
      bricks: newBricks,
      scoreIncrement,
      collisionOccurred
    };
  }, [checkBrickCollision, gameState.level]);

  // Сброс игры
  const resetGame = useCallback(() => {
    const newBricks = initializeBricks();
    setGameState({
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 70,
        dx: BALL_SPEED,
        dy: -BALL_SPEED
      },
      paddle: {
        x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
        y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10
      },
      bricks: newBricks,
      score: 0,
      lives: 3,
      gameOver: false,
      gameStarted: false,
      level: 1,
      victory: false
    });
  }, [initializeBricks]);

  // Инициализация при монтировании
  useEffect(() => {
    const newBricks = initializeBricks();
    setGameState(prev => ({
      ...prev,
      bricks: newBricks
    }));
  }, [initializeBricks]);

  // Обработка движения мыши/тача
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      if (!gameState.gameStarted || gameState.gameOver) return;

      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;

      setGameState(prev => ({
        ...prev,
        paddle: {
          ...prev.paddle,
          x: Math.max(
            0,
            Math.min(relativeX - PADDLE_WIDTH / 2, CANVAS_WIDTH - PADDLE_WIDTH)
          )
        }
      }));
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!gameState.gameStarted || gameState.gameOver) return;

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const relativeX = touch.clientX - rect.left;

      setGameState(prev => ({
        ...prev,
        paddle: {
          ...prev.paddle,
          x: Math.max(
            0,
            Math.min(relativeX - PADDLE_WIDTH / 2, CANVAS_WIDTH - PADDLE_WIDTH)
          )
        }
      }));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameState.gameStarted, gameState.gameOver]);

  // Игровая логика
  const updateGame = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameStarted || prev.gameOver) return prev;

      let { ball, paddle, bricks, score, lives, level } = prev;

      // Движение мяча
      let newBall = {
        x: ball.x + ball.dx,
        y: ball.y + ball.dy,
        dx: ball.dx,
        dy: ball.dy
      };

      // Столкновение со стенами
      if (newBall.x <= BALL_SIZE || newBall.x >= CANVAS_WIDTH - BALL_SIZE) {
        newBall.dx = -newBall.dx;
        newBall.x = newBall.x <= BALL_SIZE ? BALL_SIZE : CANVAS_WIDTH - BALL_SIZE;
      }

      if (newBall.y <= BALL_SIZE) {
        newBall.dy = -newBall.dy;
        newBall.y = BALL_SIZE;
      }

      // Столкновение с платформой
      if (
        newBall.y + BALL_SIZE >= paddle.y &&
        newBall.y <= paddle.y + PADDLE_HEIGHT &&
        newBall.x + BALL_SIZE >= paddle.x &&
        newBall.x <= paddle.x + PADDLE_WIDTH &&
        newBall.dy > 0
      ) {
        const hitPos = (newBall.x - paddle.x) / PADDLE_WIDTH;
        const angle = (hitPos - 0.5) * Math.PI / 3;
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

        newBall.dx = speed * Math.sin(angle);
        newBall.dy = -speed * Math.cos(angle);
        newBall.y = paddle.y - BALL_SIZE;
      }

      // Потеря мяча
      if (newBall.y >= CANVAS_HEIGHT) {
        const newLives = lives - 1;

        if (newLives <= 0) {
          return { ...prev, gameOver: true, lives: newLives };
        }

        return {
          ...prev,
          ball: {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT - 70,
            dx: BALL_SPEED,
            dy: -BALL_SPEED
          },
          paddle: {
            x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
            y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10
          },
          lives: newLives,
          gameStarted: false
        };
      }

      // Столкновение с кирпичами (улучшенная версия)
      const brickCollisionResult = handleBrickCollisions(newBall, bricks);
      newBall = brickCollisionResult.ball;
      const newBricks = brickCollisionResult.bricks;
      const newScore = score + brickCollisionResult.scoreIncrement;

      // Проверка завершения уровня
      const allBricksDestroyed = newBricks.every(row =>
        row.every(brick => brick.status === 0)
      );

      if (allBricksDestroyed) {
        const newLevel = level + 1;
        return {
          ...prev,
          bricks: initializeBricks(),
          ball: {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT - 70,
            dx: (BALL_SPEED + newLevel) * (Math.random() > 0.5 ? 1 : -1),
            dy: -BALL_SPEED - newLevel
          },
          score: newScore,
          level: newLevel,
          gameStarted: false,
          victory: true
        };
      }

      return {
        ...prev,
        ball: newBall,
        bricks: newBricks,
        score: newScore
      };
    });
  }, [initializeBricks, handleBrickCollisions]);

  // Игровой цикл с requestAnimationFrame
  const animate = useCallback((time) => {
    if (!previousTimeRef.current) {
      previousTimeRef.current = time;
    }

    const deltaTime = time - previousTimeRef.current;

    // Обновляем игру примерно 60 раз в секунду
    if (deltaTime > 4) { // ~60 FPS
      updateGame();
      previousTimeRef.current = time;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [updateGame]);

  // Запуск/остановка игрового цикла
  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver) {
      previousTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameOver, animate]);

  // Отрисовка
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка canvas космическим фоном
    ctx.fillStyle = '#000428';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Добавляем звезды на фон
    // ctx.fillStyle = '#ffffff';
    // for (let i = 0; i < 50; i++) {
    //   const x = Math.random() * CANVAS_WIDTH;
    //   const y = Math.random() * CANVAS_HEIGHT;
    //   const size = Math.random() * 1.5;
    //   ctx.beginPath();
    //   ctx.arc(x, y, size, 0, Math.PI * 2);
    //   ctx.fill();
    // }

    // Отрисовка платформы-Солнца (квадратная)
    const sunGradient = ctx.createLinearGradient(
      gameState.paddle.x, gameState.paddle.y,
      gameState.paddle.x + PADDLE_WIDTH, gameState.paddle.y + PADDLE_HEIGHT
    );
    sunGradient.addColorStop(0, '#ffff00');
    sunGradient.addColorStop(0.5, '#ffd700');
    sunGradient.addColorStop(1, '#ff8c00');

    ctx.fillStyle = sunGradient;
    const sunBorderRadius = 10;
    ctx.beginPath();
    ctx.roundRect(
      gameState.paddle.x,
      gameState.paddle.y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      sunBorderRadius
    );
    ctx.fill();

    // Солнечная корона
    ctx.shadowColor = '#ff4500';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(
      gameState.paddle.x,
      gameState.paddle.y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      sunBorderRadius
    );
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Солнечные лучи
    // ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    // ctx.lineWidth = 2;
    // for (let i = 0; i < 8; i++) {
    //   const angle = (i / 8) * Math.PI * 2;
    //   const startX = gameState.paddle.x + PADDLE_WIDTH / 2;
    //   const startY = gameState.paddle.y + PADDLE_HEIGHT / 2;
    //   const endX = startX + Math.cos(angle) * 40;
    //   const endY = startY + Math.sin(angle) * 40;
    //
    //   ctx.beginPath();
    //   ctx.moveTo(startX, startY);
    //   ctx.lineTo(endX, endY);
    //   ctx.stroke();
    // }

    // Отрисовка мяча-Земли
    // Океаны
    ctx.fillStyle = '#1e90ff';
    ctx.beginPath();
    ctx.arc(
      gameState.ball.x,
      gameState.ball.y,
      BALL_SIZE,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Континенты
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.arc(
      gameState.ball.x - BALL_SIZE * 0.3,
      gameState.ball.y - BALL_SIZE * 0.2,
      BALL_SIZE * 0.4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      gameState.ball.x + BALL_SIZE * 0.4,
      gameState.ball.y + BALL_SIZE * 0.3,
      BALL_SIZE * 0.3,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Атмосфера
    ctx.strokeStyle = 'rgba(173, 216, 230, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      gameState.ball.x,
      gameState.ball.y,
      BALL_SIZE + 1,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    // Отрисовка кирпичей-планет
    gameState.bricks.forEach(row => {
      row.forEach(brick => {
        if (brick.status === 1) {
          drawPlanetBrick(ctx, brick);
        }
      });
    });

    // Отрисовка счета и жизней
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 16px Orbitron';
    ctx.textAlign = 'left';
    ctx.fillText(`🛡️ Щиты: ${gameState.lives}`, 10, 20);
    ctx.fillText(`🚀 Уровень: ${props.lvl}`, 10, 50);

    // Сообщения
    if (!gameState.gameStarted && !gameState.gameOver) {
      ctx.fillStyle = 'rgba(0, 4, 40, 0.8)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 24px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('🚀 ЗАПУСК КОСМИЧЕСКОЙ МИССИИ!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
      ctx.font = '18px Orbitron';
      ctx.fillText('Нажмите для старта', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
    }

    if (gameState.gameOver) {
      // return <GameOver/>;
    }
  }, [gameState, drawPlanetBrick]);

  // Обработчики событий
  const handleStartGame = () => {
    if (gameState.gameOver) {
      resetGame();
      // Даем время на сброс перед стартом
      setTimeout(() => {
        setGameState(prev => ({ ...prev, gameStarted: true }));
      }, 100);
    } else {
      setGameState(prev => ({ ...prev, gameStarted: true }));
    }
  };

  const handleCanvasClick = () => {
    if (!gameState.gameStarted || gameState.gameOver) {
      handleStartGame();
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Предметный Брейк</h1>
      <div className={classes.solar_system_decoration}>
        <div className={classes.sun}></div>
        <div className={classes.earth_orbit}>
          <div className={classes.earth}></div>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className={classes.canvas}
        onClick={handleCanvasClick}
      />
      <div className={classes.controls}>
        {gameState.gameOver && (
          <GameOver
            level={props.lvl}
            onRetry={resetGame}
            onMenu={() => {
              // Функция для возврата в меню
              resetGame();
              // Дополнительная логика для меню
            }}
          />
        )}
        {gameState.victory && (
          <VictoryScreen
            level={props.lvl}
            onNextLevel={() => {
              // Логика перехода на следующий уровень
              setGameState(prev => ({
                ...prev,
                victory: false,
                level: prev.level + 1,
                bricks: initializeBricks(),
                ball: {
                  x: CANVAS_WIDTH / 2,
                  y: CANVAS_HEIGHT - 50,
                  dx: (4 + prev.level + 1) * (Math.random() > 0.5 ? 1 : -1),
                  dy: -4 - (prev.level + 1)
                },
                gameStarted: true
              }));
            }}
            onMenu={() => {
              // Логика возврата в меню
              resetGame();
            }}
          />
        )}
        <div>
        </div>
      </div>
    </div>
  )
}
export default game;