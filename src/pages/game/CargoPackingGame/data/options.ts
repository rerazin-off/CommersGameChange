import { Option } from "../types/game";

// Импортируем иконки для типов груза
import lightIcon from '../assets/cargos/light.svg';
import fragileIcon from '../assets/cargos/fragile.svg';
import heavyIcon from '../assets/cargos/heavy.svg';
import temperatureIcon from '../assets/cargos/temperature.svg';

// Импортируем иконки для упаковки
import thermoIcon from '../assets/cargos/thermo.svg';
import woodIcon from '../assets/cargos/wood.svg';
import courierIcon from '../assets/cargos/courier.svg';
import boxIcon from '../assets/cargos/box.svg';

// Импортируем иконки для наполнителей
import bubbleIcon from '../assets/cargos/bubble.svg';
import foamIcon from '../assets/cargos/foam.svg';
import coldIcon from '../assets/cargos/cold.svg';
import noneIcon from '../assets/cargos/none.svg';

export const cargoTypeOptions: Option[] = [
  {
    id: "light",
    label: "Лёгкий",
    icon: lightIcon,
    category: "cargoType",
  },
  {
    id: "fragile",
    label: "Хрупкий",
    icon: fragileIcon,
    category: "cargoType",
  },
  {
    id: "heavy",
    label: "Тяжёлый",
    icon: heavyIcon,
    category: "cargoType",
  },
  {
    id: "temperature",
    label: "Температурный",
    icon: temperatureIcon,
    category: "cargoType",
  },
];

export const packageOptions: Option[] = [
  {
    id: "thermo",
    label: "Термоконтейнер",
    icon: thermoIcon,
    category: "package",
  },
  {
    id: "wood",
    label: "Деревянный ящик",
    icon: woodIcon,
    category: "package",
  },
  {
    id: "courier",
    label: "Курьерский пакет",
    icon: courierIcon,
    category: "package",
  },
  {
    id: "box",
    label: "Коробка",
    icon: boxIcon,
    category: "package",
  },
];

export const fillerOptions: Option[] = [
  {
    id: "bubble",
    label: "Пузырчатая плёнка",
    icon: bubbleIcon,
    category: "filler",
  },
  {
    id: "foam",
    label: "Пенопласт",
    icon: foamIcon,
    category: "filler",
  },
  {
    id: "cold",
    label: "Хладоэлемент",
    icon: coldIcon,
    category: "filler",
  },
  {
    id: "none",
    label: "Без наполнителя",
    icon: noneIcon,
    category: "filler",
  },
];