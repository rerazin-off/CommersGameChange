import { useDrag } from 'react-dnd';
import React, { useState, useEffect } from 'react';

// const instruments = [
//   { id: 1, asset: guitar, category: undefined },
//   { id: 2, asset: bayan, category: undefined },
//   { id: 3, asset: buben, category: undefined },
//   { id: 4, asset: drums, category: undefined },
//   { id: 5, asset: dudelka, category: undefined },
//   { id: 6, asset: dudelka2, category: undefined },
//   { id: 7, asset: acousic, category: undefined },
//   { id: 8, asset: guitarpiano, category: undefined },
//   { id: 9, asset: kselophone, category: undefined },
//   { id: 10, asset: piano, category: undefined },
//   { id: 11, asset: violonchel, category: undefined },
//   { id: 12, asset: dudelochka, category: undefined },
// ];

export default function Instruments({ index, asset }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [{}, dragRef] = useDrag(() => ({
    type: 'INSTR',
    item: { id: index, asset },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    // end: () => {
    //   setIsDragging(false);
    // },
  }));

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = event => {
        setPosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isDragging]);

  return (
    <img
      ref={dragRef}
      src={asset}
      style={{
        ...(isDragging
          ? {
              position: 'fixed',
              top: position.y,
              left: position.x,
            }
          : {}),
        cursor: 'grab',
      }}
    />
  );
}
