import { FC } from "react";
import { Option } from "../../types/game";
import { DraggableOption } from "../LeftPanel/DraggableOption";

interface Props {
  title: string;
  options: Option[];
}

export const OptionBlock: FC<Props> = ({ title, options }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        background: "rgb(217, 217, 217)",
        borderRadius: 18,
        padding: "15px 40px",
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
        gap: 32,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {options.map((opt) => (
          <DraggableOption key={opt.id} option={opt} />
        ))}
      </div>
    </div>
  );
};
