import React from "react";
import { useDragLayer } from "react-dnd";
import styles from "./BuhgalGame.module.scss";

const CustomDragLayer: React.FC = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const transformStyle = {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
  };

  return (
    <div className={styles.dragLayer}>
      <div style={transformStyle}>
        {item && (
          <div className={styles.dragPreview}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.expenseImage}
              style={{ width: "180px", height: "180px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDragLayer;