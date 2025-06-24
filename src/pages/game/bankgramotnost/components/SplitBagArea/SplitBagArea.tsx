import { DraggableBag } from '../index';
import classes from './SplitBagArea.module.scss';
import { leftBags, rightBags, allBags } from '../../contstans';
import { useState, useEffect } from 'react';

type SplitBagAreaProps = {
  placedItems: number[];
};

const SplitBagArea = ({ placedItems = [] }: SplitBagAreaProps) => {
  const [initialBags, setInitialBags] = useState<{
    left: typeof leftBags;
    right: typeof rightBags;
  }>({ left: [], right: [] });

  useEffect(() => {
    // Инициализация только при первом рендере
    if (initialBags.left.length === 0 && initialBags.right.length === 0) {
      const allAvailableBags = [...allBags].sort(() => Math.random() - 0.5);
      const leftCount = Math.ceil(allAvailableBags.length / 2);
      const newLeftBags = allAvailableBags.slice(0, leftCount);
      const newRightBags = allAvailableBags.slice(leftCount);

      setInitialBags({
        left: newLeftBags,
        right: newRightBags
      });
    }
  }, []);

  // Фильтруем только не размещенные элементы, сохраняя исходное распределение
  const availableBags = {
    left: initialBags.left.filter(bag => !placedItems.includes(bag.id)),
    right: initialBags.right.filter(bag => !placedItems.includes(bag.id))
  };

  return (
    <div className={classes.splitContainer}>
      <div className={classes.leftBags}>
        {availableBags.left.map(bag => (
          <DraggableBag key={`left-${bag.id}`} bag={bag} />
        ))}
      </div>

      <div className={classes.rightBags}>
        {availableBags.right.map(bag => (
          <DraggableBag key={`right-${bag.id}`} bag={bag} />
        ))}
      </div>
    </div>
  );
};

export default SplitBagArea;