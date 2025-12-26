import { FC } from "react";

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        padding: "10px 16px",
        borderRadius: 8,
        border: "none",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      ← Назад
    </button>
  );
};
