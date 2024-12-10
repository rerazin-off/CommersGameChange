import classes from '../SecondCorpus/SecondCorpus.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export const SecondCorpus = () => {
  return (
    <div className={classes.korpus_1}>
      <div className={classes.container}>
        <div className={classes.bloc}>
          <div className={classes.text}>
            <h1>ПЛАНЕТА <br /> 2 КОРПУС</h1>
            <p>На данной планете вы познакомитесь со следующими специальностями: <br />
              -Документационное обеспечение управления и архивоведение; <br />
              -Банковское дело; <br />
              -Коммерция (по отраслям); <br />
              -Торговое дело.</p>
          </div>
          <div className={classes.planet}>
            <Link to={'/dou'} className={classes.spec1}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/secondCorpus/arhivoveds.svg"
                bgColor="purple"
                colorText="white"
              />
            </Link>
            <Link to={'/bank'} className={classes.spec2}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/secondCorpus/bank.svg"
                bgColor="purple"
                colorText="white"
              />
            </Link>
            <Link to={'/tovaroveds'} className={classes.spec4}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/secondCorpus/tovaroveds.svg"
                bgColor="purple"
                colorText="white"
              />
            </Link>
          </div>
        </div>
        <div className={classes.buton}>
          <Link to={`/`}>
            <Button type="type2" bgColor="pink">Назад</Button>
          </Link>
          <Link to={'/3'}>
            <Button type="type2" bgColor="blue">Вперед</Button>
          </Link>
        </div>
      </div>
    </div>
)
  ;
};

// export default SecondCorpus;