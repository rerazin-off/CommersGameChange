import { useDrop } from 'react-dnd';
import { useCallback } from 'react';
import classes from './DropArea.module.scss';

interface DragAreaProps {
  imageUrl: string;
  items: { id: number; url: string; category: string }[];
  setItems: (newItems: number[]) => void;
  category: string;
}

export default function Area(props: DragAreaProps) {
  const { imageUrl, items, setItems, category } = props;

  const onDrop = useCallback(
    (item: { id: number }) => {
      setItems(item.id);
    },
    [setItems]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'INSTR',
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={classes.droparea}>
      <img className={classes.catname} src={imageUrl} alt="Область" />
      <div className={classes.area}>
        {items.map(item => (
          <div className={classes.instrImage}>
            <img key={item.id} src={item.url} alt={`Инструмент ${item.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
