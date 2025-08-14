import React from 'react';
import classes from '../pages/PagePerson/PagePerson.module.scss';
import circle1 from '../../../../assets/img/game_assets/pensionGalaxy-img/circle1.svg';
import circle2 from '../../../../assets/img/game_assets/pensionGalaxy-img/circle2.svg';

const IconPerson = ({img}) => {
  return (
    <div className={classes.iconPerson}>
      <img src={circle2} className={classes.circle2} />
      <img src={circle1} className={classes.circle1} />
      <img src={img} className={classes.personImg} />
    </div>
  );
};

export default IconPerson;