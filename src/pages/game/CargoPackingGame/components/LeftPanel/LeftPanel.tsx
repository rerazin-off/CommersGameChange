import { FC } from "react";
import { OptionBlock } from "./OptionBlock";
import { cargoTypeOptions, packageOptions, fillerOptions } from "../../data/options";

export const LeftPanel: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        paddingBottom: 150,
      }}
    >
      <OptionBlock title="Тип груза" options={cargoTypeOptions} />
      <OptionBlock title="Упаковка" options={packageOptions} />
      <OptionBlock title="Наполнитель" options={fillerOptions} />
    </div>
  );
};
