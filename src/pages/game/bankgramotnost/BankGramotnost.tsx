import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import classes from './BankGramotnost.module.scss';
import { Button } from '@/components/Button/Button';
import { RoutesEnum } from '@/app/routes';
import { allBags, correctOrder } from './contstans';
import DropSlot from './components/DropSlot/DropSlot';
import SplitBagArea from './components/SplitBagArea/SplitBagArea';
import CardFinish from './components/CardFinish/CardFinish';

const touchBackendOptions = {
  enableMouseEvents: true,
  enableTouchEvents: true,
  delayTouchStart: 0,
  delay: 0,
  ignoreContextMenu: true,
  enableHoverOutsideTarget: true,
  touchSlop: 0, // Важно: установлено в 0 для мгновенного отслеживания
  getDropTargetElementsForElement: (element) => {
    return Array.from(document.querySelectorAll('[blocks-testid^="drop-slot"]'));
  },
  getTouchClientOffset: (e: TouchEvent) => {
    const touch = e.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  },
  previewEnabled: true,
};

const BankGramotnost = () => {
  const [positions, setPositions] = useState<number[][]>([[], []]);
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentBagId, setCurrentBagId] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correctlyPlaced, setCorrectlyPlaced] = useState<number[]>([]);
  const [incorrectBags, setIncorrectBags] = useState<typeof allBags>([]);
  const [currentIncorrectIndex, setCurrentIncorrectIndex] = useState(0);
  const [allBagsPlaced, setAllBagsPlaced] = useState(false);
  const [shuffledBags, setShuffledBags] = useState<typeof allBags>([]);
  const navigate = useNavigate();

  // Инициализация перемешанных багов
  useEffect(() => {
    const shuffled = [...allBags].sort(() => Math.random() - 0.5);
    setShuffledBags(shuffled);
    setCurrentBagId(shuffled[0]?.id || null);
  }, []);

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

    // Находим следующий неразмещенный баг
    const nextBag = shuffledBags.find(bag =>
      !positions.flat().includes(bag.id) && bag.id !== item.id
    );
    setCurrentBagId(nextBag?.id || null);
  };

  const checkResults = () => {
    setAttempts(prev => prev + 1);
    setChecked(true);

    const newCorrectlyPlaced: number[] = [];
    const newIncorrectBags: typeof allBags = [];
    const newPositions: number[][] = [[], []];

    positions.forEach((slotItems, slotIndex) => {
      const correctIds = correctOrder[slotIndex];
      slotItems.forEach(id => {
        if (correctIds.includes(id)) {
          newCorrectlyPlaced.push(id);
          newPositions[slotIndex].push(id);
        } else {
          const bag = allBags.find(b => b.id === id);
          if (bag) newIncorrectBags.push(bag);
        }
      });
    });

    setCorrectlyPlaced(newCorrectlyPlaced);
    setIncorrectBags(newIncorrectBags);
    setPositions(newPositions);
    setCurrentIncorrectIndex(0);
    setAllBagsPlaced(false);

    if (newIncorrectBags.length === 0) {
      setOpenIsCard(true);
    }
  };

  const handleIncorrectBagPlaced = () => {
    if (currentIncorrectIndex < incorrectBags.length - 1) {
      setCurrentIncorrectIndex(prev => prev + 1);
    } else {
      setAllBagsPlaced(true);
      setIncorrectBags([]);
    }
  };

  const allRequiredBagsPlaced = () => {
    const requiredIds = correctOrder.flat();
    const placedIds = positions.flat();
    return requiredIds.every(id => placedIds.includes(id));
  };

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
              checked={checked}
              correctlyPlaced={correctlyPlaced}
            />
          ))}
        </div>

        <SplitBagArea
          placedItems={positions.flat()}
          currentBagId={currentBagId}
          checked={checked}
          incorrectBags={incorrectBags}
          currentIncorrectIndex={currentIncorrectIndex}
          onIncorrectBagPlaced={handleIncorrectBagPlaced}
        />

        {(allRequiredBagsPlaced() && !checked) || (checked && allBagsPlaced) ? (
          <div onClick={checkResults} className={classes.checkButton}>
            <Button bgColor="blue" type="type1v2">
              ПРОВЕРИТЬ
            </Button>
          </div>
        ) : null}

        <div className={classes.backButton}>
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => navigate(RoutesEnum.BANK)}
          >
            НАЗАД
          </Button>
        </div>

        <CardFinish
          attempts={attempts}
          isOpenCard={openIsCard}
          onClose={() => setOpenIsCard(false)}
        />
      </div>
    </DndProvider>
  );
};

export default BankGramotnost;