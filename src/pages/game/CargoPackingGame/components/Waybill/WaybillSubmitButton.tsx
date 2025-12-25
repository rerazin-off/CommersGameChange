import { FC } from "react";

interface Props {
  onSubmit: () => void;

  enabled: boolean;
}

export const WaybillSubmitButton: FC<Props> = ({ onSubmit, enabled }) => {
  const baseBg = enabled ? "#ffcb5c" : "#d9d9d9";
  const hoverBg = enabled ? "#f2bf54" : "#cfcfcf";

  return (
    <button
      onClick={onSubmit}
      style={{
        width: "100%",
        height: 56,
        borderRadius: 999,
        border: "none",
        background: baseBg,
        color: "#000",
        fontSize: 22,
        fontWeight: 500,
        cursor: "pointer",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
        boxShadow: enabled ? "0 8px 20px rgba(0,0,0,0.25)" : "none",
        opacity: 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = baseBg;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      Отправить груз
    </button>
  );
};
