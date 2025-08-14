import React from 'react';
import {motion} from 'framer-motion';
import column from '../../../../assets/img/game_assets/pensionGalaxy-img/column.svg';
import classes from '../pages/LaborCode/LaboreCode.module.scss'

const ColumnChart = ({height, personImg, text, y,}) => {
  return (
    <div className={classes.columnChart}
    >
      <motion.img
        src={column}
        style={{
          transformOrigin:'bottom',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: height }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.img
        src={personImg}
        style={{
          position: "absolute",
          bottom: "0",
          width:'50%'
        }}
        initial={{ y: 0 }}
        animate={{ y: y }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <h3>{text}</h3>
    </div>
  );
};

export default ColumnChart;