import React, { useState } from 'react';
import ThreeDSlider from './components/ThreeDSlider';
import PagePerson from './components/PagePerson/PagePerson';
import LaborCode from './components/LaborCode/LaborCode';

const PensionGalaxy = () => {
  const [currentView, setCurrentView] = useState('slider');
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <>
      {currentView==='slider' && (
        <ThreeDSlider
          switchPage={() => setCurrentView('pagePerson')}
          selectPerson={(id)=>setSelectedPerson(id)}
        />
      )}
      {currentView === 'pagePerson' && selectedPerson &&(
        <PagePerson
          personId={selectedPerson}
          comeBack={()=> setCurrentView('slider')}
          openLaboreCode={()=>setCurrentView('laboreCode')}
        />
      )}
      {currentView === 'laboreCode' && (
        <LaborCode
          comeBack={() => setCurrentView('pagePerson')}
        />
      )}
      )
    </>
  );
};

export default PensionGalaxy;