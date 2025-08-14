import imgPerson2 from '../../../assets/img/game_assets/pensionGalaxy-img/person2.svg';
import imgPerson3 from '../../../assets/img/game_assets/pensionGalaxy-img/person3.svg';
import imgPerson4 from '../../../assets/img/game_assets/pensionGalaxy-img/person4.svg';
import imgPerson5 from '../../../assets/img/game_assets/pensionGalaxy-img/person5.svg';
import imgPerson6 from '../../../assets/img/game_assets/pensionGalaxy-img/person6.svg';
import imgPerson7 from '../../../assets/img/game_assets/pensionGalaxy-img/person7.svg';
import imgPerson8 from '../../../assets/img/game_assets/pensionGalaxy-img/person8.svg';
import imgPerson25 from '../../../assets/img/game_assets/pensionGalaxy-img/person25.svg';
import condition1 from '../../../assets/img/game_assets/pensionGalaxy-img/condition1.svg';
import condition2 from '../../../assets/img/game_assets/pensionGalaxy-img/condition2.svg';
import condition3 from '../../../assets/img/game_assets/pensionGalaxy-img/condition3.svg';
import condition4 from '../../../assets/img/game_assets/pensionGalaxy-img/condition4.svg';

export const Persons = [
  {
    id: 1,
    name: 'Максим',
    img: imgPerson25,
    profession:'Командир звездного десанта',
    mainInf: [
      {name:'стаж', value: '40 лет'},
      {name:'раса', value: 'человек'},
      {name:'особые условия', value:
          [
            {coefficient: 2, text:'Участвовал в Третьей Войне с Ксеноморфами'},
          ]},
      {name:'средняя зарплата', value: 85000}
    ]
  },
  {
    id: 2,
    name: 'Ева',
    img: imgPerson2,
    profession: 'ДНК-архитектор (создаёт биологические корабли)',
    mainInf: [
      {name:'стаж', value: '67 лет'},
      {name:'раса', value: 'киборг'},
      {name:'особые условия', value: [
          {coefficient: 1.5, text: 'Работала в лаборатории с патогенами (опасные уловия)'}
        ]},
      {name:'средняя зарплата', value: 120000}
    ]
  },
  {
    id: 3,
    name: 'Микара',
    img: imgPerson3,
    profession: 'Ксенолингвистка',
    mainInf: [
      {name:'стаж', value: '73 года'},
      {name:'раса', value: 'инопланетное существо'},
      {name:'особые условия', value: [
          {coefficient: 1.5, text:'Работа с опасными языками (например, языком Древних, вызывающим безумие, опасные условия).'}
        ]},
      {name:'средняя зарплата', value: 95000}
    ]
  },
  {
    id: 4,
    name: 'Бион',
    img: imgPerson4,
    profession:'Археолог исчезнувших цивилизаций',
    mainInf: [
      {name:'стаж', value: '30 лет'},
      {name:'раса', value: 'киборг'},
      {name:'особые условия', value: [
          {coefficient:1.7, text: 'Обнаружил артефакты с аномальными свойствами'}
        ]},
      {name:'средняя зарплата', value: 78000}
    ]
  },
  {
    id: 5,
    name: 'Барс',
    img: imgPerson5,
    profession:'Садовник кислотных джунглей Венеры',
    mainInf: [
      {name:'стаж', value: '68 лет'},
      {name:'раса', value: 'инопланетное существо'},
      {name:'особые условия', value: [
          {coefficient:1.5, text: 'Выращивал хищные растения для фармацевтики'}
        ]},
      {name:'средняя зарплата', value: 65000}
    ]
  },
  {
    id: 6,
    name: 'Глеб',
    img: imgPerson6,
    profession:'Спасатель',
    mainInf: [
      {name:'стаж', value: '28 лет'},
      {name:'раса', value: 'человек'},
      {name:'особые условия', value: [
          {coefficient:1.5, text: 'Работа в опасных условиях'}
        ]},
      {name:'средняя зарплата', value: 97000}
    ]
  },
  {
    id: 7,
    name: 'Арчи',
    img: imgPerson7,
    profession:'Композитор гравитационных волн',
    mainInf: [
      {name:'стаж', value: '82 года'},
      {name:'раса', value: 'инопланетное существо'},
      {name:'особые условия', value: []},
      {name:'средняя зарплата', value: 114000}
    ]
  },
  {
    id: 8,
    name: 'Маркус',
    img: imgPerson8,
    profession:'Охотник на космических пиратов',
    mainInf: [
      {name:'стаж', value: '35 лет'},
      {name:'раса', value: 'человек'},
      {name:'особые условия', value: [
          {coefficient:1.5, text: 'Работа в опасных условиях'}
        ]},
      {name:'средняя зарплата', value: 110000}
    ]
  },
]

export const Conditions = [
  {
    value: 1.5,
    title:'работа в опасных условиях \n' +
      '(гравитация > 2G, радиация, патогены)',
    img: condition1
  },
  {
    value: 1.7,
    title:'работа с аномальными\n' +
      'артефактами',
    img: condition2
  },
  {
    value: 2.0,
    title:'Участие в межгалактических \n' +
      'конфликтах',
    img: condition3
  },
  {
    value: 1.8,
    title:'работа с психоактивными \n' +
      'материалами',
    img: condition4
  },
]