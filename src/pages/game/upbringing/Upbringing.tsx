import { useState, useEffect, useRef } from 'react';
import classes from './Upbringing.module.scss';
import ImageCard from './components/ImageCard'; 
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';
import CardFinish from './components/CardFinish';

interface ImageCard {
  src: string;
  alt: string;
  id: number;
}

interface BottomCard extends ImageCard {
  matches: number[]; // IDs of top images that match this bottom image
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
  // Нижние карточки (не перемешиваются)
  const bottomCards: BottomCard[] = [
    { 
      src: '/src/assets/img/upbring/frst.svg', 
      alt: 'первая категория', 
      id: 1,
      matches: [1, 2, 3] // машинка, игра, коврик
    },
    { 
      src: '/src/assets/img/upbring/scnd.svg', 
      alt: 'вторая категория', 
      id: 2,
      matches: [4, 5, 6] // кубики, лего, настольная игра
    },
    { 
      src: '/src/assets/img/upbring/thd.svg', 
      alt: 'третья категория', 
      id: 3,
      matches: [7, 8, 9] // погремушка, сказка, вишня
    }
  ];

  // Верхние карточки (будут перемешиваться)
  const initialTopCards: ImageCard[] = [
    { src: '/src/assets/img/upbring/pogrem.svg', alt: 'машинка', id: 1 },
    { src: '/src/assets/img/upbring/sos.svg', alt: 'игра', id: 2 },
    { src: '/src/assets/img/upbring/kov.svg', alt: 'коврик', id: 3 },
    { src: '/src/assets/img/upbring/kub.svg', alt: 'кубики', id: 4 },
    { src: '/src/assets/img/upbring/car.svg', alt: 'лего', id: 5 },
    { src: '/src/assets/img/upbring/skaz.svg', alt: 'настольная игра', id: 6 },
    { src: '/src/assets/img/upbring/lego.svg', alt: 'погремушка', id: 7 },
    { src: '/src/assets/img/upbring/nast.svg', alt: 'сказка', id: 8 },
    { src: '/src/assets/img/upbring/game.svg', alt: 'вишня', id: 9 }
  ];

  const [shuffledTopCards, setShuffledTopCards] = useState<ImageCard[]>([]);
  const [positions, setPositions] = useState<number[][]>([[], [], []]);
  const [attempts, setAttempts] = useState(0);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [lockedCards, setLockedCards] = useState<number[]>([]);
  const draggedCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setShuffledTopCards(shuffleArray([...initialTopCards]));
    setPositions([[], [], []]);
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
    
    // Определяем, над какой карточкой сейчас перемещение
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const overlayCard = elements.find(el => el.classList.contains(classes.overlayCard));
    if (overlayCard) {
      const cardId = parseInt(overlayCard.getAttribute('data-card-id') || '0');
      setHoveredCard(cardId);
    } else {
      setHoveredCard(null);
    }
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
      
      // Находим текущую позицию активной карточки
      let sourceContainerIndex = -1;
      let sourceCardIndex = -1;
      for (let i = 0; i < newPositions.length; i++) {
        const index = newPositions[i].indexOf(activeCard);
        if (index !== -1) {
          sourceContainerIndex = i;
          sourceCardIndex = index;
          break;
        }
      }
      
