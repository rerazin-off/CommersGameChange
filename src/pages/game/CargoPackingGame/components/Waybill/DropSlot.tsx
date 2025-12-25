import { FC } from "react";
import { useDrop } from "react-dnd";
import { Option } from "../../types/game";
import { DRAG_TYPE } from "../LeftPanel/DraggableOption";

interface DragItem {
  id: string;
  category: Option["category"];
}

interface Props {
  acceptedCategory: Option["category"];
  value: Option | null;
  onDrop: (optionId: string) => void;
}

export const WaybillDropSlot: FC<Props> = ({
  acceptedCategory,
  value,
  onDrop,
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: DRAG_TYPE,

    canDrop: (item: DragItem) =>
      item.category === acceptedCategory,

    drop: (item: DragItem) => {
      if (item.category !== acceptedCategory) return;
      onDrop(item.id);
    },
  }));

  return (
    <div
      ref={dropRef}
      style={{
        width: 84,
        height: 84,
        background: "#e0e0e0",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value ? (
        <img
          src={value.icon}
          alt={value.label}
          style={{ width: 68, height: 68 }}
          draggable={false}
        />
      ) : null}
    </div>
  );
};
