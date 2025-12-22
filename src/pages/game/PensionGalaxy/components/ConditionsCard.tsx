import React from 'react';
import classes from '../pages/LaborCode/LaboreCode.module.scss'

const ConditionsCard = ({img, coefficient, title}) => {
  return (
    <div  className={classes.card}>
      <div className={classes.cardBg}>
        <img src={img} />
        <p>коэффициент {coefficient}</p>
      </div>
      <p>{title}</p>
    </div>
  );
};

export default ConditionsCard;