      // Если карточка перемещается в другую категорию
      if (sourceContainerIndex !== targetContainerIndex) {
        // Удаляем карточку из исходной позиции
        if (sourceContainerIndex !== -1) {
          newPositions[sourceContainerIndex].splice(sourceCardIndex, 1);
        }
        
        // Если в целевой категории уже 3 карточки, заменяем hovered карточку
        if (newPositions[targetContainerIndex].length >= 3 && hoveredCard) {
          const hoveredIndex = newPositions[targetContainerIndex].indexOf(hoveredCard);
          if (hoveredIndex !== -1) {
            // Возвращаем hovered карточку в исходную категорию
            if (sourceContainerIndex !== -1) {
              newPositions[sourceContainerIndex].push(hoveredCard);
            }
            // Заменяем hovered карточку на активную
            newPositions[targetContainerIndex][hoveredIndex] = activeCard;
          }
        } else {
          // Просто добавляем карточку в целевую категорию
          newPositions[targetContainerIndex].push(activeCard);
        }
      } else {
        // Если карточка перемещается внутри той же категории
        if (hoveredCard) {
          const hoveredIndex = newPositions[targetContainerIndex].indexOf(hoveredCard);
          if (hoveredIndex !== -1 && sourceCardIndex !== -1) {
            // Меняем местами карточки
            [newPositions[targetContainerIndex][sourceCardIndex], newPositions[targetContainerIndex][hoveredIndex]] = 
            [newPositions[targetContainerIndex][hoveredIndex], newPositions[targetContainerIndex][sourceCardIndex]];
          }
        }
      }
      
