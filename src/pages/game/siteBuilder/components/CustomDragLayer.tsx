import React from "react";
import { useDragLayer } from "react-dnd";
import { Block } from "./Game";

const layerStyle: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
};

export const CustomDragLayer: React.FC = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as Block | null,
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset || !item) return null;

  const { x, y } = currentOffset;

  return (
    <div style={layerStyle}>
      <div
        style={{
          transform: `translate(${x}px, ${y}px)`,
          padding: "10px",
          border: "2px solid #333",
          backgroundColor: "#f0f0f0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          borderRadius: "4px",
          width: "180px",
        }}
      >

        <div style={{ fontSize: "12px", marginTop: "5px" }}>{item.content}</div>
      </div>
    </div>
  );
};
