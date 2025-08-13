import React from 'react';
import human from '../../../../assets/img/game_assets/pensionGalaxy-img/human.svg';
import cyborg from '../../../../assets/img/game_assets/pensionGalaxy-img/cyborg.svg';
import alien from '../../../../assets/img/game_assets/pensionGalaxy-img/alien.svg';
import ColumnChart from './ColumnChart';
import classes from './LaborCode/LaboreCode.module.scss'

const Chart = () => {
  const columns = [
    {value: 0.52, img: human, text:'люди', y:-365,},
    {value: 0.8, img: cyborg, text:'киборги', y: -530,},
    {value: 1.14, img: alien, text:'инопланетяне', y:-735}
  ]
  return (
    <div className={classes.chart}>
      {columns.map((el) => (
        <ColumnChart height={el.value} personImg={el.img} text={el.text} y={el.y}/>
      ))}
    </div>
  );
};

export default Chart;