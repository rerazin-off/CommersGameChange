import React from 'react';
import titleImg from '../../../../assets/img/game_assets/pensionGalaxy-img/titleImg.svg';

const Section = ({number, title, children}) => {
  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2vh', marginTop: '4vh' }}>
        <h1 style={{ fontFamily: 'BOWLER', fontSize: '24px', color: '#23EAFA', fontWeight:'400', marginBottom:'1vh'}}>Статья {number}. {title}</h1>
        <img src={titleImg} style={{ marginTop: '-2vh' }} />
      </div>
      {children}
    </>
  );
};

export default Section;