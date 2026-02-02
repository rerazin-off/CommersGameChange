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
                                       onDragStart,
                                     }: Props) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "WIRE",

      canDrag: !isDisabled,

      // ✅ В v14 item может быть функцией
      item: () => {
        if (!isDisabled && onDragStart) {
          onDragStart();
        }

        return {
          wireIndex,
          src: image,
        };
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [wireIndex, image, isDisabled, onDragStart]
  );

  return (
    <img
      ref={dragRef}
      src={image}
      alt="wire"
      className={`wire-item ${isDragging ? "is-dragging" : ""} ${
        isDisabled ? "is-disabled" : ""
      }`}
      style={{
        cursor: isDisabled ? "not-allowed" : "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
}