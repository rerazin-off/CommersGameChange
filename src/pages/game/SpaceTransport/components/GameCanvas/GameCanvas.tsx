import React, { useEffect, useRef, useState } from 'react';
import classes from '../../SpaceTransport.module.scss';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  transportRef: React.RefObject<HTMLDivElement>;
  planetRefs: React.RefObject<HTMLDivElement>[];
  days: number[];
}

interface Position {
  x: number;
  y: number;
}

const dayOffset: Record<number, Position> = {
  0: { x: 0, y: -150 },
  1: { x: -80, y: 150 },
  2: { x: 80, y: 150 },
  3: { x: -80, y: -160 },
  4: { x: 100, y: -10 },
  5: { x: 80, y: -160 },
};

const GameCanvas: React.FC<CanvasProps> = ({ canvasRef, transportRef, planetRefs, days }) => {
  const daysPositions = useRef<Position[]>([]);
  const [positionsChanged, setPositionsChanged] = useState(0);

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    return canvas?.getContext('2d');
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setPositionsChanged(prev => prev + 1);
    });

    const config = { attributes: true, attributeFilter: ['style'] };
    planetRefs.forEach(ref => ref.current && observer.observe(ref.current, config));

    return () => observer.disconnect();
  }, [planetRefs]);

  const calcControlPoints = (start: Position, end: Position) => ({
    controlP1: { x: start.x + (end.x - start.x) * 0.2, y: start.y },
    controlP2: { x: end.x + (end.x - start.x) * 2, y: end.y + (end.y - start.y) * (-0.3) }
  });

  const drawConnection = (start: DOMRect, end: DOMRect, straight: boolean, dayIndex: number) => {
    const ctx = getCanvasContext();
    if (!ctx || !canvasRef.current) return;

    const canvasRec = canvasRef.current.getBoundingClientRect();
    const toCanvasCoords = (rect: DOMRect) => ({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2 - canvasRec.top
    });

    const startPos = toCanvasCoords(start);
    const endPos = toCanvasCoords(end);
    const midPoint = {
      x: (startPos.x + endPos.x) / 2,
      y: (startPos.y + endPos.y) / 2
    };

    const offset = dayOffset[dayIndex] || { x: 0, y: 0 };
    daysPositions.current[dayIndex] = {
      x: midPoint.x + offset.x,
      y: midPoint.y + offset.y
    };

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y);

    if (straight) {
      ctx.lineTo(endPos.x, endPos.y);
    } else {
      const { controlP1, controlP2 } = calcControlPoints(startPos, endPos);
      ctx.bezierCurveTo(controlP1.x, controlP1.y, controlP2.x, controlP2.y, endPos.x, endPos.y);
    }
    ctx.stroke();
  };

  const drawDayMarks = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    days.forEach((day, i) => {
      if (day && daysPositions.current[i]) {
        ctx.fillText(`${day} дня`, daysPositions.current[i].x, daysPositions.current[i].y);
      }
    });
  };

  const drawAll = () => {
    const ctx = getCanvasContext();
    if (!ctx || !canvasRef.current) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const planets = planetRefs
      .map(p => p.current?.getBoundingClientRect())
      .filter(Boolean) as DOMRect[];
    const transport = transportRef.current?.getBoundingClientRect();

    if (planets.length >= 3 && transport) {
      drawConnection(planets[0], planets[1], false, 3);
      drawConnection(planets[0], planets[2], false, 5);
      drawConnection(planets[1], planets[2], true, 4);
      planets.forEach((p, i) => drawConnection(transport, p, false, i));

      drawDayMarks();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawAll();
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    return () => {
      getCanvasContext()?.clearRect(0, 0, canvas.width, canvas.height);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => drawAll(), [positionsChanged, days]);

  return <canvas ref={canvasRef} className={classes.canvasClass} />;
};

export default GameCanvas;