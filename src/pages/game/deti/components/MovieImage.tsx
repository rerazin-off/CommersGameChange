import { useState } from 'react';
import classes from '../MovieGame.module.scss';

interface MovieImageProps {
  src: string;
}

export const MovieImage = ({ src }: MovieImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={classes.errorContainer}>
        Не удалось загрузить изображение
      </div>
    );
  }

  return (
    <div className={classes.imageContainer}>
      <img 
        src={src} 
        alt="Кадр из мультфильма" 
        className={classes.movieImage}
        onError={() => setError(true)}
      />
    </div>
  );
};