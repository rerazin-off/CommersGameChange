import React from 'react';
import classes from './LaboreCode.module.scss';
import Chart from '../Chart';
import ConditionsCard from '../ConditionsCard';
import { Conditions } from '../../Date';
import Section from '../Section';
import FormulaVariable from '../FormulaVariable';
import backIcon from '../../../../../assets/img/game_assets/pensionGalaxy-img/backIcon.svg';

const LaborCode = ({comeBack}) => {
  return (
    <div className={classes.laborCode}>
      <div className={classes.scrollContainer}>
        <h1>Космический трудовой кодекс</h1>
        <Section number={1} title={'Общее положение'}>
          <div className={classes.articleText} style={{ width: '70%' }}>
            Право на пенсию в Галактической Федерации имеют все разумные
            существа, проработавшие не менее 25 стандартных земных лет.
          </div>
          <h2>Пенсионный возраст устанавливается (см диаграмму): </h2>
          <Chart />
        </Section>
        <Section number={2} title={'Особые условия труда'}>
          <div className={classes.wrapContainer}>
            {Conditions.map(el => (
              <ConditionsCard
                coefficient={el.value}
                title={el.title}
                img={el.img}
              />
            ))}
          </div>
        </Section>
        <Section number={3} title={'Расчет пенсии'}>
          <p>Базоая пенси расчитывается по формуле:</p>
          <div className={classes.formula}>П = (СЗ × КС) + (СЗ × КУ × ОВ)</div>
          <p>
            Максимальный размер пенсии не может превышать 90% от средней
            зарплаты.
          </p>
          <div>
            <FormulaVariable letter={'П'} explanation={'размер пенсии'} />
            <FormulaVariable letter={'СЗ'} explanation={'средняя зарплата'} />
            <FormulaVariable letter={'КС'} explanation={'коэффициент стажа (0.5% за каждый год стажа)'} />
            <FormulaVariable letter={'КУ'} explanation={'коэффициент условий труда (от 1.0 до 2.0)'} />
          </div>
        </Section>
      </div>
      <div className={classes.icons}
      >
        <img src={backIcon}
             onClick={comeBack}
             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
    </div>
  );
};

export default LaborCode;