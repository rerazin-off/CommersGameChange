import { Cargo } from "../types/game";

export const cargos: Cargo[] = [
  {
    id: "book",
    name: "Книга",
    icon: "/assets/img/fon/book.svg",
    correct: {
      type: "light",
      package: "courier",
      filler: "none",
    },
  },
  {
    id: "glass",
    name: "Стеклянный сервиз",
    icon: "/assets/img/fon/glass.svg",
    correct: {
      type: "fragile",
      package: "box",
      filler: "bubble",
    },
  },
  {
    id: "electronics",
    name: "Монитор",
    icon: "/assets/img/fon/tv.svg",
    correct: {
      type: "fragile",
      package: "box",
      filler: "foam",
    },
  },
  {
    id: "engine",
    name: "Двигатель",
    icon: "/assets/img/fon/engine.svg",
    correct: {
      type: "heavy",
      package: "wood",
      filler: "none",
    },
  },
  {
    id: "milk",
    name: "Молочные продукты",
    icon: "/assets/img/fon/milk.svg",
    correct: {
      type: "temperature",
      package: "thermo",
      filler: "cold",
    },
  },
  {
    id: "medicine",
    name: "Лекарства",
    icon: "/assets/img/fon/medicine.svg",
    correct: {
      type: "temperature",
      package: "thermo",
      filler: "cold",
    },
  },
  {
    id: "washingmachine",
    name: "Стиральная машина",
    icon: "/assets/img/fon/washingmachine.svg",
    correct: {
      type: "heavy",
      package: "wood",
      filler: "none",
    },
  },
  {
    id: "gloves",
    name: "Перчатки",
    icon: "/assets/img/fon/gloves.svg",
    correct: {
      type: "light",
      package: "courier",
      filler: "none",
    },
  },
];
