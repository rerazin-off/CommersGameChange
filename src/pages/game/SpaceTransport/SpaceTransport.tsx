import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import classes from './SpaceTransport.module.scss'
import TransportCard from './components/TransportCard/TransportCard';
import Planet from './components/Planet/Planet';
import TransportSlot from './components/TransportSlot/TransportSlot';
import MainParameters from './components/MainParametrs/MainParameters';

import transport1 from '@/assets/img/game_assets/space-transport-img/transport1.svg';
import transport2 from '@/assets/img/game_assets/space-transport-img/transport2.svg';
import transport3 from '@/assets/img/game_assets/space-transport-img/transport3.svg';
import transport4 from '@/assets/img/game_assets/space-transport-img/transport4.svg';
import planet1 from '@/assets/img/planet-corpus1.svg';
import planet2 from '@/assets/img/planet-corpus2.svg';
import planet3 from '@/assets/img/planet-corpus3.svg';
import slot from '@/assets/img/game_assets/space-transport-img/slot.svg';
import pathsImg from '@/assets/img/game_assets/space-transport-img/pathsImg.svg';


type Transport= {
  img: string,
  capacity: number,
  amountFuel: number,
  cost: number,
  numPerson: number,
  active: boolean,
  rangeDays: [number, number],
  currentPlanetId: number,
}
type Planet={
  id: number,
  img: string,
  countPerson: number,
  paths: number[],
  pathsPlanet1: number[],
  pathsPlanet2: number[],
  pathsPlanet3: number[],
}

const transports=[
  {img: transport1, capacity: 20, amountFuel: 20, cost: 50, numPerson:0, active:true, rangeDays:[1,6], currentPlanetId: null},
  {img: transport2, capacity: 30, amountFuel: 20, cost: 40, numPerson:0, active:true, rangeDays:[3,8], currentPlanetId: null},
  {img: transport3, capacity: 50, amountFuel: 20, cost: 30, numPerson:0, active:true, rangeDays:[4,10], currentPlanetId: null},
  {img: transport4, capacity: 100, amountFuel: 20, cost: 100, numPerson:0, active:false, currentPlanetId: null}
]
const mainParameters=[
  {name:'Баланс:', value:120},
  {name:'Выполнено заказов:', value:0},
  {name:'Дни:', value:0},
  {name:'Количество человек:', value:100},
]
const dataPlanets=[
  {id:1, img:planet1, countPerson:10, paths:[], pathsPlanet2:[], pathsPlanet3:[]},
  {id:2, img:planet2, countPerson:30, paths:[], pathsPlanet1:[], pathsPlanet3:[]},
  {id:3, img:planet3, countPerson:60, paths:[], pathsPlanet1:[], pathsPlanet2:[]},
]

