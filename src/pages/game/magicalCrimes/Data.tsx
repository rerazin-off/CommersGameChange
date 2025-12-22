import FairyTale1 from '@/assets/img/game_assets/magicalCrimes-img/fairyTaile1.png';
import FairyTale2 from '@/assets/img/game_assets/magicalCrimes-img/fairyTaile2.png';
import FairyTale3 from '@/assets/img/game_assets/magicalCrimes-img/fairyTaile3.png';
import FairyTale4 from '@/assets/img/game_assets/magicalCrimes-img/fairyTaile4.png';
import FairyTale5 from '@/assets/img/game_assets/magicalCrimes-img/fairyTaile5.png';
import environment1 from '@/assets/img/game_assets/magicalCrimes-img/environment1.svg';
import environment2 from '@/assets/img/game_assets/magicalCrimes-img/environment2.svg';
import environment3 from '@/assets/img/game_assets/magicalCrimes-img/environment3.svg';
import environment4 from '@/assets/img/game_assets/magicalCrimes-img/environment4.svg';
import environment5 from '@/assets/img/game_assets/magicalCrimes-img/environment5.svg';
import EvidenceImg1 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg1.png';
import EvidenceImg2 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg2.png';
import EvidenceImg3 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg3.png';
import EvidenceImg4 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg4.png';
import EvidenceImg5 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg5.png';
import EvidenceImg6 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg6.png';
import EvidenceImg7 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg7.png';
import EvidenceImg8 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg8.png';
import EvidenceImg9 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg9.png';
import EvidenceImg10 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg10.png';
import EvidenceImg11 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg11.png';
import EvidenceImg12 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg12.png';
import EvidenceImg13 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg13.png';
import EvidenceImg14 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg14.png';
import EvidenceImg15 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg15.png';
import EvidenceImg16 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg16.png';
import EvidenceImg17 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg17.png';
import EvidenceImg18 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg18.png';
import EvidenceImg19 from '@/assets/img/game_assets/magicalCrimes-img/EvidenceImg19.png';

export interface FairyTale {
  id: number;
  name: string;
  type: string;
  countStar: number;
  image: string;
  evidence: number;
  situation: string;
  environment: string;
}

export interface Evidence {
  id: number;
  idScenes: number;
  name: string;
  type: string;
  size: [number, number];
  positions: [number, number];
  image: string;
}

export const FairyTales : FairyTale[] = [
  {
    id: 1,
    name: 'Иван-царевич и\n' + 'серый волк',
    type:'русская народная сказка',
    countStar: 2,
    image: FairyTale1,
    evidence: 4,
    situation: 'Иван-царевич украл Жар-птицу из королевского сада.',
    environment: environment1,
  },
  {
    id: 2,
    name: 'Гуси-лебеди',
    type:'русская народная сказка',
    countStar: 1,
    image: FairyTale2,
    evidence: 4,
    situation: 'Гуси-лебеди похищают мальчика по приказу Бабы-Яги.',
    environment: environment2,
  },
  {
    id: 3,
    name: 'Алые Паруса',
    type:'Александр Грин',
    countStar: 3,
    image: FairyTale3,
    evidence: 4,
    situation:'Жители Каперны травят Ассоль и Лонгрена.',
    environment: environment3,
  },
  {
    id: 4,
    name: 'Ромео и Джульетта',
    type:'Уильям Шекспир',
    countStar: 3,
    image: FairyTale4,
    evidence: 4,
    situation:'',
    environment: environment4
  },
  {
    id: 5,
    name: 'Собачье сердце',
    type:'Михаи́л Афанасьевич Булгаков',
    countStar: 3,
    image: FairyTale5,
    evidence: 4,
    situation:'',
    environment: environment5
  },
]

