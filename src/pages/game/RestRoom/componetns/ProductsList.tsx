import React from 'react';
import ImageCard from './ImageCard';

interface Product {
  src: string;
  alt: string;
  category: string;
  description: string;
}

interface MatchedItem {
  productIndex: number;
  refrigeratorIndex: number;
  isCorrect: boolean;
}

interface ProductsListProps {
  matchedItems: MatchedItem[];
  productsInPurpleZone: number[];
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, productIndex: number, fromRefrigerator?: number) => void;
  handleTouchStart: (e: React.TouchEvent<HTMLDivElement>, productIndex: number, fromRefrigerator?: number) => void;
  handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  handleTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  showProductInfo: (productIndex: number) => void;
  selectedProductIndex: number | null;
}

const ProductsList: React.FC<ProductsListProps> = ({
                                                     matchedItems,
                                                     productsInPurpleZone,
                                                     handleDragStart,
                                                     handleTouchStart,
                                                     handleTouchMove,
                                                     handleTouchEnd,
                                                     showProductInfo,
                                                     selectedProductIndex
                                                   }) => {
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
      description: 'Вы — творческий и неординарный человек. Ваше мнение часто не сходится с мнением большинства. Но вы привыкли быть белой вороной и не испытываете дискомфорта, связанного с этим. Ваша цель - нести в мир передовые идеи. Когда-нибудь человечество по достоинству оценит ваш вклад в культуру, философию или искусство.'
    },
    {
      src: '/src/assets/img/1/m9.png',
      alt: 'm9',
      category: 'm',
      description: 'Вы — человек довольно традиционных взглядов. Вы не гонитесь за переменчивой модой, а в жизни ищите стабильность и надежную опору. Ваша главная цель - воспитать детей, построить дом и просто быть достойным человеком. Что ж, это похвально, тем более, что у вас уже неплохо получается!'
    },
  ];

  const isProductMatched = (productIndex: number) => {
    return matchedItems.some(item => item.productIndex === productIndex);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      margin: '20px 0',
      maxWidth: '900px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        {products.map((product, productIndex) => {
          if (isProductMatched(productIndex)) return null;

          return (
            <ImageCard
              key={`product-${productIndex}`}
              src={product.src}
              alt={product.alt}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, productIndex)}
              onTouchStart={(e) => handleTouchStart(e, productIndex)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => showProductInfo(productIndex)}
              isSelected={selectedProductIndex === productIndex}
              isInPurpleZone={productsInPurpleZone.includes(productIndex)}
            />
          );
        })}
      </div>

      {selectedProductIndex !== null && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          maxWidth: '800px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>

        </div>
      )}
    </div>
  );
};

export default ProductsList;