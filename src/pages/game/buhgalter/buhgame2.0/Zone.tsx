import React from "react";
import { useDrop } from "react-dnd";
import Expense from "./Expense";
import styles from "./BuhgalGame.module.scss";

type ZoneProps = {
  zone: {
    id: string;
    name: string;
  };
  expenses: {
    id: string;
    name: string;
    image: string;
    zone: string | null;
    correctZone: string;
  }[];
  onDrop: (id: string, targetZoneId: string) => void;
};

const Zone: React.FC<ZoneProps> = ({ zone, expenses, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "expense",
    drop: (item: { id: string }) => onDrop(item.id, zone.id),
  }));

  return (
    <div ref={drop} className={styles.zone}>
      {/*<h3 className={styles.zoneName}>{zone.name}</h3>*/}
      <div className={styles.zoneExpenses}>
        {expenses.map((expense) => (
          <Expense key={expense.id} id={expense.id} name={expense.name} image={expense.image} />
        ))}
      </div>
    </div>
  );
};

export default Zone;