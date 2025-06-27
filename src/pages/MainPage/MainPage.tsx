import { useRef, useEffect, useState } from 'react';
import CatIcon from '../../assets/img/mainPageImg/mainCat.svg';
import { useNavigate } from 'react-router-dom';
import 'swiper/css'
import 'swiper/css/navigation';
import classes from './MainPage.module.scss';
import DialogWindow from './components/DialogWindow/DialogWindow';
import { Button } from '../../components/Button/Button';
import { RoutesEnum } from '../../app/routes';

export const MainPage = () => {
  const navigate = useNavigate()
  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  const [startDialog, setStartDialog] = useState(false);

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
        {startDialog && (
          <>
            <DialogWindow
              title={'Сферикс'}
              body={
                'Всем привет, меня зовут Сферикс. Я приглашаю вас во вселенную Нижегородского губернского колледжа.\n' +
                '\n' +
                ' Нижегородский губернский колледж состоит из трех корпусов. Каждый корпус имеет свою направленность.  '
              }
            />
            <Button
              className={classes.backButton}
              bgColor="blue"
              type="type1v2"
              onClick={() => {
                localStorage.setItem('fromGame', 'true');
                navigate(RoutesEnum.SWIPER);
              }}
            >
              НАЧАТЬ
            </Button>
          </>
        )}
        <img
          src={CatIcon}
          onClick={() => setStartDialog(true)}
          style={{
            marginTop:
              !startDialog
                ? '10vh'
                : startDialog
                  ? '35vh'
                  : '0vh',
            marginLeft: startDialog ? '40vw' : '0vw',
          }}
        />
        {!startDialog  && <p>нажми на меня</p>}
      </div>
    </div>
  );
};
