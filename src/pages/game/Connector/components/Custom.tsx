import { useDragLayer } from 'react-dnd';
import classes from './custom.module.scss';
import { useMemo } from 'react';

export default function Custom() {
  // ВСЕ данные из useDragLayer получаем ОДИН раз
  const {
    item,
    isDragging,
    initialOffset,
    clientOffset
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    clientOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  // Используем useMemo для вычисления стилей
  const style = useMemo(() => {
    if (!isDragging || !clientOffset || !item) {
      return null;
    }

    // Центрируем по пальцу/курсору
    // 55px / 2 = 27.5, 236px / 2 = 118
    const x = clientOffset.x - 27.5;
    const y = clientOffset.y - 118;

    return {
      position: 'fixed',
      top: 0,
      left: 0,
      transform: `translate(${x}px, ${y}px)`,
      pointerEvents: 'none',
      zIndex: 9999,
    };
  }, [isDragging, clientOffset, item]);

  // Если не перетаскиваем или нет данных, не рендерим ничего
  if (!isDragging || !clientOffset || !item || !style) {
    return null;
  }

  return (
    <div className={classes.dragLayer}>
      <div style={style} className={classes.draggingEl}>
        <img
          src={item.src}
          alt="dragging wire"
          style={{
            width: '55px',
            height: '236px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            opacity: 0.8,
          }}
        />
      </div>
    </div>
  );
}