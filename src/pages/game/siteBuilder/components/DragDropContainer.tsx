// components/DragDropContainer.tsx
import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { Block } from "./types";
import "./DragDropContainer.scss";

interface DragDropContainerProps {
  block: Block;
  index: number;
  children: React.ReactNode;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
  onDropInside?: (item: any, targetBlock: Block) => void;
  isMainBlock?: boolean;
  hideDropIndicator?: boolean; // НОВОЕ: скрыть индикатор
}

interface DragItem {
  index: number;
  id: string;
  type: string;
  block?: Block;
  fromAvailable?: boolean;
}

const DragDropContainer: React.FC<DragDropContainerProps> = ({
                                                               block,
                                                               index,
                                                               children,
                                                               onReorder,
                                                               onDropInside,
                                                               isMainBlock = false,
                                                               hideDropIndicator = false // По умолчанию показываем
                                                             }) => {
  const ref = useRef<HTMLDivElement>(null);

  /* ---------------- DRAG LOGIC ---------------- */
  const [{ isDragging }, drag] = useDrag({
    type: "PANEL_BLOCK",
    item: () => ({
      id: block.id,
      index,
      type: "PANEL_BLOCK",
      block,
      fromAvailable: false
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  /* ---------------- DROP LOGIC ---------------- */
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["PANEL_BLOCK", "BLOCK"],
    canDrop: (item: DragItem) => {
      if (item.id === block.id) return false;
      if (onDropInside && isMainBlock) return true;
      if (onReorder && !item.fromAvailable) return true;
      return false;
    },
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current || !onReorder || item.fromAvailable) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      item.index = hoverIndex;
      onReorder(dragIndex, hoverIndex);
    },
    drop: (item: DragItem, monitor) => {
      if (onDropInside && isMainBlock) {
        onDropInside(item, block);
        return { dropped: true };
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
      className={`drag-drop-container ${isDragging ? 'dragging' : ''}`}
      style={{
        opacity: isDragging ? 0.6 : 1,
        // УБРАНО: transform при перетаскивании
      }}
    >
      {children}
      {!hideDropIndicator && isOver && canDrop && !isDragging && (
        <div className="drop-indicator-line"></div>
      )}
    </div>
  );
};

export default DragDropContainer;