import { useDrag } from 'react-dnd';
import { Bag } from '../../types';
import classes from './DraggableBag.module.scss';
import { color } from 'framer-motion';

type DraggableBagProps = {
  bag: Bag;
};

const DraggableBag = ({ bag }: DraggableBagProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'bag',
    item: { id: bag.id, image: bag.image, label: bag.label },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={classes.gg}>
      <img
        ref={drag}
        src={bag.image}
        alt={bag.label}
        className={`${classes.bag} ${isDragging ? classes.dragging : ''}`}
        draggable={false}
        style={{ opacity: isDragging ? 0 : 1 }}
      />
      <p className={classes.gee}
         style={{ opacity: isDragging ? 0 : 1 }}>{bag.label}</p>
    </div>


  );
};

export default DraggableBag;
