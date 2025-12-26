import { FC } from "react";
import { useDrag } from "react-dnd";
import { Option } from "../../types/game";

export const DRAG_TYPE = "GAME_OPTION";

interface Props {
  option: Option;
}

export const DraggableOption: FC<Props> = ({ option }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DRAG_TYPE,
    item: {
      id: option.id,
      category: option.category,
      icon: option.icon,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        width: 120,
        height: 120,
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <img
        src={option.icon}
        alt={option.label}
        style={{
          height: 100,
          width: "auto",
          objectFit: "contain",
          pointerEvents: "none",
        }}
        draggable={false}
      />
      <span style={{ textAlign: "center", pointerEvents: "none" }}>
        {option.label}
      </span>
    </div>
  );
};
