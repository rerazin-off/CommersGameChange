import Card from '..//..//..//..//components/Card/Card';

interface CardErrorProps {
  attempts: number;
  isOpenCard: boolean;
  onClose: () => void;
}

const CardError = ({ attempts, isOpenCard, onClose }: CardErrorProps) => {
  return (
    <Card
      title="Упс!"
      body={
        <>
          Кажется, растение не выжило...<br />
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

export default CardError;