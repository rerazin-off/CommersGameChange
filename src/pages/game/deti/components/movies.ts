import img1 from '../assets/brem1.svg';
import img2 from '../assets/brem2.svg';
import img3 from '../assets/brem3.svg';
import img4 from '../assets/brem4.svg';
import img5 from '../assets/brem5.svg';

import img6 from '../assets/bur1.svg';
import img7 from '../assets/bur2.svg';
import img8 from '../assets/bur3.svg';
import img9 from '../assets/bur4.svg';
import img10 from '../assets/bur5.svg';

import img11 from '../assets/nez1.svg';
import img12 from '../assets/nez2.svg';
import img13 from '../assets/nez3.svg';
import img14 from '../assets/nez4.svg';
import img15 from '../assets/nez5.svg';

import img16 from '../assets/cip1.svg';
import img17 from '../assets/cip2.svg';
import img18 from '../assets/cip3.svg';
import img19 from '../assets/cip4.svg';
import img20 from '../assets/cip5.svg';

import img21 from '../assets/ter1.svg';
import img22 from '../assets/ter2.svg';
import img23 from '../assets/ter3.svg';
import img24 from '../assets/ter4.svg';
import img25 from '../assets/ter5.svg';

export const movies = [
  {
    id: 1,
    name: "Бременские музыканты",
    images: [img1, img2, img3, img4, img5]
  },
   {
    id: 2,
    name: "Буратино",
    images: [img6, img7, img8, img9, img10]
  },
   {
    id: 3,
    name: "Незнайка",
    images: [img11, img12, img13, img14, img15]
  },
   {
    id: 4,
    name: "Чиполлино",
    images: [img16, img17, img18, img19, img20]
  },
   {
    id: 5,
    name: "Теремок",
    images: [img21, img22, img23, img24, img25]
  }
] as const;