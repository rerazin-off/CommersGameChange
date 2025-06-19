import React from 'react';
import Card from '../../../../../components/Card/Card';

const GameResults = ({showErrorCard, showFinishCard, closeErrorCard, closeFinishCard}) => {
  return (
    <>
      <Card
        title={'Неверный путь'}
        body={'Существует путь короче вашего. Попробуйте ещё раз. Обратите внимание что последовательность покупок также влияет на длину пути!'}
        isOpen={showErrorCard}
        onClose={closeErrorCard}
        type={'gameOver'}
        error={true}
        game='Logistics'
      />
      <Card
        title={'Поздравляем!'}
        body={'Вы отлично справились с задачей логиста!'}
        isOpen={showFinishCard}
        onClose={closeFinishCard}
        type={'gameOver'}
        game = 'Logistics'
      />
    </>
  );
};

export default GameResults;