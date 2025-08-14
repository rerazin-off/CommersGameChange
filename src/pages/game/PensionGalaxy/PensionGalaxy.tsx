import React, { useEffect, useState } from 'react';
import ThreeDSlider from './pages/ThreeDSlider/ThreeDSlider';
import PagePerson from './pages/PagePerson/PagePerson';
import LaborCode from './pages/LaborCode/LaborCode';
import Card from '../../../components/Card/Card';
import { Persons } from './Date';

const PensionGalaxy = () => {
  const [currentView, setCurrentView] = useState('slider');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [passedCard, setPassedCard] = useState({});
  const [showResult, setShowResult] = useState(false);

  const checkAnswer = (id) =>{
    setPassedCard(prev =>({
      ...prev,
      [id]: true
    }))
  }

  useEffect(() => {
    setShowResult(Object.keys(passedCard).length === Persons.length)
  }, [passedCard]);

  return (
    <>
      {currentView==='slider' && (
        <ThreeDSlider
          switchPage={() => setCurrentView('pagePerson')}
          selectPerson={(id)=>setSelectedPerson(id)}
          passedCard={passedCard}
        />
      )}
      {currentView === 'pagePerson' && selectedPerson &&(
        <PagePerson
          personId={selectedPerson}
          comeBack={()=> setCurrentView('slider')}
          openLaboreCode={()=>setCurrentView('laboreCode')}
          checkAnswer={()=>checkAnswer(selectedPerson)}
        />
      )}
      {currentView === 'laboreCode' && (
        <LaborCode
          comeBack={() => setCurrentView('pagePerson')}
        />
      )})
        <Card
          title={'Поздравляем!'}
          body={'Вы отличн правились с задачами бухгалтера Межпланетного Пенсионного Фонда'}
          isOpen={showResult}
          type={'gameOver'}
          game = 'economist'
        />
    </>
  );
};

export default PensionGalaxy;