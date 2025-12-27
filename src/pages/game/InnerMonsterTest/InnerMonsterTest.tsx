import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import ProductsList from './componetns/ProductsList';

enum RoutesEnum {
  PSIH = '/Psih'
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

interface Product {
  src: string;
  alt: string;
  category: string;
  description: string;
}

interface ImageCardProps {
  src: string;
  alt: string;
  draggable: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  style?: React.CSSProperties;
  isSelected?: boolean;
  isInPurpleZone?: boolean;
}

interface ProductInfoModalProps {
  product: Product | null;
  onClose: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
                                               src,
                                               alt,
                                               draggable,
                                               onDragStart,
                                               onClick,
                                               style,
                                               isSelected,
                                               isInPurpleZone
                                             }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isSelected ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
        border: isInPurpleZone ? '2px solid purple' : 'none',
        transition: 'all 0.2s ease',
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
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#0D0430',
        padding: '40px',
        borderRadius: '16px',
        width: '80%',
        maxWidth: '800px',
        maxHeight: '80vh',
        overflowY: 'auto',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            padding: 0,
          }}
          aria-label="Close"
        >
          <span style={{
            display: 'block',
            marginTop: '-2px',
            lineHeight: '40px',
            height: '40px',
            width: '40px',
            textAlign: 'center'
          }}>
            ×
          </span>
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0'
          }}>
            <img
              src={product.src}
              alt={product.alt}
              style={{
                maxWidth: '300px',
                maxHeight: '300px',
                objectFit: 'contain',
                borderRadius: '16px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          </div>
          <p style={{
            color: '#F4F1FF',
            lineHeight: '1.6',
            fontSize: '18px',
            textShadow: '0 1px 1px rgba(255,255,255,0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const InnerMonsterTest: React.FC = () => {
  const navigate = useNavigate();
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [allProductsMatched, setAllProductsMatched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);
  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
  const [productsInPurpleZone, setProductsInPurpleZone] = useState<number[]>([]);

  const draggedProductIndex = useRef<number | null>(null);
  const draggedFromRefrigeratorIndex = useRef<number | null>(null);
  const draggedFromPurpleZone = useRef<boolean>(false);

  const refrigerators: Refrigerator[] = [
    {
      src: '',
      alt: '',
      categories: ['m']
    },
    {
      src: '',
      alt: '',
      categories: ['m']
    }
  ];

  const products: Product[] = [
    {
      src: '/src/assets/img/1/m1.png',
      alt: 'm1',
      category: 'm',
      description: 'Дела обстоят не очень хорошо... Вы — гедонист, и ваша основная цель — наслаждаться жизнью, вкушая все ее блага и наслаждения. Вы не просто любите вкусно есть, придаваться плотским утехам и одеваться в лучшие наряды, для вас это — смысл жизни. Но в какой-то момент вам придется заплатить за свои проступки. Умерьте свой пыл, чтобы после не жалеть о содеянном.'
    },
    {
      src: '/src/assets/img/1/m2.png',
      alt: 'm2',
      category: 'm',
      description: 'Вы — реинкарнация Супермена. Вы пришли в мир, чтобы делать добро. Ваша способность жертвовать собой ради других просто поражает! Вы самый дружелюбный, отзывчивый и миролюбивый человек. Мир ценит все, что вы делаете для него!'
    },
    {
      src: '/src/assets/img/1/m3.png',
      alt: 'm3',
      category: 'm',
      description: 'Вы — прирожденный учитель. Вы много знаете и охотно делитесь своим опытом с другими. Вы считаете, что главный источник всех бед — глупость. Обучая других, вы делаете этот мир чуточку лучше. Возможно, в одиночку вам не удастся избавить человечество от невежества, но именно такова ваша цель.'
    },
    {
      src: '/src/assets/img/1/m4.png',
      alt: 'm4',
      category: 'm',
      description: 'Вы — страстный и очень обаятельный человек. Больше всего вы любите кружить голову противоположному полу. Вам нравится соблазнять, и вы действительно профи в этом. Без внимания вы просто рискуете завянуть. Но будьте осторожны — когда-нибудь кто-то может разбить и ваше сердце.'
    },
    {
      src: '/src/assets/img/1/m5.png',
      alt: 'm5',
      category: 'm',
      description: 'Как бы ужасно это ни звучало, но вы пришли в этот мир, чтобы быть добычей. В мире львов вы — газель. Вы наивный и открытый человек, именно поэтому так часто попадаете в неприятные ситуации. Возможно, в следующей жизни вы получите награду за все ваши прошлые и будущие жертвы.'
    },
    {
      src: '/src/assets/img/1/m6.png',
      alt: 'm6',
      category: 'm',
      description: 'У вас много друзей, вы любите быть в центре внимания. Можете легко найти общий язык с кем угодно и непринужденно чувствуете себя в любом окружении. Ваша цель — дарить людям радость!'
    },
    {
      src: '/src/assets/img/1/m7.png',
      alt: 'm7',
      category: 'm',
      description: 'Вы — боец. Вы не из тех, кто боится состязаний и соперничества. Как только кто-то бросает вам вызов, ваши глаза загораются азартом. Ваша цель - побеждать. Из вас получился бы отличный спортсмен или бизнесмен.'
    },
    {
      src: '/src/assets/img/1/m8.png',
      alt: 'm8',
      category: 'm',
      description: 'Вы - творческий и неординарный человек. Ваше мнение часто не сходится с мнением большинства. Но вы привыкли быть белой вороной и не испытываете дискомфорта, связанного с этим. Ваша цель - нести в мир передовые идеи. Когда-нибудь человечество по достоинству оценит ваш вклад в культуру, философию или искусство.'
    },
    {
      src: '/src/assets/img/1/m9.png',
      alt: 'm9',
      category: 'm',
      description: 'Вы — человек довольно традиционных взглядов. Вы не гонитесь за переменчивой модой, а в жизни ищите стабильность и надежную опору. Ваша главная цель - воспитать детей, построить дом и просто быть достойным человеком. Что ж, это похвально, тем более, что у вас уже неплохо получается!'
    },
  ];

  useEffect(() => {
    const allPlaced = matchedItems.length + productsInPurpleZone.length === products.length;
    setAllProductsMatched(allPlaced);
    setIsVisibleButton(matchedItems.length === products.length);

    const allCorrect = matchedItems.length === products.length &&
      matchedItems.every(item => item.isCorrect);
    setIsCompleted(allCorrect);
  }, [matchedItems, productsInPurpleZone]);

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

  const handleDropOnRefrigerator = (refrigeratorIndex: number) => {
    if (draggedProductIndex.current !== null) {
      const productIndex = draggedProductIndex.current;
      const isCorrectPlacement = refrigerators[refrigeratorIndex].categories.includes('m');

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

  const showProductInfo = (productIndex: number) => {
    setSelectedProductIndex(productIndex);
  };

  const closeProductInfo = () => {
    setSelectedProductIndex(null);
  };

  return (
    <div style={{
      overflow: 'hidden',
      position: 'relative',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      marginTop: '60px'
    }}>
      {/* Background with blur - now with pointerEvents: none to prevent interactions */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/src/assets/img/1/fon.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        pointerEvents: 'none' // This prevents any interactions with the background
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
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
            animation: 'fadeIn 0.3s',
          }}>
            {errorMessage}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <ProductsList
            matchedItems={matchedItems}
            productsInPurpleZone={productsInPurpleZone}
            handleDragStart={handleDragStart}
            showProductInfo={showProductInfo}
            selectedProductIndex={selectedProductIndex}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          marginTop: '40px'
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
                  position: 'relative',
                  zIndex: 1,
                  padding: '0',
                  background: 'transparent',
                  borderRadius: '0',
                }}
              >
                <div
                  style={{
                    width: '450px',
                    height: '450px',
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
                      borderRadius: '16px',
                      filter: 'none',
                      pointerEvents: 'none' // Prevent interactions with refrigerator image
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
                        onClick={() => removeFromRefrigerator(item.productIndex)}
                        style={{
                          width: '250px',
                          height: '250px',
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

        <div style={{
          position: 'fixed',
          left: '20px',
          bottom: '20px'
        }}>
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => {
              localStorage.setItem('fromGame', 'true');
              navigate(RoutesEnum.PSIH);
            }}
            style={{ fontSize: '20px', padding: '15px 30px' }}
          >
            НАЗАД
          </Button>
        </div>

        <ProductInfoModal
          product={selectedProductIndex !== null ? products[selectedProductIndex] : null}
          onClose={closeProductInfo}
        />
      </div>
    </div>
  );
};

export default InnerMonsterTest;