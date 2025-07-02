import transport1 from '@/assets/img/game_assets/space-transport-img/transport1.svg';
import transport2 from '@/assets/img/game_assets/space-transport-img/transport2.svg';
import transport3 from '@/assets/img/game_assets/space-transport-img/transport3.svg';
import transport4 from '@/assets/img/game_assets/space-transport-img/transport4.svg';
import planet1 from '@/assets/img/game_assets/space-transport-img/planet-corpus1.svg';
import planet2 from '@/assets/img/game_assets/space-transport-img/planet-corpus2.svg';
import planet3 from '@/assets/img/game_assets/space-transport-img/planet-corpus3.svg';
import iconBalance from '@/assets/img/game_assets/space-transport-img/iconBalance.svg';
import iconDays from '@/assets/img/game_assets/space-transport-img/iconDays.svg';
import iconFuel from '@/assets/img/game_assets/space-transport-img/iconFuel.svg';
import iconUser from '@/assets/img/game_assets/space-transport-img/iconUser.svg';


export const transports=[
  {id: 1, img: transport1, capacity: 20, amountFuel: 10, cost: 50, numPerson:0, active:true, currentPlanetId: null},
  {id: 2, img: transport2, capacity: 30, amountFuel: 10, cost: 40, numPerson:0, active:true, currentPlanetId: null},
  {id: 3, img: transport3, capacity: 50, amountFuel: 10, cost: 30, numPerson:0, active:true, currentPlanetId: null},
  {id: 4, img: transport4, capacity: 100, amountFuel: 10, cost: 100, numPerson:0, active:false, currentPlanetId: null}
]

export const mainParameters=[
  {name:'Баланс', value:200, icon: iconBalance},
  {name:'Дни', value:0, icon: iconDays},
  {name:'Количество человек', value:100, icon: iconUser},
  {name: 'Расход топлива', value: 0, icon: iconFuel}
]
export const dataPlanets=[
  {id:1, img:planet1, countPerson:15, paths:[5], pathsPlanet2:[4], pathsPlanet3:[1]},
  {id:2, img:planet2, countPerson:25, paths:[2], pathsPlanet1:[4], pathsPlanet3:[4]},
  {id:3, img:planet3, countPerson:60, paths:[1], pathsPlanet1:[1], pathsPlanet2:[4]},
]
export const days = [5,2,1,4,4,1]






