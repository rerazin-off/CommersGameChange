import Card from '..//..//..//..//components/Card/Card';
import styles from './CardError.module.scss'; // Используем module.scss для consistency

type CardErrorProps = {
  attempts: number;
  isOpenCard: boolean;
  onClose: () => void;
};

const CardError = (props: CardErrorProps) => {
  const { attempts, isOpenCard, onClose } = props;
  return (
    <div>
      <Card
        title="Неудача!"
        body={
          <>
            Неправильный порядок действий
          </>
        }
        game="plant-game"
        backLink=""
        isOpen={isOpenCard}
        onClose={onClose}
        type="gameOver" // Оставляем такой же тип для единообразия стилей
      />
    </div>
  );
};

export default CardError;