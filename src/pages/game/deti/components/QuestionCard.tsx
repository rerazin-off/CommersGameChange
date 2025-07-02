import classes from '../MovieGame.module.scss';

interface QuestionCardProps {
  onAnswer: () => void;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  isAnswerEmpty: boolean; // Новый пропс
}

export const QuestionCard = ({ 
  onAnswer, 
  userAnswer, 
  setUserAnswer,
  isAnswerEmpty 
}: QuestionCardProps) => {
  return (
    <div className={classes.questionCard}>
      <h2>Что это за сказка ?</h2>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className={classes.answerInput}
      />
      <button 
        onClick={onAnswer} 
        className={classes.submitButton}
        disabled={isAnswerEmpty} // Блокируем кнопку если поле пустое
      >
        Ответить
      </button>
    </div>
  );
};