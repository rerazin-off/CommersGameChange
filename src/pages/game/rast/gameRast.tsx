import { useState, useRef, useCallback } from 'react';
import CardFinish from './components/CardFinish';
import CardError from './components/CardError';
import styles from './gameRast.module.scss';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';

// Импортируем все изображения напрямую
import background from './assets/fonpl.svg';
import background2 from './assets/fonpl2.svg';
import center from './assets/kol.svg';
import center1 from './assets/kol1.svg';
import center2 from './assets/kol2.svg';
import center3 from './assets/kol3.svg';
import center4 from './assets/kol4.svg';
import center5 from './assets/kol5.svg';
import broken from './assets/razkol.svg';
import pesok from './assets/pesok.svg';
import grunt from './assets/grunt.svg';
import l5 from './assets/5l.svg';
import l1 from './assets/1l.svg';
import seme from './assets/seme.svg';
import sun from './assets/sun.svg';
import smoke from './assets/smoke.svg';
import spray from './assets/spray.svg';
import par from './assets/par.svg';

type ImageType = string;

const PlantGame = () => {
  const navigate = useNavigate();
  
  // Используем импортированные изображения
  const images = {
    background,
    background2,
    center,
    centerStages: [center1, center2, center3, center4, center5],
    broken,
    leftItems: [pesok, grunt, l5, l1, seme],
    rightItems: [sun, smoke, spray, par]
  };

  // Состояние игры
  const [stage, setStage] = useState(0);
  const [centerImage, setCenterImage] = useState<ImageType>(images.center);
  const [backgroundImage, setBackgroundImage] = useState<ImageType>(images.background);
  const [isPulsing, setIsPulsing] = useState(false);
  const [showResultCard, setShowResultCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeItem, setActiveItem] = useState<ImageType | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);
  const [usedItems, setUsedItems] = useState<ImageType[]>([]);
  
  const centerRef = useRef<HTMLDivElement>(null);
  const draggedItemRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef({ x: 0, y: 0 });

  // Правильные ответы для каждого этапа
  const correctAnswers: ImageType[] = [
    grunt,
    seme,
    l1,
    sun,
    spray
  ];

  // Обработчик кнопки "Назад"
