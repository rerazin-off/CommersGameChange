import { useDrop } from 'react-dnd';
import { DraggableBag } from '../index';
import classes from './DropBagArea.module.scss';
import { BagsList } from '../../types';
import { useEffect, useState } from 'react';
import { allBags } from '../../contstans';

type DropBagAreaProps = {
  positions: number[][];
  setPositions: React.Dispatch<React.SetStateAction<number[][]>>;
  currentBagIndex: number;
};

const DropBagArea = ({ positions, setPositions, currentBagIndex }: DropBagAreaProps) => {
  const [shuffledBags, setShuffledBags] = useState<BagsList>([]);

  useEffect(() => {
    setShuffledBags([...allBags].sort(() => Math.random() - 0.5));
  }, []);

  const [, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => {
      setPositions(prev => prev.map(slot => slot.filter(id => id !== item.id)));
    },
  });

  return (
    <div ref={drop} className={classes.bags}>
      {shuffledBags.slice(0, currentBagIndex + 1).map(bag => {
        const isPlaced = positions.flat().includes(bag.id);
        return isPlaced ? (
          <div key={bag.id} className={classes.placeholder} />
        ) : (
          <DraggableBag key={bag.id} bag={bag} />
        );
      })}
    </div>
  );
};

export default DropBagArea;