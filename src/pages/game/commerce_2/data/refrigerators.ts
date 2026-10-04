import type { Refrigerator } from '../interfaces/interfaces';

export const refrigeratorsAll: Refrigerator[] = [
    { src: '/src/assets/img/commerce_img/1_v2.png', alt: 'Холодильник для напитков', categories: ['drinks'], width: 250, height: 300 },
    { src: '/src/assets/img/commerce_img/2_v2.png', alt: 'Холодильник для молочной продукции', categories: ['dairy'], width: 250, height: 300 },
    { src: '/src/assets/img/commerce_img/3_v2.png', alt: 'Холодильник для рыбы', categories: ['fish'], width: 250, height: 300 },
    {
      src: '/src/assets/img/commerce_img/4_v2.png',
      alt: 'Стеллаж для продуктов',
      categories: ['grocery', 'grocery1', 'grocery2', 'grocery3'],
      width: 250, height: 300
    },
  ];