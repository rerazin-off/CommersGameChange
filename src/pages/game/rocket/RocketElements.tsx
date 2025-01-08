import body from '@/assets/img/game_assets/game-rocket-img/body.svg';
import window1 from '@/assets/img/game_assets/game-rocket-img/window1.svg';
import window2 from '@/assets/img/game_assets/game-rocket-img/window2.svg';
import window3 from '@/assets/img/game_assets/game-rocket-img/window3.svg';
import window4 from '@/assets/img/game_assets/game-rocket-img/window4.svg';
import glass1 from '@/assets/img/game_assets/game-rocket-img/glass1.svg';
import glass2 from '@/assets/img/game_assets/game-rocket-img/glass2.svg';
import glass3 from '@/assets/img/game_assets/game-rocket-img/glass3.svg';
import glass4 from '@/assets/img/game_assets/game-rocket-img/glass4.svg';
import wings1 from '@/assets/img/game_assets/game-rocket-img/wings1.svg';
import wings2 from '@/assets/img/game_assets/game-rocket-img/wings2.svg';
import wings3 from '@/assets/img/game_assets/game-rocket-img/wings3.svg';
import wings4 from '@/assets/img/game_assets/game-rocket-img/wings4.svg';
import bolt1 from '@/assets/img/game_assets/game-rocket-img/bolt1.svg';
import bolt2 from '@/assets/img/game_assets/game-rocket-img/bolt2.svg';
import bolt3 from '@/assets/img/game_assets/game-rocket-img/bolt3.svg';
import bolt4 from '@/assets/img/game_assets/game-rocket-img/bolt4.svg';
import boltGroup1 from '@/assets/img/game_assets/game-rocket-img/boltGroup1.svg';
import boltGroup2 from '@/assets/img/game_assets/game-rocket-img/boltGroup2.svg';
import boltGroup3 from '@/assets/img/game_assets/game-rocket-img/boltGroup3.svg';
import boltGroup4 from '@/assets/img/game_assets/game-rocket-img/boltGroup4.svg';
import reactor1 from '@/assets/img/game_assets/game-rocket-img/reactor1.svg';
import reactor2 from '@/assets/img/game_assets/game-rocket-img/reactor2.svg';
import reactor3 from '@/assets/img/game_assets/game-rocket-img/reactor3.svg';
import reactor4 from '@/assets/img/game_assets/game-rocket-img/reactor4.svg';
import upper_part1 from '@/assets/img/game_assets/game-rocket-img/upper_part1.svg';
import upper_part2 from '@/assets/img/game_assets/game-rocket-img/upper_part2.svg';
import upper_part3 from '@/assets/img/game_assets/game-rocket-img/upper_part3.svg';
import upper_part4 from '@/assets/img/game_assets/game-rocket-img/upper_part4.svg';

export const RocketElements = {
  body: body,
  upper_part:[
    { id: 'upper_part1', src: upper_part1 },
    { id: 'upper_part2', src: upper_part2 },
    { id: 'upper_part3', src: upper_part3 },
    { id: 'upper_part4', src: upper_part4 }
  ],
  window: [
    { id: 'window1', src: window1 },
    { id: 'window2', src: window2 },
    { id: 'window3', src: window3 },
    { id: 'window4', src: window4 }
  ],
  glass: [
    { id: 'glass1', src: glass1 },
    { id: 'glass2', src: glass2 },
    { id: 'glass3', src: glass3 },
    { id: 'glass4', src: glass4 }
  ],
  wings: [
    { id: 'wings1', src: wings1 },
    { id: 'wings2', src: wings2 },
    { id: 'wings3', src: wings3 },
    { id: 'wings4', src: wings4 }
  ],
  bolt: [
    { id: 'bolt1', src: bolt1 },
    { id: 'bolt2', src: bolt2 },
    { id: 'bolt3', src: bolt3 },
    { id: 'bolt4', src: bolt4 }
  ],
  boltGroup: [
    { id: 'bolt1', src: boltGroup1 },
    { id: 'bolt2', src: boltGroup2 },
    { id: 'bolt3', src: boltGroup3 },
    { id: 'bolt4', src: boltGroup4 }
  ],
  reactor: [
    { id: 'reactor1', src: reactor1 },
    { id: 'reactor2', src: reactor2 },
    { id: 'reactor3', src: reactor3 },
    { id: 'reactor4', src: reactor4 }
  ],
  correctEl:[body, upper_part2, window4, glass1, wings3, boltGroup4, reactor4]
};
