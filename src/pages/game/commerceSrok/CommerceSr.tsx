import { useState, useEffect, useRef } from 'react';
import classes from './CommerceSr.module.scss';
import ImageCard from './components/ImageCard'; 
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';
import CardFinish from './components/CardFinish';

interface ImagePair {
  top: {
    src: string;
    alt: string;
    id: number;
  };
  bottom: {
    src: string;
    alt: string;
    id: number;
  };
}

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const CommerceSr = () => {
  const initialPairs: ImagePair[] = [
    {
      top: { src: '/src/assets/img/время.svg', alt: 'Бизнес', id: 1 },
      bottom: { src: '/src/assets/img/карта5.svg', alt: 'Финансы', id: 1 }
    },
    {
      top: { src: '/src/assets/img/время2.svg', alt: 'Прогресс', id: 2 },
      bottom: { src: '/src/assets/img/карта9.svg', alt: 'Рост', id: 2 }
    },
    {
      top: { src: '/src/assets/img/время3.svg', alt: 'Прогресс', id: 3 },
      bottom: { src: '/src/assets/img/карта7.svg', alt: 'Рост', id: 3 }
    },
    {
      top: { src: '/src/assets/img/время4.svg', alt: 'Прогресс', id: 4 },
      bottom: { src: '/src/assets/img/карта3.svg', alt: 'Рост', id: 4 }
    },
    {
      top: { src: '/src/assets/img/время5.svg', alt: 'Прогресс', id: 5 },
      bottom: { src: '/src/assets/img/карта2.svg', alt: 'Рост', id: 5 }
    },
    {
      top: { src: '/src/assets/img/время6.svg', alt: 'Прогресс', id: 6 },
      bottom: { src: '/src/assets/img/карта4.svg', alt: 'Рост', id: 6 }
    },
    {
      top: { src: '/src/assets/img/время7.svg', alt: 'Прогресс', id: 7 },
      bottom: { src: '/src/assets/img/карта6.svg', alt: 'Рост', id: 7 }
    }
  ];

  const [shuffledPairs, setShuffledPairs] = useState<ImagePair[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const [correctOrder, setCorrectOrder] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 });
  const draggedCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = shuffleArray([...initialPairs]);
    setShuffledPairs(shuffled);
    setPositions(Array(shuffled.length).fill(0));
    setCorrectOrder(shuffled.map(pair => pair.top.id));
  }, []);

  const allCardsPlaced = positions.every(pos => pos !== 0);

  const handleTouchStart = (id: number) => (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setTouchStartPos({ 
      x: touch.clientX - rect.left, 
      y: touch.clientY - rect.top 
    });
    setActiveCard(id);
    
    if (draggedCardRef.current && target.firstChild) {
      const cardElement = target.firstChild as HTMLElement;
      const cardRect = cardElement.getBoundingClientRect();
      
      draggedCardRef.current.style.width = `${cardRect.width}px`;
      draggedCardRef.current.style.height = `${cardRect.height}px`;
      draggedCardRef.current.style.position = 'fixed';
      draggedCardRef.current.style.left = `${touch.clientX}px`;
      draggedCardRef.current.style.top = `${touch.clientY}px`;
      draggedCardRef.current.style.opacity = '0.8';
      draggedCardRef.current.style.zIndex = '1000';
      draggedCardRef.current.style.pointerEvents = 'none';
      draggedCardRef.current.style.transform = 'translate(-50%, -50%)';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!activeCard || !draggedCardRef.current) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    draggedCardRef.current.style.left = `${touch.clientX}px`;
    draggedCardRef.current.style.top = `${touch.clientY}px`;
  };

  const handleTouchEnd = (targetIndex: number) => (e: React.TouchEvent) => {
    if (!activeCard) return;
    
    const touch = e.changedTouches[0];
    const endPos = { x: touch.clientX, y: touch.clientY };
    
    // Находим все target контейнеры
    const targetContainers = document.querySelectorAll(`.${classes.targetContainer}`);
    
    // Проверяем, над каким контейнером отпустили карточку
    let targetContainerIndex = -1;
    targetContainers.forEach((container, index) => {
      const rect = container.getBoundingClientRect();
      if (
        endPos.x >= rect.left &&
        endPos.x <= rect.right &&
        endPos.y >= rect.top &&
        endPos.y <= rect.bottom
      ) {
        targetContainerIndex = index;
      }
    });
    
    // Если нашли контейнер, куда можно положить карточку
    if (targetContainerIndex !== -1) {
      const newPositions = [...positions];
      // Проверяем, что слот пустой или карточка уже там
      if (newPositions[targetContainerIndex] === 0 || newPositions[targetContainerIndex] !== activeCard) {
        newPositions[targetContainerIndex] = activeCard;
        setPositions(newPositions);
      }
    }
    
    // Сбрасываем стили перетаскиваемой карточки
    if (draggedCardRef.current) {
      draggedCardRef.current.style.position = '';
      draggedCardRef.current.style.left = '';
      draggedCardRef.current.style.top = '';
      draggedCardRef.current.style.opacity = '';
      draggedCardRef.current.style.zIndex = '';
      draggedCardRef.current.style.pointerEvents = '';
      draggedCardRef.current.style.transform = '';
    }
    
    setActiveCard(null);
  };

  const checkResults = () => {
    setAttempts(prev => prev + 1);
    if (JSON.stringify(positions) === JSON.stringify(correctOrder)) {
      setOpenIsCard(true);
    } else {
      const newPositions = positions.map((pos, idx) =>
        pos === correctOrder[idx] ? pos : 0
      );
      setPositions(newPositions);
    }
  };

  const handleDragStart = (id: number) => (e: React.DragEvent) => {
    e.dataTransfer.setData('cardId', id.toString());
  };

  const handleDrop = (targetIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = Number(e.dataTransfer.getData('cardId'));
    
    const newPositions = [...positions];
    newPositions[targetIndex] = cardId;
    setPositions(newPositions);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Логика при завершении перетаскивания
  };

  const resetPosition = (index: number) => {
    const newPositions = [...positions];
    newPositions[index] = 0;
    setPositions(newPositions);
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };
  
  const draggedCardIds = positions.filter(id => id !== 0);

  if (shuffledPairs.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={classes.container} ref={containerRef}>
      {/* Верхний ряд */}
      <div className={classes.topRow}>
        {shuffledPairs.map((pair) => (
          <div 
            key={`top-${pair.top.id}`}
            style={{ opacity: draggedCardIds.includes(pair.top.id) ? 0.5 : 1 }}
            onTouchStart={handleTouchStart(pair.top.id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd(-1)} // Передаем -1 как индекс, чтобы не помещать карточку
          >
            <ImageCard
              src={pair.top.src}
              alt={pair.top.alt}
              number={pair.top.id}
              draggable={true}
              onDragStart={handleDragStart(pair.top.id)}
              onDragEnd={handleDragEnd}
              className={classes.draggableCard}
            />
          </div>
        ))}
      </div>

      {/* Нижний ряд */}
      <div className={classes.bottomRow}>
        {shuffledPairs.map((pair, index) => {
          const matchedTopCard = positions[index] 
            ? shuffledPairs.find(p => p.top.id === positions[index])
            : null;

          return (
            <div 
              key={`bottom-${index}`} 
              className={classes.targetContainer}
              onTouchEnd={handleTouchEnd(index)}
              onTouchMove={handleTouchMove}
              onTouchCancel={() => setActiveCard(null)}
            >
              <ImageCard
                src={pair.bottom.src}
                alt={pair.bottom.alt}
                number={pair.bottom.id}
                onDrop={handleDrop(index)}
                onDragOver={(e: React.DragEvent) => e.preventDefault()}
                className={classes.baseCard}
                style={{ opacity: positions[index] !== 0 ? 0.5 : 1 }}
              />
              
              {positions[index] !== 0 && (
                <div className={classes.overlayCard}>
                  <ImageCard
                    src={matchedTopCard!.top.src}
                    alt={matchedTopCard!.top.alt}
                    number={matchedTopCard!.top.id}
                    onDragEnd={handleDragEnd}
                  />
                  <button 
                    onClick={() => resetPosition(index)}
                    className={classes.resetButton}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Перетаскиваемая карточка для touch-устройств */}
      {activeCard && (
        <div 
          ref={draggedCardRef}
          className={classes.draggedCard}
          style={{
            touchAction: 'none',
            willChange: 'transform'
          }}
        >
          <ImageCard
            src={shuffledPairs.find(p => p.top.id === activeCard)!.top.src}
            alt={shuffledPairs.find(p => p.top.id === activeCard)!.top.alt}
            number={activeCard}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      )}

      {/* Кнопка проверки */}
      {allCardsPlaced && (
        <div onClick={checkResults} className={classes.checkButton}>
          <Button bgColor="blue" type="type1v2">
            ПРОВЕРИТЬ
          </Button>
        </div>
      )}
      
      <div className={classes.backButton}>
        <Button
          bgColor="pink"
          type="type1v2"
          onClick={() => {
            localStorage.setItem('fromGame', 'true');
            navigate(RoutesEnum.TORGASHI);
          }}
        >
          НАЗАД
        </Button>
      </div>
      
      <CardFinish
        attempts={attempts}
        isOpenCard={openIsCard}
        onClose={handleCloseCard}
      />
    </div>
  );
};