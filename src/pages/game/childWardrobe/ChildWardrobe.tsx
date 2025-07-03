import classes from './ChildWardrobe.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import  {useRef, useState, useEffect} from "react";
import { round, wear1 } from './Data';
import SelectedWear from "./components/SelectedWear";
import ControlPanel from "./components/ControlPanel";
import Card from '../../../components/Card/Card';
import Result from './components/Result';
import { Button } from '../../../components/Button/Button';
import { RoutesEnum } from '../../../app/routes';
import { useNavigate } from 'react-router-dom';
import EventPanel from './components/EventPanel/EventPanel';

export const ChildWardrobe: React.FC = () => {
  const navigate = useNavigate()
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(1);
  const [activeWear, setActiveWear] = useState(wear1[0].items[0]);
  const [selectedWear, setSelectedWear] = useState([]);
  const [currentWear, setCurrentWear] = useState(wear1);
  const [visibleFinishCard, setVisibleFinishCard] = useState(false);
  const [isSecondRound, setIsSecondRound] = useState(false);
  const [visibleSecondRoundCard, setVisibleSecondRoundCard] = useState(false);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = navigationNextRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  useEffect(() => {
    setActiveWear(currentWear[0]?.items.find((el, index) => (index === activeIndex)));
  }, [activeIndex, currentWear]);


  const selectWear = () => {
    if (!activeWear || !currentWear[0]) return;

    const selectedItem = {
      ...activeWear,
      width: currentWear[0].width,
      positions: currentWear[0].positions,
      zIndex: currentWear[0].zIndex
    };

    setSelectedWear(prev => [...prev, selectedItem]);

    if (currentWear.length > 1) {
      setCurrentWear(prev => prev.slice(1));
    } else {
      setCurrentWear([]);
    }
  };


  useEffect(() => {
    if (selectedWear.length!==3) return;
    const allCorrect = selectedWear.every(el => el.correct);
    if (allCorrect){
      isSecondRound ? setVisibleSecondRoundCard(true) : setVisibleFinishCard(true);
    }
    else{
      const errorCategories = selectedWear.filter(el => !el.correct);
      const originalCategories = errorCategories.map(error =>
      wear1.find(cat => cat.positions===error.positions)).filter(Boolean);
      toast.error(`Вы ошиблись в следующих категориях: ${originalCategories.map(el=>el.name)}`)
      if (originalCategories.length >0){
        setCurrentWear([...originalCategories, ...currentWear]);
        setSelectedWear(selectedWear.filter(el => el.correct))
      }
    }
  }, [selectedWear, isSecondRound]);

  const advanceSecondRound = () => {
    setVisibleFinishCard(false);
    round.shift();
    setSelectedWear([]);
    setCurrentWear(wear1.slice(3));
    setIsSecondRound(true);
  };

  console.log(activeWear);
  console.log(activeIndex);

  return (
    <div className={classes.game}>
      <ToastContainer position='bottom-left'/>
      <SelectedWear clothes={selectedWear}/>
      <div className={classes.col} style={{position: 'absolute', left: '30vw', top: '11.3vh'}}>
        <EventPanel
          round={round[0]}
        />
        <img src={round[0].img} width={230}/>
        <ControlPanel
          prevRef={navigationPrevRef}
          nextRef={navigationNextRef}
          activeWear={activeWear}
          onSelect={selectWear}
        />
      </div>

      {currentWear.length > 0 && (
        <div className={classes.sliderContainer} style={{
          top: `${currentWear[0].positions[0]}vh`, left: `${currentWear[0].positions[1]}vh`
        }}>
          <Swiper
            ref={swiperRef}
            loop={true}
            slidesPerView={1}
            spaceBetween={50}
            centeredSlides={true}
            initialSlide={0}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            modules={[Navigation]}
            className={`mySwiper ${classes.customSwiper}`}
            onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          >
            {currentWear[0].items.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.img} width={`${currentWear[0].width}`} alt={item.name}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <Card
        title={`Задание 2`}
        body={'Помогите Лёве собраться на утренник в детском саду!'}
        isOpen={visibleFinishCard}
        type='secondRound'
        game='kinder'
        onSecondRound={advanceSecondRound}
      />

      <Button
        className={classes.backButton}
        bgColor="pink"
        type="type1v2"
        onClick={() => {
          localStorage.setItem('fromGame', 'true');
          navigate(RoutesEnum.KINDER);
        }}
      >
        НАЗАД
      </Button>

      {visibleSecondRoundCard && (
        <Result/>
      )}
    </div>
  );
};