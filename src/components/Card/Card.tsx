import classes from './Card.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import lineImage from '../../assets/img/line.svg';


interface CardProps {
  title: string;
  body: string;
  onClose?: () => void;
  isOpen?: boolean;
  game: string;
}

const Card = (props: CardProps) => {

  const {
    title,
    body,
    game,
    isOpen,
    onClose,
  } = props;

  const ANIMATION_DELAY = 300;

  const [isClose, setIsClose] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClose(false);
    }
  }, [isOpen]);

  const closeCard = useCallback(() => {

    if (onClose){

      setIsClose(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClose(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose])

  if (!isOpen && !isClose) {
    return null;
  }

  return (
    <div>
        <div className={classes.var}>
          <div className={classes.text}>
            <h1> {title} </h1>
            <div className={classes.img}><img src={lineImage} alt="" /></div>
            <p> {body} </p>
          </div>
          <div className={classes.knopki}>
            <Button onClick={closeCard} bgColor={'pink'} type={'type1v2'}>НАЗАД</Button>
            <Link to={`/${game}`}> <Button bgColor={'blue'} type={'type1v2'}>ВПЕРЕД</Button></Link>
          </div>
        </div>
    </div>
  );
};

export default Card;