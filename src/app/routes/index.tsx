import React, {Suspense} from 'react';
import { createBrowserRouter } from 'react-router-dom';
import SpacePreloader from '../../components/Preloaer/Preloader';
import Game from '../../components/Game/Game';

//Главные компоненты
const MainPage = React.lazy(()=>import('../../pages/MainPage/MainPage'));
const SwiperPage = React.lazy(()=>import('../../pages/SwiperPage/SwiperPage'));
const FirstCorpus = React.lazy(()=>import('../../pages/FirstCorpus/FirstCorpus'));
const SecondCorpus = React.lazy(()=>import('../../pages/SecondCorpus/SecondCorpus'));
const ThirdCorpus = React.lazy(()=>import('../../pages/ThirdCorpus/ThirdCorpus'));
const Psih = React.lazy(()=>import('../../pages/Psih/Psih'));

//Страницы первого корпуса
const Logistics = React.lazy(()=>import('../../pages/FirstCorpus/Logistics/Logistics'));
const Yur = React.lazy(()=>import('../../pages/FirstCorpus/Yur/Yur'));
const Programmers = React.lazy(()=>import('../../pages/FirstCorpus/Programmers/Programmers'));
const Economist = React.lazy(()=>import('../../pages/FirstCorpus/Economist/Economist'));

//Страницы второго корпуса
const Dou = React.lazy(()=>import('../../pages/SecondCorpus/Dou/dou'));
const Bank = React.lazy(()=>import('../../pages/SecondCorpus/bank/Bank'));
const Torgashi = React.lazy(()=>import('../../pages/SecondCorpus/torgashi/Torgashi'));

//Страницы третьего корпуса
const Kidergarden = React.lazy(()=>import('../../pages/ThirdCorpus/kindergarden/kindergarden'));
const ElementarySchool = React.lazy(()=>import('../../pages/ThirdCorpus/ElementarySchool/ElementarySchool'));
const SpecialKidergarden = React.lazy(()=>import('../../pages/ThirdCorpus/special-kindergarten/SpecialKindergarden'));
const MusiciansRoom = React.lazy(()=>import('../../pages/ThirdCorpus/musiciansroom/MusiciansRoom'));

//Страницы игр
const BankGame = React.lazy(()=>import('../../pages/game/bank/bankGame'));
const BankGramotnost = React.lazy(()=>import('../../pages/game/bankgramotnost/BankGramotnost'));
const ExpenseSorterGame = React.lazy(()=>import('../../pages/game/buhgalter/buhgame2.0/components/BuhgalGame/BuhgalGame'));
const ChildWardrobe = React.lazy(()=>import('../../pages/game/childWardrobe/ChildWardrobe'));
const Commerce = React.lazy(()=>import('../../pages/game/commerce/Commerce'));
const CommercePlayGame = React.lazy(()=>import('../../pages/game/commerce_2/CommercePlayGame'));
const CommerceMat = React.lazy(()=>import('../../pages/game/commerceMat/CommerceMat'));
const CommerceSr = React.lazy(()=>import('../../pages/game/commerceSrok/CommerceSr'));
const MovieGame = React.lazy(()=>import('../../pages/game/deti/Moviegame'));
const Doy = React.lazy(()=>import('../../pages/game/doy/doy'));
const LogistCep = React.lazy(()=>import('../../pages/game/logist/LogistCep'));
const GameRast = React.lazy(()=>import('../../pages/game/rast/gameRast'));
const Rocket = React.lazy(()=>import('../../pages/game/rocket/Rocket'));
const SpaceTransport = React.lazy(()=>import('../../pages/game/SpaceTransport/SpaceTransport'));
const Upbringing = React.lazy(()=>import('../../pages/game/upbringing/Upbringing'));
const RelaxRoom = React.lazy(()=> import('../../pages/game/relaxRoom/relaxRoom'));
const RestRoom = React.lazy(()=> import('../../pages/game/RestRoom/RestRoom'));
const Litebot = React.lazy(() => import('../../pages/game/liteBot/App'));
const MagicalCrimes = React.lazy(() => import('../../pages/game/magicalCrimes/MagicalCrimes'));
const PensionGalaxy = React.lazy(() => import('../../pages/game/PensionGalaxy/PensionGalaxy'));
const LaborCode = React.lazy(() => import('../../pages/game/PensionGalaxy/pages/LaborCode/LaborCode'));

