import Card from '..//..//..//..//components/Card/Card';

interface CardFinishProps {
  attempts: number;
  isOpenCard: boolean;
  onClose: () => void;
}

const CardFinish = ({ attempts, isOpenCard, onClose }: CardFinishProps) => {
  return (
    <Card
      title="Поздравляем!"
      body={
        <>
          Вы успешно вырастили растение!<br />

        </>
      }
      onClose={onClose}
      isOpen={isOpenCard}
      game="SpecialKinder" // Используем прямой путь
      backLink=""
      type="gameOver"
    />
  );
};

export default CardFinish;