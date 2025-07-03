import { DraggableBag } from '../index';
import classes from './SingleBagArea.module.scss';
import { allBags } from '../../contstans';

type SingleBagAreaProps = {
  placedItems: number[];
  currentBagIndex: number;
};

const SingleBagArea = ({ placedItems = [], currentBagIndex }: SingleBagAreaProps) => {
  const currentBag = allBags[currentBagIndex];
  const isPlaced = placedItems.includes(currentBag?.id);

  if (!currentBag) return null;

  return (
    <div className={classes.singleBagContainer}>
      {!isPlaced && (
        <>
          <DraggableBag key={currentBag.id} bag={currentBag} />
          <div className={classes.bagLabel}>{currentBag.label}</div>
        </>
      )}
    </div>
  );
};

export default SingleBagArea;