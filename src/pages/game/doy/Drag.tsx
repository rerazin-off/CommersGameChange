import { useDragLayer } from 'react-dnd';


export default function Drag()  {
  const { item, currentOffset, isDragging } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    type: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const transform = {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
  };

  return (
    <div style={{ pointerEvents: "none", position: "fixed", zIndex: 100 }}>
      <div style={transform}>
        <img src={item.image} alt=""   style={{ width: "200px", height: "200px" }}/>
      </div>
    </div>
  );
};


