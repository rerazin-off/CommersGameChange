import { useDrop } from 'react-dnd';
import { DraggableBag } from '../index';
import classes from './DropBagArea.module.scss';
import { BagsList } from '../../types';
import { useEffect, useState } from 'react';
// import { bags } from '../../contstans';

type DropBagAreaProps = {
  positions: number[];
  setPositions: React.Dispatch<React.SetStateAction<number[][]>>;
};

const DropBagArea = ({ positions, setPositions }: DropBagAreaProps) => {
  const [shuffledBags, setShuffledBags] = useState<BagsList>([]);

  const [, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => {
      setPositions(prev => prev.map(slot => slot.filter(id => id !== item.id)));
    },
  });

  useEffect(() => {
    const shuffled = [...bags].sort(() => Math.random() - 0.5);
    setShuffledBags(shuffled);
  }, []);

  return (
    <div ref={drop} className={classes.bags}>
      {shuffledBags.map(bag => {
        const isPlaced = positions.flat().includes(bag.id);
        return isPlaced ? (
          <div key={bag.id} className={classes.placeholder} /> // Пустой placeholder
        ) : (
          <DraggableBag key={bag.id} bag={bag} />
        );
      })}
    </div>
  );
};

export default DropBagArea;