      setPositions(newPositions);
    }
    
    if (draggedCardRef.current) {
      draggedCardRef.current.style.display = 'none';
    }
    
    setActiveCard(null);
    setHoveredCard(null);
    touchStartPosRef.current = null;
  };

  const checkResults = () => {
    setAttempts(prev => prev + 1);
    const newLockedCards = [...lockedCards];
    let allCorrect = true;
    
    positions.forEach((posArray, idx) => {
      const bottomId = idx + 1;
      const correctMatches = bottomCards.find(b => b.id === bottomId)?.matches || [];
      
      const allCorrectForPosition = posArray.every(pos => 
        correctMatches.includes(pos)
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
        const correctMatches = bottomCards.find(b => b.id === bottomId)?.matches || [];
        return posArray.filter(pos => correctMatches.includes(pos));
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

  const handleDragOver = (e: React.DragEvent, cardId: number) => {
    e.preventDefault();
    if (activeCard !== cardId) {
      setHoveredCard(cardId);
    }
  };

  const handleDragLeave = () => {
    setHoveredCard(null);
  };

  const handleDrop = (targetIndex: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = Number(e.dataTransfer.getData('cardId'));
    
    if (isCardLocked(cardId)) {
      return;
    }
    
    const newPositions = [...positions];
    
    // Находим текущую позицию активной карточки
    let sourceContainerIndex = -1;
    let sourceCardIndex = -1;
    for (let i = 0; i < newPositions.length; i++) {
      const index = newPositions[i].indexOf(cardId);
      if (index !== -1) {
        sourceContainerIndex = i;
        sourceCardIndex = index;
        break;
      }
    }
    
    // Если карточка перемещается в другую категорию
    if (sourceContainerIndex !== targetIndex) {
      // Удаляем карточку из исходной позиции
      if (sourceContainerIndex !== -1) {
        newPositions[sourceContainerIndex].splice(sourceCardIndex, 1);
      }
      
      // Если в целевой категории уже 3 карточки, заменяем hovered карточку
      if (newPositions[targetIndex].length >= 3 && hoveredCard) {
        const hoveredIndex = newPositions[targetIndex].indexOf(hoveredCard);
        if (hoveredIndex !== -1) {
          // Возвращаем hovered карточку в исходную категорию
          if (sourceContainerIndex !== -1) {
            newPositions[sourceContainerIndex].push(hoveredCard);
          }
          // Заменяем hovered карточку на активную
          newPositions[targetIndex][hoveredIndex] = cardId;
        }
      } else {
        // Просто добавляем карточку в целевую категорию
        newPositions[targetIndex].push(cardId);
      }
    } else {
      // Если карточка перемещается внутри той же категории
      if (hoveredCard) {
        const hoveredIndex = newPositions[targetIndex].indexOf(hoveredCard);
        if (hoveredIndex !== -1 && sourceCardIndex !== -1) {
          // Меняем местами карточки
          [newPositions[targetIndex][sourceCardIndex], newPositions[targetIndex][hoveredIndex]] = 
          [newPositions[targetIndex][hoveredIndex], newPositions[targetIndex][sourceCardIndex]];
        }
      }
    }
    
    setPositions(newPositions);
    setHoveredCard(null);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setActiveCard(null);
    setHoveredCard(null);
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };
  
  const draggedCardIds = positions.flat();

  if (shuffledTopCards.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={classes.container} ref={containerRef}>
      {/* Верхний ряд - перемешанные карточки */}
      <div className={classes.topRow}>
        {shuffledTopCards.map((card) => (
          <div 
            key={`top-${card.id}`}
            style={{ 
              display: draggedCardIds.includes(card.id) ? 'none' : 'block',
              opacity: isCardLocked(card.id) ? 0.5 : 1
            }}
            onTouchStart={handleTouchStart(card.id)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              if (draggedCardRef.current) {
                draggedCardRef.current.style.display = 'none';
              }
              setActiveCard(null);
              setHoveredCard(null);
              touchStartPosRef.current = null;
            }}
            draggable={!isCardLocked(card.id)}
            onDragStart={handleDragStart(card.id)}
            onDragEnd={handleDragEnd}
          >
            <ImageCard
              src={card.src}
              alt={card.alt}
              number={card.id}
              draggable={!isCardLocked(card.id)}
              onDragStart={handleDragStart(card.id)}
              onDragEnd={handleDragEnd}
              className={classes.draggableCard}
            />
          </div>
        ))}
      </div>

      {/* Нижний ряд - фиксированные категории */}
      <div className={classes.bottomRow}>
        {bottomCards.map((bottom, index) => {
          const positionCards = positions[index] || [];
          
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
              
              <div className={classes.overlayCardsContainer}>
                {positionCards.map((cardId, cardIndex) => {
                  const matchedTopCard = shuffledTopCards.find(p => p.id === cardId);
                  if (!matchedTopCard) return null;
                  
                const cardStyle = {
  position: 'absolute' as const,
  left: `${(cardIndex % 3) * 33.33 + 1.66}%`,
  top: cardIndex < 3 ? '45%' : '65%',
  transform: hoveredCard === cardId ? 'translate(0%, -30%) scale(1)' : 'translate(0%, -30%) scale(1)',
  zIndex: 2,
  transition: 'all 0.3s ease',
  opacity: hoveredCard === cardId ? 0.7 : 1
};
                  
                  return (
                    <div 
                      key={`overlay-${index}-${cardId}`}
                      className={classes.overlayCard}
                      data-card-id={cardId}
                      onTouchStart={handleTouchStart(cardId)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onTouchCancel={() => {
                        if (draggedCardRef.current) {
                          draggedCardRef.current.style.display = 'none';
                        }
                        setActiveCard(null);
                        setHoveredCard(null);
                        touchStartPosRef.current = null;
                      }}
                      draggable={!isCardLocked(cardId)}
                      onDragStart={handleDragStart(cardId)}
                      onDragOver={(e) => handleDragOver(e, cardId)}
                      onDragLeave={handleDragLeave}
                      onDragEnd={handleDragEnd}
                      style={{
                        ...cardStyle,
                        cursor: isCardLocked(cardId) ? 'not-allowed' : 'move'
                      }}
                    >
                      <ImageCard
                        src={matchedTopCard.src}
                        alt={matchedTopCard.alt}
                        number={matchedTopCard.id}
                        draggable={!isCardLocked(cardId)}
                        onDragStart={handleDragStart(matchedTopCard.id)}
                        onDragEnd={handleDragEnd}
                        style={{
                          opacity: isCardLocked(cardId) ? 1 : 1,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

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
            src={shuffledTopCards.find(p => p.id === activeCard)!.src}
            alt={shuffledTopCards.find(p => p.id === activeCard)!.alt}
            number={activeCard}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>

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