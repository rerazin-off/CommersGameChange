import { FC } from "react";

interface ModalProps {
  successCount: number;
  total: number;
  onRestart: () => void;
}

export const Modal: FC<ModalProps> = ({
  successCount,
  total,
  onRestart,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          textAlign: "center",
          width: 420,
          color:'#000'
        }}
      >
        <h2 style={{fontSize: 38, fontFamily:'Comfortaa'}}>Игра завершена</h2>

        <p style={{ margin: "16px 0", fontSize: 28 }}>
          Успешно отправлено: <b>{successCount}</b> из <b>{total}</b>
        </p>

        <button
          onClick={onRestart}
          style={{
            padding: "12px 24px",
            marginTop: "40px",
            borderRadius: 8,
            border: "none",
            background: "#4caf50",
            color: "#fff",
            fontSize: 26,
            cursor: "pointer",
          }}
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
};
