import React, {useState, useRef, useEffect} from 'react';
import SliderItem from '../../components/SliderItem';
import './ThreeDSlider.css';
import { Persons } from '../../Date';
import { Button } from '../../../../../components/Button/Button';
import { RoutesEnum } from '../../../../../app/routes';
import { useNavigate } from 'react-router-dom';

const ThreeDSlider = ({switchPage, selectPerson, passedCard}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(-16);
  const [currentY, setCurrentY] = useState(0);

  const sliderRef = useRef(null);
  const bannerRef = useRef(null);
  const animationRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(()=>{
      setInitialAnimation(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    autoRotate  ?
    sliderRef.current.style.animation='autoRun 30s linear infinite' :'';
  }, [autoRotate]);

  const touchStart = (e) =>{
    if (e.target.closest('button')){
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    sliderRef.current.style.animation = 'none';
    setAutoRotate(false);
  }

  const touchMove = (e) =>{
    e.preventDefault()
    if (!isDragging) return;

    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;

    setCurrentX(prev => prev + dx * 0.2)
    setCurrentY(prev => Math.max(-60, Math.min(30, prev + dy * 0.1)))

    sliderRef.current.style.transform = `
    perspective(1000px)
    rotateX(${currentY}deg)
    rotateY(${currentX}deg)`

    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  }

  const touchEnd = (e) =>{
    e.preventDefault()
    setIsDragging(false);
    setAutoRotate(true);
    bannerRef.current.style.cursor = 'grab';
  }

  useEffect(() => {
    const banner = bannerRef.current;
    banner.addEventListener('touchstart', touchStart, { passive: false });
    banner.addEventListener('touchmove', touchMove, { passive: false });
    banner.addEventListener('touchend', touchEnd, { passive: false });

    return () => {
      banner.removeEventListener('touchstart', touchStart);
      banner.removeEventListener('touchmove', touchMove);
      banner.removeEventListener('touchend', touchEnd);
      cancelAnimationFrame(animationRef.current)
    }
  }, [isDragging, autoRotate, currentX, currentY]);

  const clickCard = (id) =>{
    switchPage()
    selectPerson(id)
  }

  return (
    <div className='banner' onTouchStart={touchStart} ref={bannerRef}>
      <div className={`slider ${initialAnimation ? 'initial' : ''}`} ref={sliderRef}>
        {Persons.map(person => (
          <SliderItem
            key={person.id}
            imageUrl={person.img}
            position={person.id}
            initial={initialAnimation}
            name={person.name}
            switchPage={()=>clickCard(person.id)}
            passedCard={passedCard[person.id] || false}
          />
        ))}
      </div>
      <Button
        className='backButton'
        bgColor="pink"
        type="type1v2"
        onClick={() => {
          localStorage.setItem('fromGame', 'true');
          navigate(RoutesEnum.ECONOMIST);
        }}
      >
        НАЗАД
      </Button>
    </div>
  );
};

export default ThreeDSlider;