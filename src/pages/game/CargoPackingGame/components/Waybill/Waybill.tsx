import React from "react";
import { WaybillDropSlot } from "./DropSlot";
import { Option, Cargo } from "../../types/game";
import { WaybillSubmitButton } from "./WaybillSubmitButton";
import '../../CargoPackingGame.module.scss';

// Импортируем фоновую SVG


type WrongMap = {
  type: boolean;
  package: boolean;
  filler: boolean;
};

interface Props {
  cargo: Cargo;

  typeValue: Option | null;
  packageValue: Option | null;
  fillerValue: Option | null;

  onTypeDrop: (id: string) => void;
  onPackageDrop: (id: string) => void;
  onFillerDrop: (id: string) => void;

  onSubmit: () => void;

  successCount: number;
  total: number;
  wrong: WrongMap;
}

export const Waybill = ({
  cargo,
  typeValue,
  packageValue,
  fillerValue,
  onTypeDrop,
  onPackageDrop,
  onFillerDrop,
  onSubmit,
  successCount,
  total,
  wrong,
}: Props) => {
  const isReady = !!typeValue && !!packageValue && !!fillerValue;

  return (
    <div
      style={{
        width: 700,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 510,
          height: 800,
          position: "relative",
          backgroundImage: `url(/src/assets/img/waybill-bg.svg)`, // Используем импортированную переменную
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))",
          padding: "60px 120px 0px 40px",
        }}
        className='invoice'
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 26,
          }}
        >
          Накладная
        </div>

        {/* 4 строки по одной логике */}
        <div
          style={{
            display: "flex",
            width: "95%",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <WaybillRow label="Груз">
            <IconSquare>
              <img
                src={cargo.icon}
                alt={cargo.name}
                style={{ width: 56, height: 56 }}
                draggable={false}
              />
            </IconSquare>
          </WaybillRow>

          <WaybillRow label="Тип груза">
            <IconSquare error={wrong.type}>
              <WaybillDropSlot
                acceptedCategory="cargoType"
                value={typeValue}
                onDrop={onTypeDrop}
              />
            </IconSquare>
          </WaybillRow>

          <WaybillRow label="Упаковка">
            <IconSquare error={wrong.package}>
              <WaybillDropSlot
                acceptedCategory="package"
                value={packageValue}
                onDrop={onPackageDrop}
              />
            </IconSquare>
          </WaybillRow>

          <WaybillRow label="Наполнитель">
            <IconSquare error={wrong.filler}>
              <WaybillDropSlot
                acceptedCategory="filler"
                value={fillerValue}
                onDrop={onFillerDrop}
              />
            </IconSquare>
          </WaybillRow>
        </div>

        <div
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            paddingRight: 40,
            paddingTop: 40,
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: 420 }}>
            <WaybillSubmitButton onSubmit={onSubmit} enabled={isReady} />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          width: 420,
          marginLeft: "auto",
          marginRight: "auto",
          background: "#d9d9d9",
          borderRadius: 10,
          padding: "10px 12px",
          textAlign: "center",
          fontSize: 22,
          fontWeight: 500,
        }}
      >
        Успешно отправленных
        <br />
        грузов: {successCount}/{total}
      </div>
    </div>
  );
};

const WaybillRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
    }}
  >
    <LabelWithLine label={label} />
    {children}
  </div>
);

const LabelWithLine = ({ label }: { label: string }) => (
  <div style={{ flex: 1 }}>
    <div style={{ fontSize: 36, fontWeight: 500 }}>{label}:</div>
    <div
      style={{
        marginTop: 10,
        width: 180,
        height: 8,
        borderRadius: 6,
      }}
    />
  </div>
);

const IconSquare = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: boolean;
}) => (
  <div
    style={{
      width: 96,
      height: 96,
      background: error ? "rgba(255, 120, 120, 0.35)" : "#d9d9d9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      border: error ? "4px solid rgba(200, 40, 40, 0.9)" : "4px solid transparent",
      boxShadow: error ? "0 8px 18px rgba(200,40,40,0.25)" : "none",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);