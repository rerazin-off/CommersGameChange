import { useRef, useEffect, useState } from 'react';
import CatIcon from '../../assets/img/mainPageImg/mainCat.svg';
import PlanetFirstCorpus from '@/assets/img/planet-corpus1.svg';
import PlanetSecondCorpus from '@/assets/img/planet-corpus2.svg';
import PlanetThirdCorpus from '@/assets/img/planet-corpus3.svg';
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css'
import 'swiper/css/navigation';
import classes from '../MainPage/MainPage.module.scss';

export const SwiperPage = () => {
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    if (!swiperRef?.current && !swiperRef.current?.swiper) return;
    swiperRef.current.swiper.params.navigation.prevEl = navigationPrevRef.current;
    swiperRef.current.swiper.params.navigation.nextEl = navigationNextRef.current;
    swiperRef.current.swiper.navigation.init();
    swiperRef.current.swiper.navigation.update()
  }, []);


  return (
    <div className={classes.universe}>
      <div className={classes.container}>
        <h1>Вселенная Нижегородский губернский колледж</h1>
        <img
          src={CatIcon}
        />
      </div>
      <div className={classes.sliderContainer}>
        <Swiper
          onSwiper={swiper => {
            swiper.wrapperEl.style.top = '70vh';
            swiper.wrapperEl.style.height = '60%';
          }}
          ref={swiperRef}
          loop={false}
          slidesPerView={3}
          spaceBetween={50}
          centeredSlides={true}
          initialSlide={1}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          modules={[Navigation]}
          className={`mySwiper ${classes.customSwiper}`}
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        >
          <SwiperSlide
            className={`${classes.slide} ${activeIndex === 0 ? classes.activeSlide : classes.passiveSlide}`}
          >
            <img src={PlanetFirstCorpus} />
          </SwiperSlide>

          <SwiperSlide
            className={`${classes.slide} ${activeIndex === 1 ? classes.activeSlide : classes.passiveSlide}`}
          >
            <img src={PlanetSecondCorpus} />
          </SwiperSlide>

          <SwiperSlide
            className={`${classes.slide} ${activeIndex === 2 ? classes.activeSlide : classes.passiveSlide}`}
          >
            <img src={PlanetThirdCorpus} />
          </SwiperSlide>
        </Swiper>

        <div className={classes.controlPanel}>
          <button ref={navigationPrevRef} className={classes.navButton}>
            <FaPlay
              color="#fff"
              size={40}
              style={{ transform: 'rotate(180deg)' }}
            />
          </button>
          <Link to={`/${activeIndex + 1}`}>
            <button className={classes.selectButton}>выбрать</button>
          </Link>
          <button ref={navigationNextRef} className={classes.navButton}>
            <FaPlay color="#fff" size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};
