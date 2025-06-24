import React, { useEffect, useRef } from 'react';
import classes from '../../SpaceTransport.module.scss';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  transportRef: React.RefObject<HTMLDivElement>;
  planetRefs: React.RefObject<HTMLDivElement>[];
  days: number[];
}

const GameCanvas: React.FC<CanvasProps> = ({ canvasRef, transportRef, planetRefs, days }) => {
  const daysPositions = useRef<Array<{x: number, y: number}>>([]);

  const drawConnections = (start: DOMRect, end: DOMRect, straight: boolean, dayIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    const canvasRec = canvas.getBoundingClientRect();

    const x0 = start.left + start.width / 2;
    const y0 = start.top + start.height / 2 - canvasRec.top;
    const x1 = end.left + end.width / 2;
    const y1 = end.top + end.height / 2 - canvasRec.top;

    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    let offsetX = 0;
    let offsetY = 0;

    switch (dayIndex) {
      case 0: offsetY = -150; break;
      case 1: offsetX = -80; offsetY = 150; break;
      case 2: offsetX = 80; offsetY = 150; break;
      case 3: offsetX = -80; offsetY = -160; break;
      case 5: offsetX = 80; offsetY = -160; break;
      case 4: offsetX = 100; offsetY = -10; break;
    }

    daysPositions.current[dayIndex] = { x: midX + offsetX, y: midY + offsetY };

    ctx.beginPath();
    ctx.moveTo(x0, y0);

    if (straight) {
      ctx.lineTo(x1, y1);
    } else {
      const controlPoints = calcControlPoints(x0, x1, y0, y1);
      ctx.bezierCurveTo(
        controlPoints.controlP1.x, controlPoints.controlP1.y,
        controlPoints.controlP2.x, controlPoints.controlP2.y,
        x1, y1
      );
    }
    ctx.stroke();
  };

  const calcControlPoints = (x0: number, x1: number, y0: number, y1: number) => {
    return {
      controlP1: { x: x0 + (x1 - x0) * 0.2, y: y0 },
      controlP2: { x: x1 + (x1 - x0) * 2, y: y1 + (y1 - y0) * (-0.3) }
    };
  };

  const drawDayMarks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < days.length && i < daysPositions.current.length; i++) {
      if (days[i] && daysPositions.current[i]) {
        ctx.fillText(`${days[i]} дня`, daysPositions.current[i].x, daysPositions.current[i].y);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const planets = planetRefs
      .map(p => p.current?.getBoundingClientRect())
      .filter(Boolean) as DOMRect[];
    const transport = transportRef.current?.getBoundingClientRect();

    if (planets.length >= 3 && transport) {
      drawConnections(planets[0], planets[1], false, 3);
      drawConnections(planets[0], planets[2], false, 5);
      drawConnections(planets[1], planets[2], true, 4);

      planets.forEach((p, index) => {
        drawConnections(transport, p, false, index);
      });
      drawDayMarks();
    }

    return () => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [days]);

  return <canvas ref={canvasRef} className={classes.canvasClass} />;
};

export default GameCanvas;