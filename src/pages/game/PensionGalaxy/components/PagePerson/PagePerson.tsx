import React, { useEffect, useState } from 'react';
import infIcon from '../../../../../assets/img/game_assets/pensionGalaxy-img/infIcon.svg';
import { Link } from 'react-router-dom';
import classes from './PagePerson.module.scss';
import mark from '../../../../../assets/img/game_assets/pensionGalaxy-img/mark.svg';
import circle1 from '../../../../../assets/img/game_assets/pensionGalaxy-img/circle1.svg';
import circle2 from '../../../../../assets/img/game_assets/pensionGalaxy-img/circle2.svg';
import backIcon from '../../../../../assets/img/game_assets/pensionGalaxy-img/backIcon.svg';
import { Persons } from '../../Date';

const PagePerson = ({ personId, comeBack, openLaboreCode }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    setSelectedPerson(Persons.find((el) => el.id === personId));
  }, [personId]);

  return (
    <div className={classes.bg}>

      <div className={classes.mainInf}>
        <div className={classes.iconPerson}>
          <img src={circle2} className={classes.circle2} />
          <img src={circle1} className={classes.circle1} />
          <img src={selectedPerson?.img} className={classes.personImg} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '5vh' }}>
            <h1 className={classes.name}>{selectedPerson?.name}</h1>
            <h3>{selectedPerson?.profession}</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className={classes.col}></div>
            <div className={classes.panel}>
              <h1>Информация</h1>
              {selectedPerson?.mainInf.map((el, index) => (
                <div key={index} className={classes.infoItem}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img src={mark} alt="mark" />
                    <h2>{el.name}</h2>
                  </div>
                  <h3>{el.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.icons}
      >
        <img
          onClick={openLaboreCode}
          src={infIcon}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <img src={backIcon}
             onClick={comeBack}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
    </div>
  );
};

export default PagePerson;