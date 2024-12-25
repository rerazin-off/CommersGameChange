import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';

type DraggableBagProps = {
  bag: Bag;
};

const DraggableBag = ({ bag }: DraggableBagProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'bag',
    item: { id: bag.id, image: bag.image },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={bag.image}
      alt={bag.label}
      className={`${classes.bag} ${isDragging ? classes.dragging : ''}`}
      draggable={false}
      style={{ opacity: isDragging ? 0 : 1 }}
    />
  );
};

export default DraggableBag;
