import { useEffect, useRef, useState } from 'react';
import CatIcon from '../../assets/img/cat2.svg';
import PlanetFirstCorpus from '../../assets/img/planet-corpus1.svg';
import PlanetSecondCorpus from '../../assets/img/planet-corpus2.svg';
import PlanetThirdCorpus from '../../assets/img/planet-corpus3.svg';
import classes from './MainPage.module.scss';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const intervalRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  // const intervalRef = useRef(null);
  const intervalRef = useRef(0);

  const slides = [
    { id: 1, image: PlanetFirstCorpus },
    { id: 2, image: PlanetSecondCorpus },
    { id: 3, image: PlanetThirdCorpus },
  ];

  const getSlideClass = (index: number) => {
    if (index === activeIndex) return `${classes.slide} ${classes.active}`;
    if (index === (activeIndex + 1) % slides.length) return `${classes.slide} ${classes.right}`;
    if (index === (activeIndex - 1 + slides.length) % slides.length) return `${classes.slide} ${classes.left}`;
    return classes.slide;
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [slides.length]);

  return (
    <div className={classes.universe}>
      <div className={classes.cat}>
        <div className={classes.container}>
          <h1>Вселенная Нижегородский губернский колледж</h1>
          <div className={classes.img}>
            <img src={CatIcon} alt="Логотип" />
          </div>
        </div>
      </div>

      <div className={classes.slider}>
        <div className={classes.slides}>
          {slides.map((slide, index) => (
            <div key={slide.id} className={getSlideClass(index)}>
              <Link to={`/${slide.id}`}>
                <div className={classes.img}>
                  <img src={slide.image} alt={`Слайд ${index + 1}`} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
