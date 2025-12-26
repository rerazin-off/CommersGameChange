import { FC } from "react";

interface HelpButtonProps {
  onClick: () => void;
}

export const HelpButton: FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "none",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        cursor: "pointer",
        fontSize: 20,
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        appearance: "none",
      }}
      title="Справка"
    >
      <p style={{ transform: "translate(2px, 2px)" }}>? </p>
    </button>
  );
};
