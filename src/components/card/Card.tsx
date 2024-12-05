import classes from "./Card.module.scss";
import { PinkeButton } from "../Button/PinkeButton/PinkeButton.tsx";
import { BlueButton } from "../Button/BlueButton/BlueButton.tsx";

const Card = (props: { post: { title: string ; body: string ; }; }) => {

  return (
    <div>
      <div className={classes.var}>
        <h1> {props.post.title} </h1>
        <div className={classes.img}><img src="../../assets/img/line.svg" alt="" /></div>
        <p> {props.post.body} </p>
        <div className={classes.knopki}>
          <PinkeButton>НАЗАД</PinkeButton>
          <BlueButton>НАЧАТЬ</BlueButton>
        </div>
      </div>
    </div>
  );
};

export default Card;