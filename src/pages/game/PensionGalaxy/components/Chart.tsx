import React from 'react';
import human from '../../../../assets/img/game_assets/pensionGalaxy-img/human.svg';
import cyborg from '../../../../assets/img/game_assets/pensionGalaxy-img/cyborg.svg';
import alien from '../../../../assets/img/game_assets/pensionGalaxy-img/alien.svg';
import ColumnChart from './ColumnChart';
import classes from '../pages/LaborCode/LaboreCode.module.scss'

const Chart = () => {
  const columns = [
    {value: 0.51, img: human, text:'люди', y:-317,},
    {value: 0.79, img: cyborg, text:'киборги', y: -484,},
    {value: 1.135, img: alien, text:'инопланетяне', y:-690}
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