import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classes from './DialogWindow.module.scss';
import IconX from '../../../../assets/img/x_button.svg';

interface DialogWindowProps {
  title: string;
  body: string;
}

const DialogWindow = (props: DialogWindowProps) => {
  const [openHelper, setOpenHelper] = useState(true);

  useEffect(() => {
    const fromGame = localStorage.getItem('fromGame') === 'true';
    if (fromGame) {
      setOpenHelper(false);
      localStorage.removeItem('fromGame');
    }
  }, []);

  if (!openHelper) {
    return null;
  }

  return (
    <div className={classes.tooltip}>
      <img
        onClick={() => setOpenHelper(false)}
        src={IconX}
        className={classes.X}
      />
      <p className={classes.title}>{props.title}</p>
      <p className={classes.body}>{props.body}</p>
    </div>
  );
}
  ;

  export default DialogWindow;