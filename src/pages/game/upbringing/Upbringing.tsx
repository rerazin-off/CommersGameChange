import { useState, useEffect, useRef } from 'react';
import classes from './Upbringing.module.scss';
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
    matches: number[]; // IDs of top images that match this bottom image
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

export const Upbringing = () => {
  const initialPairs: ImagePair[] = [
    {
      top: { src: '/src/assets/img/upbring/pogrem.svg', alt: 'машинка', id: 1 },
      bottom: { 
        src: '/src/assets/img/upbring/frst.svg', 
        alt: 'первая категория', 
        id: 1,
        matches: [1, 2, 3] // машинка, игра, коврик
      }
    },
    {
      top: { src: '/src/assets/img/upbring/vis.svg', alt: 'игра', id: 2 },
      bottom: { 
        src: '/src/assets/img/upbring/frst.svg', 
        alt: 'первая категория', 
        id: 1,
        matches: [1, 2, 3]
      }
    },
    {
      top: { src: '/src/assets/img/upbring/kov.svg', alt: 'коврик', id: 3 },
      bottom: { 
        src: '/src/assets/img/upbring/frst.svg', 
        alt: 'первая категория', 
        id: 1,
        matches: [1, 2, 3]
      }
    },
    {
      top: { src: '/src/assets/img/upbring/kub.svg', alt: 'кубики', id: 4 },
      bottom: { 
        src: '/src/assets/img/upbring/scnd.svg', 
        alt: 'вторая категория', 
        id: 2,
        matches: [4, 5, 6] // кубики, лего, настольная игра
      }
    },
    {
      top: { src: '/src/assets/img/upbring/car.svg', alt: 'лего', id: 5 },
      bottom: { 
        src: '/src/assets/img/upbring/scnd.svg', 
        alt: 'вторая категория', 
        id: 2,
        matches: [4, 5, 6]
      }
    },
    {
      top: { src: '/src/assets/img/upbring/skaz.svg', alt: 'настольная игра', id: 6 },
      bottom: { 
        src: '/src/assets/img/upbring/scnd.svg', 
        alt: 'вторая категория', 
        id: 2,
        matches: [4, 5, 6]
      }
    },
    {
      top: { src: '/src/assets/img/upbring/lego.svg', alt: 'погремушка', id: 7 },
      bottom: { 
        src: '/src/assets/img/upbring/thd.svg', 
        alt: 'третья категория', 
        id: 3,
        matches: [7, 8, 9] // погремушка, сказка, вишня
      }
    },
    {
      top: { src: '/src/assets/img/upbring/nast.svg', alt: 'сказка', id: 8 },
      bottom: { 
        src: '/src/assets/img/upbring/thd.svg', 
        alt: 'третья категория', 
        id: 3,
        matches: [7, 8, 9]
      }
    },
    {
      top: { src: '/src/assets/img/upbring/game.svg', alt: 'вишня', id: 9 },
      bottom: { 
        src: '/src/assets/img/upbring/thd.svg', 
        alt: 'третья категория', 
        id: 3,
        matches: [7, 8, 9]
      }
    }
  ];

  const [shuffledPairs, setShuffledPairs] = useState<ImagePair[]>([]);
  const [positions, setPositions] = useState<number[][]>([[], [], []]);
  const [correctMatches, setCorrectMatches] = useState<{[key: number]: number[]}>({});
  const [attempts, setAttempts] = useState(0);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [lockedCards, setLockedCards] = useState<number[]>([]);
  const draggedCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const shuffled = shuffleArray([...initialPairs]);
    setShuffledPairs(shuffled);
    setPositions([[], [], []]);
    
    const matches: {[key: number]: number[]} = {};
    initialPairs.forEach(pair => {
      if (!matches[pair.bottom.id]) {
        matches[pair.bottom.id] = pair.bottom.matches;
      }
    });
    setCorrectMatches(matches);
    
    setLockedCards([]);
  }, []);

  const allCategoriesFilled = positions.every(pos => pos.length === 3);

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
      
      // Check if target position already has 3 cards
      if (newPositions[targetContainerIndex].length >= 3) {
        if (draggedCardRef.current) {
          draggedCardRef.current.style.display = 'none';
        }
        setActiveCard(null);
        touchStartPosRef.current = null;
        return;
      }
      
      // Remove card from its current position
      for (let i = 0; i < newPositions.length; i++) {
        const index = newPositions[i].indexOf(activeCard);
        if (index !== -1) {
          newPositions[i].splice(index, 1);
          break;
        }
      }
      
      newPositions[targetContainerIndex].push(activeCard);
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
    let allCorrect = true;
    
    positions.forEach((posArray, idx) => {
      const bottomId = idx + 1;
      
      const allCorrectForPosition = posArray.every(pos => 
        correctMatches[bottomId]?.includes(pos)
      );
      
      if (allCorrectForPosition) {
        posArray.forEach(cardId => {
          if (!newLockedCards.includes(cardId)) {
            newLockedCards.push(cardId);
          }
        });
      } else {
        allCorrect = false;
      }
    });
    
    setLockedCards(newLockedCards);
    
    if (allCorrect) {
      setOpenIsCard(true);
    } else {
      const newPositions = positions.map((posArray, idx) => {
        const bottomId = idx + 1;
        return posArray.filter(pos => 
          correctMatches[bottomId]?.includes(pos)
        );
      });
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
    
    if (isCardLocked(cardId)) {
      return;
    }
    
    const newPositions = [...positions];
    
    // Check if target position already has 3 cards
    if (newPositions[targetIndex].length >= 3) {
      return;
    }
    
    // Remove card from its current position
    for (let i = 0; i < newPositions.length; i++) {
      const index = newPositions[i].indexOf(cardId);
      if (index !== -1) {
        newPositions[i].splice(index, 1);
        break;
      }
    }
    
    newPositions[targetIndex].push(cardId);
    setPositions(newPositions);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setActiveCard(null);
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };
  
  const draggedCardIds = positions.flat();

  if (shuffledPairs.length === 0) {
    return <div>Загрузка...</div>;
  }

  const bottomImages = shuffledPairs.reduce((acc, pair) => {
    if (!acc.find(item => item.id === pair.bottom.id)) {
      acc.push(pair.bottom);
    }
    return acc;
  }, [] as {src: string; alt: string; id: number; matches: number[]}[]);

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
        {bottomImages.map((bottom, index) => {
          const positionCards = positions[index] || [];
          const isPositionFull = positionCards.length >= 3;
          
          return (
            <div 
              key={`bottom-${index}`} 
              className={classes.targetContainer}
              onDrop={handleDrop(index)}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <ImageCard
                src={bottom.src}
                alt={bottom.alt}
                number={bottom.id}
                className={classes.baseCard}
                style={{ 
                  transition: 'filter 0.3s ease'
                }}
              />
              
              {/* Render all cards in this position */}
              <div className={classes.overlayCardsContainer}>
                {positionCards.map((cardId, cardIndex) => {
                  const matchedTopCard = shuffledPairs.find(p => p.top.id === cardId);
                  if (!matchedTopCard) return null;
                  
                  // Calculate position for each card (3 cards in a row)
                  const cardStyle = {
                    position: 'absolute' as const,
                    left: `${(cardIndex % 3) * 33.33 + 1.66}%`,
                    top: cardIndex < 3 ? '45%' : '65%',
                    transform: 'translate(0%, -30%)',
                    zIndex: 2,
                    transition: 'all 0.3s ease',
                  };
                  
                  return (
                    <div 
                      key={`overlay-${index}-${cardId}`}
                      className={classes.overlayCard}
                      onTouchStart={handleTouchStart(cardId)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onTouchCancel={() => {
                        if (draggedCardRef.current) {
                          draggedCardRef.current.style.display = 'none';
                        }
                        setActiveCard(null);
                        touchStartPosRef.current = null;
                      }}
                      draggable={!isCardLocked(cardId)}
                      onDragStart={handleDragStart(cardId)}
                      onDragEnd={handleDragEnd}
                      style={{
                        ...cardStyle,
                        cursor: isCardLocked(cardId) ? 'not-allowed' : 'move'
                      }}
                    >
                      <ImageCard
                        src={matchedTopCard.top.src}
                        alt={matchedTopCard.top.alt}
                        number={matchedTopCard.top.id}
                        draggable={!isCardLocked(cardId)}
                        onDragStart={handleDragStart(matchedTopCard.top.id)}
                        onDragEnd={handleDragEnd}
                        style={{
                          
                          opacity: isCardLocked(cardId) ? 1 : 1,
                          transform: isCardLocked(cardId) ? 'scale(0.7)' : 'scale(0.7)'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              
              {/* Show message when position is full */}
              {isPositionFull && (
                <div style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'red',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  zIndex: 3
                }}>
                  Максимум 3 карточки
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
    {allCategoriesFilled && (
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