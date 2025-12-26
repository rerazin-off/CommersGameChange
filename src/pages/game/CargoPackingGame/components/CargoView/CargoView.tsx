import { FC } from "react";
import { Cargo } from "../../types/game";

interface CargoViewProps {
  cargo: Cargo;
}

export const CargoView: FC<CargoViewProps> = ({ cargo }) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        src={cargo.icon}
        alt={cargo.name}
        style={{ height: 200 }}
      />

      <h2
        style={{
          fontSize: 46,
          marginTop: 16,
          color: "#ffffff",
        }}
      >
        {cargo.name}
      </h2>
    </div>
  );
};
