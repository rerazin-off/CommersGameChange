import classes from '../SecondCorpus/SecondCorpus.module.scss';

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
            {/* <!-- тут будет кнопка "назад" --> */}
          </div>
          <div className={classes.planet}>
            {/* <!-- тут будут 4 компонента gps и кнопка "вперед", в разных классах --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default SecondCorpus;