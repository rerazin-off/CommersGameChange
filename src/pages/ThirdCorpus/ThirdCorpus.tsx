import classes from '../ThirdCorpus/ThirdCorpus.module.scss';
import { BackButton } from '../../components/Button/BackButton/BackButton.tsx';
import { ForwardButton } from '../../components/Button/ForwardButton/ForwardButton.tsx';


export const ThirdCorpus = () => {



  return (
    <div>
      <div className={classes.korpus_1}>
        <div className={classes.container}>
          <div className={classes.bloc}>
            <div className={classes.text}>
              <h1>ПЛАНЕТА <br /> 3 КОРПУС</h1>
              <p>Эта самая дружелюбная и добрая планете, ведь на ней обитают следующие специальности: <br />
                -Дошкольное образование; <br />
                -Преподавание в начальных классах; <br />
                -Музыкальное образование.</p>
            </div>
            <div>
              <BackButton>Назад</BackButton>
              <ForwardButton>Вперёд</ForwardButton>
            </div>
            <div className={classes.planet}>
              {/* <!-- тут будут 4 компонента gps и кнопка "вперед", в разных классах --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};