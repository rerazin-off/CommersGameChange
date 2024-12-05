import classes from "./Card.module.scss";
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';



const Card = (props: { post: { title: string ; body: string ; back:string; game:string;}; }) => {

  return (
    <div>
      <div className={classes.var}>
        <h1> {props.post.title} </h1>
        <div className={classes.img}><img src="../../assets/img/line.svg" alt="" /></div>
        <p> {props.post.body} </p>
        <div className={classes.knopki}>
          <Button bgColor={'pink'} type={'type1v2'} onClick={props.post.back}>НАЗАД</Button>
          <Link to={`/${props.post.game}`}> <Button bgColor={'blue'} type={'type1v2'} >ВПЕРЕД</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default Card;