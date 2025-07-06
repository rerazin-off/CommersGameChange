import React from "react";
import { useDrag } from "react-dnd";
import { Block as BlockType } from "../types";

interface BlockProps {
  block: BlockType;
}

const Block: React.FC<BlockProps> = ({ block }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BLOCK",
    item: block,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: "10px",
        border: "1px solid #333",
        marginBottom: "8px",
        backgroundColor: "#f0f0f0",
        cursor: "grab",
      }}
    >
      {block.type}
      <div style={{ fontSize: "12px", marginTop: "5px" }}>{block.content}</div>
    </div>
  );
};

export default Block;
