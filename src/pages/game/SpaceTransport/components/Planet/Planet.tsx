import React from 'react';
import classes from '../../SpaceTransport.module.scss';
import iconUser from '../../../../../assets/img/game_assets/space-transport-img/iconUser.svg'

const Planet = ({planet, numPerson, clickPlanet, planetRef}) => {
  return (
    <div className={classes.planet} onClick={()=>clickPlanet(event, planet)}>
      <img src={planet.img} ref={planetRef}/>
      <div className={classes.count}>
        <img src={iconUser} className={classes.icon}/>
        {numPerson}
      </div>
    </div>
  );
};

export default Planet;