import React, { useEffect } from 'react';
import classes from '../../SpaceTransport.module.scss'

type CanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  transportRef: React.RefObject<HTMLDivElement>;
  planetRefs: React.RefObject<HTMLDivElement>[];
  days: number[];
}

const GameCanvas = ({canvasRef, transportRef, planetRefs, days}: CanvasProps) => {
  const daysPositions = [];

  function drawConnections(start, end, straight, dayIndex){
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    const canvasRec = canvas.getBoundingClientRect()

    const x0 = start.left + start.width/2;
    const y0 = start.top + start.height/2 - canvasRec.top;
    const x1 = end.left + end.width/2;
    const y1 = end.top + end.height/2 - canvasRec.top;

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    let offsetX=0;
    let offsetY =0;

    if (dayIndex ===0){
      offsetY = -150
    }
    else if (dayIndex === 1){
      offsetX = -80
      offsetY = +150
    }
    else if (dayIndex === 2){
      offsetX = +80
      offsetY = +150
    }
    else if (dayIndex === 3){
      offsetX = -80
      offsetY = -160
    }
    else if (dayIndex === 5){
      offsetX = +80
      offsetY = -160
    }
    else if(dayIndex ===4){
      offsetX = +100;
      offsetY =-10
    }

    daysPositions[dayIndex] = {
      x: midX + offsetX,
      y: midY + offsetY,
    };

    const controlPoints = calcControlPoints(x0, x1, y0, y1)

    ctx.beginPath()
    ctx.moveTo(x0, y0)

    if (straight){
      ctx.lineTo(x1, y1)
    }
    else{
      ctx.bezierCurveTo(controlPoints.controlP1.x, controlPoints.controlP1.y, controlPoints.controlP2.x, controlPoints.controlP2.y, x1, y1)
    }
    ctx.stroke()
  }

  const calcControlPoints=(x0, x1, y0, y1)=>{
    return {
      controlP1:{
        x: x0+(x1-x0)*0.2,
        y: y0
      },
      controlP2:{
        x: x1 + (x1 - x0) * 2,
        y: y1 + (y1- y0) *(-0.3)
      }
    }
  }

  const drawDayMarks =()=>{
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < days.length && i < daysPositions.length; i++) {
      if (days[i] && daysPositions[i]) {
        ctx.fillText(`${days[i]} дня`, daysPositions[i].x, daysPositions[i].y);
      }
    }
  }

  const animateTransport = () =>{

  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const planets = planetRefs.map(p => p.current?.getBoundingClientRect()).filter(Boolean)
    const transport = transportRef.current?.getBoundingClientRect()

    drawConnections(planets[0], planets[1], false, 3)
    drawConnections(planets[0], planets[2], false, 5)
    drawConnections(planets[1], planets[2], true, 4)

    planets.forEach((p, index)=>{
      drawConnections(transport, p, false, index)
    })
    drawDayMarks()
  }, [days]);

  return (
    <canvas ref={canvasRef} className={classes.canvasClass}/>
  );
};

export default GameCanvas;