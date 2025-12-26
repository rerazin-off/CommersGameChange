// components/BlockDragSystem.tsx
import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { Block } from "../types";
import "./BlockDragSystem.scss";

interface BlockDragSystemProps {
  block: Block;
  index: number;
  moveBlock?: (dragIndex: number, hoverIndex: number) => void;
  onDrop?: (draggedBlock: Block, targetBlock: Block) => void;
  isMainArea?: boolean;
  children: React.ReactNode;
  acceptTypes?: string[];
}

interface DragItem {
  index: number;
  id: string;
  type: string;
  block: Block;
  isFromMain: boolean;
}

const BlockDragSystem: React.FC<BlockDragSystemProps> = ({
                                                           block,
                                                           index,
                                                           moveBlock,
                                                           onDrop,
                                                           isMainArea = false,
                                                           children,
                                                           acceptTypes = ["BLOCK"]
                                                         }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Настройки перетаскивания
  const [{ isDragging }, drag] = useDrag({
    type: "BLOCK",
    item: () => ({
      id: block.id,
      index,
      type: "BLOCK",
      block,
      isFromMain: isMainArea
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      // Очищаем после перетаскивания
      if (monitor.didDrop()) {
        // Был успешный drop - ничего не делаем
      }
    }
  });

  // Настройки для приема блоков
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: acceptTypes,
    canDrop: (item: DragItem) => {
      // Нельзя сбрасывать на себя
      if (item.id === block.id) return false;

      // Проверяем логику в onDrop
      if (onDrop) {
        // Если это блок из панели в Main
        if (!item.isFromMain && block.type === "Main") {
          return true;
        }
      }

      // Для переупорядочивания
      if (moveBlock && item.isFromMain === isMainArea) {
        return true;
      }

      return false;
    },
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current || !moveBlock || !isMainArea) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      if (item.isFromMain !== isMainArea) return; // Перетаскивать можно только внутри одной зоны

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop: (item: DragItem, monitor) => {
      if (!onDrop) return undefined;

      if (monitor.didDrop()) {
        return undefined;
      }

      if (item.isFromMain !== isMainArea) {
        // Перетаскивание между зонами
        onDrop(item.block, block);
        return { moved: true };
      }

      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop()
    })
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`block-drag-container ${
        isDragging ? "dragging" : ""
      } ${
        isOver && canDrop ? "drop-target-active" : ""
      }`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        position: "relative"
      }}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {children}

      {isOver && canDrop && !isDragging && (
        <div className="drop-indicator">
          <div className="drop-line" />
          <div className="drop-hint">
            {block.type === "Main" ? "Вставить в Main" : "Переместить сюда"}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockDragSystem;