import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Commerce.module.scss';
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
  onDragStart?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  isMatched?: boolean;
  style?: React.CSSProperties;
  isCorrect?: boolean;
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
                                               style = {}
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
      style={{
        height: '110px',
        width: '110px',
        position: 'relative',
        margin: '7px',
        cursor: draggable ? 'grab' : 'default',
        opacity: isMatched ? 0.5 : 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: !isCorrect ? '3px solid red' : 'none',
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
          borderRadius: '12px',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          marginRight: '0px'
        }}
      />
    </div>
  );
};

const CommercePlayGame: React.FC = () => {
  const navigate = useNavigate();
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [allProductsMatched, setAllProductsMatched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [touchActive, setTouchActive] = useState<{
    productIndex: number;
    element: HTMLElement;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const products: Product[] = [
    { src: '/src/assets/img/commerce_img/sok (1).png', alt: 'сок1', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/meal (4).png', alt: 'мука 4', category: 'grocery' },
    { src: '/src/assets/img/commerce_img/milk (2).png', alt: 'молоко 2', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/sok (4).png', alt: 'сок4', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/milk (3).png', alt: 'молоко 3', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/coffe3.png', alt: 'кофе 3', category: 'grocery3' },
    { src: '/src/assets/img/commerce_img/milk (4).png', alt: 'молоко 4', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/fish (1).png', alt: 'рыбка 1', category: 'fish' },
    { src: '/src/assets/img/commerce_img/sok (3).png', alt: 'сок3', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/fish (2).png', alt: 'рыбка 2', category: 'fish' },
    { src: '/src/assets/img/commerce_img/mak (1).png', alt: 'макароны 1', category: 'grocery1' },
    { src: '/src/assets/img/commerce_img/sok (2).png', alt: 'сок2', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/mak (2).png', alt: 'макароны 2', category: 'grocery1' },
    { src: '/src/assets/img/commerce_img/fish (3).png', alt: 'рыбка 3', category: 'fish' },
    { src: '/src/assets/img/commerce_img/mak (4).png', alt: 'макароны 4', category: 'grocery1' },
    { src: '/src/assets/img/commerce_img/meal (1).png', alt: 'мука 1', category: 'grocery' },
    { src: '/src/assets/img/commerce_img/meal (2).png', alt: 'мука 2', category: 'grocery' },
    { src: '/src/assets/img/commerce_img/fish (4).png', alt: 'рыбка 4', category: 'fish' },
    { src: '/src/assets/img/commerce_img/meal (3).png', alt: 'мука 3', category: 'grocery' },
    { src: '/src/assets/img/commerce_img/kryp (1).png', alt: 'крупы 1', category: 'grocery2' },
    { src: '/src/assets/img/commerce_img/mak (3).png', alt: 'макароны 3', category: 'grocery1' },
    { src: '/src/assets/img/commerce_img/kryp (2).png', alt: 'крупы 2', category: 'grocery2' },
    { src: '/src/assets/img/commerce_img/milk (1).png', alt: 'молоко 1', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/kryp (3).png', alt: 'крупы 3', category: 'grocery2' },
    { src: '/src/assets/img/commerce_img/coffe.png', alt: 'кофе 1', category: 'grocery3' },
    { src: '/src/assets/img/commerce_img/coffe2.png', alt: 'кофе 2', category: 'grocery3' },
    { src: '/src/assets/img/commerce_img/kryp (4).png', alt: 'крупы 4', category: 'grocery2' },
    { src: '/src/assets/img/commerce_img/coffe4.png', alt: 'кофе 4', category: 'grocery3' },
  ];

  const refrigerators: Refrigerator[] = [
    { src: '/src/assets/img/commerce_img/1.svg', alt: 'Холодильник для напитков', categories: ['drinks'] },
    { src: '/src/assets/img/commerce_img/9.png', alt: 'Холодильник для молочной продукции', categories: ['dairy'] },
    { src: '/src/assets/img/commerce_img/14.png', alt: 'Холодильник для рыбы', categories: ['fish'] },
    { src: '/src/assets/img/commerce_img/gorkka2.png', alt: 'Стеллаж для продуктов', categories: ['grocery', 'grocery1', 'grocery2', 'grocery3'] },
  ];

  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ productIndex: number } | null>(null);
  const [productsInPurpleZone, setProductsInPurpleZone] = useState<number[]>([]);

  useEffect(() => {
    const allFilled = refrigerators.every((_, index) =>
      matchedItems.filter(item => item.refrigeratorIndex === index).length >= 4
    );
    const allPlaced = matchedItems.length + productsInPurpleZone.length === products.length;
    setAllProductsMatched(allFilled || allPlaced);
    setIsVisibleButton(matchedItems.length > 0 || productsInPurpleZone.length > 0);
  }, [matchedItems, productsInPurpleZone, products.length]);

  const handleDragStart = (productIndex: number) => {
    const isMatched = matchedItems.some(item => item.productIndex === productIndex);
    const isInPurpleZone = productsInPurpleZone.includes(productIndex);

    // Разрешаем перетаскивание, даже если товар уже в фиолетовой зоне
    if (!isMatched) {
      setDraggedItem({ productIndex });
      setErrorMessage(null);

      // Если товар в фиолетовой зоне, удаляем его оттуда
      if (isInPurpleZone) {
        setProductsInPurpleZone(productsInPurpleZone.filter(index => index !== productIndex));
      }
    }
  };

  const handleTouchStart = (productIndex: number, e: React.TouchEvent) => {
    const isMatched = matchedItems.some(item => item.productIndex === productIndex);
    const isInPurpleZone = productsInPurpleZone.includes(productIndex);

    if (!isMatched) {
      const touch = e.touches[0];
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.zIndex = '1000';
      clone.style.pointerEvents = 'none';
      clone.style.transform = 'scale(1.1)';
      clone.style.transition = 'transform 0.1s';
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;

      document.body.appendChild(clone);

      setTouchActive({
        productIndex,
        element: clone,
        startX: touch.clientX,
        startY: touch.clientY,
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top
      });

      setDraggedItem({ productIndex });
      setErrorMessage(null);

      // Если товар в фиолетовой зоне, удаляем его оттуда
      if (isInPurpleZone) {
        setProductsInPurpleZone(productsInPurpleZone.filter(index => index !== productIndex));
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchActive) {
      const touch = e.touches[0];
      const { element, offsetX, offsetY } = touchActive;

      element.style.left = `${touch.clientX - offsetX}px`;
      element.style.top = `${touch.clientY - offsetY}px`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchActive) {
      const { element, productIndex } = touchActive;
      const touch = e.changedTouches[0];

      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

      if (dropTarget) {
        const refrigeratorElement = dropTarget.closest('[data-refrigerator]');
        if (refrigeratorElement) {
          const refrigeratorIndex = parseInt(refrigeratorElement.getAttribute('data-refrigerator') || '0');
          handleDropOnRefrigerator(refrigeratorIndex);
        } else if (dropTarget.closest('[data-purple-zone]')) {
          // Если отпустили в фиолетовой зоне, но не перемещали продукт
          // Просто удаляем клон и сбрасываем состояние
          element.remove();
          setTouchActive(null);
          setDraggedItem(null);
          return;
        }
      }

      element.remove();
      setTouchActive(null);
      setDraggedItem(null);
    }
  };

  const handleDropOnRefrigerator = (refrigeratorIndex: number) => {
    if (draggedItem) {
      const itemsInRefrigerator = matchedItems.filter(item => item.refrigeratorIndex === refrigeratorIndex);

      if (itemsInRefrigerator.length >= 4) {
        setErrorMessage('Этот холодильник уже заполнен!');
        setDraggedItem(null);
        return;
      }

      const isAlreadyMatched = matchedItems.some(
        item => item.productIndex === draggedItem.productIndex
      );

      if (!isAlreadyMatched) {
        const product = products[draggedItem.productIndex];
        const refrigerator = refrigerators[refrigeratorIndex];

        if (refrigeratorIndex === 3) {
          if (itemsInRefrigerator.length > 0) {
            const firstProductCategory = products[itemsInRefrigerator[0].productIndex].category;

            const isSameSubgroup =
              (firstProductCategory.startsWith('grocery') && product.category.startsWith('grocery')) &&
              (firstProductCategory === product.category ||
                (firstProductCategory === 'grocery' && product.category === 'grocery') ||
                (firstProductCategory !== 'grocery' && product.category !== 'grocery' &&
                  firstProductCategory.replace('grocery', '') === product.category.replace('grocery', '')));

            if (!isSameSubgroup) {
              setErrorMessage('Нельзя смешивать разные подкатегории бакалеи в одном холодильнике!');
              setDraggedItem(null);
              return;
            }
          }
        }

        const isCorrectPlacement = refrigerator.categories.includes(product.category);

        if (!isCorrectPlacement) {
          setErrorMessage('Неверный температурный режим для этого продукта!');
          setDraggedItem(null);
          return;
        }

        setMatchedItems([...matchedItems, {
          productIndex: draggedItem.productIndex,
          refrigeratorIndex: refrigeratorIndex,
          isCorrect: isCorrectPlacement
        }]);
      }
    }
    setDraggedItem(null);
  };

  const handleDropOnPurpleZone = () => {
    if (draggedItem) {
      const isAlreadyInPurpleZone = productsInPurpleZone.includes(draggedItem.productIndex);
      const isAlreadyMatched = matchedItems.some(
        item => item.productIndex === draggedItem.productIndex
      );

      if (!isAlreadyInPurpleZone && !isAlreadyMatched) {
        setProductsInPurpleZone([...productsInPurpleZone, draggedItem.productIndex]);
      }
    }
    setDraggedItem(null);
  };

  const checkResults = () => {
    setAttempts(prev => prev + 1);
    setOpenIsCard(true);
  };

  const resetGame = () => {
    setMatchedItems([]);
    setProductsInPurpleZone([]);
    setAttempts(0);
    setErrorMessage(null);
  };

  const isProductMatched = (productIndex: number) => {
    return matchedItems.some(item => item.productIndex === productIndex);
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTouchOver = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleDropOnRefrigeratorsArea = (e: React.DragEvent) => {
    e.preventDefault();

    const refrigeratorElements = document.querySelectorAll('[data-refrigerator]');
    const dropX = e.clientX;
    const dropY = e.clientY;

    let closestRefrigerator = null;
    let minDistance = Infinity;

    refrigeratorElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(dropX - centerX, 2) + Math.pow(dropY - centerY, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestRefrigerator = el.getAttribute('data-refrigerator');
      }
    });

    if (closestRefrigerator !== null) {
      handleDropOnRefrigerator(parseInt(closestRefrigerator));
    }
  };

  const calculateResults = () => {
    const correct = matchedItems.filter(item => item.isCorrect).length;
    const incorrect = matchedItems.filter(item => !item.isCorrect).length;
    return { correct, incorrect };
  };

  const allRefrigeratorsFilled = refrigerators.every((_, index) =>
    matchedItems.filter(item => item.refrigeratorIndex === index).length >= 4
  );

  return (
    <div style={{
      overflow: 'hidden',
      backgroundImage: 'url(/src/assets/img/commerce_img/фон.svg)',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
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
        gap: '30px',
        marginTop: '30px',
        height: '600px'
      }}>
        {/* Products section (Purple zone) */}
        <div
          style={{
            flex: '1',
            backgroundColor: '#c0adc3',
            padding: '20px',
            borderRadius: '15px',
            maxWidth: '790px',
            height: '850px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            alignItems: 'center',
            marginLeft: '30px',
            transform: 'translate(0px, -70px)'
          }}
          onDrop={handleDropOnPurpleZone}
          onDragOver={handleDragOver}
          data-purple-zone="true"
        >
          <div className={classes.texts} style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Продукты</h2>
          </div>
          <div style={{
            fontFamily: 'Cruinn Regular',
            color: 'while',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: '100%',
            overflow: 'auto',
            width: '100%',
            padding: '10px'
          }}>
            {products.map((product, productIndex) => (
              !isProductMatched(productIndex) ? (
                <ImageCard
                  key={`product-${productIndex}`}
                  src={product.src}
                  alt={product.alt}
                  draggable={true}
                  onDragStart={() => handleDragStart(productIndex)}
                  onTouchStart={(e) => handleTouchStart(productIndex, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    transform: draggedItem?.productIndex === productIndex ? 'scale(1.05)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              ) : productsInPurpleZone.includes(productIndex) ? (
                <ImageCard
                  key={`product-purple-${productIndex}`}
                  src={product.src}
                  alt={product.alt}
                  draggable={true}
                  onDragStart={() => handleDragStart(productIndex)}
                  onTouchStart={(e) => handleTouchStart(productIndex, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    width: '100px',
                    height: '100px',
                    margin: '8px',
                    transform: draggedItem?.productIndex === productIndex ? 'scale(1.05)' : 'none',
                    transition: 'transform 0.2s',
                  }}
                />
              ) : null
            ))}
          </div>
        </div>

        {/* Refrigerators section */}
        <div
          style={{
            flex: '1',
            maxWidth: '700px',
            position: 'relative',
          }}
          onDrop={handleDropOnRefrigeratorsArea}
          onDragOver={handleDragOver}
          onTouchMove={handleTouchOver}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            height: '100%'
          }}>
            {refrigerators.map((refrigerator, refrigeratorIndex) => {
              const itemsInRefrigerator = matchedItems.filter(item =>
                item.refrigeratorIndex === refrigeratorIndex
              );
              const isFull = itemsInRefrigerator.length >= 4;
              const allCorrect = isFull && itemsInRefrigerator.every(item => item.isCorrect);

              return (
                <div
                  key={`refrigerator-${refrigeratorIndex}`}
                  data-refrigerator={refrigeratorIndex}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#c0adc3',
                    height: '400px',
                    width: "400px",
                    borderRadius: '15px',
                    position: 'relative',
                    zIndex: 1,
                    border: allCorrect ? '4px solid #4DE4F2' : 'none',
                    boxShadow: allCorrect ? '0 0 20px #4DE4F2' : '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    padding: '15px',
                    transform: 'translate(-255px, -70px)',
                  }}
                >
                  {allCorrect && (
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      backgroundColor: '#4DE4F2',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '15px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      Заполнен
                    </div>
                  )}
                  <ImageCard
                    src={refrigerator.src}
                    alt={refrigerator.alt}
                    onDragOver={handleDragOver}
                    style={{ width: '180px', height: '180px' }}
                  />
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: '15px',
                    gap: '10px'
                  }}>
                    {itemsInRefrigerator
                      .map((item, idx) => (
                        <ImageCard
                          key={`matched-${refrigeratorIndex}-${idx}`}
                          src={products[item.productIndex].src}
                          alt={products[item.productIndex].alt}
                          isCorrect={item.isCorrect}
                          style={{
                            width: '80px',
                            height: '80px',
                            pointerEvents: 'none'
                          }}
                        />
                      ))}
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
            Завершить
          </Button>
        </div>
      )}
      <div className={classes.backButton} style={{
        marginTop: '40px',
        marginBottom: '40px'
      }}>
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

      <CardFinish
        attempts={attempts}
        isOpenCard={openIsCard}
        onClose={handleCloseCard}
      />
    </div>
  );
};

export default CommercePlayGame;