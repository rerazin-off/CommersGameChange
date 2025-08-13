import { useState } from 'react';
import classes from './MagicalCrimes.module.scss';
import AchievementsPanel from './components/AchievementsPanel/AchievementsPanel';
import CardFairyTale from './components/CardFairyTale/CardFairyTale';
import { FairyTales } from './Data';
import Question from './components/Question/Question';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';

const MagicalCrimes: React.FC = () => {
  const navigate = useNavigate()
  const [openedTale, setOpenedTale] = useState(null);
  const [score, setScore] = useState(0);
  const [closedCases, setClosedCases] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});

  const onCloseCase = (taleId: number) => {
    setClosedCases(prev => [...prev, taleId]);
    setLevel(prev => prev + 1);
  };

  const onCompleteQuestions = (taleId: number) => {
    setCompletedQuestions(prev => ({ ...prev, [taleId]: true }));
  };

  const openQuestion = (el) => {
    if (closedCases.includes(el.id)) return;
    if (completedQuestions[el.id]) {
      setOpenedTale({ ...el, skipToScene: true });
    } else {
      setOpenedTale(el);
    }
  };

  return (
    <div className={classes.game}>
      <AchievementsPanel
        score={score}
        level={level}
        closedCasesCount={closedCases.length}
      />
      {!openedTale && (
        <div style={{display:'flex', flexDirection: 'row', gap:'3vh'}}>
          {FairyTales.map((el) => (
            <CardFairyTale
              key={el.id}
              title={el.name}
              type={el.type}
              image={el.image}
              countStar={el.countStar}
              onClick={() => openQuestion(el)}
              isClosed={closedCases.includes(el.id)}
            />
          ))}
        </div>
      )}

      {openedTale && (
        <Question
          fairyTale={openedTale}
          onBack={() => setOpenedTale(null)}
          onCorrectAnswer={() => setScore(prev => prev + 10)}
          onCloseCase={() => onCloseCase(openedTale.id)}
          onCompleteQuestions={() => onCompleteQuestions(openedTale.id)}
          skipToScene={openedTale.skipToScene}
        />
      )}
      <Button
        className={classes.backButton}
        bgColor="pink"
        type="type1v2"
        onClick={()=>navigate(RoutesEnum.YUR)}
      >
        НАЗАД
      </Button>
    </div>
  );
};

export default MagicalCrimes;