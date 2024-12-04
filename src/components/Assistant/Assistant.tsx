import classes from './Assistant.module.scss';
import IconCat from '../../assets/img/cat2.svg';
import IconX from '../../assets/img/x_button.svg'
import { useState } from 'react';

// export type AssistantProps = {
//   children?: React.ReactNode;
//   color: "primary";
// };

export const Assistant = () => {

  const [openHelper, setOpenHelper] = useState(true);

  const setIsOpen = () => {
    setOpenHelper(!openHelper);
  }

  return (
    <div className={classes.container}>
      <img onClick={setIsOpen} src={IconCat} alt="" className={classes.cat} />
      {openHelper && (
        <div className={classes.tooltip}>
          <span><p className={classes.heading}>Добро пожаловать на специальность 44.02.01<br />
            Дошкольное образование! <br /></p></span>
          <span><p className={classes.text}>Здесь происходит организация мероприятий,<br />
            различных видов деятельности, занятий по<br />
            основным образовательным программам и<br />
            методическое обеспечение образовательного<br />
            процесса.</p></span>
          <img onClick={setIsOpen} src={IconX} alt="" className={classes.X} />
        </div>
      )}
    </div>
  );
};