export const Evidences: Evidence[] = [
  {
    id: 1,
    idScenes: 1,
    name: 'Перо жар-птицы',
    type: 'вещественное доказательство. Перо, найденное на месте преступления возможно принадлежит жертве. ',
    size: [7, 8],
    positions: [26, 32],
    image: EvidenceImg1,
  },
  {
    id: 2,
    idScenes: 1,
    name: 'Следы преступника',
    type: 'Обстоятельства преступления. Отпечатки лап дикого животного. Глубина вдавливания следа указывает на бег.',
    size: [25, 21],
    positions: [1, 66],
    image: EvidenceImg2,
  },
  {
    id: 3,
    idScenes: 1,
    name: 'Обрывок веревки',
    type: 'Вещественное доказательство. Фрагмент пеньковой веревки длиной около 15 см с явными следами насильственного разрыва',
    size: [6, 8],
    positions: [56, 11],
    image: EvidenceImg3,
  },
  {
    id: 4,
    idScenes: 1,
    name: 'Возможные свидетели',
    type: 'Свидетельские показания. Группа людей, которые возможно видели момент соверешения преступления.',
    size: [13, 20],
    positions: [49, 101],
    image: EvidenceImg4,
  },
  {
    id: 5,
    idScenes: 2,
    name: 'Детская игрушка',
    type: 'Деревянный конь, оставленный без присмотра во дворе.',
    size: [8, 10],
    positions: [29, 90],
    image: EvidenceImg5,
  },
  {
    id: 6,
    idScenes: 2,
    name: 'Ватрушка',
    type: 'Недоеденный десерт, оставленный на столе. В доме пострадавшего такого десерта не было обнаружено, возможно его принес преступник.',
    size: [8, 7],
    positions: [7, 35],
    image: EvidenceImg6,
  },
  {
    id: 7,
    idScenes: 2,
    name: 'Ленточка для волос',
    type: 'Обрывок шёлковой ленты тёмно-красного цвета с небольшим пятном.',
    size: [6, 6],
    positions: [43, 5],
    image: EvidenceImg7,
  },
  {
    id: 8,
    idScenes: 2,
    name: 'Перо',
    type: 'Гусиное перо.',
    size: [25, 10],
    positions: [29, 96],
    image: EvidenceImg8,
  },
  {
    id: 9,
    idScenes: 3,
    name: 'Сломанная игрушка',
    type: 'Самодельная игрушка - деревянный кораблик, разломанный напополам, будто его намеренно испортили.',
    size: [8, 4],
    positions: [7, 147.2],
    image: EvidenceImg9,
  },
  {
    id: 10,
    idScenes: 3,
    name: 'Заколоченные окна',
    type: 'Окна, заколоченные грубыми досками после того, как неизвестные разбили стёкла. Следы свежих сколов на раме указывают на недавний акт вандализма.',
    size: [10, 27],
    positions: [40, 101],
    image: EvidenceImg10,
  },
  {
    id: 10,
    idScenes: 3,
    name: 'Заколоченные окна',
    type: 'Окна, заколоченные грубыми досками после того, как неизвестные разбили стёкла. Следы свежих сколов на раме указывают на недавний акт вандализма.',
    size: [7, 21],
    positions: [40, 62],
    image: EvidenceImg10,
  },
  {
    id: 11,
    idScenes: 3,
    name: 'Царапины',
    type: 'Свежие линейные ссадины на ноге, расположенные параллельно. Характер повреждений свидетельствует о возможном нанесении ногтями или острым предметом во время физического контакта.',
    size: [1, 3],
    positions: [17.5, 71.3],
    image: EvidenceImg11,
  },
  {
    id: 12,
    idScenes: 3,
    name: 'Доска с оскорблениями',
    type: 'Доска с нацарапанными грубыми надписями и обидными прозвищами. Судя по свежести царапин на поверхности, надписи были сделаны недавно.',
    size: [12, 33],
    positions: [35, 110],
    image: EvidenceImg12,
  },
  {
    id: 13,
    idScenes: 4,
    name: 'Яд',
    type: 'Небольшой стеклянный флакон с остатками красной жидкости. На этикетке стертая надпись на латыни.',
    size: [4, 13],
    positions: [74, 38],
    image: EvidenceImg13,
  },
  {
    id: 14,
    idScenes: 4,
    name: 'Книга учета',
    type: 'отрепанный гроссбух с двойной бухгалтерией. На последних страницах обнаружены зашифрованные записи о "специальных заказах" с инициалами клиентов и суммами платежей.',
    size: [64, 30],
    positions: [1, 67],
    image: EvidenceImg14,
  },
  {
    id: 15,
    idScenes: 4,
    name: 'Ядовитые ягоды',
    type: 'Темными волчьи ягодами. По количеству (около 30 штук) можно судить о промышленных масштабах сбора.',
    size: [24, 11],
    positions: [24, 131],
    image: EvidenceImg15,
  },
  {
    id: 16,
    idScenes: 4,
    name: 'Монеты',
    type: 'Среды всех монет были найдены монеты с гербом Монтекки.',
    size: [44, 23],
    positions: [1, 28],
    image: EvidenceImg16,
  },
  {
    id: 17,
    idScenes: 5,
    name: 'Заспиртованный гипофиз',
    type: 'Среды всех монет были найдены монеты с гербом Монтекки.',
    size: [10, 13],
    positions: [42, 44],
    image: EvidenceImg17,
  },
  {
    id: 18,
    idScenes: 5,
    name: 'Фото',
    type: 'Фото животного с пометкой "после операции".',
    size: [6.5, 11],
    positions: [58.5, 119.5],
    image: EvidenceImg18,
  },
]

