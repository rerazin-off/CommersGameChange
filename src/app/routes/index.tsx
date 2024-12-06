import { createBrowserRouter } from 'react-router-dom';
import { FirstCorpus } from '../../pages/FirstCorpus/FirstCorpus.tsx';
import { MainPage } from '../../pages/MainPage/MainPage.tsx';
import { SecondCorpus } from '../../pages/SecondCorpus/SecondCorpus.tsx';
import { ThirdCorpus } from '../../pages/ThirdCorpus/ThirdCorpus.tsx';
import { Kidergarden } from '../../pages/ThirdCorpus/kindergarden/kindergarden';
import { Logistics } from '../../pages/Logistics/Logistics.tsx';
import { Programmers } from '../../pages/FirstCorpus/Programmers/Programmers';


export const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/1', element: <FirstCorpus /> },
  { path: '/2', element: <SecondCorpus /> },
  { path: '/3', element: <ThirdCorpus /> },
  { path: '/programmers', element: <Programmers /> },
  { path: '/kinder', element: <Kidergarden/> },
  { path: '/logistics', element: <Logistics /> },
  { path: '/robotGame', element:  <Logistics />,}
]);
