import { useState } from 'react';
import classes from './logistCep.module.scss';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import Drag from '../bank/Drag';
import { DropBagArea } from './components';
import { correctOrder } from './contstans';
import CardFinish from './components/CardFinish/CardFinish';
import DropSlot from './components/DropSlot/DropSlot';
import { RoutesEnum } from '../../../app/routes';

const touchBackendOptions = {
  enableMouseEvents: true,
};

export const LogistCep = () => {
  const [positions, setPositions] = useState<number[]>(Array(10).fill(0));

  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleDrop = (index: number | null, item: { id: number }) => {
    const newPositions = [...positions];
    if (index === null) {
      // Перемещение обратно в мешки
      const currentIndex = newPositions.findIndex(id => id === item.id);
      if (currentIndex !== -1) newPositions[currentIndex] = 0;
    } else {
      // Перемещение в другую ячейку
      const currentIndex = newPositions.findIndex(id => id === item.id);
      if (currentIndex !== -1) newPositions[currentIndex] = 0;
      newPositions[index] = item.id;
    }
    setPositions(newPositions);
  };

  const checkResults = () => {
    setAttempts(prev => prev + 1);
    if (JSON.stringify(positions) === JSON.stringify(correctOrder)) {
      setOpenIsCard(true);
    } else {
      const newPositions = positions.map((pos, idx) =>
        pos === correctOrder[idx] ? pos : 0
      );
      setPositions(newPositions);
    }
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };

  const isVisibleButton = positions.every(pos => pos > 0);

  const navigate = useNavigate();

  return (
    <DndProvider backend={TouchBackend} options={touchBackendOptions}>
      <Drag />
      <div className={classes.container}>
        <div className={classes.grid}>
          {positions.map((_, i) => (
            <DropSlot
              key={i}
              index={i}
              handleDrop={handleDrop}
              positions={positions}
            />
          ))}
        </div>
        <DropBagArea positions={positions} setPositions={setPositions} />
        {isVisibleButton && (
          <div onClick={checkResults} className={classes.checkButton}>
            <Button bgColor="blue" type="type1v2">
              ПРОВЕРИТЬ
            </Button>
          </div>
        )}
        <div className={classes.backButton}>
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => navigate(RoutesEnum.LOGISTICS)}
          >
            НАЗАД
          </Button>
        </div>
        <CardFinish
          attempts={attempts}
          isOpenCard={openIsCard}
          onClose={handleCloseCard}
        />
      </div>
    </DndProvider>
  );
};
