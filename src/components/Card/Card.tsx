import classes from './Card.module.scss';
import { Button } from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import lineImage from '../../assets/img/line.svg';

interface CardProps {
  title: string;
  body: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  game: string;
  backLink: string;
  type: 'game' | 'gameOver' | 'secondRound';
  error?: boolean;
  onSecondRound?: () => void;
  resetGameProgress?: () => void; // Добавил пропс для сброса прогресса
}

const Card = (props: CardProps) => {
  const {
    title,
    body,
    game,
    backLink,
    isOpen,
    onClose,
    type,
    error,
    onSecondRound,
    resetGameProgress // Используем пропс для сброса прогресса
  } = props;

  const isMarker = type === 'gameOver';
  const isSecondRound = type === 'secondRound';

  const ANIMATION_DELAY = 300;

  const [isClose, setIsClose] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const navigate = useNavigate(); // ✅ добавили

  useEffect(() => {
    if (isOpen) {
      setIsClose(false);
    }
  }, [isOpen]);

  const closeCard = useCallback(() => {
    if (onClose) {
      setIsClose(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClose(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  // ✅ Сбрасываем игру без перезагрузки страницы и закрываем модалку
  const handleResetGame = useCallback(() => {
    if (resetGameProgress) {
      resetGameProgress(); // Сбрасываем прогресс
    }
    // Закрытие модалки, если она открыта
    if (onClose) {
      onClose();
    }
    // Здесь можно обновить состояние компонента, не перезагружая страницу
  }, [resetGameProgress, onClose]);

  if (!isOpen && !isClose) {
    return null;
  }

  return (
    <>
      <div className={classes.cardBackdrop}></div>
      <div className={`${classes.var} ${error ? classes.error : ''}`}>
        <div className={classes.text}>
          <h1>{title}</h1>
          <div className={classes.img}>
            <img src={lineImage} alt="" />
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>{body}</p>
        </div>

        {isMarker ? (
          <div className={classes.knopki}>
            <Link to={`/${game}`}>
              <Button bgColor="pink" type="type1v2">
                НАЗАД
              </Button>
            </Link>
            <Button onClick={handleResetGame} bgColor="blue" type="type1v2">
              ЗАНОВО
            </Button>
          </div>
        ) : isSecondRound ? (
          <div className={classes.knopki}>
            <Button onClick={closeCard} bgColor="pink" type="type1v2">
              НАЗАД
            </Button>
            <Button onClick={onSecondRound} bgColor="blue" type="type1v2">
              ВПЕРЕД
            </Button>
          </div>
        ) : (
          <div className={classes.knopki}>
            <Button onClick={closeCard} bgColor="pink" type="type1v2">
              НАЗАД
            </Button>
            <Link to={`/${game}`}>
              <Button bgColor="blue" type="type1v2">
                ВПЕРЕД
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
