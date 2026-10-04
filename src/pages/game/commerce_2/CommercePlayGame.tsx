import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Commerce.module.scss';

// Данные
import { productsAll } from './data/products';
import { refrigeratorsAll } from './data/refrigerators';

// Хуки
import { useCommerceGame } from './hooks/useCommerceGame';
import { useDragAndDrop } from './hooks/useDragAndDrop';

// Компоненты
import { ImageCards } from './components/ImageCard';
import { GhostElement } from './components/GhostElements';
import { ErrorMessage } from './components/errorMessages';
import CardFinish from './components/CardFinish/CardFinish';
import CommerceIntroCard from './components/CommerceIntroCard/CommerceIntroCard';
import { Button } from '../../../components/Button/Button';

const TORGASHI_ROUTE = '/tovaroveds';

const CommercePlayGame = () => {
  const navigate = useNavigate();

  const game = useCommerceGame({ productsAll, refrigeratorsAll });

  const dnd = useDragAndDrop({
    productsAll,
    onDropOnRefrigerator: game.handleDropOnRefrigerator,
    onDropOnPurpleZone: game.handleDropOnPurpleZone,
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/src/assets/img/fon/commerce_room_v3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Вступительная карточка */}
      {game.showIntroCard && (
        <CommerceIntroCard onClose={() => game.setShowIntroCard(false)} />
      )}

      {/* Призрак перетаскивания (только на мобильных) */}
      <GhostElement ghost={dnd.ghostElement} />

      {/* Сообщение об ошибке */}
      <ErrorMessage message={game.errorMessage} />

      {/* Фиолетовая зона с товарами */}
      <div
        style={{
          backgroundColor: 'rgba(192, 173, 195, 0.5)',
          backgroundImage: 'url(/src/assets/img/commerce_img/img_2/zone_purple.png)',
          backgroundSize: '108% 120%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '55px',
          padding: '15px',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
          overflow: 'hidden',
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (dnd.draggedItem) {
            game.handleDropOnPurpleZone(
              dnd.draggedItem.productIndex,
              dnd.draggedItem.source,
              dnd.draggedItem.refrigeratorIndex
            );
          }
        }}
        onDragOver={dnd.handleDragOver}
        data-purple-zone="true"
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            padding: '5px',
            overflow: 'auto',
            maxHeight: 'calc(100% - 50px)',
          }}
        >
          {/* Товары, которые ещё не разложены */}
          {productsAll.map((product, productIndex) =>
            !game.isProductMatched(productIndex) &&
            !game.productsInPurpleZone.includes(productIndex) ? (
              <ImageCards
                key={`product-${productIndex}`}
                src={product.src}
                alt={product.alt}
                draggable
                onDragStart={() => dnd.handleDragStart(productIndex, 'products')}
                onTouchStart={(e) =>
                  dnd.handleTouchStart(productIndex, e, 'products')
                }
                onTouchMove={dnd.handleTouchMove}
                onTouchEnd={dnd.handleTouchEnd}
                style={{
                  transform:
                    dnd.draggedItem?.productIndex === productIndex
                      ? 'scale(1.1)'
                      : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            ) : null
          )}

          {/* Товары, которые явно убраны в корзину */}
          {game.productsInPurpleZone.map((productIndex) => (
            <ImageCards
              key={`product-purple-${productIndex}`}
              src={productsAll[productIndex].src}
              alt={productsAll[productIndex].alt}
              draggable
              onDragStart={() => dnd.handleDragStart(productIndex, 'purple')}
              onTouchStart={(e) =>
                dnd.handleTouchStart(productIndex, e, 'purple')
              }
              onTouchMove={dnd.handleTouchMove}
              onTouchEnd={dnd.handleTouchEnd}
            />
          ))}
        </div>
      </div>

      {/* Зона холодильников */}
      <div
        style={{
          height: '45%',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden',
          padding: '20px 40px',
          marginTop: '-50px',
        }}
        onDrop={dnd.handleDropOnRefrigeratorsArea}
        onDragOver={dnd.handleDragOver}
      >
        <div
          style={{
            display: 'flex',
            gap: '60px',
            height: '100%',
            minWidth: 'fit-content',
            padding: '20px',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {refrigeratorsAll.map((refrigerator, refrigeratorIndex) => {
            const items = game.getItemsInRefrigerator(refrigeratorIndex);
            const isFilled = game.isRefrigeratorFilled(refrigeratorIndex);

            return (
              <div
                key={`refrigerator-${refrigeratorIndex}`}
                data-refrigerator={refrigeratorIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '300px',
                  margin: '0 10px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '300px',
                    height: '350px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...(isFilled
                      ? {
                          border: '4px solid #00c8d7',
                          borderRadius: '15px',
                          boxShadow: '0 0 15px rgba(0, 200, 215, 0.8)',
                        }
                      : {}),
                  }}
                >
                  {isFilled && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-20px',
                        backgroundColor: '#00c8d7',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                      }}
                    >
                      Заполнено
                    </div>
                  )}

                  <img
                    src={refrigerator.src}
                    alt={refrigerator.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'absolute',
                    }}
                  />

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '15px',
                      width: '100%',
                      height: '75%',
                      position: 'absolute',
                      top: '50%',
                      left: '55%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                    }}
                  >
                    {items.map((item, idx) => (
                      <ImageCards
                        key={`matched-${refrigeratorIndex}-${idx}`}
                        src={productsAll[item.productIndex].src}
                        alt={productsAll[item.productIndex].alt}
                        draggable
                        onDragStart={() =>
                          dnd.handleDragStart(
                            item.productIndex,
                            'refrigerator',
                            refrigeratorIndex
                          )
                        }
                        onTouchStart={(e) =>
                          dnd.handleTouchStart(
                            item.productIndex,
                            e,
                            'refrigerator',
                            refrigeratorIndex
                          )
                        }
                        onTouchMove={dnd.handleTouchMove}
                        onTouchEnd={dnd.handleTouchEnd}
                        style={{ width: '70px', height: '70px' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Кнопки */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '15px',
          marginBottom: '15px',
        }}
      >
        {game.isVisibleButton && (
          <div onClick={game.checkResults} className={classes.checkButton}>
            <Button bgColor="blue" type="type1v2">
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
              navigate(TORGASHI_ROUTE);
            }}
          >
            НАЗАД
          </Button>
        </div>
      </div>

      {/* Финальная карточка */}
      <CardFinish
        attempts={game.attempts}
        isOpenCard={game.openIsCard}
        onClose={game.handleCloseCard}
      />
    </div>
  );
};

export default CommercePlayGame;