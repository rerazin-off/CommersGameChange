import classes from '../../MagicalCrimes.module.scss';
import { useEffect, useState } from 'react';
import CardEvidences from '../CardEvidences/CardEvidences';
import { Button } from '../../../../../components/Button/Button';


const Scene = ({ numEvidence, evidences, environment, onBack, onCorrectAnswer, onCloseCase }) => {
  const [currentEvidence, setCurrentEvidence] = useState(null);
  const [foundEvidence, setFoundEvidence] = useState([]);

  const handleEvidenceClick = (evidence) => {
    setCurrentEvidence(evidence);
    if (!foundEvidence.some(el=>el.id===evidence.id)){
      setFoundEvidence(prev => [...prev, evidence])
      onCorrectAnswer()
    }
  };

  useEffect(() => {
    if (numEvidence === foundEvidence.length){
      onCloseCase()
    }
  }, [foundEvidence]);

  return (
    <div className={classes.bg} style={{backgroundImage: `url(${environment})`}}>
      <nav>
        найдено улик: {foundEvidence.length}/{numEvidence}
      </nav>
      {evidences.map((evidence) => (
        <div
          key={evidence.id}
          style={{
            color:'red',
            position: 'absolute',
            width: `${evidence.size[0]}vh`,
            height: `${evidence.size[1]}vh`,
            bottom: `${evidence.positions[0]}vh`,
            right: `${evidence.positions[1]}vh`,
            cursor: 'pointer'
          }}
          onClick={() => handleEvidenceClick(evidence)}
        ></div>
      ))}

      <CardEvidences
        openCard={currentEvidence !== null}
        evidence={currentEvidence}
        onClose={() => setCurrentEvidence(null)}
      />
      <Button
        className={classes.backButton}
        bgColor="pink"
        type="type1v2"
        onClick={onBack}
      >
        НАЗАД
      </Button>
    </div>
  );
};

export default Scene;