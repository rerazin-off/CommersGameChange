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

//Игры программистов
const siteBuilde = React.lazy(()=>import('../../pages/game/siteBuilder/App'));
const Connector = React.lazy(()=>import('../../pages/game/Connector/components/game'));
const LiteBot = React.lazy(()=>import('../../pages/game/liteBot/App'));
const FlexxboxAlien = React.lazy(()=>import('../../pages/game/flexboxAlien/FlexBoxAlien'));

//Игры логистов
const CargoPacking = React.lazy(() =>import('../../pages/game/CargoPackingGame/CargoPackingGame'));
const SpaceTransport = React.lazy(()=>import('../../pages/game/SpaceTransport/SpaceTransport'));
const LogistCep = React.lazy(()=>import('../../pages/game/logist/LogistCep'));

//Игры юристов
const MagicalCrimes = React.lazy(() =>import('../../pages/game/magicalCrimes/MagicalCrimes'));

//Игры бухгалтеров
const PensionGalaxy = React.lazy(() =>import('../../pages/game/PensionGalaxy/PensionGalaxy'));
const ExpenseSorterGame = React.lazy(()=>import('../../pages/game/buhgalter/buhgame2.0/components/BuhgalGame/BuhgalGame'));

//Игры торгового дела
const Commerce = React.lazy(()=>import('../../pages/game/commerce/ShelfSort'));
const CommercePlayGame = React.lazy(()=>import('../../pages/game/commerce_2/CommercePlayGame'));
const CommerceMat = React.lazy(()=>import('../../pages/game/commerceMat/CommerceMat'));
const CommerceSr = React.lazy(()=>import('../../pages/game/commerceSrok/CommerceSr'));

//Игры банковского дела
const BankGame = React.lazy(()=>import('../../pages/game/bank/bankGame'));
const BankGramotnost = React.lazy(()=>import('../../pages/game/bankgramotnost/BankGramotnost'));

//Игры ДОУ
const Doy = React.lazy(()=>import('../../pages/game/doy/doy'));

//Игры дошколльного образования
const ChildWardrobe = React.lazy(()=>import('../../pages/game/childWardrobe/ChildWardrobe'));
const MovieGame = React.lazy(()=>import('../../pages/game/deti/Moviegame'));
const Upbringing = React.lazy(()=>import('../../pages/game/upbringing/Upbringing'));

//Игры специального дошкольного образования
const GameRast = React.lazy(()=>import('../../pages/game/rast/gameRast'));
const Rocket = React.lazy(()=>import('../../pages/game/rocket/Rocket'));

//Игры музыкального образования
const Xylophone = React.lazy(() =>import('../../pages/game/xylophone/Xylophone'));
const Concert = React.lazy(() =>import('../../pages/game/Concert/Concert'));
const Musical = React.lazy(() =>import('../../pages/game/musical/musical'));

//Игры начальных классов
const PongGame = React.lazy(() =>import('../../pages/game/ElementarySchool/Pong/PongGame'));

//Психологическая комната
const geometricPerson = React.lazy(()=>import('../../pages/game/geometricPerson/src/App'));
const InnerMonsterTest = React.lazy(()=>import('../../pages/game/InnerMonsterTest/InnerMonsterTest'));
const ProfSkills = React.lazy(()=>import('../../pages/game/ProfSkills/ProfSkills'));

import Preloader from '../../components/Preloaer/Preloader';
import { CommerceTovary } from '../../pages/game/commerce/CommerceTovary';

const LoadingFallback = () => <SpacePreloader/>;

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingFallback />}>
    <Component />
  </Suspense>
);

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
  // { path: RoutesEnum.GAME, element: withSuspense(Game) },

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
  { path: '/xylophonesounds', element: withSuspense(Xylophone)},
  { path: '/concertsounds', element: withSuspense(Concert)},
  { path: '/commerce', element: withSuspense(CommercePlayGame) },
  { path: '/commerce_2', element: withSuspense(Commerce) },
  { path: '/SpaceTransport', element: withSuspense(SpaceTransport) },
  { path: '/magicalCrimes', element: withSuspense(MagicalCrimes) },
  { path: '/pensionGalaxy', element: withSuspense(PensionGalaxy) },
  {path: '/liteBot', element: withSuspense(LiteBot)},
  { path: '/chemodany', element: withSuspense(BankGramotnost) },
  { path: '/swiperPage', element: withSuspense(SwiperPage) },
  { path: '/childWardrobe', element: withSuspense(ChildWardrobe) },
  { path: '/gameRast', element: withSuspense(GameRast) },
  { path: '/siteBuilde', element: withSuspense(siteBuilde) },
  { path: '/geometricPerson', element: withSuspense(geometricPerson) },
  { path: '/CargoPacking', element: withSuspense(CargoPacking) },
  { path: '/Connector', element: withSuspense(Connector) },
  { path: '/PongGame', element: withSuspense(PongGame) },
  { path: '/innerMonsterTest', element: withSuspense(InnerMonsterTest) },
  { path: '/profSkills', element: withSuspense(ProfSkills) },
  {path: '/flexboxAlien', element: withSuspense(FlexxboxAlien) },
  {path: '/preloader', element: <Preloader/>}
]);
