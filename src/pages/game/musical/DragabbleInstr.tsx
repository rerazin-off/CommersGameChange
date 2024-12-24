import { DragPreviewImage, useDrag } from 'react-dnd';

export default function Instruments({ index, asset }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'INSTR',
    item: { id: index, asset }, // Передаём asset для превью
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
      src={asset}
      alt={`Инструмент ${index + 1}`}
    />
  );
}
