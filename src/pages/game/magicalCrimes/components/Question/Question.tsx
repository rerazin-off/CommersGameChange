import { useEffect, useState } from 'react';
import { Answers, Questions, Evidences, FalseEvidence } from '../../Data';
import classes from './Question.module.scss';
import fingerprint from '../../../../../assets/img/game_assets/magicalCrimes-img/fingerprint.svg';
import Scene from '../scene/Scene';

interface Answer {
  text: string;
  correct: boolean;
}

interface QuestionProps {
  fairyTale: any;
  onBack: () => void;
  onCorrectAnswer: () => void;
  onCloseCase: () => void;
  onCompleteQuestions: () => void;
  skipToScene?: boolean;
}

const Question = ({ fairyTale, onBack, onCorrectAnswer, onCloseCase, onCompleteQuestions, skipToScene = false }: QuestionProps) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [openScenes, setOpenScenes] = useState<boolean>(skipToScene);

  useEffect(() => {
    if (skipToScene) {
      setOpenScenes(true);
    }
  }, [skipToScene]);

  const currentAnswers = Answers.find(
    answer => answer.idFairyTale === fairyTale.id &&
      answer.idQuestion === Questions[questionIndex].id
  )?.answers || [];

  const check = () => {
    if (!selectedAnswer) return;
    setIsChecked(true);

    if (selectedAnswer.correct) {
      onCorrectAnswer();

      if (questionIndex < Questions.length - 1) {
        setQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsChecked(false);
      } else {
        onCompleteQuestions();
        setOpenScenes(true);
      }
    }
  };

  const clickAnswer = (answer: Answer) => {
    if (!isChecked) {
      setSelectedAnswer(answer);
    } else if (!selectedAnswer?.correct) {
      setSelectedAnswer(answer);
      setIsChecked(false);
    }
  };

  const getAnswerClass = (answer: Answer) => {
    if (!isChecked) {
      return selectedAnswer?.text === answer.text ? classes.selected : '';
    }
    if (answer.correct && selectedAnswer?.text === answer.text) {
      return classes.correct;
    }
    return selectedAnswer?.text === answer.text ? classes.incorrect : '';
  };

  if (openScenes) {
    return (
      <div className={classes.fullscreen}>
        <Scene
          numEvidence={fairyTale.evidence}
          evidences={Evidences.filter(el => el.idScenes === fairyTale.id)}
          falseEvidences={FalseEvidence.filter(el => el.idScenes === fairyTale.id)}
          environment={fairyTale.environment}
          onBack={onBack}
          onCorrectAnswer={onCorrectAnswer}
          onCloseCase={onCloseCase}
        />
      </div>
    );
  }

  return (
    <div className={classes.question}>
      <div className={classes.cornerTopRight}></div>
      <div className={classes.cornerBottomLeft}></div>
      <img src={fingerprint} className={classes.fingerprint} alt="fingerprint" />
      <h1>Дело: {fairyTale.name}</h1>
      <h2>Ситуация</h2>
      <p>{fairyTale.situation}</p>
      <h2>{Questions[questionIndex].text}</h2>
      <div className={classes.answersContainer}>
        {currentAnswers.map((el) => (
          <div
            key={el.text}
            className={`${classes.answer} ${getAnswerClass(el)}`}
            onClick={() => clickAnswer(el)}
          >
            {el.text}
          </div>
        ))}
      </div>
      <button onClick={check} disabled={!selectedAnswer}>
        проверить
      </button>
    </div>
  );
};

export default Question;