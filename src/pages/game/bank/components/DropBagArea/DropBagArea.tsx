import { useDrop } from 'react-dnd';
import { DraggableBag } from '../index';
import classes from './DropBagArea.module.scss';
import { bags } from '../../contstans';
import { BagsList } from '../../types';
import { useState, useEffect } from 'react';

type DropBagAreaProps = {
  positions: number[];
  setPositions: React.Dispatch<React.SetStateAction<number[]>>;
};

const DropBagArea = ({ positions, setPositions }: DropBagAreaProps) => {
  const [shuffledBags, setShuffledBags] = useState<BagsList>([]);

  const [, drop] = useDrop({
    accept: 'bag',
    drop: (item: { id: number }) => handleDrop(null, item),
  });

  useEffect(() => {
    const shuffled = [...bags].sort(() => Math.random() - 0.5);
    setShuffledBags(shuffled);
  }, []);

  const handleDrop = (index: number | null, item: { id: number }) => {
    const newPositions = [...positions];

    if (index === null) {
      // Remove bag from the slot and add it back to the bag field
      const currentIndex = newPositions.findIndex(id => id === item.id);
      if (currentIndex !== -1) {
        newPositions[currentIndex] = 0; // Reset slot to 0
      }
    }
    setPositions(newPositions);
  };

  return (
    <div ref={drop} className={classes.bags}>
      {shuffledBags
        .filter((bag) => !positions.includes(bag.id)) // Remove bags already placed
        .map((bag) => (
          <DraggableBag key={bag.id} bag={bag} />
        ))}
    </div>
  );
};

export default DropBagArea;
