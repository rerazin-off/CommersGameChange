import { BagsList } from './types';

export const bags: BagsList = [
  { id: 1, label: 'Звонок в банк', image: '/src/assets/img/bag-call.png' },
  { id: 2, label: 'Заблокировать карту', image: '/src/assets/img/bag-block.png' },
  { id: 3, label: 'Следовать указаниям оператора', image: '/src/assets/img/bag-operator.png' },
  { id: 4, label: 'Посетить банк', image: '/src/assets/img/bag-visit.png' },
  { id: 5, label: 'Предъявить документы', image: '/src/assets/img/bag-documents.png' },
  { id: 6, label: 'Написать заявление', image: '/src/assets/img/bag-application.png' },
  { id: 7, label: 'Ждать выплат', image: '/src/assets/img/bag-wait.png' }
];

export const correctOrder = [1, 6, 4, 3, 2, 5, 7];

