import classes from '../../MagicalCrimes.module.scss';
import { useEffect, useState } from 'react';
import CardEvidences from '../CardEvidences/CardEvidences';
import { Button } from '../../../../../components/Button/Button';
import { FaHeart } from 'react-icons/fa';
import ErrorCard from '../ErrorCard/ErrorCard';


const Scene = ({ numEvidence, evidences, environment, onBack, onCorrectAnswer, onCloseCase, falseEvidences }) => {
  const [currentEvidence, setCurrentEvidence] = useState(null);
  const [foundEvidence, setFoundEvidence] = useState([]);
  const [countClick, setCountClick] = useState(0);
  const heartsToDisplay = Math.max(0, 10 - countClick);
  const [showError, setShowError] = useState(false);

  const evidenceClick = (evidence) => {
    setCurrentEvidence(evidence);
    if (!foundEvidence.some(el => el.id === evidence.id)) {
      setFoundEvidence(prev => [...prev, evidence]);
      onCorrectAnswer();
    }
  };

  const wrongClick = (e) => {
    if (e.target === e.currentTarget) {
      setCountClick(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (numEvidence === foundEvidence.length) {
      onCloseCase();
    }
  }, [foundEvidence, numEvidence, onCloseCase]);

  return (
    <div
      className={classes.bg}
      style={{ backgroundImage: `url(${environment})`, backgroundSize:'cover' }}
      onClick={wrongClick}
    >

      <nav>
        найдено улик: {foundEvidence.length}/{numEvidence}
        <div className={classes.icons}>
          {Array(heartsToDisplay).fill(0).map((_, i) => (
            <FaHeart key={i} />
          ))}
        </div>
      </nav>

      {evidences.map((evidence) => (
        <div
          key={evidence.id}
          style={{
            position: 'absolute',
            width: `${evidence.size[0]}vh`,
            height: `${evidence.size[1]}vh`,
            bottom: `${evidence.positions[0]}vh`,
            right: `${evidence.positions[1]}vh`,
            cursor: 'pointer'
          }}
          onClick={() => evidenceClick(evidence)}
        ></div>
      ))}

      {falseEvidences.map((evidence, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: `${evidence.size[0]}vh`,
            height: `${evidence.size[1]}vh`,
            bottom: `${evidence.positions[0]}vh`,
            right: `${evidence.positions[1]}vh`,
          }}
          onClick={(e) => {
            setCountClick(prev => prev + 1);
            setShowError(true);
          }}
        ></div>
      ))}

      <CardEvidences
        openCard={currentEvidence !== null}
        evidence={currentEvidence}
        onClose={() => setCurrentEvidence(null)}
      />

      <ErrorCard
        title={'Ошибка'}
        content={'Этот объект не является уликой'}
        isOpen={showError}
        onClose={() => setShowError(false)}
      />

      <ErrorCard
        title={'Ошибка'}
        content={'Вы использовали слишком много попыток'}
        onClose={() => {
          onCloseCase();
          onBack();
        }}
        isOpen={countClick > 9}
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