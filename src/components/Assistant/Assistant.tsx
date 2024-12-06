import classes from './Assistant.module.scss';
import IconCat from '../../assets/img/cat2.svg';
import IconX from '../../assets/img/x_button.svg'
import IconToys from '../../assets/img/toys.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { info } from 'sass';

// export type AssistantProps = {
//   children?: React.ReactNode;
//   color: "primary";
// };

export const Assistant = ((props: { title: string ; body: string ; }) => {

  const [openHelper, setOpenHelper] = useState(true);

  const setIsOpen = () => {
    setOpenHelper(!openHelper);
  }

  return (
    <div className={classes.container}>
      {openHelper
        ? (
          <div className={classes.tooltip}>
            <span><p className={classes.title}> {props.title} </p></span>
            <span><p className={classes.body}>{props.body}</p></span>
            <img onClick={setIsOpen} src={IconX} alt="" className={classes.X} />
            <img onClick={setIsOpen} src={IconCat} alt="" className={classes.cat} />
          </div>
        )
        :
        <div>
          <img/>
        </div>
      }
    </div>
  )
})