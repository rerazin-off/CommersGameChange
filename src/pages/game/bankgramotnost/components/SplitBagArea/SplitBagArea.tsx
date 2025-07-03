import { DraggableBag } from '../index';
import classes from './SplitBagArea.module.scss';
import { allBags } from '../../contstans';

type SplitBagAreaProps = {
  placedItems: number[];
  currentBagId: number | null;
  checked: boolean;
  incorrectBags: typeof allBags;
  currentIncorrectIndex: number;
  onIncorrectBagPlaced: () => void;
};

const SplitBagArea = ({
                        placedItems = [],
                        currentBagId,
                        checked,
                        incorrectBags,
                        currentIncorrectIndex,
                        onIncorrectBagPlaced
                      }: SplitBagAreaProps) => {
  // До проверки - показываем текущую сумку
  if (!checked) {
    const currentBag = allBags.find(bag => bag.id === currentBagId);
    const isPlaced = placedItems.includes(currentBagId);

    return (
      <div className={classes.splitContainer}>
        <div className={classes.bags}>
          {!isPlaced && currentBag && (
            <DraggableBag
              key={currentBag.id}
              bag={currentBag}
              disabled={false}
            />
          )}
        </div>
      </div>
    );
  }

  // После проверки - показываем текущую неправильную сумку
  const currentIncorrectBag = incorrectBags[currentIncorrectIndex];
  if (!currentIncorrectBag) return null;

  return (
    <div className={classes.splitContainer}>
      <div className={classes.bags}>
        <DraggableBag
          key={currentIncorrectBag.id}
          bag={currentIncorrectBag}
          disabled={false}
          onDragEnd={onIncorrectBagPlaced}
        />
      </div>
    </div>
  );
};

export default SplitBagArea;