import classes from '../MovieGame.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '..//..//../..//components/Button/Button';
import lineImage from '..//..//..//..//assets/img/line.svg';


interface GameResultProps {
  score: number;
  onRestart: () => void;
  backLink: string;
  gameLink: string;
}

export const GameResult = ({ score, onRestart, backLink, gameLink }: GameResultProps) => {
  return (
    <div className={classes.resultContainer}>
      <div className={classes.resultContent}>
        <h2>Игра окончена!</h2>
        <p>Ваш результат: {score} из 5</p>
        {score >= 3 ? (
          <p className={classes.success}>Молодец!</p>
        ) : (
          <p className={classes.fail}>Можно лучше!</p>
        )}
      </div>

        <div className={classes.frst}>
          <Link to={backLink}>
          <Button bgColor="pink" type="type1v2">
            НАЗАД
          </Button>
        </Link>
        </div>
       
        <div className={classes.scnd}>
          <Button 
          onClick={onRestart} 
          bgColor="blue" 
          type="type1v2"
        >
          ЗАНОВО
        </Button>
        </div>
    </div>
  );
};
