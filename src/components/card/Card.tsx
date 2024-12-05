import classes from "./Card.module.scss";
import { PinkeButton } from "../Button/PinkeButton/PinkeButton.tsx";
import { BlueButton } from "../Button/BlueButton/BlueButton.tsx";

export type CardProps = {
  titel?: React.ReactNode;
  children?: React.ReactNode;
};

export const Card = ({titel, children}: CardProps) => {
  return (
    <div>
      <div className={classes.var}>
        <h1> {titel} </h1>
        <div className={classes.img}><img src="../../assets/img/line.svg" alt="" /></div>
        <p> {children} </p>
        <div className={classes.knopki}>
          <PinkeButton>НАЗАД</PinkeButton>
          <BlueButton>НАЧАТЬ</BlueButton>
        </div>
      </div>
    </div>
  );
};