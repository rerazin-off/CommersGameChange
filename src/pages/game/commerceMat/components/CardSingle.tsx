import { useState, useCallback, useRef, useEffect } from 'react'; 
import classes from '..//..//..//..//components/Card/Card.module.scss'; // Используем те же стили, что и у Card
import { Button } from '..//..//..//..//components/Button/Button';
import lineImage from '..//..//..//..//assets/img/line.svg';

interface CardSingleProps {
  title: string;
  body: React.ReactNode;
  onClose?: () => void;
  onForward?: () => void;
  isOpen?: boolean;
}

export const CardSingle = ({
  title,
  body,
  onClose,
  onForward,
  isOpen,
}: CardSingleProps) => {
  const [isClose, setIsClose] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const ANIMATION_DELAY = 300;

  useEffect(() => {
    if (isOpen) {
      setIsClose(false);
    }
  }, [isOpen]);

  const closeCard = useCallback(() => {
    setIsClose(true);
    timerRef.current = setTimeout(() => {
      onClose?.();
      setIsClose(false);
    }, ANIMATION_DELAY);
  }, [onClose]);

  const handleForwardClick = useCallback(() => {
    setIsClose(true);
    timerRef.current = setTimeout(() => {
      onForward?.();
      setIsClose(false);
    }, ANIMATION_DELAY);
  }, [onForward]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!isOpen && !isClose) {
    return null;
  }

  return (
    <>
      <div className={classes.cardBackdrop}></div>
      <div className={classes.var}>
        <div className={classes.text}>
          <h1>{title}</h1>
          <div className={classes.img}>
            <img src={lineImage} alt="" />
          </div>
          <p style={{ whiteSpace: 'pre-line' }}>{body}</p>
        </div>
        <div className={classes.knopki}>
          <Button 
            onClick={closeCard} 
            bgColor={'pink'} 
            type={'type1v2'}
          >
            НАЗАД
          </Button>
          <Button 
            onClick={handleForwardClick} 
            bgColor={'blue'} 
            type={'type1v2'}
          >
            ВПЕРЕД
          </Button>
        </div>
      </div>
    </>
  );
};