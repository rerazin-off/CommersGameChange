import { useState } from 'react';
import classes from './CommerceTovary.module.scss';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import  Drag  from '../bank/Drag';
import { DropBagArea } from './components';
import { correctOrder } from './contstans';
import CardFinish from './components/CardFinish/CardFinish';
import DropSlot from './components/DropSlot/DropSlot';
import { RoutesEnum } from '../../../app/routes';

const touchBackendOptions = {
  enableMouseEvents: true,
  enableTouchEvents: true,
  delayTouchStart: 0,
  delay: 0,
  ignoreContextMenu: true,
  getDropTargetElements: (element: HTMLElement) => {
    return Array.from(document.querySelectorAll('[blocks-drop-target="true"]'));
  }
};


export const CommerceTovary = () => {
  // Теперь positions хранит массивы ID для каждого слота
  const [positions, setPositions] = useState<number[][]>(Array(2).fill([]));
  const [openIsCard, setOpenIsCard] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const allRequiredBagsPlaced = () => {
    const requiredIds = correctOrder.flat();
    const placedIds = positions.flat();
    return requiredIds.every(id => placedIds.includes(id));
  };

  const handleDrop = (index: number | null, item: { id: number }) => {
    setPositions(prev => {
      // Сначала удаляем элемент из всех слотов
      const newPositions = prev.map(slot =>
        slot.filter(id => id !== item.id)
      );

      // Если index указан и элемент еще не в этом слоте
      if (index !== null && !newPositions[index].includes(item.id)) {
        newPositions[index] = [...newPositions[index], item.id];
      }

      return newPositions;
    });
  };
  const checkResults = () => {
    setAttempts(prev => prev + 1);

    // Проверяем соответствие каждого слота своему correctOrder
    const isCorrect = positions.every((slotItems, slotIndex) => {
      const correctIds = correctOrder[slotIndex];
      // Проверяем что все нужные ID есть в слоте и нет лишних
      return (
        correctIds.every(id => slotItems.includes(id)) &&
        slotItems.every(id => correctIds.includes(id))
      );
    });

    if (isCorrect) {
      setOpenIsCard(true);
    } else {
      // Подсвечиваем неправильные элементы
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
      <Drag />
      <div className={classes.container}>
        {/* Два слота для перетаскивания */}
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

        {/* Область с элементами для перетаскивания */}
        <DropBagArea positions={positions.flat()} setPositions={setPositions} />

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
            onClick={() => {
              localStorage.setItem('fromGame', 'true');
              navigate(RoutesEnum.TORGASHI);
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