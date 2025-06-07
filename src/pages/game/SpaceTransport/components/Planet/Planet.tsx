import React from 'react';
import classes from '../../SpaceTransport.module.scss'

const Planet = ({planet, numPerson, clickPlanet}) => {
  return (
    <div className={classes.planet} onClick={()=>clickPlanet(event, planet)}>
      <img src={planet.img}/>
      <div className={classes.count}>{numPerson}</div>
    </div>
  );
};

export default Planet;