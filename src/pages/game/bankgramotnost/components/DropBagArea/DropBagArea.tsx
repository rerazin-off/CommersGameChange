import { useDrop } from 'react-dnd';
import { DraggableBag } from '../index';
import classes from './DropBagArea.module.scss';
import { BagsList } from '../../types';
import { useEffect, useState } from 'react';
import { allBags } from '../../contstans';

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

type DropBagAreaProps = {
  positions: number[][];
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
    // Перемешиваем bags при монтировании компонента
    setShuffledBags(shuffleArray(allBags));
  }, []);

  return (
    <div ref={drop} className={classes.bags}>
      {shuffledBags.map(bag => {
        const isPlaced = positions.flat().includes(bag.id);
        return isPlaced ? (
          <div key={bag.id} className={classes.placeholder} />
        ) : (
          <DraggableBag
            key={bag.id}
            bag={bag}
          />
        );
      })}
    </div>
  );
};

export default DropBagArea;