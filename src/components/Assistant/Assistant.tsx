import classes from './Assistant.module.scss';
import IconCat from '../../assets/img/cat2.svg';
import IconX from '../../assets/img/x_button.svg';
import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { classNames } from '../../helpers/classNames/classNames';
import { useSearchParams } from 'react-router-dom';

export const Assistant = ((props: { title: string ; body: string; mar:string; cat:string; fon: string; link: string;}) => {

  const [openHelper, setOpenHelper] = useState(true);
  const [searchParams] = useSearchParams();
  const hideAssistant = searchParams.get('hideAssistant') === 'true';

  useEffect(() => {
    const fromGame = localStorage.getItem('fromGame') === 'true';
    if (fromGame) {
      setOpenHelper(false);
      localStorage.removeItem('fromGame');
    }
  }, []);

  const setIsOpen = () => {
    setOpenHelper(false);
  }

  return (
    <>
    {!hideAssistant &&
    <div className={classes.container}>
      {openHelper
        ? (
          <div className={classNames(classes.fon, {}, [classes[props.fon],])}>
              <div className={classes.tooltip}>
                <span><p className={classes.title}> {props.title} </p></span>
                <span><p className={classes.body}>{props.body}</p></span>
                <img onClick={setIsOpen} src={IconX} alt="" className={classes.X} style={{ marginTop: `${props.mar}` }} />
                <img onClick={setIsOpen} src={IconCat} alt="" className={classes.cat}
                   style={{ marginTop: `${props.cat}` }} />
              </div>
              <div className={classes.buttons}>
                <Link to={`/${props.link}`}><Button bgColor={'white'} type={"back_arrow"} /></Link>
                <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
                <Link to={"/psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
              </div>
          </div>
        )
        : (
          <div></div>
        )
      }
    </div>
    }</>
  )
})