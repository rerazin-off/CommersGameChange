import classes from './Card.module.scss';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import lineImage from '../../assets/img/line.svg';


interface CardProps {
  title: string;
  body: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  game: string;
  backLink: string;
  type: 'game' | 'gameOver';
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
  } = props;

  const isMarker = type === 'gameOver';

  const ANIMATION_DELAY = 300;

  const [isClose, setIsClose] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
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
  }, [onClose]);


  // const redirectToGame = () => {
  //   window.location.href = props.game;
  // };

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  if (!isOpen && !isClose) {
    return null;
  }

  return (
    <>
      <div className={classes.cardBackdrop}></div>
      <div className={classes.var}>
        <div className={classes.text}>
          <h1> {title} </h1>
          <div className={classes.img}><img src={lineImage} alt="" /></div>
          <p> {body} </p>
        </div>
        {isMarker? (
          <div className={classes.knopki}>
            <Link to={`/${game}?hideAssistant=true`}><Button bgColor={'pink'} type={'type1v2'}>НАЗАД</Button></Link>
            <Button onClick={handleReloadPage} bgColor={'blue'} type={'type1v2'}>ЗАНОВО</Button>
          </div>
        ) : (
          <div className={classes.knopki}>
            <Button onClick={closeCard} bgColor={'pink'} type={'type1v2'}>НАЗАД</Button>
            {/*<Link to={`/game?url=${encodeURIComponent(game)}&backLink=/${encodeURIComponent(backLink)}`}><Button bgColor={'blue'} type={'type1v2'}>ВПЕРЕД</Button></Link>*/}
            <Link to={`/${(game)}`}><Button bgColor={'blue'} type={'type1v2'}>ВПЕРЕД</Button></Link>
          </div>
        )}

      </div>
    </>
  )
    ;
};

export default Card;