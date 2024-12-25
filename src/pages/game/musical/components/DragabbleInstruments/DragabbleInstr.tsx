import { useDrag } from 'react-dnd';

export default function Instruments({ index, asset }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'INSTR',
    item: { id: index, asset },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      style={{ opacity: isDragging ? 0 : 1, cursor: 'grab' }}
      src={asset}
      alt={`Инструмент ${index + 1}`}
    />
  );
}