export const SpaceTransport: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>(dataPlanets);
  const [selectedImg, setSelectedImg]=useState<string>(slot);
  const [selectedTransport, setSelectedTransport]=useState<Transport | null>(null);
  const [selectedPlanet, setSelectedPlanet]=useState<Planet | null>()
  const [days, setDays]=useState<number[]>([])
  const [positionTransport, setPositionTransport]=useState({x:'', y:''})
  const transportRef = useRef();


  const generateRandomDays=(max:number, min:number)=>{
    return Math.floor(Math.random()*(max-min)+min)
  }

  const buyTransport=(transport: Transport)=>{
    const balance = mainParameters[0].value;

    if (balance>0 && transport.active){
      transport.active=false;
      setSelectedImg(transport.img)
      setSelectedTransport(transport)
      mainParameters[0].value=balance-transport.cost;

      const newDays = Array.from({ length: 6 }, () =>
          generateRandomDays(transport.rangeDays[0], transport.rangeDays[1])
      );
      setDays(newDays);
    }
  }

  useEffect(() => {
    if (days.length>0){
      mainParameters[0].value+=searchMinPath(days)*20;
      planets[0].paths.push(days[1], days[0]+days[3], days[2]+days[5]);
      planets[1].paths.push(days[0], days[1]+days[3], days[2]+days[4]);
      planets[2].paths.push(days[2], days[0]+days[4], days[1]+days[5]);
      planets[0].pathsPlanet2.push(days[3], days[5]+days[4])
      planets[0].pathsPlanet3.push(days[5], days[3]+days[4])
      planets[1].pathsPlanet1.push(days[3], days[4]+days[5])
      planets[1].pathsPlanet3.push(days[4], days[3]+days[5])
      planets[2].pathsPlanet1.push(days[5], days[4]+days[3])
      planets[2].pathsPlanet2.push(days[4], days[5]+days[3])
    }
  }, [days]);

  const searchMinPath=(days:number[])=>{
    const paths=[]
    planets.forEach((el, index)=>(
      paths.push(planets[index].paths)
    ))
    planets.map((el)=>(
      el.countPerson===0
    ))
    return Math.min(...paths)
  }

  const sendTransport=(event: React.MouseEvent, planet: Planet)=>{
    const notify = () => toast.error('Заполните корабль полностью');

    if (!setPositionTransport) return;

    if (selectedTransport.currentPlanetId === null) {
      if (selectedTransport.numPerson !== selectedTransport.capacity) {
        notify();
        return;
      }
    }

    setSelectedPlanet(planet)
    if (selectedTransport){
      const updatePlanets=planets.map(p=>{
        if (p.id===planet.id){
          return{
            ...p,
            countPerson: Math.max(0, p.countPerson-selectedTransport.numPerson)
          }
        }
        return p;
      })
      setPlanets(updatePlanets)
      setSelectedTransport(prev=>({
        ...prev,
        numPerson: Math.max(0, selectedTransport?.numPerson-planet.countPerson),
        currentPlanetId: planet.id
      }))
    }
    let x=event.target.x-positionTransport.x+50
    let y=event.target.y-positionTransport.y+20
    transportRef.current.style.transform = `translate(${x}px, ${y}px)`;
    transportRef.current.style.transition = `1.5s`;
  }

  useEffect(() => {
    if (selectedTransport?.numPerson === 0 && selectedTransport.currentPlanetId !== null){
      const timer=setTimeout(()=>{
        transportRef.current.style.transform = `translate(0px, 0px)`
        setTimeout(()=>{
          setSelectedTransport(null);
          setSelectedImg(slot);
          setSelectedPlanet(null)
        }, 2000)
      }, 1000)
    }
  }, [selectedTransport?.numPerson]);


  const changeSelectedTransportNumPerson = (operator: string)=> {
    setSelectedTransport(prev=>{
      let num=prev.numPerson;
      if (operator === '+' && prev?.numPerson < prev?.capacity) {
        num = prev?.numPerson+1
      }
      if (operator === '-' && prev?.numPerson > 0) {
        num = prev?.numPerson-1
      }
      return {...prev, numPerson: num};
    })
  }

  useEffect(() => {
    setPositionTransport({x: transportRef.current.getBoundingClientRect().x, y: transportRef.current.getBoundingClientRect().y})
  }, [transportRef]);


  return (
    <div className={classes.container}>
      <ToastContainer/>
      <MainParameters parameters={mainParameters}/>

      <div className={classes.gameField}>
        <div className={classes.game}>
          {planets.map(planet => (
            <Planet
              key={planet.id}
              planet={planet}
              numPerson={planet.countPerson}
              clickPlanet={sendTransport}
            />
          ))}

          <TransportSlot
            selectedImg={selectedImg}
            transport={selectedTransport}
            show={!selectedPlanet}
            transportRef={transportRef}
            changeNumPerson={changeSelectedTransportNumPerson}
          />
        </div>

        <div className={classes.gridContainer}>
          {transports.map((el, id) => (
            <TransportCard
              key={id}
              transport={el}
              onBuy={buyTransport}
              active={el.active}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

