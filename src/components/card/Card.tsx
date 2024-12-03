import classes from "./Card.module.scss";
import { PinkeButton } from "../Button/PinkeButton/PinkeButton.tsx";
import { BlueButton } from "../Button/BlueButton/BlueButton.tsx";

const Card = () => {
  return (
    <div>
      <div className={classes.var}>
        <h1>ПЕНСИОННЫЙ ФОНД</h1>
        <div className={classes.img}><img src="../../assets/img/line.svg" alt="" /></div>
        <p>В этой игре вы почувствуете себя сотрудником
          пенсионного фонда. Перед вами будут предложены
          ситуации, вам необходимо принять верное решение и
          набрать как можно больше баллов!
        </p>
        <div className={classes.knopki}>
          <PinkeButton>НАЗАД</PinkeButton>
          <BlueButton>НАЧАТЬ</BlueButton>
        </div>
      </div>
    </div>
  );
};

export default Card;