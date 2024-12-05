import classes from './FirstCorpus.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.tsx';


export const FirstCorpus = () => {

  return (
    <div className={classes.korpus_1}>
      <div className={classes.container}>
        <div className={classes.bloc}>
          <div className={classes.text}>
            <h1>ПЛАНЕТА <br /> <span>1</span> КОРПУС</h1>
            <p>На планете первого корпуса вас ждут следующие специальности: <br />
              -Информационные системы и программирование; <br />
              -Операционная деятельность в логистике; <br />
              -Экономика и бухгалтерский учет (по отраслям); <br />
              -Юриспруденция.</p>
          </div>
          <div className={classes.planet}>
            <Link to={'/lawyers'} className={classes.spec1}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/firstCorpus/lawyers_color.svg"
                bgColor="blue"
                colorText="white"
              />
            </Link>
            <Link to={'/programmers'} className={classes.spec2}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/firstCorpus/programmers_color.svg"
                bgColor="blue"
                colorText="white"
              />
            </Link>
            <Link to={'/accountants'} className={classes.spec3}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/firstCorpus/accountants_color.svg"
                bgColor="blue"
                colorText="white"
              />
            </Link>
            <Link to={'/logistics'} className={classes.spec4}>
              <Button
                type="marker"
                imageSrc="src/assets/img/buttons/marker/firstCorpus/logistician_color.svg"
                bgColor="blue"
                colorText="white"
              />
            </Link>
          </div>
        </div>
        <div className={classes.buton}>
          <Link to={`/`}>
            <Button type="type2" bgColor="pink">Назад</Button>
          </Link>
          <Link to={'/2'}>
            <Button type="type2" bgColor="blue">Вперед</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
