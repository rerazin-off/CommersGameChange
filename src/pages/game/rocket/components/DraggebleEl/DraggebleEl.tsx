import { useDrag } from 'react-dnd';
type Props = {
  src: string,
  id: string,
  moveElement: (id: string) => void,
};
export default function DraggebleEl({ src, id, moveElement }: Props) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
      type: 'EL',
      item: { id, src },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          moveElement(item.id);
        }
      },
    }),
  );
  return <img ref={dragRef} src={src} />;
}