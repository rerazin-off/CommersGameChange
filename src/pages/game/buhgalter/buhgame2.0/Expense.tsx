import React from "react";
import { useDrag } from "react-dnd";
import styles from "./BuhgalGame.module.scss";

type ExpenseProps = {
  id: string;
  name: string;
  image: string;
};

const Expense: React.FC<ExpenseProps> = ({ id, name, image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "expense",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={styles.expense}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={image} className={styles.expenseImage} />
    </div>
  );
};

export default Expense;