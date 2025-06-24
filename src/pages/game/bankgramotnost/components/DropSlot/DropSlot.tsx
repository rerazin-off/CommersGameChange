import { useDrop } from 'react-dnd';
import { DraggableBag } from '../index';
import classes from './DropSlot.module.scss';
import { allBags } from '../../contstans';

type DropSlotProps = {
  index: number;
  positions: number[];
  onDrop: (item: { id: number }) => void;
};

const DropSlot = ({ index, positions, onDrop }: DropSlotProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`${classes.circle} ${
        isOver ? (canDrop ? classes.canDrop : classes.cannotDrop) : ''
      }`}
      data-testid={`drop-slot-${index}`}
    >
      {positions.map(id => {
        const bag = allBags.find(b => b.id === id);
        return bag && <DraggableBag key={id} bag={bag} isInSlot />;
      })}
    </div>
  );
};

export default DropSlot;