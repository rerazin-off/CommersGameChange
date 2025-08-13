import React, { useEffect, useRef, useState } from 'react';
import '../ThreeDSlider.css';

const SliderItem = ({position, imageUrl, initial, name, switchPage}) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (!initial){
      itemRef.current.style.transform = `
        rotateY(calc((${position} - 1) * (360deg / 8)))
        translateZ(450px)`;
    }
  }, [initial, position]);

  const touchStart = (e) =>{
    e.stopPropagation();
    switchPage()
  }

  return (
    <div className='item' ref={itemRef} style={{'--position': position, transform: initial ? 'translateZ(0)' : ''}}>
      <h1>{name}</h1>
      <img src={imageUrl}/>
      <button
        onClick={switchPage}
        onTouchStart={touchStart}
      >играть</button>
    </div>
  );
};

export default SliderItem;