import React from "react";
import { useDrop } from "react-dnd";

interface PinProps {
  pinIndex: number;
  wireImage?: string;
  isOccupied: boolean;
  onWireDrop: (wireIndex: number, pinIndex: number) => void;
  disabled?: boolean;
}

export default function Pin({
                              pinIndex,
                              wireImage,
                              isOccupied,
                              onWireDrop,
                              disabled = false
                            }: PinProps) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "WIRE",
    drop: (item: any) => {
      if (!disabled) {
        onWireDrop(item.wireIndex, pinIndex);
      }
    },
    canDrop: () => !disabled,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [disabled, onWireDrop]);

  // Динамическое распределение пинов
  const pinCount = 8;
  const startLeft = 60;
  const gap = 22;
  const topPosition = 70;

  const positions = Array.from({ length: pinCount }, (_, i) => ({
    top: topPosition,
    left: startLeft + i * gap,
  }));

  const pos = positions[pinIndex];

  return (
    <div
      className="pin-wrapper"
      style={{
        top: `${pos.top - 10}px`,
        left: `${pos.left - 7}px`,
        width: "20px",
        height: "280px",
      }}
    >
      {/* Зона примагничивания */}
      <div
        ref={dropRef}
        className={`pin-drop-zone ${disabled ? 'disabled' : ''}`}
        style={{
          border: isOver ? "2px solid #00ff00" : "none",
          backgroundColor: isOver ? "rgba(0, 255, 0, 0.3)" : "transparent",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {/* Сам пин */}
        <div
          className="pin"
          style={{
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Провод, если есть */}
          {wireImage && (
            <div className="pin-wire-container">
              <img src={wireImage} alt="wire" className="pin-wire" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}