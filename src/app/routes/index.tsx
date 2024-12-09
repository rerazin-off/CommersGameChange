import { createBrowserRouter } from 'react-router-dom';
import { FirstCorpus } from '../../pages/FirstCorpus/FirstCorpus.tsx';
import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import { SecondCorpus } from '../../pages/SecondCorpus/SecondCorpus.tsx';
import { ThirdCorpus } from '../../pages/ThirdCorpus/ThirdCorpus.tsx';
import { Kidergarden } from '../../pages/ThirdCorpus/kindergarden/kindergarden';
import { Logistics } from '../../pages/Logistics/Logistics.tsx';
import {Yur} from '../../pages/Yur/Yur.tsx'

import { Programmers } from '../../pages/FirstCorpus/Programmers/Programmers';
import { SpecialKidergarden } from '../../pages/ThirdCorpus/special-kindergarten/SpecialKindergarden';


export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/1', element: <FirstCorpus /> },
  { path: '/2', element: <SecondCorpus /> },
  { path: '/3', element: <ThirdCorpus /> },
  { path: '/programmers', element: <Programmers /> },
  { path: '/kinder', element: <Kidergarden/> },
  { path: '/logistics', element: <Logistics /> },
  { path: '/robotGame', element:  <Logistics />,},
  { path: '/Yur', element: <Yur /> },
  { path: '/SpecialKinder', element: <SpecialKidergarden/> },
]);
