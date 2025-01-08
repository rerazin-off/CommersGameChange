import { useDrop } from 'react-dnd';
import { bags } from '../../contstans';
import { DraggableBag } from '../index';
import classes from './DropSlot.module.scss'


type DropSlotProps = {
  index: number;
  handleDrop: any;
  positions: Array<number>
}

const DropSlot = ({ index, handleDrop, positions }: DropSlotProps) => {
  const [, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => {
      if (positions[index] === item.id) {

        handleDrop(null, item);
      } else {

        handleDrop(index, item);
      }
    },
  });

  const currentBag = bags.find((bag) => bag.id === positions[index]);

  return (
    <div ref={drop} className={classes.circle}>
      {currentBag && <DraggableBag bag={currentBag} />}
    </div>
  );
};

export default DropSlot;