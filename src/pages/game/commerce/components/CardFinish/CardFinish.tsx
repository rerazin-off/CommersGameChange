import Card from '@/components/Card/Card';
import classes from './CardFinish.module.scss';

type CardFinishProps = {
  attempts: number;
  isOpenCard: boolean;
  onClose: () => void;
};

const CardFinish = (props: CardFinishProps) => {
  const { attempts, isOpenCard, onClose } = props;
  return (
    <div>
      <Card
        title="'Поздравляем!"
        body={
          <>
            Вы успешно завершили игру! <br /> Количество попыток: {attempts}
          </>
        }
        game="logistics"
        backLink=""
        isOpen={isOpenCard}
        onClose={onClose}
        type="gameOver"
      />
    </div>
  );
};

export default CardFinish;
