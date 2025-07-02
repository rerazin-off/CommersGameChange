import { useDrop } from 'react-dnd';
import { DraggableBag } from '../index';
import classes from './DropSlot.module.scss';
import { allBags } from '../../contstans';

type DropSlotProps = {
  index: number;
  positions: number[];
  onDrop: (item: { id: number }) => void;
  checked: boolean;
  correctlyPlaced: number[];
};

const MAX_BAGS_PER_COLUMN = 5;

const DropSlot = ({
                    index,
                    positions,
                    onDrop,
                    checked,
                    correctlyPlaced
                  }: DropSlotProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'bag',
    drop: (item) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Для левого слота (index === 0) меняем порядок колонок
  const columns = [];

  if (index === 0) {
    // Правая колонка (первые MAX_BAGS_PER_COLUMN элементов)
    const rightColumn = positions.slice(0, MAX_BAGS_PER_COLUMN);
    // Левая колонка (остальные элементы)
    const leftColumn = positions.slice(MAX_BAGS_PER_COLUMN);

    if (rightColumn.length > 0) columns.push(rightColumn);
    if (leftColumn.length > 0) columns.push(leftColumn);
  } else {
    // Для правого слота оставляем как есть
    for (let i = 0; i < positions.length; i += MAX_BAGS_PER_COLUMN) {
      columns.push(positions.slice(i, i + MAX_BAGS_PER_COLUMN));
    }
  }

  return (
    <div
      ref={drop}
      className={`${classes.circle} ${isOver ? classes.canDrop : ''}`}
      data-testid={`drop-slot-${index}`}
    >
      <div className={index === 0 ? classes.leftSlot : classes.rightSlot}>
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={classes.column}
          >
            {column.map(id => {
              const bag = allBags.find(b => b.id === id);
              return bag && (
                <DraggableBag
                  key={id}
                  bag={bag}
                  isInSlot
                  isCorrect={correctlyPlaced.includes(id)}
                  disabled={checked && correctlyPlaced.includes(id)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropSlot;