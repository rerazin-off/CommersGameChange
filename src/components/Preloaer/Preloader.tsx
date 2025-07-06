import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import classes from './Preloader.module.scss'

const SpacePreloader = () => {
  return (
    <div className={classes.preloader}>
      <DotLottieReact
        src="../../public/animations/space.lottie"
        loop
        autoplay
        style={{ width: "15%", }}
      />
      <p>Загрузка...</p>
    </div>
  );
};

export default SpacePreloader;