import { FC } from "react";

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 720,
          padding: 40,
          maxWidth: "92vw",
          borderRadius: 14,
          background: "#fff",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <h2 style={{ margin: 0 , fontSize: "40px"}}>Подсказка</h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 22,
              lineHeight: 1,
            }}
            aria-label="Закрыть"
            title="Закрыть"
          >
          </button>
        </div>

        <div style={{ fontSize: 24, lineHeight: 1.5 }}>
          <p style={{ marginBottom: 0 }}>
            Перед упаковкой груза необходимо определить его тип и понять, требует ли он особых условий транспортировки.

            <ul style={{ marginTop: 14 }}>
              <li>Лёгкие грузы упаковываются в курьерский пакет без использования наполнителя.</li>
              <li>Хрупкие товары размещаются в коробке и обязательно защищаются пузырчатой плёнкой или пенопластом, чтобы исключить повреждения при перевозке.</li>
              <li>Тяжёлые грузы упаковываются в деревянный ящик без наполнителя — устойчивость обеспечивается прочностью тары.</li>
              <li>Температурные грузы перевозятся в термоконтейнере с хладоэлементами для сохранения нужного температурного режима.</li>
            </ul>
            
            В результате необходимо заполнить накладную, выбрав подходящие варианты.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button
            onClick={onClose}
            style={{
              padding: "20px 24px",
              borderRadius: 10,
              border: "none",
              background: "#4caf50",
              color: "#fff",
              cursor: "pointer",
              fontSize: 24,
            }}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
