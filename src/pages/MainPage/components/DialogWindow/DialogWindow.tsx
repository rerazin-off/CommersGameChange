import { useState } from 'react';
import classes from './DialogWindow.module.scss';
import IconX from '../../../../assets/img/x_button.svg';

interface DialogWindowProps {
  title: string;
  body: string;
}

const DialogWindow = (props: DialogWindowProps) => {
  const [openHelper, setOpenHelper] = useState(true); // Локальное состояние для открытия окна

  const handleClose = () => {
    setOpenHelper(false); // Закрытие окна
  };

  if (!openHelper) {
    return null; // Если окно закрыто, не рендерим его
  }

  return (
    <div className={classes.tooltip}>
      <img
        onClick={handleClose} // Закрытие по клику
        src={IconX}
        className={classes.X}
        alt="Close"
      />
      <p className={classes.title}>{props.title}</p>
      <p className={classes.body}>{props.body}</p>
    </div>
  );
};

export default DialogWindow;