export const Questions = [
  {id: 1, text: 'Какое право было нарушено?'},
  {id: 2, text: 'Выберите соответствующую статью закона:'},
  {id:3, text: 'Выберите оптимальное решение:'},
]

export const Answers = [
  {
    idFairyTale: 1,
    idQuestion: 1,
    answers:[
      { text: 'Право на неприкосновенность жилища', correct: false},
      { text: 'Право собственности', correct: true},
      { text: 'Право на свободу передвижения', correct: false},
      { text: 'Право на благоприятную окружающую среду', correct: false},
    ]
  },
  {
    idFairyTale: 1,
    idQuestion: 2,
    answers:[
      { text: 'Статья 209 УК РФ «Бандитизм»', correct: false},
      { text: 'Статья 164 УК РФ «Хищение предметов, имеющих особую ценность»', correct: false},
      { text: 'Статья 158 УК РФ «Кража»', correct: true},
      { text: 'Статья 226.1 УК РФ «Контрабанда»', correct: false},
    ]
  },
  {
    idFairyTale: 1,
    idQuestion: 3,
    answers:[
      { text: 'Убежать с Серым Волком', correct: false},
      { text: 'Отрицать факт кражи', correct: false},
      { text: 'Вернуть Жар-птицу и извиниться', correct: true},
      { text: 'Доказать крайнюю необходимость (спасение царства)', correct: true},
    ]
  },
  {
    idFairyTale: 2,
    idQuestion: 1,
    answers:[
      { text: 'Право на жилище', correct: false},
      { text: 'Право на семью', correct: false},
      { text: 'Право на свободу и личную неприкосновенность', correct: true},
      { text: 'Право на образование', correct: false},
    ]
  },
  {
    idFairyTale: 2,
    idQuestion: 2,
    answers:[
      { text: 'Статья 156 УК РФ «Неисполнение обязанностей по воспитанию»', correct: false},
      { text: 'Статья 125 УК РФ «Оставление в опасности»', correct: false},
      { text: 'Статья 126 УК РФ «Похищение человека»', correct: true},
      { text: 'Статья 127 УК РФ «Незаконное лишение свободы»', correct: false},
    ]
  },
  {
    idFairyTale: 2,
    idQuestion: 3,
    answers:[
      { text: 'Научить сестру лучше следить за братом', correct: false},
      { text: 'Привлечь Бабу-Ягу к ответственности ', correct: true},
      { text: 'Ничего не делать - всё закончилось хорошо', correct: false},
      { text: 'Требовать компенсацию морального вреда', correct: true},
    ]
  },
  {
    idFairyTale: 3,
    idQuestion: 1,
    answers:[
      { text: 'Право на свободу слова', correct: false},
      { text: 'Право на защиту от жестокого обращения ', correct: true},
      { text: 'Право на труд', correct: false},
      { text: 'Право на свободу мысли и убеждения', correct: false},
    ]
  },
  {
    idFairyTale: 3,
    idQuestion: 2,
    answers:[
      { text: 'Статья 110 УК РФ «Доведение до самоубийства»', correct: false},
      { text: 'Статья 119 УК РФ «Угроза убийством»', correct: false},
      { text: 'Статья 213 УК РФ «Хулиганство»', correct: true},
      { text: 'Статья 319 УК РФ «Оскорбление представителя власти', correct: false},
    ]
  },
  {
    idFairyTale: 3,
    idQuestion: 3,
    answers:[
      { text: 'Ответить тем же — испортить вещи обидчиков', correct: false},
      { text: 'Игнорировать агрессию — рано или поздно всё наладится', correct: true},
      { text: 'Обратиться в полицию с заявлением о травле', correct: true},
      { text: 'Переселить Ассоль в другой город', correct: false},
    ]
  },
  {
    idFairyTale: 4,
    idQuestion: 1,
    answers:[
      { text: 'Право на неприкосновенность частной жизни', correct: false},
      { text: 'Право на свободу предпринимательства', correct: false},
      { text: 'Право на безопасность жизни и здоровья', correct: true},
      { text: 'Право на медицинскую помощь', correct: false},
    ]
  },
  {
    idFairyTale: 4,
    idQuestion: 2,
    answers:[
      { text: 'Статья 238 УК РФ «Производство и сбыт опасных веществ»', correct: true},
      { text: 'Статья 235 УК РФ «Незаконная медицинская практика»', correct: false},
      { text: 'Статья 327 УК РФ «Подделка лекарственных средств»', correct: false},
      { text: 'Статья 124 УК РФ «Неоказание помощи больному»', correct: false},
    ]
  },
  {
    idFairyTale: 4,
    idQuestion: 3,
    answers:[
      { text: 'Запретить все лекарственные средства', correct: false},
      { text: 'Ужесточить контроль за аптеками', correct: true},
      { text: 'Ввести образовательные программы о последствиях', correct: false},
      { text: 'Ничего - это личный выбор каждого', correct: true},
    ]
  },
  {
    idFairyTale: 5,
    idQuestion: 1,
    answers:[
      { text: 'Право на свободу научной деятельности', correct: false},
      { text: 'Право на медицинскую тайну', correct: false},
      { text: 'Право на свободу слова', correct: false},
      { text: 'Право на гуманное обращение с животными', correct: true},
    ]
  },
  {
    idFairyTale: 5,
    idQuestion: 2,
    answers:[
      { text: 'Статья 118 УК РФ «Причинение вреда здоровью по неосторожности»', correct: false},
      { text: 'Статья 137 УК РФ «Нарушение неприкосновенности частной жизни»', correct: false},
      { text: 'Статья 235 УК РФ «Незаконное проведение медицинских экспериментов»', correct: true},
      { text: 'Статья 124 УК РФ «Неоказание помощи больному»', correct: false},
    ]
  },
  {
    idFairyTale: 5,
    idQuestion: 3,
    answers:[
      { text: 'Полный запрет экспериментов с трансплантацией органов', correct: false},
      { text: 'Этический контроль за научными исследованиями', correct: true},
      { text: 'Уголовная ответственность за незаконные опыты', correct: true},
      { text: 'Свобода науки без ограничений', correct: false},
    ]
  },
]
