import { useDragLayer } from 'react-dnd';

export default function CustomDragLayer() {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
    })
  );

  if (!isDragging || !currentOffset) {
    return null;
  }

  const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    zIndex: 100,
  };

  return (
    <div style={layerStyles}>
      {itemType === 'INSTR' && (
        <img src={item.asset} alt="Перетаскиваемый инструмент" />
      )}
    </div>
  );
}
