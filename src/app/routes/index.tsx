import { createBrowserRouter } from 'react-router-dom';
import { FirstCorpus } from '../../pages/FirstCorpus/FirstCorpus.tsx';
import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import { SecondCorpus } from '../../pages/SecondCorpus/SecondCorpus.tsx';
import { ThirdCorpus } from '../../pages/ThirdCorpus/ThirdCorpus.tsx';
import { Kidergarden } from '../../pages/ThirdCorpus/kindergarden/kindergarden';
import { Logistics } from '../../pages/FirstCorpus/Logistics/Logistics.tsx';
import {Yur} from '../../pages/FirstCorpus/Yur/Yur.tsx'
import {Dou} from '../../pages/SecondCorpus/Dou/dou.tsx'
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
import {BankGame } from '../../pages/game/bank/bankGame';
import { Rocket } from '../../pages/game/rocket/gameRocket';
import {SorterGame } from '../../pages/game/buhgalter/buhGame';
import { LogistCep } from '../../pages/game/logist/LogistCep';
import { Musical } from '../../pages/game/musical/musical';



export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/1', element: <FirstCorpus /> },
  { path: '/2', element: <SecondCorpus /> },
  { path: '/3', element: <ThirdCorpus /> },
  { path: '/programmers', element: <Programmers /> },
  { path: '/kinder', element: <Kidergarden/> },
  { path: '/logistics', element: <Logistics /> },
  // { path: '/robotGame', element:  < />,},
  { path: '/Yur', element: <Yur /> },
  { path: '/SpecialKinder', element: <SpecialKidergarden/> },
  { path: '/economist', element: <Economist /> },
  { path: '/dou', element: <Dou /> },
  { path: '/bank', element: <Bank /> },
  { path: '/tovaroveds', element: <Torgashi /> },
  { path: '/music', element: <MusiciansRoom /> },
  { path: '/ElemShool', element: <ElementarySchool /> },
  { path: '/Psih', element: <Psih /> },
  // { path: '/game/:gameId', element: <Game /> },
  { path: '/doyGame', element: <Doy/> },
  { path: '/gbank', element: <BankGame /> },
  { path: '/game', element: <Game /> },
  { path: '/rocket', element: <Rocket /> },
  { path: '/gbuh', element: <SorterGame /> },

  { path: '/gamelogist', element: <LogistCep/> },
  { path: '/musical', element: <Musical/> },


]);
