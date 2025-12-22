import React from 'react';
import classes from './PersonInfoPane.module.scss';
import mark from '../../../../../assets/img/game_assets/pensionGalaxy-img/mark.svg';

const PersonInfoPanel = ({selectedPerson, showField, updateShow}) => {
  return (
    <div className={classes.panel}>
      <h1>Информация</h1>
      {selectedPerson?.mainInf.map((el, index) => (
        <div key={index} className={classes.infoItem}>
          <div className={classes.infoHeader}>
            <img src={mark}/>
            <h2>{el.name}</h2>
          </div>
          <h3>
            {Array.isArray(el.value)
              ? el.value.map(item => item.text).join('')
              : el.value}
          </h3>
        </div>
      ))}
      {!showField && (
        <button
          className={classes.btnCalc}
          onClick={updateShow}
        >
          Расчитать пенсию
        </button>
      )}
    </div>
  );
};

export default PersonInfoPanel;