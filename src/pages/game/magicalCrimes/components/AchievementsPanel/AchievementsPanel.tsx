import classes from './AchievementsPanel.module.scss';

const AchievementsPanel = ({ score, level, closedCasesCount }) => {
  const Patamters = {
    'Очки': score,
    'Уровень': level,
    'Дела': closedCasesCount
  }
  return (
    <div className={classes.nav}>
      <h1>Сказочный криминал</h1>
      <div className={classes.panel}>
        {Object.entries(Patamters).map((el, index)=>(
            <div className={classes.parameter} key={index}>
              <h1>{el[1]}</h1>
              <p>{el[0]}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPanel;
