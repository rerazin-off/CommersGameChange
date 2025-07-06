// components/PanelBlock.tsx
import React from "react";
import { Block } from "./Game";
import "./PanelBlock.scss";
import RenderedBlock from "./RenderedBlock";
import DragDropContainer from "./DragDropContainer";

interface PanelBlockProps {
  block: Block;
  index: number;
  onDropInside?: (child: Block, parentId: string) => void;
  onRemove: (id: string) => void;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}

const PanelBlock: React.FC<PanelBlockProps> = ({
                                                 block,
                                                 index,
                                                 onDropInside,
                                                 onRemove,
                                                 onReorder
                                               }) => {
  // Обработчик drop внутрь Main
  const handleDropInside = (item: any) => {
    if (onDropInside && item.block) {
      onDropInside(item.block, block.id);
    }
  };

  return (
    <DragDropContainer
      block={block}
      index={index}
      onReorder={onReorder}
      onDropInside={block.type === "Main" ? handleDropInside : undefined}
      isMainBlock={block.type === "Main"}
    >
      <div className={`panel-block ${block.isCorrect === true ? 'correct' : ''} ${block.isCorrect === false ? 'wrong' : ''}`}>
        <button className="remove-btn" onClick={() => onRemove(block.id)}>
          ×
        </button>

        <div className="drag-handle">⋮⋮</div>

        <RenderedBlock type={block.type} />

        {/* Дочерние блоки */}
        {block.children?.length > 0 && (
          <div className="children">
            {block.children.map((child) => (
              <div key={child.id} className="child-block">
                <button
                  className="remove-btn child-remove-btn"
                  onClick={() => onRemove(child.id)}
                >
                  ×
                </button>
                <RenderedBlock type={child.type} />
              </div>
            ))}
          </div>
        )}
      </div>
    </DragDropContainer>
  );
};

export default PanelBlock;