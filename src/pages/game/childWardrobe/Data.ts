import child from '@/assets/img/game_assets/child-wardrobe-img/child.svg';
import child2 from '@/assets/img/game_assets/child-wardrobe-img/child2.svg';

import TShort from '@/assets/img/game_assets/child-wardrobe-img/T-short.svg';
import TShort2 from '@/assets/img/game_assets/child-wardrobe-img/Tshort2.svg';
import jacket from '@/assets/img/game_assets/child-wardrobe-img/jacket.svg';
import jacket2 from '@/assets/img/game_assets/child-wardrobe-img/jacket2.svg';
import shirt from '@/assets/img/game_assets/child-wardrobe-img/shirt.svg';
import sweatshirt from '@/assets/img/game_assets/child-wardrobe-img/sweatshirt.svg';
import sweater from '@/assets/img/game_assets/child-wardrobe-img/sweater.svg';
import sweater2 from '@/assets/img/game_assets/child-wardrobe-img/sweater2.svg';
import shorts from '@/assets/img/game_assets/child-wardrobe-img/shorts.svg';
import shorts2 from '@/assets/img/game_assets/child-wardrobe-img/shorts2.svg';
import jeans from '@/assets/img/game_assets/child-wardrobe-img/jeans.svg';
import jeans2 from '@/assets/img/game_assets/child-wardrobe-img/jeans2.svg';
import trousers from '@/assets/img/game_assets/child-wardrobe-img/trousers.svg';
import sweatpants from '@/assets/img/game_assets/child-wardrobe-img/sweatpants.svg'
import sandals from '@/assets/img/game_assets/child-wardrobe-img/sandals.svg';
import sandals2 from '@/assets/img/game_assets/child-wardrobe-img/sandals2.svg';
import boots from '@/assets/img/game_assets/child-wardrobe-img/boots.svg';
import boots2 from '@/assets/img/game_assets/child-wardrobe-img/boots2.svg';
import rubberBoots from '@/assets/img/game_assets/child-wardrobe-img/rubberBoots.svg';
import flipFlops from '@/assets/img/game_assets/child-wardrobe-img/flipFlops.svg';
import sneakers from '@/assets/img/game_assets/child-wardrobe-img/sneakers.svg';
import moccasins from '@/assets/img/game_assets/child-wardrobe-img/moccasins.svg';


export const wear1 = [
    {
        name: 'верхняя одежда',
        items: [
            {img: jacket, name: 'Куртка', correct: false},
            {img: shirt,  name: 'Рубашка', correct: false},
            {img: sweater,  name: 'Свитер', correct: false},
            {img: TShort, name: 'Футболка', correct: true},
        ],
        positions: [32, 57.6],
        width: '270',
        zIndex: 10,
    },
    {
        name: 'штаны',
        items: [
            {img: sweatpants, name: 'Спортивные штаны', correct: false},
            {img: shorts,  name: 'Шорты', correct: true},
            {img: jeans,  name: 'Джинсы', correct: false},
        ],
        positions: [50, 58.7],
        width: '240',
        zIndex: 9,
    },
    {
        name: 'обувь',
        items: [
            {img: boots, name:'Сапоги', correct: false},
            {img: flipFlops, name:'Сланцы', correct: false},
            {img: sandals, name:'Сандали', correct: true},
            {img: rubberBoots, name:'Резиновые сапоги', correct: false},
        ],
        positions: [75.8, 58.4],
        width: '250',
        zIndex: 100,
    },
    {
        name: 'верхняя одежда',
        items: [
            {img: jacket2, name: 'Куртка', correct: false},
            {img: shirt,  name: 'Рубашка', correct: true},
            {img: sweater2, name:'Свитер', correct: false},
            {img: TShort2, name: 'Футболка', correct: false},
            {img: sweatshirt, name: 'Джемпер', correct: false},
        ],
        positions: [30.7, 59.3],
        width: '240',
        zIndex: 100,
    },
    {
        name: 'штаны',
        items: [
            {img: shorts2,  name: 'Шорты', correct: false},
            {img: jeans2,  name: 'Джинсы', correct: false},
            {img: trousers, name: 'Брюки', correct: true}
        ],
        positions: [48.6, 59.3],
        width: '240',
        zIndex: 9,
    },
    {
        name: 'обувь',
        items: [
            {img: boots2, name:'Сапоги', correct: false},
            {img: sandals2, name:'Сандали', correct: false},
            {img: sneakers, name: 'Кроссовки', correct: false},
            {img: moccasins, name: 'Мокасины', correct: true}
        ],
        positions: [73, 59.5],
        width: '240',
        zIndex: 100,
    },

]

export const round = [
    {img: child, name: 'Илье', nameEvent: 'Летняя прогулка', icon: `<IoMdSunny  color='#fff'>`},
    {img: child2, name: 'Лёва', nameEvent: 'Утренник', icon: `<PiConfettiLight color="#000"/>`}
]