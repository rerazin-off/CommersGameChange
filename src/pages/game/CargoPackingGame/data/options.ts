import {
  Option,
} from "../types/game";

export const cargoTypeOptions: Option[] = [
  {
    id: "light",
    label: "Лёгкий",
    icon: "./assets/cargos/light.svg",
    category: "cargoType",
  },
  {
    id: "fragile",
    label: "Хрупкий",
    icon: "./assets/cargos/fragile.svg",
    category: "cargoType",
  },
  {
    id: "heavy",
    label: "Тяжёлый",
    icon: "./assets/cargos/heavy.svg",
    category: "cargoType",
  },
  {
    id: "temperature",
    label: "Температурный",
    icon: "./assets/cargos/temperature.svg",
    category: "cargoType",
  },
];

export const packageOptions: Option[] = [


  {
    id: "thermo",
    label: "Термоконтейнер",
    icon: "./assets/cargos/thermo.svg",
    category: "package",
  },
  {
    id: "wood",
    label: "Деревянный ящик",
    icon: "./assets/cargos/wood.svg",
    category: "package",
  },
    {
    id: "courier",
    label: "Курьерский пакет",
    icon: "./assets/cargos/courier.svg",
    category: "package",
  },
  {
    id: "box",
    label: "Коробка",
    icon: "./assets/cargos/box.svg",
    category: "package",
  },
];

export const fillerOptions: Option[] = [
  {
    id: "bubble",
    label: "Пузырчатая плёнка",
    icon: "./assets/cargos/bubble.svg",
    category: "filler",
  },
  {
    id: "foam",
    label: "Пенопласт",
    icon: "./assets/cargos/foam.svg",
    category: "filler",
  },
  {
    id: "cold",
    label: "Хладоэлемент",
    icon: "./assets/cargos/cold.svg",
    category: "filler",
  },
  {
    id: "none",
    label: "Без наполнителя",
    icon: "./assets/cargos/none.svg",
    category: "filler",
  },
];
