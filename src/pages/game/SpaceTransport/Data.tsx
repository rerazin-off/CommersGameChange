import transport1 from '@/assets/img/game_assets/space-transport-img/transport1.svg';
import transport2 from '@/assets/img/game_assets/space-transport-img/transport2.svg';
import transport3 from '@/assets/img/game_assets/space-transport-img/transport3.svg';
import transport4 from '@/assets/img/game_assets/space-transport-img/transport4.svg';
import planet1 from '@/assets/img/game_assets/space-transport-img/planet-corpus1.svg';
import planet2 from '@/assets/img/game_assets/space-transport-img/planet-corpus2.svg';
import planet3 from '@/assets/img/game_assets/space-transport-img/planet-corpus3.svg';


export const transports=[
  {id: 1, img: transport1, capacity: 20, amountFuel: 20, cost: 50, numPerson:0, active:true, currentPlanetId: null},
  {id: 2, img: transport2, capacity: 30, amountFuel: 20, cost: 40, numPerson:0, active:true, currentPlanetId: null},
  {id: 3, img: transport3, capacity: 50, amountFuel: 20, cost: 30, numPerson:0, active:true, currentPlanetId: null},
  {id: 4, img: transport4, capacity: 100, amountFuel: 20, cost: 100, numPerson:0, active:false, currentPlanetId: null}
]

export const mainParameters=[
  {name:'Баланс:', value:120},
  {name:'Выполнено заказов:', value:0},
  {name:'Дни:', value:0},
  {name:'Количество человек:', value:100},
]
export const dataPlanets=[
  {id:1, img:planet1, countPerson:10, paths:[], pathsPlanet2:[], pathsPlanet3:[]},
  {id:2, img:planet2, countPerson:30, paths:[], pathsPlanet1:[], pathsPlanet3:[]},
  {id:3, img:planet3, countPerson:60, paths:[], pathsPlanet1:[], pathsPlanet2:[]},
]

export const daysPositions = [
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
]

