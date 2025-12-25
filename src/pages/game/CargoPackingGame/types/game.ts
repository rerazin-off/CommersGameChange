
export type OptionCategory = "cargoType" | "package" | "filler";
export type CargoTypeId = "light" | "fragile" | "heavy" | "temperature";
export type PackageId = "courier" | "box" | "wood" | "thermo";
export type FillerId = "bubble" | "foam" | "cold" | "none";
export interface Option {
  id: CargoTypeId | PackageId | FillerId;
  label: string;
  icon: string;
  category: OptionCategory;
}
export interface Cargo {
  id: string;
  name: string;
  icon: string;

  correct: {
    type: CargoTypeId;
    package: PackageId;
    filler: FillerId;
  };
}
export interface WaybillSelection {
  type: Option | null;
  package: Option | null;
  filler: Option | null;
}
export interface GameState {
  cargos: Cargo[];
  currentCargoIndex: number;
  successCount: number;
  selection: WaybillSelection;
  isFinished: boolean;
}
