import { createBrowserRouter } from 'react-router-dom';
import { FirstCorpus } from '../../pages/FirstCorpus/FirstCorpus.tsx';
import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import { SecondCorpus } from '../../pages/SecondCorpus/SecondCorpus.tsx';
import { ThirdCorpus } from '../../pages/ThirdCorpus/ThirdCorpus.tsx';
import { Kidergarden } from '../../pages/ThirdCorpus/kindergarden/kindergarden';
import { Logistics } from '../../pages/FirstCorpus/Logistics/Logistics.tsx';
import { Yur } from '../../pages/FirstCorpus/Yur/Yur.tsx';
import { Dou } from '../../pages/SecondCorpus/Dou/dou.tsx';
import { Programmers } from '../../pages/FirstCorpus/Programmers/Programmers';
import { SpecialKidergarden } from '../../pages/ThirdCorpus/special-kindergarten/SpecialKindergarden';
import { Economist } from '../../pages/FirstCorpus/Economist/Economist';
import { Bank } from '../../pages/SecondCorpus/bank/Bank';
import { Torgashi } from '../../pages/SecondCorpus/torgashi/Torgashi';
import { MusiciansRoom } from '../../pages/ThirdCorpus/musiciansroom/MusiciansRoom';
import { ElementarySchool } from '../../pages/ThirdCorpus/ElementarySchool/ElementarySchool';
import { Psih } from '../../pages/MainPage/Psih/Psih';
import Game from '../../components/Game/Game';
import { Doy } from '../../pages/game/doy/doy';
import { BankGame } from '../../pages/game/bank/bankGame';
import { Rocket } from '../../pages/game/rocket/Rocket';
import { SorterGame } from '../../pages/game/buhgalter/buhGame';
import { LogistCep } from '../../pages/game/logist/LogistCep';
import { MusicalGameCategories } from '../../pages/game/musical/MusicalGameCategories';
import CommercePlayGame  from '../../pages/game/commerce_2/CommercePlayGame.js';

import ExpenseSorterGame from '../../pages/game/buhgalter/buhgame2.0/components/BuhgalGame/BuhgalGame';

import { Suspense } from 'react';


export enum RoutesEnum {
  HOME = '/',
  FIRST_CORPUS = '/1',
  PROGRAMMERS = '/programmers',
  LOGISTICS = '/logistics',
  ECONOMIST = '/economist',
  SPECIALKINDERGARDEN='/SpecialKinder',
  DOU = '/dou',
  BANK = '/bank',
  TORGASHI = '/tovaroveds'
 //  ECONOMIST = '/economist',
 // main
}

export const router = createBrowserRouter([
  { path: RoutesEnum.HOME, element: <MainPage /> },
  { path: RoutesEnum.FIRST_CORPUS, element: <FirstCorpus /> },
  { path: '/2', element: <SecondCorpus /> },
  { path: '/3', element: <ThirdCorpus /> },
  { path: '/programmers', element: <Programmers /> },
  { path: '/kinder', element: <Kidergarden /> },
  { path: RoutesEnum.LOGISTICS, element: <Logistics /> },
  // { path: '/robotGame', element:  < />,},
  { path: '/Yur', element: <Yur /> },
  { path: '/SpecialKinder', element: <SpecialKidergarden /> },
  { path: '/economist', element: <Economist /> },
  { path: RoutesEnum.DOU, element: <Dou /> },
  { path: RoutesEnum.BANK, element: <Bank /> },
  { path: RoutesEnum.ECONOMIST, element: <Economist /> },
  { path: RoutesEnum.TORGASHI, element: <Torgashi /> },
  {
    path: '/dou',
    element: (
      <Suspense fallback={<>ЗАГРУЗКА..................</>}>
        <Dou />
      </Suspense>
    ),
  },
  { path: '/bank', element: <Bank /> },
  { path: '/tovaroveds', element: <Torgashi /> },
  { path: '/music', element: <MusiciansRoom /> },
  { path: '/ElemShool', element: <ElementarySchool /> },
  { path: '/Psih', element: <Psih /> },
  // { path: '/game/:gameId', element: <Game /> },
  { path: '/doyGame', element: <Doy /> },
  { path: '/gbank', element: <BankGame /> },
  { path: '/game', element: <Game /> },
  { path: '/rocket', element: <Rocket /> },
  { path: '/gbuh', element: <SorterGame /> },
  { path: '/gbuh2', element: <ExpenseSorterGame /> },

  { path: '/gamelogist', element: <LogistCep /> },
  { path: '/musicalcategories', element: <MusicalGameCategories /> },
  { path: '/commerce', element: <CommercePlayGame/> },
]);
