export type Movie = {
  id: number;
  name: string;
  images: string[];
};

export type GameState = {
  currentMovieIndex: number;
  currentImageIndex: number;
  score: number;
  isGameOver: boolean;
  showQuestion: boolean;
  userAnswer: string;
};