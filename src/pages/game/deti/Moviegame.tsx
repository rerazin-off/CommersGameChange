import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieImage } from './components/MovieImage';
import { QuestionCard } from './components/QuestionCard';
import { GameResult } from './components/GameResult';
import { Button } from '../../../components/Button/Button';
import { movies } from './components/movies';
import { GameState } from './components/types';
import { RoutesEnum } from '../../../app/routes';
import classes from '../deti/MovieGame.module.scss';

export const MovieGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentMovieIndex: 0,
    currentImageIndex: 0,
    score: 0,
    isGameOver: false,
    showQuestion: false,
    userAnswer: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (gameState.isGameOver || gameState.showQuestion) return;

    const timer = setTimeout(() => {
      if (gameState.currentImageIndex < 4) {
        setGameState(prev => ({
          ...prev,
          currentImageIndex: prev.currentImageIndex + 1
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          showQuestion: true
        }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState]);

  const handleAnswer = () => {
    if (!gameState.userAnswer.trim()) return; // Дополнительная проверка на пустую строку
    
    const currentMovie = movies[gameState.currentMovieIndex];
    
    // Проверяем, совпадает ли ответ пользователя с любым из вариантов
    const isCorrect = currentMovie.possibleAnswers.some(
      answer => gameState.userAnswer.trim().toLowerCase() === answer.toLowerCase()
    );

    const newScore = isCorrect ? gameState.score + 1 : gameState.score;
    const isLastMovie = gameState.currentMovieIndex === movies.length - 1;

    setGameState({
      ...gameState,
      score: newScore,
      showQuestion: false,
      userAnswer: "",
      currentImageIndex: 0,
      currentMovieIndex: isLastMovie ? 
        gameState.currentMovieIndex : gameState.currentMovieIndex + 1,
      isGameOver: isLastMovie
    });
  };

  const handleRestartGame = () => {
    setGameState({
      currentMovieIndex: 0,
      currentImageIndex: 0,
      score: 0,
      isGameOver: false,
      showQuestion: false,
      userAnswer: ""
    });
  };

  if (gameState.isGameOver) {
    return (
      <GameResult 
        score={gameState.score}
        onRestart={handleRestartGame}
        backLink={RoutesEnum.KINDER}
        gameLink={RoutesEnum.MOVIE_GAME}
      />
    );
  }

  const currentMovie = movies[gameState.currentMovieIndex];
  const currentImage = currentMovie.images[gameState.currentImageIndex];

  return (
    <div className={classes.gameContainer}>
      {gameState.showQuestion ? (
        <QuestionCard
          onAnswer={handleAnswer}
          userAnswer={gameState.userAnswer}
          setUserAnswer={(answer) => setGameState({...gameState, userAnswer: answer})}
          isAnswerEmpty={!gameState.userAnswer.trim()} // Передаем информацию о пустом поле
        />
      ) : (
        <>
          <MovieImage src={currentImage} />
          <div className={classes.progress}>
            Картинка {gameState.currentImageIndex + 1} из 5
          </div>
        </>
      )}

      <div className={classes.backButton}>
        <Button
          bgColor="pink"
          type="type1v2"
          onClick={() => {
            localStorage.setItem('fromGame', 'true');
            navigate(RoutesEnum.KINDER);
          }}
        >
          НАЗАД
        </Button>
      </div>
    </div>
  );
};