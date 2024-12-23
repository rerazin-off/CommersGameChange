import { useDrag } from 'react-dnd';

export default function DraggebleEl({ src, index, moveBodyToDropArea }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: index < 4 ? 'BODY' : 'WINDOW',
    item: { id: src, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        moveBodyToDropArea(item.index);
      }
    }
  }));

  return (
    <img ref={dragRef} src={src} />
  );
}