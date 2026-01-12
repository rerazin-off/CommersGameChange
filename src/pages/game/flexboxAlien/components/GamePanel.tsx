import  classes from '../flexboxAlien.module.scss';

const GamePanel = ({selectedValue, currentLevel} ) => {

  return (
    <div className={classes.gameArea}>
      <div
        className={classes.alienContainer}
        style={{
          position:'absolute',
          zIndex:'100',
          display: 'flex',
          justifyContent: currentLevel.code.find((el: number)=>el===1) ? selectedValue['1'] : 'flex-start',
          alignItems: currentLevel.code.find((el:number)=>el===2) ? selectedValue['2'] : 'flex-start',
            flexDirection: currentLevel.code.find((el:number)=>el===3) ? selectedValue['3'] : 'row',
          flexWrap: currentLevel.code.find((el: number)=>el===4) ? selectedValue['4'] : 'nowrap',
          width: '85vh',
          height: '100vh',
        }}
      >
        {currentLevel.aliens.map((alien: string, index: number) => (
          <img key={index} src={alien} alt="alien" className={classes.alien} style={{width:'22%'}}/>
        ))}
      </div>

      <div
        className={classes.planetContainer}
        style={{
          position:'absolute',
          top:'0',
          display: 'flex',
          justifyContent: currentLevel.code.find((el: number)=>el===1) ?  currentLevel.correctAnswer[0] : 'flex-start',
          alignItems: currentLevel.code.find((el: number)=>el===2) ?  currentLevel.correctAnswer[1] : 'flex-start',
            flexDirection: currentLevel.code.find((el: number)=>el===3) ?  currentLevel.correctAnswer[2] : 'row',
          flexWrap: currentLevel.code.find((el: number)=>el===4) ?  currentLevel.correctAnswer[3] : 'nowrap',
          width: '87vh',
          height: '100vh',
        }}
      >
        {currentLevel.planets.map((planet: string, index: number) => (
          <img key={index} src={planet} alt="planet" className={classes.planet}/>
        ))}
      </div>
    </div>
  );
};

export default GamePanel;