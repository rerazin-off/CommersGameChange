import alienGreen from '@/assets/img/game_assets/flexbox-alien-img/alian-green.svg';
import planetGreen from '@/assets/img/game_assets/flexbox-alien-img/planet-green.svg';
import alienPink from '@/assets/img/game_assets/flexbox-alien-img/alian-pink.svg';
import planetPink from '@/assets/img/game_assets/flexbox-alien-img/planet-pink.svg';
import alienViolet from '@/assets/img/game_assets/flexbox-alien-img/alian-violet.svg';
import planetViolet from '@/assets/img/game_assets/flexbox-alien-img/planet-violet.svg';
import { CommandType, LevelType } from './Interfeces';

export const Command : CommandType  = [
  {
    id: 1,
    name: 'justify-content',
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
  },
  {
    id: 2,
    name: 'align-items',
    options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  },
  {
    id: 3,
    name: 'flex-direction',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  {
    id: 4,
    name: 'flex-wrap',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
  },
]

export const Levels : LevelType = [
  {
    id: 1,
    aliens: [alienGreen],
    planets: [planetGreen],
    code: [1],
    correctAnswer: ['flex-end', 'flex-start', 'row', 'nowrap'],
    instruction: (
      <div>
        <p>
          Добро пожаловать в Flexbox Alian. Игра, в которой тебе нужно помочь
          инопланетянину Таяну и его друзьям написанием CSS кода! Направь Таяна
          на корабль справа, используя свойство justify-content, которое
          выравнивает элементы горизонтально и принимает следующие значения:
        </p>
        <ul>
          <li>
            flex-start: Элементы выравниваются по левой стороне контейнера.
          </li>
          <li>
            flex-end: Элементы выравниваются по правой стороне контейнера.
          </li>
          <li>center: Элементы выравниваются по центру контейнера.</li>
          <li>
            space-between: Элементы отображаются с одинаковыми отступами между
            ними.
          </li>
          <li>
            space-around: Элементы отображаются с одинаковыми отступами вокруг
            них.
          </li>
        </ul>
        <p>Например, justify-content: flex-end; сдвинет Таяна вправо.</p>
      </div>
    ),
  },
  {
    id: 2,
    aliens: [alienGreen, alienPink],
    planets: [planetGreen, planetPink],
    code: [1],
    correctAnswer: ['center', 'flex-start', 'row', 'nowrap'],
    instruction: (
      <div>
        <p>
          Используй justify-content еще раз, чтоб помочь этим ипопланетянам
          попасть на их планеты. Помни, что это свойство CSS выравнивает
          элементы горизонтально и принимает следующие значения:
        </p>
        <ul>
          <li>
            flex-start: Элементы выравниваются по левой стороне контейнера.
          </li>
          <li>
            flex-end: Элементы выравниваются по правой стороне контейнера.
          </li>
          <li>center: Элементы выравниваются по центру контейнера.</li>
          <li>
            space-between: Элементы отображаются с одинаковыми отступами между
            ними.
          </li>
          <li>
            space-around: Элементы отображаются с одинаковыми отступами вокруг
            них.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [1],
    correctAnswer: ['space-between', 'flex-start', 'row', 'nowrap'],
    instruction: (
      <div>
        <p>
          Помоги всем трем инопланетянам найти их планеты, просто используя
          justify-content. В этот раз, у планет много пространства вокруг.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [2],
    correctAnswer: ['flex-start', 'flex-end', 'row', 'nowrap'],
    instruction: (
      <div>
        <p>
          Теперь используй align-items чтоб помочь инопланетянам добратся к
          нижней части экрана. Это CSS свойство выравнивает элементы вертикально
          и принимает следующие значения:
        </p>
        <ul>
          <li>
            flex-start: Элементы выравниваются по верхнему краю контейнера.
          </li>
          <li>flex-end: Элементы выравниваются по нижнему краю контейнера.</li>
          <li>
            center: Элементы выравниваются вертикально по центру контейнера.
          </li>
          <li>baseline: Элементы отображаются на базовой линии контейнера.</li>
          <li>stretch: Элементы растягиваются, чтоб заполнить контейнер.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 5,
    aliens: [alienGreen],
    planets: [planetGreen],
    code: [1, 2],
    correctAnswer: ['center', 'center', 'row', 'nowrap'],
    instruction: (
      <div>
        <p>
          Направь Таяна в центр экрана, используя justify-content и align-items
          вместе.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [1, 2],
    correctAnswer: ['space-around', 'flex-end', 'row', 'nowrap'],
    instruction: (
      <div>
        <p>
          Инопланетянам снова нужно пересечь космос. В этот раз к планетам, с
          достаточно большим пространством вокруг них. Используй комбинацию
          justify-content и align-items.
        </p>
      </div>
    ),
  },
  {
    id: 7,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [3],
    correctAnswer: ['flex-start', 'flex-start', 'row-reverse', 'nowrap'],
    instruction: (
      <div>
        <p>
          Инопланетянам нужно выстроиться в порядке их планет, используя
          flex-direction. Это CSS свойство задает направление, в котором будут
          расположены элементы в контейнере и принимает следующие значения:
        </p>
        <ul>
          <li>row: Элементы размещаются по напралению текста.</li>
          <li>
            row-reverse: Элементы размещаются в обратном направлении от
            направления текста
          </li>
          <li>column: Элементы размещаются сверху вниз.</li>
          <li>column-reverse: Элементы размещаются снизу вверх.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 8,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [3],
    correctAnswer: ['flex-start', 'flex-start', 'column', 'nowrap'],
    instruction: (
      <div>
        <p>
          Помоги инопланетянам расположиться на своих планетах, используя
          flex-direction. Это CSS свойство задает направление, в котором будут
          расположены элементы в контейнере и принимает следующие значения:
        </p>
        <ul>
          <li>row: Элементы размещаются по напралению текста.</li>
          <li>
            row-reverse: Элементы размещаются в обратном направлении от
            направления текста
          </li>
          <li>column: Элементы размещаются сверху вниз.</li>
          <li>column-reverse: Элементы размещаются снизу вверх.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 9,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [1, 3],
    correctAnswer: ['flex-end', 'flex-start', 'column', 'nowrap'],
    instruction: (
      <div>
        <p>
          Помоги инопланетянам найти их планеты с помощью flex-direction и
          justify-content. Заметь, когда в качестве направления выбрана колонка,
          то justify-content влияет на вертикальное выравнивание, а align-items
          на горизонтальное.
        </p>
      </div>
    ),
  },
  {
    id: 10,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [1, 3],
    correctAnswer: ['space-between', 'flex-start', 'column-reverse', 'nowrap'],
    instruction: (
      <div>
        <p>
          Помоги инопланетянам найти их планеты с помощью flex-direction и
          justify-content.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    aliens: [alienGreen, alienPink, alienViolet],
    planets: [planetGreen, planetPink, planetViolet],
    code: [1, 2, 3],
    correctAnswer: ['center', 'flex-end', 'row-reverse', 'nowrap'],
    instruction: (
      <div>
        <p>
          Помоги инопланетянам найти их планеты с помощью flex-direction,
          justify-content и align-items.
        </p>
      </div>
    ),
  },
  {
    id: 12,
    aliens: [
      alienPink,
      alienGreen,
      alienGreen,
      alienGreen,
      alienGreen,
      alienGreen,
      alienViolet,
    ],
    planets: [
      planetPink,
      planetGreen,
      planetGreen,
      planetGreen,
      planetGreen,
      planetGreen,
      planetViolet,
    ],
    code: [4],
    correctAnswer: ['flex-start', 'flex-start', 'row', 'wrap'],
    instruction: (
      <div>
        <p>
          О нет! Инопланетян сплющило на одном ряду планет. Раздвинь их с
          помощью свойства flex-wrap, которое принимает следующие значения:
        </p>
        <ul>
          <li>nowrap: Размеры элементов устанавливаются автоматически, чтоб они поместились в один ряд</li>
          <li>wrap: Элементы автоматически переносятся на новую строку.</li>
          <li>wrap-reverse: Элементы автоматически переносятся на новую строку, но строки расположены в обратном порядке.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 13,
    aliens: [
      alienGreen,
      alienGreen,
      alienGreen,
      alienGreen,
      alienGreen,
      alienPink,
      alienPink,
      alienPink,
      alienPink,
      alienPink,
      alienViolet,
      alienViolet,
      alienViolet,
      alienViolet,
      alienViolet,
    ],
    planets: [
      planetGreen,
      planetGreen,
      planetGreen,
      planetGreen,
      planetGreen,
      planetPink,
      planetPink,
      planetPink,
      planetPink,
      planetPink,
      planetViolet,
      planetViolet,
      planetViolet,
      planetViolet,
      planetViolet,
    ],
    code: [3, 4],
    correctAnswer: ['flex-start', 'flex-start', 'column', 'wrap'],
    instruction: (
      <div>
        <p>Помоги этой армии инопланетян попасть на свой планеты, используй flex-direction и flex-wrap</p>
      </div>
    ),
  },
  {
    id: 14,
    aliens: [alienGreen],
    planets: [planetGreen],
    code: [1],
    correctAnswer: ['flex-end', 'flex-start', 'row', 'nowrap'],
    instruction: (
      <div>
      </div>
    ),
  },
];