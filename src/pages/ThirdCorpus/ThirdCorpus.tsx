import classes from '../ThirdCorpus/ThirdCorpus.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';


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
            <div className={classes.planet}>
              <Link to={'/kubik'} className={classes.spec1}>
                <Button
                  type="marker"
                  imageSrc="src/assets/img/buttons/marker/thirdCorpus/icons.svg"
                  bgColor="pink"
                  colorText="white"
                />
              </Link>
              <Link to={'/kindergarten-teachers'} className={classes.spec2}>
                <Button
                  type="marker"
                  imageSrc="src/assets/img/buttons/marker/thirdCorpus/kindergarten-teachers.svg"
                  bgColor="pink"
                  colorText="white"
                />
              </Link>
              <Link to={'/musicians'} className={classes.spec3}>
                <Button
                  type="marker"
                  imageSrc="src/assets/img/buttons/marker/thirdCorpus/musicians.svg"
                  bgColor="pink"
                  colorText="white"
                />
              </Link>
              <Link to={'/teachers'} className={classes.spec4}>
                <Button
                  type="marker"
                  imageSrc="src/assets/img/buttons/marker/thirdCorpus/teachers.svg"
                  bgColor="pink"
                  colorText="white"
                />
              </Link>
            </div>
          </div>
          <div className={classes.buton}>
            <Link to={`/`}>
              <Button type="type2" bgColor="pink">Назад</Button>
            </Link>
            <Link to={'/1'}>
              <Button type="type2" bgColor="blue">Вперед</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};