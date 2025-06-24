import { BagsList } from './types';

export const rightBags: BagsList = [
  { id: 1, label: "Ориентируется в мире финансов", image: "src/assets/img/game_assets/bank-chemodany/orientir.svg" },
  { id: 2, label: "Тратит меньше, чем зарабатывает", image: "src/assets/img/game_assets/bank-chemodany/mensheTratit.svg" },
  { id: 4, label: "Делает пенсионные накопления", image: "src/assets/img/game_assets/bank-chemodany/pensiay.svg" },
  { id: 6, label: "Имеет собственный резервный фонд", image: "src/assets/img/game_assets/bank-chemodany/imeetRezev.svg" },
  { id: 10, label: "Под контролем доходы и расходы", image: "src/assets/img/game_assets/bank-chemodany/control.svg" }
];

export const leftBags: BagsList = [
  { id: 3, label: "Тратит больше, чем зарабатывает", image: "src/assets/img/game_assets/bank-chemodany/bolsheTratit.svg" },
  { id: 5, label: "Не следит за изменениями в мире финансов", image: "src/assets/img/game_assets/bank-chemodany/neSledit.svg" },
  { id: 7, label: "Делает сомнительные вложения", image: "src/assets/img/game_assets/bank-chemodany/somnitelnyeVlogeniay.svg" },
  { id: 8, label: "Необдуманно берёт кредиты", image: "src/assets/img/game_assets/bank-chemodany/credit.svg" },
  { id: 9, label: "Не имеет накоплений", image: "src/assets/img/game_assets/bank-chemodany/nakopleniay.svg" }
];

export const allBags = [...leftBags, ...rightBags];
export const correctOrder = [leftBags.map(b => b.id), rightBags.map(b => b.id)];

// Функция для перемешивания массива
export const shuffleBags = (bags: BagsList) => {
  const shuffled = [...bags];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};