import { useState } from 'react';
import classes from './BankGramotnost.module.scss';
import { Button } from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DropBagArea } from './components';
import { correctOrder, allBags, shuffleBags } from './contstans';
import CardFinish from './components/CardFinish/CardFinish';
import DropSlot from './components/DropSlot/DropSlot';
import SplitBagArea from './components/SplitBagArea/SplitBagArea';
import { RoutesEnum } from '@/app/routes';

const touchBackendOptions = {
  enableMouseEvents: true,
  enableTouchEvents: true,
  delayTouchStart: 0,
  delay: 0,
  ignoreContextMenu: true,
  getDropTargetElements: (element: HTMLElement) => {
    return Array.from(document.querySelectorAll('[data-drop-target="true"]'));
  }
};

export const BankGramotnost = () => {
  const [positions, setPositions] = useState<number[][]>([[], []]);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentBagIndex, setCurrentBagIndex] = useState(0);

  const allRequiredBagsPlaced = () => {
    const requiredIds = correctOrder.flat();
    const placedIds = positions.flat();
    return requiredIds.every(id => placedIds.includes(id));
  };

  const handleDrop = (slotIndex: number, item: { id: number }) => {
    setPositions(prev => {
      const newPositions = [...prev];
      newPositions.forEach(slot => {
        const index = slot.indexOf(item.id);
        if (index !== -1) slot.splice(index, 1);
      });
      newPositions[slotIndex] = [...newPositions[slotIndex], item.id];
      return newPositions;
    });

    // Увеличиваем индекс только если это текущий bag
    if (item.id === allBags[currentBagIndex].id) {
      setCurrentBagIndex(prev => Math.min(prev + 1, allBags.length - 1));
    }
  };


  const checkResults = () => {
    setAttempts(prev => prev + 1);

    const isCorrect = positions.every((slotItems, slotIndex) => {
      const correctIds = correctOrder[slotIndex];
      return (
        correctIds.every(id => slotItems.includes(id)) &&
        slotItems.every(id => correctIds.includes(id))
      );
    });

    if (isCorrect) {
      setOpenIsCard(true);
    } else {
      setPositions(prev =>
        prev.map((slot, slotIndex) =>
          slot.filter(id => correctOrder[slotIndex].includes(id))
        )
      );
    }
  };

  const handleCloseCard = () => {
    setOpenIsCard(false);
  };

  const navigate = useNavigate();

  return (
    <DndProvider backend={TouchBackend} options={touchBackendOptions}>
      <div className={classes.container}>
        <div className={classes.grid}>
          {positions.map((_, i) => (
            <DropSlot
              key={i}
              index={i}
              positions={positions[i]}
              onDrop={(item) => handleDrop(i, item)}
            />
          ))}
        </div>

        <SplitBagArea
          placedItems={positions.flat()}
          currentBagIndex={currentBagIndex}
        />

        {allRequiredBagsPlaced() && (
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
            // onClick={() => navigate(RoutesEnum.BANK)}
            onClick={() => {
              localStorage.setItem('fromGame', 'true'); // Устанавливаем флаг
              navigate(RoutesEnum.BANK); // Возвращаемся назад
            }}
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