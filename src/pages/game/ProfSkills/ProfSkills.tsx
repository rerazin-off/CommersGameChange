import { useState, useEffect, useRef } from 'react';
import './RelaxRoom.scss';


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

const ProfSkills = () => {
  const initialPairs: ImagePair[] = [
    {
      top: { src: 'src/assets/img/game_assets/relax-room/1.svg', alt: 'время', id: 1 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k1.svg', alt: 'карта', id: 1 }
    },
    {
      top: { src: 'src/assets/img/game_assets/relax-room/2.svg', alt: 'время', id: 2 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k2.svg', alt: 'карта', id: 2 }
    },
    {
      top: { src: 'src/assets/img/game_assets/relax-room/3.svg', alt: 'время', id: 3 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k3.svg', alt: 'карта', id: 3 }
    },
    {
      top: { src: 'src/assets/img/game_assets/relax-room/4.svg', alt: 'время', id: 4 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k4.svg', alt: 'карта', id: 4 }
    },
    {
      top: { src: 'src/assets/img/game_assets/relax-room/5.svg', alt: 'время', id: 5 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k5.svg', alt: 'карта', id: 5 }
    },
    {
      top: { src: 'src/assets/img/game_assets/relax-room/6.svg', alt: 'время', id: 6 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k6.svg', alt: 'карта', id: 6 }
    },
    {
      top: { src: 'src/assets/img/game_assets/relax-room/7.svg', alt: 'время', id: 7 },
      bottom: { src: 'src/assets/img/game_assets/relax-room/k7.svg', alt: 'карта', id: 7 }
    }
  ];

  const [shuffledPairs, setShuffledPairs] = useState<ImagePair[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const [correctOrder, setCorrectOrder] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [lockedCards, setLockedCards] = useState<number[]>([]); // Новое состояние для заблокированных карточек
  const draggedCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const shuffled = shuffleArray([...initialPairs]);
    setShuffledPairs(shuffled);
    setPositions(Array(shuffled.length).fill(0));
    setCorrectOrder(shuffled.map(pair => pair.top.id));
    setLockedCards([]);
  }, []);

  const allCardsPlaced = positions.every(pos => pos !== 0);

  const isCardLocked = (cardId: number) => {
    return lockedCards.includes(cardId);
  };

  const handleTouchStart = (id: number) => (e: React.TouchEvent) => {
    if (isCardLocked(id)) return;
    
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    setActiveCard(id);
    
    if (draggedCardRef.current) {
      const target = e.currentTarget as HTMLElement;
      const cardElement = target.firstChild as HTMLElement;
      const cardRect = cardElement.getBoundingClientRect();
      
      draggedCardRef.current.style.width = `${cardRect.width}px`;
      draggedCardRef.current.style.height = `${cardRect.height}px`;
      draggedCardRef.current.style.position = 'fixed';
      draggedCardRef.current.style.left = `${touch.clientX}px`;
      draggedCardRef.current.style.top = `${touch.clientY}px`;
      draggedCardRef.current.style.transform = 'translate(-50%, -50%)';
      draggedCardRef.current.style.opacity = '0.8';
      draggedCardRef.current.style.zIndex = '1000';
      draggedCardRef.current.style.pointerEvents = 'none';
      draggedCardRef.current.style.transition = 'none';
      draggedCardRef.current.style.display = 'block';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!activeCard || !draggedCardRef.current || !touchStartPosRef.current || isCardLocked(activeCard)) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    draggedCardRef.current.style.left = `${touch.clientX}px`;
    draggedCardRef.current.style.top = `${touch.clientY}px`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!activeCard || isCardLocked(activeCard)) return;
    
    const touch = e.changedTouches[0];
    const endPos = { x: touch.clientX, y: touch.clientY };
    
    const targetContainers = document.querySelectorAll(`.${classes.targetContainer}`);
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
    
    if (targetContainerIndex !== -1) {
      const newPositions = [...positions];
      const currentPositionIndex = newPositions.findIndex(pos => pos === activeCard);
      
      // Если целевое место уже заблокировано, ничего не делаем
      if (lockedCards.includes(newPositions[targetContainerIndex])) {
        if (draggedCardRef.current) {
          draggedCardRef.current.style.display = 'none';
        }
        setActiveCard(null);
        touchStartPosRef.current = null;
        return;
      }
      
      // Если на целевом месте уже есть карточка, меняем их местами
      if (newPositions[targetContainerIndex] !== 0) {
        // Если карточка перемещается с верхнего ряда
        if (currentPositionIndex === -1) {
          newPositions[targetContainerIndex] = activeCard;
        } 
        // Если карточка перемещается с другого нижнего места
        else {
          const temp = newPositions[targetContainerIndex];
          newPositions[targetContainerIndex] = activeCard;
          newPositions[currentPositionIndex] = temp;
        }
      } 
      // Если целевое место пустое
      else {
        // Если карточка перемещается с другого нижнего места
        if (currentPositionIndex !== -1) {
          newPositions[currentPositionIndex] = 0;
        }
        newPositions[targetContainerIndex] = activeCard;
      }
      
      setPositions(newPositions);
    }
    
    if (draggedCardRef.current) {
      draggedCardRef.current.style.display = 'none';
      draggedCardRef.current.style.position = '';
      draggedCardRef.current.style.left = '';
      draggedCardRef.current.style.top = '';
      draggedCardRef.current.style.opacity = '';
      draggedCardRef.current.style.zIndex = '';
      draggedCardRef.current.style.pointerEvents = '';
      draggedCardRef.current.style.transform = '';
      draggedCardRef.current.style.transition = '';
    }
    
    setActiveCard(null);
    touchStartPosRef.current = null;
  };

  const checkResults = () => {
    setAttempts(prev => prev + 1);
    const newLockedCards = [...lockedCards];
    
    // Блокируем правильно размещенные карточки
    positions.forEach((pos, idx) => {
      if (pos === correctOrder[idx] && !lockedCards.includes(pos)) {
        newLockedCards.push(pos);
      }
    });
    
    setLockedCards(newLockedCards);
    
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
    if (isCardLocked(id)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('cardId', id.toString());
    setActiveCard(id);
  };

  const handleDrop = (targetIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = Number(e.dataTransfer.getData('cardId'));
    
    if (isCardLocked(cardId) || lockedCards.includes(positions[targetIndex])) {
      return;
    }
    
    const newPositions = [...positions];
    const currentPositionIndex = newPositions.findIndex(pos => pos === cardId);
    
    if (newPositions[targetIndex] !== 0) {
      if (currentPositionIndex === -1) {
        newPositions[targetIndex] = cardId;
      } else {
        const temp = newPositions[targetIndex];
        newPositions[targetIndex] = cardId;
        newPositions[currentPositionIndex] = temp;
      }
    } else {
      if (currentPositionIndex !== -1) {
        newPositions[currentPositionIndex] = 0;
      }
      newPositions[targetIndex] = cardId;
    }
    
    setPositions(newPositions);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setActiveCard(null);
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
            style={{ 
              display: draggedCardIds.includes(pair.top.id) ? 'none' : 'block',
              opacity: isCardLocked(pair.top.id) ? 0.5 : 1
            }}
            onTouchStart={handleTouchStart(pair.top.id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              if (draggedCardRef.current) {
                draggedCardRef.current.style.display = 'none';
              }
              setActiveCard(null);
              touchStartPosRef.current = null;
            }}
            draggable={!isCardLocked(pair.top.id)}
            onDragStart={handleDragStart(pair.top.id)}
            onDragEnd={handleDragEnd}
          >
            <ImageCard
              src={pair.top.src}
              alt={pair.top.alt}
              number={pair.top.id}
              draggable={!isCardLocked(pair.top.id)}
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
              onDrop={handleDrop(index)}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
            >
              <ImageCard
                src={pair.bottom.src}
                alt={pair.bottom.alt}
                number={pair.bottom.id}
                className={classes.baseCard}
                style={{ opacity: positions[index] !== 0 ? 0.5 : 1 }}
              />
              
              {positions[index] !== 0 && (
                <div 
                  className={classes.overlayCard}
                  onTouchStart={handleTouchStart(positions[index])}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={() => {
                    if (draggedCardRef.current) {
                      draggedCardRef.current.style.display = 'none';
                    }
                    setActiveCard(null);
                    touchStartPosRef.current = null;
                  }}
                  draggable={!isCardLocked(positions[index])}
                  onDragStart={handleDragStart(positions[index])}
                  onDragEnd={handleDragEnd}
                  style={{
                    cursor: isCardLocked(positions[index]) ? 'not-allowed' : 'move'
                  }}
                >
                  <ImageCard
                    src={matchedTopCard!.top.src}
                    alt={matchedTopCard!.top.alt}
                    number={matchedTopCard!.top.id}
                    draggable={!isCardLocked(positions[index])}
                    onDragStart={handleDragStart(matchedTopCard!.top.id)}
                    onDragEnd={handleDragEnd}
                    style={{
                      opacity: isCardLocked(positions[index]) ? 1 : 1,
                      margin: '0 auto'
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Перетаскиваемая карточка для touch-устройств */}
      <div 
        ref={draggedCardRef}
        className={classes.draggedCard}
        style={{
          display: 'none',
          touchAction: 'none',
          willChange: 'transform'
        }}
      >
        {activeCard && !isCardLocked(activeCard) && (
          <ImageCard
            src={shuffledPairs.find(p => p.top.id === activeCard)!.top.src}
            alt={shuffledPairs.find(p => p.top.id === activeCard)!.top.alt}
            number={activeCard}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>

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
            navigate(RoutesEnum.PSIH);
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

export default ProfSkills;