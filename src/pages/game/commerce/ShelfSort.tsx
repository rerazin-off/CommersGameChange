import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Commerce_2.module.scss';
import CardFinish from './components/CardFinish/CardFinish';
import { Button } from '../../../components/Button/Button';

enum RoutesEnum {
  TORGASHI = '/tovaroveds'
}

interface Product {
  src: string;
  alt: string;
  category: string;
}

interface Refrigerator {
  src: string;
  alt: string;
  categories: string[];
}

interface MatchedItem {
  productIndex: number;
  refrigeratorIndex: number;
  isCorrect: boolean;
}

interface ImageCardProps {
  src: string;
  alt: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
  isMatched?: boolean;
  style?: React.CSSProperties;
  isCorrect?: boolean;
  onClick?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  draggable = false,
  onDragStart = () => {},
  onDrop = () => {},
  onDragOver = () => {},
  onTouchStart = () => {},
  onTouchMove = () => {},
  onTouchEnd = () => {},
  isMatched = false,
  isCorrect = true,
  style = {},
  onClick = () => {}
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
      style={{
        height: '180px',
        width: '180px',
        position: 'relative',
        margin: '15px',
        cursor: draggable ? 'grab' : 'default',
        opacity: isMatched ? 0.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        touchAction: 'none',
        ...style
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '16px',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

const ShelfSort: React.FC = () => {
  const navigate = useNavigate();
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [allProductsMatched, setAllProductsMatched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const touchCloneRef = useRef<HTMLDivElement | null>(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const touchOffset = useRef({ x: 0, y: 0 });
  const draggedProductIndex = useRef<number | null>(null);
  const draggedFromRefrigeratorIndex = useRef<number | null>(null);
  const draggedFromPurpleZone = useRef<boolean>(false);
  const isDragging = useRef(false);
  const lastTouchMoveTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const products: Product[] = [
    { src: '/src/assets/img/commerce_img/img_2/k.png', alt: 'k1', category: 'k' },
    { src: '/src/assets/img/commerce_img/img_2/m1.png', alt: 'm1', category: 'm' },
    { src: '/src/assets/img/commerce_img/img_2/r.png', alt: 'r1', category: 'r' },
    { src: '/src/assets/img/commerce_img/img_2/k2.png', alt: 'k2', category: 'k' },
    { src: '/src/assets/img/commerce_img/img_2/r2.png', alt: 'r2', category: 'r' },
    { src: '/src/assets/img/commerce_img/img_2/r3.png', alt: 'r3', category: 'r' },
    { src: '/src/assets/img/commerce_img/img_2/s1.png', alt: 's1', category: 's' },
    { src: '/src/assets/img/commerce_img/img_2/k3.png', alt: 'k3', category: 'k' },
    { src: '/src/assets/img/commerce_img/img_2/s2.png', alt: 's2', category: 's' },
    { src: '/src/assets/img/commerce_img/img_2/m2.png', alt: 'm2', category: 'm' },
    { src: '/src/assets/img/commerce_img/img_2/s3.png', alt: 's3', category: 's' },
    { src: '/src/assets/img/commerce_img/img_2/m3.png', alt: 'm3', category: 'm' },
  ];

  const refrigerators: Refrigerator[] = [
    { src: '/src/assets/img/commerce_img/img_2/b1 (1).svg', alt: 'Крупы', categories: ['k'] },
    { src: '/src/assets/img/commerce_img/img_2/b2.svg', alt: 'Рыбка', categories: ['r'] },
    { src: '/src/assets/img/commerce_img/img_2/b3.svg', alt: 'Сладкое', categories: ['s'] },
    { src: '/src/assets/img/commerce_img/img_2/b4.svg', alt: 'Молоко', categories: ['m'] },
  ];

  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
  const [productsInPurpleZone, setProductsInPurpleZone] = useState<number[]>([]);

  useEffect(() => {
    const allPlaced = matchedItems.length + productsInPurpleZone.length === products.length;
    setAllProductsMatched(allPlaced);
    setIsVisibleButton(matchedItems.length === products.length);

    const allCorrect = matchedItems.length === products.length &&
      matchedItems.every(item => item.isCorrect);
    setIsCompleted(allCorrect);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (touchCloneRef.current && touchCloneRef.current.parentNode) {
        touchCloneRef.current.parentNode.removeChild(touchCloneRef.current);
      }
    };
  }, [matchedItems, productsInPurpleZone, products.length]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, productIndex: number, fromRefrigerator?: number) => {
    e.dataTransfer.setData('productIndex', productIndex.toString());
    if (fromRefrigerator !== undefined) {
      e.dataTransfer.setData('fromRefrigerator', fromRefrigerator.toString());
    }
    draggedProductIndex.current = productIndex;
    draggedFromRefrigeratorIndex.current = fromRefrigerator;

    if (productsInPurpleZone.includes(productIndex)) {
      setProductsInPurpleZone(prev => prev.filter(index => index !== productIndex));
      draggedFromPurpleZone.current = true;
    } else {
      draggedFromPurpleZone.current = false;
    }

    setErrorMessage(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, productIndex: number, fromRefrigerator?: number) => {
    if (isDragging.current) return;
    isDragging.current = true;

    const touch = e.touches[0];
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    // Remove any existing clone
    if (touchCloneRef.current) {
      document.body.removeChild(touchCloneRef.current);
      touchCloneRef.current = null;
    }

    // Create new clone with optimized styles
    const clone = document.createElement('div');
    clone.style.position = 'fixed';
    clone.style.zIndex = '1000';
    clone.style.pointerEvents = 'none';
    clone.style.transform = 'translate3d(0, 0, 0) scale(1.1)';
    clone.style.willChange = 'transform';
    clone.style.transition = 'none';
    clone.style.width = '180px';
    clone.style.height = '180px';
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.display = 'flex';
    clone.style.justifyContent = 'center';
    clone.style.alignItems = 'center';
    clone.style.touchAction = 'none';
    clone.style.backfaceVisibility = 'hidden';
    clone.style.perspective = '1000px';

    const img = document.createElement('img');
    img.src = products[productIndex].src;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '16px';
    img.style.pointerEvents = 'none';
    clone.appendChild(img);

    document.body.appendChild(clone);
    touchCloneRef.current = clone;

    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    touchOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };

    draggedProductIndex.current = productIndex;
    draggedFromRefrigeratorIndex.current = fromRefrigerator;

    if (productsInPurpleZone.includes(productIndex)) {
      setProductsInPurpleZone(prev => prev.filter(index => index !== productIndex));
      draggedFromPurpleZone.current = true;
    } else {
      draggedFromPurpleZone.current = false;
    }

    setErrorMessage(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || !touchCloneRef.current) return;
    
    const now = performance.now();
    if (now - lastTouchMoveTime.current < 16) return; // Limit to ~60fps
    lastTouchMoveTime.current = now;

    const touch = e.touches[0];
    const clone = touchCloneRef.current;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    animationFrameId.current = requestAnimationFrame(() => {
      clone.style.transform = `translate3d(${touch.clientX - touchStartPos.current.x + touchOffset.current.x}px, ${
        touch.clientY - touchStartPos.current.y + touchOffset.current.y
      }px, 0) scale(1.1)`;
    });

    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (touchCloneRef.current && draggedProductIndex.current !== null) {
      const touch = e.changedTouches[0];
      const clone = touchCloneRef.current;
      
      // Use document.elementsFromPoint for better accuracy
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
      let dropTarget = null;
      
      for (const el of elements) {
        if (el.hasAttribute('blocks-refrigerator')) {
          dropTarget = el;
          break;
        }
        if (el.closest('[blocks-purple-zone]')) {
          dropTarget = el.closest('[blocks-purple-zone]');
          break;
        }
      }

      if (dropTarget) {
        if (dropTarget.hasAttribute('blocks-refrigerator')) {
          const refrigeratorIndex = parseInt(dropTarget.getAttribute('blocks-refrigerator') || '0');
          handleDropOnRefrigerator(refrigeratorIndex);
        } else if (dropTarget.hasAttribute('blocks-purple-zone')) {
          handleDropOnPurpleZone();
        } else if (draggedFromRefrigeratorIndex.current !== null) {
          handleDropOnPurpleZone();
        }
      }

      // Smooth removal of clone
      if (clone && clone.parentNode) {
        clone.style.transition = 'opacity 0.2s ease-out';
        clone.style.opacity = '0';
        setTimeout(() => {
          if (clone.parentNode) {
            clone.parentNode.removeChild(clone);
          }
        }, 200);
      }
      touchCloneRef.current = null;
    }
    
    draggedProductIndex.current = null;
    draggedFromRefrigeratorIndex.current = null;
    draggedFromPurpleZone.current = false;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const handleDropOnRefrigerator = (refrigeratorIndex: number) => {
    if (draggedProductIndex.current !== null) {
      const productIndex = draggedProductIndex.current;
      const product = products[productIndex];
      const refrigerator = refrigerators[refrigeratorIndex];

      const isCorrectPlacement = refrigerator.categories.includes(product.category);

      if (draggedFromRefrigeratorIndex.current !== null) {
        setMatchedItems(prev => [
          ...prev.filter(item => item.productIndex !== productIndex),
          { productIndex, refrigeratorIndex, isCorrect: isCorrectPlacement }
        ]);
      } else {
        setMatchedItems(prev => [
          ...prev,
          { productIndex, refrigeratorIndex, isCorrect: isCorrectPlacement }
        ]);
      }
    }
  };

  const handleDropOnPurpleZone = () => {
    if (draggedProductIndex.current !== null) {
      const productIndex = draggedProductIndex.current;

      if (draggedFromRefrigeratorIndex.current !== null) {
        setMatchedItems(prev => prev.filter(item => item.productIndex !== productIndex));
        setProductsInPurpleZone(prev => [...prev, productIndex]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const refrigeratorIndex = parseInt(e.currentTarget.getAttribute('blocks-refrigerator') || '0');
    handleDropOnRefrigerator(refrigeratorIndex);
  };

  const removeFromRefrigerator = (productIndex: number) => {
    setMatchedItems(prev => prev.filter(item => item.productIndex !== productIndex));
    setProductsInPurpleZone(prev => [...prev, productIndex]);
  };

  const checkResults = () => {
    const incorrectItems = matchedItems.filter(item => !item.isCorrect);
    const correctItems = matchedItems.filter(item => item.isCorrect);

    setCorrectAttempts(correctItems.length);
    setIncorrectAttempts(incorrectItems.length);
    setAttempts(prev => prev + 1);

    if (incorrectItems.length > 0) {
      const incorrectProductIndexes = incorrectItems.map(item => item.productIndex);
      setMatchedItems(correctItems);
      setProductsInPurpleZone(prev => {
        const existingIndexes = new Set(prev);
        const newIndexes = incorrectProductIndexes.filter(index => !existingIndexes.has(index));
        return [...prev, ...newIndexes];
      });
    }

    if (matchedItems.length === products.length && matchedItems.every(item => item.isCorrect)) {
      setOpenIsCard(true);
    }
  };

  const resetGame = () => {
    setMatchedItems([]);
    setProductsInPurpleZone([]);
    setAttempts(0);
    setCorrectAttempts(0);
    setIncorrectAttempts(0);
    setErrorMessage(null);
    setIsCompleted(false);
    setOpenIsCard(false);
  };

  const isProductMatched = (productIndex: number) => {
    return matchedItems.some(item => item.productIndex === productIndex);
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };

  return (
    <div style={{
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(to bottom, #0E0430, #7B74EB)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      paddingTop: '80px',
      paddingBottom: '80px'
    }}>
      {errorMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 1000,
          animation: 'fadeIn 0.3s'
        }}>
          {errorMessage}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '-10px',
        height: '700px'
      }}>
        <div
          style={{
            flex: '1',
            backgroundColor: 'rgba(255, 192, 203, 0.2)',
            padding: '20px',
            borderRadius: '20px',
            maxWidth: '800px',
            height: '895px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            alignItems: 'center',
            marginLeft: '30px',
            transform: 'translate(0px, -50px)',
            backdropFilter: 'blur(5px)',
          }}
          onDrop={(e) => {
            e.preventDefault();
            handleDropOnPurpleZone();
          }}
          onDragOver={handleDragOver}
          data-purple-zone="true"
        >
          <h2 style={{
            fontSize: '30px',
            marginBottom: '20px',
            textAlign: 'center',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            ОБОРУДОВАНИЕ
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: 'calc(100% - 60px)',
            width: '100%',
            padding: '10px'
          }}>
            {products.map((product, productIndex) => (
              !isProductMatched(productIndex) && !productsInPurpleZone.includes(productIndex) ? (
                <ImageCard
                  key={`product-${productIndex}`}
                  src={product.src}
                  alt={product.alt}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, productIndex)}
                  onTouchStart={(e) => handleTouchStart(e, productIndex)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              ) : productsInPurpleZone.includes(productIndex) ? (
                <ImageCard
                  key={`product-purple-${productIndex}`}
                  src={product.src}
                  alt={product.alt}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, productIndex)}
                  onTouchStart={(e) => handleTouchStart(e, productIndex)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />
              ) : null
            ))}
          </div>
        </div>

        <div
          style={{
            flex: '1',
            maxWidth: '950px',
            position: 'relative',
            marginRight: '20px'
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
            height: '100%'
          }}>
            {refrigerators.map((refrigerator, refrigeratorIndex) => {
              const itemsInRefrigerator = matchedItems.filter(item =>
                item.refrigeratorIndex === refrigeratorIndex
              );

              return (
                <div
                  key={`refrigerator-${refrigeratorIndex}`}
                  data-refrigerator={refrigeratorIndex}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '450px',
                    width: "450px",
                    position: 'relative',
                    zIndex: 1,
                    padding: '0',
                    transform: 'translate(-70px, -20px)',
                    background: 'transparent',
                    borderRadius: '0',
                  }}
                >
                  <div
                    style={{
                      width: '420px',
                      height: '420px',
                      marginBottom: '10px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={refrigerator.src}
                      alt={refrigerator.alt}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '16px'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      width: '100%',
                      padding: '10px',
                      gap: '10px'
                    }}>
                      {itemsInRefrigerator.map((item, idx) => (
                        <ImageCard
                          key={`matched-${refrigeratorIndex}-${idx}`}
                          src={products[item.productIndex].src}
                          alt={products[item.productIndex].alt}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, item.productIndex, refrigeratorIndex)}
                          onTouchStart={(e) => handleTouchStart(e, item.productIndex, refrigeratorIndex)}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                          onClick={() => removeFromRefrigerator(item.productIndex)}
                          style={{
                            width: '100px',
                            height: '100px',
                            margin: '5px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isVisibleButton && (
        <div onClick={checkResults} className={classes.checkButton} style={{ marginTop: '30px' }}>
          <Button bgColor="blue" type="type1v2" style={{ fontSize: '20px', padding: '15px 30px' }}>
            Проверить
          </Button>
        </div>
      )}

      <div className={classes.backButton} style={{ marginTop: '30px', marginBottom: '30px' }}>
        <Button
          bgColor="pink"
          type="type1v2"
          onClick={() => {
            localStorage.setItem('fromGame', 'true');
            navigate(RoutesEnum.TORGASHI);
          }}
          style={{ fontSize: '20px', padding: '15px 30px' }}
        >
          НАЗАД
        </Button>
      </div>

      {isCompleted && (
        <CardFinish
          attempts={attempts}
          correctAttempts={correctAttempts}
          incorrectAttempts={incorrectAttempts}
          isOpenCard={openIsCard}
          onClose={handleCloseCard}
          onReset={resetGame}
        />
      )}
    </div>
  );
};

export default ShelfSort;