import  { useEffect, useRef } from 'react';
import iconUser from '@/assets/img/game_assets/space-transport-img/iconUser.svg';
import classes from '../../SpaceTransport.module.scss'

const TransportSlot = ({selectedImg, transport, transportRef, show, changeNumPerson}) => {


  function changeUsersCount(button) {

    const operator = button.textContent;

    const holdTimer = setInterval(() => {
      changeNumPerson(operator);
    }, 100);

    document.addEventListener('pointerup', () => {
      clearInterval(holdTimer);
    });
  }

  return (
    <div className={classes.slot}>
      <img src={selectedImg} ref={transportRef} />
      {transport && show && (
        <>
          <div onPointerDown={(e) => changeUsersCount(e.target)}>
            <button
            >-</button>
            <button
            >+</button>
          </div>
          <div className={classes.slotParameters}>
            <img src={iconUser} />
            <p>
              {transport?.numPerson}/{transport?.capacity}
            </p>
          </div>
        </>
      )}
    </div>
)
  ;
};

export default TransportSlot;