import { Musical } from '../../pages/game/musical/musical.js';
import { CommerceTovary } from '../../pages/game/commerce/CommerceTovary';

const LoadingFallback = () => <SpacePreloader/>;

export enum RoutesEnum {
  HOME = '/',
  FIRST_CORPUS = '/1',
  SECOND_CORPUS = '/2',
  THIRD_CORPUS = '/3',
  PROGRAMMERS = '/programmers',
  LOGISTICS = '/logistics',
  SWIPER = '/swiperPage',
  ECONOMIST = '/economist',
  SPECIALKINDERGARDEN = '/SpecialKinder',
  DOU = '/dou',
  BANK = '/bank',
  TORGASHI = '/tovaroveds',
  KINDER = '/kinder',
  MUSIC = '/music',
  YUR = '/yur',
}

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  { path: RoutesEnum.HOME, element: withSuspense(MainPage) },
  { path: RoutesEnum.FIRST_CORPUS, element: withSuspense(FirstCorpus) },
  { path: RoutesEnum.SECOND_CORPUS, element: withSuspense(SecondCorpus) },
  { path: RoutesEnum.THIRD_CORPUS, element: withSuspense(ThirdCorpus) },
  { path: RoutesEnum.PROGRAMMERS, element: withSuspense(Programmers) },
  { path: RoutesEnum.KINDER, element: withSuspense(Kidergarden) },
  { path: RoutesEnum.LOGISTICS, element: withSuspense(Logistics) },
  { path: RoutesEnum.YUR, element: withSuspense(Yur) },
  { path: RoutesEnum.SPECIALKINDERGARDEN, element: withSuspense(SpecialKidergarden) },
  { path: RoutesEnum.ECONOMIST, element: withSuspense(Economist) },
  { path: RoutesEnum.DOU, element: withSuspense(Dou) },
  { path: RoutesEnum.BANK, element: withSuspense(Bank) },
  { path: RoutesEnum.TORGASHI, element: withSuspense(Torgashi) },
  { path: RoutesEnum.MUSIC, element: withSuspense(MusiciansRoom) },
  { path: '/ElemShool', element: withSuspense(ElementarySchool) },
  { path: '/Psih', element: withSuspense(Psih) },

  // Игровые маршруты
  { path: '/doyGame', element: withSuspense(Doy) },
  { path: '/gbank', element: withSuspense(BankGame) },
  { path: '/rocket', element: withSuspense(Rocket) },
  { path: '/gbuh2', element: withSuspense(ExpenseSorterGame) },
  { path: '/tovary', element: withSuspense(CommerceTovary) },
  { path: '/gamelogist', element: withSuspense(LogistCep) },
  { path: '/commerceSr', element: withSuspense(CommerceSr) },
  { path: '/commerceMat', element: withSuspense(CommerceMat) },
  { path: '/upbringing', element: withSuspense(Upbringing) },
  { path: '/deti', element: withSuspense(MovieGame) },
  { path: '/musicalcategories', element: withSuspense(Musical) },
  { path: '/commerce', element: withSuspense(CommercePlayGame) },
  { path: '/commerce_2', element: withSuspense(Commerce) },
  { path: '/SpaceTransport', element: withSuspense(SpaceTransport) },
  { path: '/chemodany', element: withSuspense(BankGramotnost) },
  { path: '/swiperPage', element: withSuspense(SwiperPage) },
  { path: '/childWardrobe', element: withSuspense(ChildWardrobe) },
  { path: '/gameRast', element: withSuspense(GameRast) },
  {path: '/relaxRoom', element: withSuspense(RelaxRoom)},
  { path: '/restRoom', element: withSuspense(RestRoom) },
  { path: '/liteBot', element: withSuspense(Litebot) },
  { path: '/magicalCrimes', element: withSuspense(MagicalCrimes) },
  { path: '/pensionGalaxy', element: withSuspense(PensionGalaxy) },
  { path: '/laborCode', element: withSuspense(LaborCode) },
]);
