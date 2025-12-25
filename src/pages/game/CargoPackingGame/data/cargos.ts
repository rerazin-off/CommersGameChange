import { Cargo } from "../types/game";

// Импортируем все SVG иконки из папки cargos
import bookIcon from '../assets/cargos/book.svg';
import glassIcon from '../assets/cargos/glass.svg';
import tvIcon from '../assets/cargos/tv.svg';
import engineIcon from '../assets/cargos/engine.svg';
import milkIcon from '../assets/cargos/milk.svg';
import medicineIcon from '../assets/cargos/medicine.svg';
import washingmachineIcon from '../assets/cargos/washingmachine.svg';
import glovesIcon from '../assets/cargos/gloves.svg';

export const cargos: Cargo[] = [
  {
    id: "book",
    name: "Книга",
    icon: bookIcon,
    correct: {
      type: "light",
      package: "courier",
      filler: "none",
    },
  },
  {
    id: "glass",
    name: "Стеклянный сервиз",
    icon: glassIcon,
    correct: {
      type: "fragile",
      package: "box",
      filler: "bubble",
    },
  },
  {
    id: "electronics",
    name: "Монитор",
    icon: tvIcon,
    correct: {
      type: "fragile",
      package: "box",
      filler: "foam",
    },
  },
  {
    id: "engine",
    name: "Двигатель",
    icon: engineIcon,
    correct: {
      type: "heavy",
      package: "wood",
      filler: "none",
    },
  },
  {
    id: "milk",
    name: "Молочные продукты",
    icon: milkIcon,
    correct: {
      type: "temperature",
      package: "thermo",
      filler: "cold",
    },
  },
  {
    id: "medicine",
    name: "Лекарства",
    icon: medicineIcon,
    correct: {
      type: "temperature",
      package: "thermo",
      filler: "cold",
    },
  },
  {
    id: "washingmachine",
    name: "Стиральная машина",
    icon: washingmachineIcon,
    correct: {
      type: "heavy",
      package: "wood",
      filler: "none",
    },
  },
  {
    id: "gloves",
    name: "Перчатки",
    icon: glovesIcon,
    correct: {
      type: "light",
      package: "courier",
      filler: "none",
    },
  },
];