import React from "react";
import { useDrop } from "react-dnd";
import { Block } from "./Game";
import PanelBlock from "./PanelBlock";
import "./Panel.scss";

interface PanelProps {
  blocks: Block[];
  onDropTopLevel: (block: Block) => void;
  onDropInside: (child: Block, parentId: string) => void;
  onRemove: (id: string) => void;
  onReorder: (dragIndex: number, hoverIndex: number) => void;
}

const Panel: React.FC<PanelProps> = ({
                                       blocks,
                                       onDropTopLevel,
                                       onDropInside,
                                       onRemove,
                                       onReorder
                                     }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BLOCK",
    drop: (item: any, monitor) => {
      if (monitor.didDrop()) return;

      if (item.type === "BLOCK") {
        onDropTopLevel(item.block);
        return { dropped: true };
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  return (
    <div ref={drop} className={`panel ${isOver ? "over" : ""}`}>
      {blocks.length === 0 && <p className="placeholder">Перетащите блок сюда</p>}

      {blocks.map((block, index) => (
        <PanelBlock
          key={block.id}
          block={block}
          index={index}
          onDropInside={onDropInside}
          onRemove={onRemove}
          onReorder={onReorder}
        />
      ))}
    </div>
  );
};

export default Panel;