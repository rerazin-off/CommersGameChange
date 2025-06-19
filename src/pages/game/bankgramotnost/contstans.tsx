import { BagsList } from './types';

export const bags: BagsList = [
  { id: 1, label: "Ориентируется в мире финансов", image: "src/assets/img/game_assets/bank-chemodany/orientir.svg"},
  { id: 2, label: "Тратит меньше, чем зарабатывает", image: "src/assets/img/game_assets/bank-chemodany/mensheTratit.svg" },
  { id: 3, label: "Тратит больше, чем зарабатывает", image: "src/assets/img/game_assets/bank-chemodany/bolsheTratit.svg" },
  { id: 4, label: "Делает пенсионные накопления", image: "src/assets/img/game_assets/bank-chemodany/pensiay.svg" },
  { id: 5, label: "Не следит за изменениями в мире финансов", image: "src/assets/img/game_assets/bank-chemodany/neSledit.svg" },
  { id: 6, label: "Имеет собственный резервный фонд", image: "src/assets/img/game_assets/bank-chemodany/imeetRezev.svg" },
  { id: 7, label: "Делает сомнительные вложения", image: "src/assets/img/game_assets/bank-chemodany/somnitelnyeVlogeniay.svg" },
  { id: 8, label: "Необдуманно берёт кредиты", image: "src/assets/img/game_assets/bank-chemodany/credit.svg" },
  { id: 9, label: "Не имеет накоплений", image: "src/assets/img/game_assets/bank-chemodany/nakopleniay.svg" },
  { id: 10, label: "Под контролем доходы и расходы", image: "src/assets/img/game_assets/bank-chemodany/control.svg"},
];

export const correctOrder = [[1, 2, 4, 6, 10], [3, 5, 7, 8, 9]];


