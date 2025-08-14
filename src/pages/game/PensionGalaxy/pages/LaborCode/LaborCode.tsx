import React from 'react';
import classes from './LaboreCode.module.scss';
import Chart from '../../components/Chart';
import ConditionsCard from '../../components/ConditionsCard';
import { Conditions } from '../../Date';
import Section from '../../components/Section';
import FormulaVariable from '../../components/FormulaVariable';
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
          <div className={classes.formula}>П = (ИПК × СК) + (ФВ × КОУ)</div>
          <p>
            Максимальный размер пенсии не может превышать 90% от средней
            зарплаты.
          </p>
          <div>
            <FormulaVariable letter={'П'} explanation={'размер пенсии'} />
            <FormulaVariable
              letter={'ИПК'}
              explanation={'индивидуальные пенсионные коэффициенты'}
            />
            <FormulaVariable
              letter={'СК'}
              explanation={'стоимость одного коэффициента (150)'}
            />
            <FormulaVariable
              letter={'ФВ'}
              explanation={'фиксированная выплата (10 000)'}
            />
            <FormulaVariable
              letter={'КОУ'}
              explanation={'коэффициент особых условий'}
            />
          </div>
          <div className={classes.formula}>ИПК = (СВ/CBM) × 100</div>
          <FormulaVariable
            letter={'CB'}
            explanation={'взносы за год - годовая ЗП х 16%'}
          />
          <FormulaVariable
            letter={'СВМ'}
            explanation={'(максимальные взносы(3 000 000)'}
          />
        </Section>
      </div>
      <div className={classes.icons}>
        <img
          src={backIcon}
          onClick={comeBack}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
    </div>
  );
};

export default LaborCode;