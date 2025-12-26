import { useDrag } from "react-dnd";
import "./game.scss";

interface Props {
  wireIndex: number;
  image: string;
  isDisabled?: boolean;
  onDragStart?: () => void;
}

export default function WireDragItem({
                                       wireIndex,
                                       image,
                                       isDisabled,
                                       onDragStart
                                     }: Props) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "WIRE",
    item: { wireIndex, src: image },
    canDrag: !isDisabled,
    begin: () => {
      // Вызываем onDragStart при начале перетаскивания
      if (onDragStart && !isDisabled) {
        onDragStart();
      }
      return { wireIndex, src: image };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // Для обратной совместимости с v14+
    ...(process.env.NODE_ENV === 'development' && {
      begin: undefined,
      item: () => {
        if (onDragStart && !isDisabled) {
          onDragStart();
        }
        return { wireIndex, src: image };
      }
    })
  }), [isDisabled, wireIndex, image, onDragStart]);

  return (
    <img
      ref={dragRef}
      src={image}
      alt="wire"
      className={`wire-item ${isDragging ? "is-dragging" : ""} ${isDisabled ? "is-disabled" : ""}`}
      style={{
        cursor: isDisabled ? "not-allowed" : "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseDown={() => {
        // Дополнительная проверка для тач-устройств
        if (!isDisabled && onDragStart) {
          setTimeout(() => onDragStart(), 100);
        }
      }}
    />
  );
}