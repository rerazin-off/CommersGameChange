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
  bakaleyaGroup?: string;
}

interface Refrigerator {
  src: string;
  alt: string;
  categories: string[];
  width: number;
  height: number;
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
        height: '125px',
        width: '125px',
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [touchActive, setTouchActive] = useState<{
    productIndex: number;
    element: HTMLElement;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    source: 'products' | 'refrigerator' | 'purple';
    refrigeratorIndex?: number;
  } | null>(null);
  const [ghostElement, setGhostElement] = useState<{
    src: string;
    alt: string;
    visible: boolean;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const products: Product[] = [
    { src: '/src/assets/img/commerce_img/sok (1).png', alt: 'сок1', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/meal (4).png', alt: 'мука 4', category: 'grocery', bakaleyaGroup: 'flour' },
    { src: '/src/assets/img/commerce_img/milk (2).png', alt: 'молоко 2', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/sok (4).png', alt: 'сок4', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/milk (3).png', alt: 'молоко 3', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/coffe3.png', alt: 'кофе 3', category: 'grocery3', bakaleyaGroup: 'coffee' },
    { src: '/src/assets/img/commerce_img/milk (4).png', alt: 'молоко 4', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/fish (1).png', alt: 'рыбка 1', category: 'fish' },
    { src: '/src/assets/img/commerce_img/sok (3).png', alt: 'сок3', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/fish (2).png', alt: 'рыбка 2', category: 'fish' },
    { src: '/src/assets/img/commerce_img/mak (1).png', alt: 'макароны 1', category: 'grocery1', bakaleyaGroup: 'pasta' },
    { src: '/src/assets/img/commerce_img/sok (2).png', alt: 'сок2', category: 'drinks' },
    { src: '/src/assets/img/commerce_img/mak (2).png', alt: 'макароны 2', category: 'grocery1', bakaleyaGroup: 'pasta' },
    { src: '/src/assets/img/commerce_img/fish (3).png', alt: 'рыбка 3', category: 'fish' },
    { src: '/src/assets/img/commerce_img/mak (4).png', alt: 'макароны 4', category: 'grocery1', bakaleyaGroup: 'pasta' },
    { src: '/src/assets/img/commerce_img/meal (1).png', alt: 'мука 1', category: 'grocery', bakaleyaGroup: 'flour' },
    { src: '/src/assets/img/commerce_img/meal (2).png', alt: 'мука 2', category: 'grocery', bakaleyaGroup: 'flour' },
    { src: '/src/assets/img/commerce_img/fish (4).png', alt: 'рыбка 4', category: 'fish' },
    { src: '/src/assets/img/commerce_img/meal (3).png', alt: 'мука 3', category: 'grocery', bakaleyaGroup: 'flour' },
    { src: '/src/assets/img/commerce_img/kryp (1).png', alt: 'крупы 1', category: 'grocery2', bakaleyaGroup: 'cereals' },
    { src: '/src/assets/img/commerce_img/mak (3).png', alt: 'макароны 3', category: 'grocery1', bakaleyaGroup: 'pasta' },
    { src: '/src/assets/img/commerce_img/kryp (2).png', alt: 'крупы 2', category: 'grocery2', bakaleyaGroup: 'cereals' },
    { src: '/src/assets/img/commerce_img/milk (1).png', alt: 'молоко 1', category: 'dairy' },
    { src: '/src/assets/img/commerce_img/kryp (3).png', alt: 'крупы 3', category: 'grocery2', bakaleyaGroup: 'cereals' },
    { src: '/src/assets/img/commerce_img/coffe.png', alt: 'кофе 1', category: 'grocery3', bakaleyaGroup: 'coffee' },
    { src: '/src/assets/img/commerce_img/coffe2.png', alt: 'кофе 2', category: 'grocery3', bakaleyaGroup: 'coffee' },
    { src: '/src/assets/img/commerce_img/kryp (4).png', alt: 'крупы 4', category: 'grocery2', bakaleyaGroup: 'cereals' },
    { src: '/src/assets/img/commerce_img/coffe4.png', alt: 'кофе 4', category: 'grocery3', bakaleyaGroup: 'coffee' },
  ];

  const refrigerators: Refrigerator[] = [
    { src: '/src/assets/img/commerce_img/1.png', alt: 'Холодильник для напитков', categories: ['drinks'], width: 260, height: 300 },
    { src: '/src/assets/img/commerce_img/9.png', alt: 'Холодильник для молочной продукции', categories: ['dairy'], width: 300, height: 340 },
    { src: '/src/assets/img/commerce_img/14.png', alt: 'Холодильник для рыбы', categories: ['fish'], width: 280, height: 320 },
    { src: '/src/assets/img/commerce_img/gorkka2.png', alt: 'Стеллаж для продуктов', categories: ['drinks', 'dairy', 'fish', 'grocery', 'grocery1', 'grocery2', 'grocery3'], width: 320, height: 360 },
  ];

  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ productIndex: number; source: 'products' | 'refrigerator' | 'purple'; refrigeratorIndex?: number } | null>(null);
  const [productsInPurpleZone, setProductsInPurpleZone] = useState<number[]>([]);
  const touchMoveRef = useRef<number | null>(null);

  useEffect(() => {
    // Проверяем, что все продукты размещены в холодильниках (ни одного в фиолетовой зоне)
    const allProductsInRefrigerators = matchedItems.length === products.length;

    // Проверяем, что все холодильники заполнены (по 4 продукта в каждом)
    const allRefrigeratorsFilled = refrigerators.every((_, index) => {
      return matchedItems.filter(item => item.refrigeratorIndex === index).length >= 4;
    });

    const allPlaced = matchedItems.length + productsInPurpleZone.length === products.length;
    setIsVisibleButton(matchedItems.length > 0 || productsInPurpleZone.length > 0);
  }, [matchedItems, productsInPurpleZone]);


  const handleDragStart = (productIndex: number, source: 'products' | 'refrigerator' | 'purple' = 'products', refrigeratorIndex?: number) => {
    setDraggedItem({ productIndex, source, refrigeratorIndex });
  };

  const handleTouchStart = (productIndex: number, e: React.TouchEvent, source: 'products' | 'refrigerator' | 'purple' = 'products', refrigeratorIndex?: number) => {
    e.preventDefault();
    const touch = e.touches[0];
    const element = e.currentTarget as HTMLElement;

    setGhostElement({
      src: products[productIndex].src,
      alt: products[productIndex].alt,
      visible: true,
      x: touch.clientX,
      y: touch.clientY,
      offsetX: touch.clientX - element.getBoundingClientRect().left,
      offsetY: touch.clientY - element.getBoundingClientRect().top
    });

    setTouchActive({
      productIndex,
      element,
      startX: touch.clientX,
      startY: touch.clientY,
      offsetX: touch.clientX - element.getBoundingClientRect().left,
      offsetY: touch.clientY - element.getBoundingClientRect().top,
      source,
      refrigeratorIndex
    });

    setDraggedItem({ productIndex, source, refrigeratorIndex });
    setErrorMessage(null);

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
>>>>>>> f8758ad7b57f20091b224c7bc1af3a1ca1e29fc3
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
<<<<<<< HEAD

    if (touchMoveRef.current) {
      cancelAnimationFrame(touchMoveRef.current);
=======
    if (touchActive) {
      const touch = e.touches[0];
      const { element, offsetX, offsetY } = touchActive;


      element.style.position = 'fixed';
      element.style.zIndex = '1000';

      element.style.left = `${touch.clientX - offsetX}px`;
      element.style.top = `${touch.clientY - offsetY}px`;
>>>>>>> f8758ad7b57f20091b224c7bc1af3a1ca1e29fc3
    }

    touchMoveRef.current = requestAnimationFrame(() => {
      if (touchActive && ghostElement) {
        const touch = e.touches[0];
        setGhostElement({
          ...ghostElement,
          x: touch.clientX - ghostElement.offsetX,
          y: touch.clientY - ghostElement.offsetY
        });
      }
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();

    if (touchMoveRef.current) {
      cancelAnimationFrame(touchMoveRef.current);
    }

    if (touchActive) {
      const touch = e.changedTouches[0];

      element.style.position = '';
      element.style.zIndex = '';
      element.style.left = '';
      element.style.top = '';

      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

      if (dropTarget) {
        const refrigeratorElement = dropTarget.closest('[data-refrigerator]');
        if (refrigeratorElement) {
          const refrigeratorIndex = parseInt(refrigeratorElement.getAttribute('data-refrigerator') || '0');
          handleDropOnRefrigerator(refrigeratorIndex);
        } else if (dropTarget.closest('[data-purple-zone]')) {
          handleDropOnPurpleZone();
        } else if (touchActive.source === 'refrigerator') {
          handleDropOnPurpleZone();
        }
      }

      element.remove();

      setTouchActive(null);
      setDraggedItem(null);
    }
  };

  const handleDropOnRefrigerator = (targetRefrigeratorIndex: number) => {
    if (!draggedItem) return;

    const itemsInTargetRefrigerator = matchedItems.filter(
      item => item.refrigeratorIndex === targetRefrigeratorIndex
    );

    if (itemsInTargetRefrigerator.length >= 4) {
      showErrorMessage('Этот холодильник уже заполнен!');
      return;
    }

    const product = products[draggedItem.productIndex];
    const refrigerator = refrigerators[targetRefrigeratorIndex];
    const isCorrectPlacement = refrigerator.categories.includes(product.category);

    if (!isCorrectPlacement && targetRefrigeratorIndex !== 3) {
      showErrorMessage('Нарушен температурный режим!');
      return;
    }

    if (targetRefrigeratorIndex === 3 && !checkBakaleyaNeighborhood(targetRefrigeratorIndex, draggedItem.productIndex)) {
      showErrorMessage('Нарушено товарное соседство!');
      return;
    }

    const updatedMatchedItems = matchedItems.filter(item =>
      !(item.productIndex === draggedItem.productIndex &&
        (draggedItem.source === 'refrigerator' && item.refrigeratorIndex === draggedItem.refrigeratorIndex))
    );

    const product = products[draggedItem.productIndex];
    const refrigerator = refrigerators[targetRefrigeratorIndex];
    const isCorrectPlacement = refrigerator.categories.includes(product.category);

    if (!isCorrectPlacement) {
      setErrorMessage('Нарушен температурный режим!');
    }

    setMatchedItems([
      ...updatedMatchedItems,
      {
        productIndex: draggedItem.productIndex,
        refrigeratorIndex: targetRefrigeratorIndex,
        isCorrect: isCorrectPlacement || targetRefrigeratorIndex === 3
      }
    ]);

    if (draggedItem.source === 'purple') {
      setProductsInPurpleZone(productsInPurpleZone.filter(index => index !== draggedItem.productIndex));
    }
  };

  const handleDropOnPurpleZone = () => {
    if (!draggedItem) return;

    if (draggedItem.source === 'refrigerator') {
      setMatchedItems(matchedItems.filter(item => 
        !(item.productIndex === draggedItem.productIndex && 
          item.refrigeratorIndex === draggedItem.refrigeratorIndex)
      ));
    }

    if (!productsInPurpleZone.includes(draggedItem.productIndex)) {
      setProductsInPurpleZone([...productsInPurpleZone, draggedItem.productIndex]);
    }
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
    } else {
      handleDropOnPurpleZone();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(/src/assets/img/fon/commerce_room.svg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Ghost element that follows the finger */}
      {ghostElement && ghostElement.visible && (
        <div style={{
          position: 'fixed',
          left: `${ghostElement.x}px`,
          top: `${ghostElement.y}px`,
          width: '125px',
          height: '125px',
          zIndex: 1000,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img
            src={ghostElement.src}
            alt={ghostElement.alt}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              userSelect: 'none',
              WebkitUserDrag: 'none',
            }}
          />
        </div>
      )}

      {/* Error message at the bottom */}
      {errorMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 1001,
          animation: 'fadeIn 0.3s',
          textAlign: 'center',
          maxWidth: '80%',
          wordBreak: 'break-word'
        }}>
          {errorMessage}
        </div>
      )}


      {/* Products section (Purple zone) - Top part */}
      <div
        style={{
          backgroundColor: 'rgba(192, 173, 195, 0.5)',
          padding: '15px',
          borderRadius: '15px',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
          backdropFilter: 'blur(5px)',
          overflow: 'hidden'
        }}
        onDrop={handleDropOnPurpleZone}
        onDragOver={handleDragOver}
        data-purple-zone="true"
      >
        <div className={classes.texts} style={{ textAlign: 'center', width: '100%' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Продукты</h2>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
          padding: '5px',
          overflow: 'auto',
          maxHeight: 'calc(100% - 50px)'
        }}>
          {products.map((product, productIndex) => (
            !isProductMatched(productIndex) && !productsInPurpleZone.includes(productIndex) ? (
              <ImageCard
                key={`product-${productIndex}`}
                src={product.src}
                alt={product.alt}
                draggable={true}
                onDragStart={() => handleDragStart(productIndex, 'products')}
                onTouchStart={(e) => handleTouchStart(productIndex, e, 'products')}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  transform: draggedItem?.productIndex === productIndex ? 'scale(1.1)' : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            ) : null
          ))}
          {productsInPurpleZone.map((productIndex) => (
            <ImageCard
              key={`product-purple-${productIndex}`}
              src={products[productIndex].src}
              alt={products[productIndex].alt}
              draggable={true}
              onDragStart={() => handleDragStart(productIndex, 'purple')}
              onTouchStart={(e) => handleTouchStart(productIndex, e, 'purple')}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: draggedItem?.productIndex === productIndex ? 'scale(1.1)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
          ))}

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
      </div>


      {/* Refrigerators section - Bottom part */}
      <div
        style={{
          height: '45%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backdropFilter: 'blur(5px)',
          overflow: 'hidden',
          padding: '20px 40px'
        }}
        onDrop={handleDropOnRefrigeratorsArea}
        onDragOver={handleDragOver}
      >
        <div style={{
          display: 'flex',
          gap: '40px',
          height: '100%',
          minWidth: 'fit-content',
          padding: '20px',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollPadding: '0 40px'
        }}>
          {refrigerators.map((refrigerator, refrigeratorIndex) => {
            const itemsInRefrigerator = matchedItems.filter(item =>
              item.refrigeratorIndex === refrigeratorIndex
            );
            const isFilled = isRefrigeratorFilled(refrigeratorIndex);

            return (
              <div
                key={`refrigerator-${refrigeratorIndex}`}
                data-refrigerator={refrigeratorIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  minWidth: `${refrigerator.width}px`,
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  scrollSnapAlign: 'center',
                  margin: '0 5px',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: `${refrigerator.width}px`,
                  height: `${refrigerator.height}px`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...(isFilled ? {
                    border: '4px solid #00c8d7',
                    borderRadius: '15px',
                    boxShadow: '0 0 15px rgba(0, 200, 215, 0.7)',
                    padding: '5px'
                  } : {})
                }}>
                  {isFilled && (
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      backgroundColor: '#00c8d7',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      zIndex: 10,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}>
                      Заполнено
                    </div>
                  )}
                  <img

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
                    style={{
                      width: `${refrigerator.width}px`,
                      height: `${refrigerator.height}px`,
                      objectFit: 'contain',
                      position: 'absolute'
                    }}
                  />
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '15px',
                    width: '100%',
                    height: '75%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    padding: '5px'
                  }}>
                    {itemsInRefrigerator
                      .map((item, idx) => (
                        <ImageCard
                          key={`matched-${refrigeratorIndex}-${idx}`}
                          src={products[item.productIndex].src}
                          alt={products[item.productIndex].alt}
                          draggable={true}
                          onDragStart={() => handleDragStart(item.productIndex, 'refrigerator', refrigeratorIndex)}
                          onTouchStart={(e) => handleTouchStart(item.productIndex, e, 'refrigerator', refrigeratorIndex)}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                          isCorrect={item.isCorrect}
                          style={{
                            width: '70px',
                            height: '70px',
                            position: 'relative',
                            zIndex: 3
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


      {/* Buttons section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '15px',
        marginBottom: '15px'
      }}>
        {isVisibleButton && (
          <div onClick={checkResults} className={classes.checkButton}>
            <Button bgColor="blue" type="type1v2" style={{ fontSize: '18px', padding: '12px 25px' }}>
              Завершить
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
            style={{ fontSize: '18px', padding: '12px 25px' }}
          >
            НАЗАД
          </Button>
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