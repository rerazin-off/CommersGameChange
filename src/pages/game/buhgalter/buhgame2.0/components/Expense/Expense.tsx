import React, { useState } from "react";
import { useDrag } from "react-dnd";
import styles from "../BuhgalGame/BuhgalGame.module.scss";

type ExpenseProps = {
  id: string;
  name: string;
  image: string;
  onDrop?: () => void;
};

const Expense: React.FC<ExpenseProps> = ({ id, name, image, onDrop }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "expense",
    item: { id, name, image },
    end: (item, monitor) => {
      if (monitor.didDrop() && onDrop) {
        onDrop();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div
      ref={drag}
      className={styles.expense}
      onMouseMove={isDragging ? handleDrag : undefined}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: isDragging ? "grabbing" : "grab", // Улучшаем отображение курсора
        // transform: isDragging ? "scale(1.1)" : "scale(1.0)", // Эффект масштаба при перетаскивании
      }}
    >
      <img src={image} alt={name} className={styles.expenseImage} />
    </div>
  );
};

export default Expense;