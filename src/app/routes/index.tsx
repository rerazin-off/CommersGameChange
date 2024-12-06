import { createBrowserRouter } from 'react-router-dom';
import { FirstCorpus } from '../../pages/FirstCorpus/FirstCorpus.tsx';
import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import { SecondCorpus } from '../../pages/SecondCorpus/SecondCorpus.tsx';
import { ThirdCorpus } from '../../pages/ThirdCorpus/ThirdCorpus.tsx';
import { Kidergarden } from '../../pages/ThirdCorpus/kindergarden/kindergarden';
import { Logistics } from '../../pages/Logistics/Logistics.tsx';
import {Yur} from '../../pages/Yur/Yur.tsx'



export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/1', element: <FirstCorpus /> },
  { path: '/2', element: <SecondCorpus /> },
  { path: '/3', element: <ThirdCorpus /> },
  { path: '/kinder', element: <Kidergarden/> },
  { path: '/logistics', element: <Logistics /> },
  { path: '/Yur', element: <Yur /> },
]);