const handleBack = useCallback(() => {
  localStorage.setItem('fromGame', 'true');
  navigate(RoutesEnum.SPECIALKINDERGARDEN);
}, [navigate]);

  // Обработка начала перетаскивания
  const handleStart = useCallback((e: React.DragEvent | React.TouchEvent, item: ImageType) => {
    if (usedItems.includes(item)) return;
    
    setActiveItem(item);
    
    if ('touches' in e) {
      // Для touch-устройств
      const touch = e.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
      
      if (draggedItemRef.current) {
        const target = e.currentTarget as HTMLElement;
        const img = target.querySelector('img');
        if (img) {
          const rect = img.getBoundingClientRect();
          
          draggedItemRef.current.style.width = `${rect.width}px`;
          draggedItemRef.current.style.height = `${rect.height}px`;
          draggedItemRef.current.style.position = 'fixed';
          draggedItemRef.current.style.left = `${touch.clientX}px`;
          draggedItemRef.current.style.top = `${touch.clientY}px`;
          draggedItemRef.current.style.transform = 'translate(-50%, -50%)';
          draggedItemRef.current.style.opacity = '0.8';
          draggedItemRef.current.style.zIndex = '1000';
          draggedItemRef.current.style.pointerEvents = 'none';
          draggedItemRef.current.style.display = 'block';
          draggedItemRef.current.style.transition = 'none';
        }
      }
    } else {
      // Для десктопов
      e.dataTransfer.setData('text/plain', '');
    }
  }, [usedItems]);

  // Обработка перемещения
  const handleMove = useCallback((e: React.TouchEvent) => {
    if (!activeItem || !draggedItemRef.current) return;
    
    const touch = e.touches[0];
    draggedItemRef.current.style.left = `${touch.clientX}px`;
    draggedItemRef.current.style.top = `${touch.clientY}px`;
    
    // Проверяем, находится ли палец над центральным элементом
    if (centerRef.current) {
      const rect = centerRef.current.getBoundingClientRect();
      const isOverCenter = (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      );
      setHoveredCenter(isOverCenter);
    }
  }, [activeItem]);

  // Обработка завершения перетаскивания
  const handleEnd = useCallback((e: React.TouchEvent) => {
    if (!activeItem) return;
    
    const touch = e.changedTouches[0];
    const endPos = { x: touch.clientX, y: touch.clientY };
    
    // Проверяем, был ли элемент "брошен" на центральный элемент
    if (hoveredCenter && centerRef.current) {
      setAttempts(attempts + 1);
      setIsPulsing(true);
      setUsedItems(prev => [...prev, activeItem]);

      const correct = activeItem === correctAnswers[stage];
      setIsSuccess(correct);

      setTimeout(() => {
        setIsPulsing(false);
        
        if (correct) {
          setCenterImage(images.centerStages[stage]);
          
          if (stage === 3) {
            setBackgroundImage(images.background2);
          }
          
          if (stage < 4) {
            setStage(stage + 1);
          } else {
            // Успешное завершение - показываем карточку через 2 секунды
            setTimeout(() => {
              setShowResultCard(true);
            }, 2000);
          }
        } else {
          setCenterImage(images.broken);
          setTimeout(() => {
            setShowResultCard(true);
          }, 2000);
        }
      }, 1500);
    }
    
    if (draggedItemRef.current) {
      draggedItemRef.current.style.display = 'none';
    }
    
    setActiveItem(null);
    setHoveredCenter(false);
  }, [activeItem, attempts, correctAnswers, hoveredCenter, images, stage]);

  // Обработчик для десктопов
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!activeItem) return;

    setAttempts(attempts + 1);
    setIsPulsing(true);
    setUsedItems(prev => [...prev, activeItem]);

    const correct = activeItem === correctAnswers[stage];
    setIsSuccess(correct);

    setTimeout(() => {
      setIsPulsing(false);
      
      if (correct) {
        setCenterImage(images.centerStages[stage]);
        
        if (stage === 3) {
          setBackgroundImage(images.background2);
        }
        
        if (stage < 4) {
          setStage(stage + 1);
        } else {
          // Успешное завершение - показываем карточку через 2 секунды
          setTimeout(() => {
            setShowResultCard(true);
          }, 2000);
        }
      } else {
        setCenterImage(images.broken);
        setTimeout(() => {
          setShowResultCard(true);
        }, 2000);
      }
    }, 1500);
    
    setActiveItem(null);
  }, [activeItem, attempts, correctAnswers, images, stage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setHoveredCenter(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setHoveredCenter(false);
  }, []);

  // Сброс игры
  const resetGame = useCallback(() => {
    setStage(0);
    setCenterImage(images.center);
    setBackgroundImage(images.background);
    setIsPulsing(false);
    setShowResultCard(false);
    setAttempts(0);
    setActiveItem(null);
    setUsedItems([]);
  }, [images]);

  return (
    <div className={styles.gameContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Левая панель с элементами */}
      <div className={styles.leftPanel}>
        {images.leftItems.map((item, index) => (
          <div 
            key={`left-${index}`}
            className={styles.draggableItem}
            draggable={!usedItems.includes(item)}
            onDragStart={(e) => !usedItems.includes(item) && handleStart(e, item)}
            onTouchStart={(e) => !usedItems.includes(item) && handleStart(e, item)}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onTouchCancel={() => {
              if (draggedItemRef.current) {
                draggedItemRef.current.style.display = 'none';
              }
              setActiveItem(null);
              setHoveredCenter(false);
            }}
            style={{
              opacity: usedItems.includes(item) ? 0.3 : 1,
              pointerEvents: usedItems.includes(item) ? 'none' : 'auto'
            }}
          >
            <img src={item} alt={`Item ${index}`} draggable="false" />
          </div>
        ))}
      </div>

      {/* Центральное изображение */}
      <div 
        ref={centerRef}
        className={`${styles.centerImage} ${isPulsing ? styles.pulsePink : ''} ${hoveredCenter ? styles.hovered : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <img src={centerImage} alt="Central object" draggable="false" />
      </div>

      {/* Правая панель с элементами */}
      <div className={styles.rightPanel}>
        {images.rightItems.map((item, index) => (
          <div 
            key={`right-${index}`}
            className={styles.draggableItem}
            draggable={!usedItems.includes(item)}
            onDragStart={(e) => !usedItems.includes(item) && handleStart(e, item)}
            onTouchStart={(e) => !usedItems.includes(item) && handleStart(e, item)}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onTouchCancel={() => {
              if (draggedItemRef.current) {
                draggedItemRef.current.style.display = 'none';
              }
              setActiveItem(null);
              setHoveredCenter(false);
            }}
            style={{
              opacity: usedItems.includes(item) ? 0.3 : 1,
              pointerEvents: usedItems.includes(item) ? 'none' : 'auto'
            }}
          >
            <img src={item} alt={`Item ${index}`} draggable="false" />
          </div>
        ))}
      </div>

      {/* Перетаскиваемый элемент (для touch) */}
      <div 
        ref={draggedItemRef}
        className={styles.draggedItem}
        style={{ display: 'none' }}
      >
        {activeItem && <img src={activeItem} alt="Dragged item" />}
      </div>

      {/* Карточка результата */}
{showResultCard && (
  isSuccess ? (
    <CardFinish 
      attempts={attempts} 
      isOpenCard={true} 
      onClose={resetGame}
    />
  ) : (
    <CardError
      attempts={attempts}
      isOpenCard={true}
      onClose={resetGame}
    />
  )
)}

      {/* Индикатор текущего этапа */}
      <div className={styles.stageIndicator}>
        Этап: {stage + 1} из 5
      </div>

      {/* Кнопка "Назад" */}
      <div className={styles.backButton}>
        <Button
          bgColor="pink"
          type="type1v2"
          onClick={handleBack}
        >
          НАЗАД
        </Button>
      </div>
    </div>
  );
};

export default PlantGame;