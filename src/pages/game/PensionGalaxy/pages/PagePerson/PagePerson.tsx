import React, { useEffect, useRef, useState } from 'react';
import infIcon from '../../../../../assets/img/game_assets/pensionGalaxy-img/infIcon.svg';
import classes from './PagePerson.module.scss';
import backIcon from '../../../../../assets/img/game_assets/pensionGalaxy-img/backIcon.svg';
import { Persons } from '../../Date';
import MesIntermediateRes from '../../components/MesIntermediateRes/MesIntermediateRes';
import PersonInfoPanel from '../../components/PersonInfoPanel/PersonInfoPanel';
import IconPerson from '../../components/IconPerson';

const PagePerson = ({ personId, comeBack, openLaboreCode, checkAnswer }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showField, setShowField] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const answerRef = useRef();

  useEffect(() => {
    setSelectedPerson(Persons.find(el => el.id === personId));
  }, [personId]);

  const calculatePension = () =>{
    const stage = Number(selectedPerson.mainInf[0].value.match(/^\d+/)[0]);
    const coefficient = selectedPerson?.mainInf[2].value.length > 0 ? selectedPerson?.mainInf[2].value.map(el => el.coefficient).reduce((a, b) => (a < b ? b : a)) : 1;
    const insurancePremiums = Number(selectedPerson?.mainInf[3].value) * 12 * 0.16;
    const IPK = (insurancePremiums / 3000000) * 100;
    return Math.round(IPK * stage * 150 + 10000 * coefficient);
  }

  const check = () => {
    const correct = Number(answerRef.current.value) === calculatePension();
    if (correct){
      checkAnswer()
    }
    setCorrectAnswer(correct);
    setShowResult(true);
    setShowEffect(true);
    setTimeout(()=>{setShowEffect(false)}, 3000)
  };

  return (
    <div className={classes.bg}>
      <div className={classes.mainInf}>
        <IconPerson img={selectedPerson?.img}/>

        <div className={classes.infoContainer}>
          <div className={classes.header}>
            <h1 className={classes.name}>{selectedPerson?.name}</h1>
            <h3>{selectedPerson?.profession}</h3>
          </div>
          <PersonInfoPanel
            selectedPerson={selectedPerson}
            showField={showField}
            updateShow={() => setShowField(true)}
          />
          {showField && (
            <div className={classes.answer}>
              <h1>Пенсия:</h1>
              <input
                type={'number'}
                ref={answerRef}
                style={{
                  border: showResult
                    ? correctAnswer
                      ? '2px solid #4CAF50'
                      : '2px solid #F44336'
                    : '1px solid #fff',
                }}
              />
              <button onClick={check}>Проверить</button>
            </div>
          )}
        </div>
      </div>
      <div className={classes.icons}>
        <img src={infIcon} onClick={openLaboreCode} />
        <img src={backIcon} onClick={comeBack} />
      </div>
      {showEffect && <MesIntermediateRes correctAnswer={correctAnswer} />}
    </div>
  );
};

export default PagePerson;