import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';
import classes from './SpaceTransport.module.scss'
import TransportCard from './components/TransportCard/TransportCard';
import Planet from './components/Planet/Planet';
import TransportSlot from './components/TransportSlot/TransportSlot';
import MainParameters from './components/MainParametrs/MainParameters';
import GameCanvas from './components/GameCanvas/GameCanvas';
import GameResults from './components/GameResults/GameResults';
import { transports, mainParameters, dataPlanets} from './Data';

import slot from '@/assets/img/game_assets/space-transport-img/slot.svg';

type Transport= {
  id: number,
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

type PositionTransport={
  x: number,
  y: number
}

export const SpaceTransport: React.FC = () => {
  const navigate = useNavigate()
  const [planets, setPlanets] = useState<Planet[]>(dataPlanets);
  const [selectedImg, setSelectedImg] = useState<string>(slot);
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>();
  const [days, setDays] = useState<number[]>([]);
  const [positionTransport, setPositionTransport] = useState<PositionTransport>({x: 0, y: 0});
  const [allPaths, setAllPaths] = useState([]);
  const [previousPlanet, setPreviousPlanet] = useState<Planet[] | null>(null);
  const [userRouteLength, setUserRouteLength] = useState(0);
  const [minRoute, setMinRoute] = useState<number>()
  const [visibleErrorCard, setVisibleErrorCard] = useState<Boolean>(false)
  const [visibleFinishCard, setVisibleFinishCard]=useState<Boolean>(false)
  const transportRef = useRef<HTMLElement>();
  const canvasRef = useRef<HTMLElement>();
  const planetRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];


  const generateRandomDays=(max:number, min:number)=>{
    return Math.floor(Math.random()*(max-min)+min)
  }

  function buyTransport(transport: Transport){
    if (selectedImg !== slot) return
    const balance = mainParameters[0].value;
    if (balance>0 && transport.active){
      transport.active=false;
      setSelectedImg(transport.img)
      setSelectedTransport(transport)
      mainParameters[0].value=balance-transport.cost;
    }
  }


  useEffect(() => {
    setDays(Array.from({length: 6}, ()=>
      generateRandomDays(1,6)
    ))
  }, []);

  function changeSelectedTransportNumPerson  (operator: string) {
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
    if (days.length>0){
      const paths=[
        [days[0], days[1]+days[3], days[2]+days[4], days[2]+days[5]+days[3], days[1]+days[5]+days[4]],
        [days[1], days[0]+days[3], days[2]+days[5], days[0]+days[4]+days[5], days[2]+days[4]+days[3]],
        [days[2], days[0]+days[4], days[1]+days[5], days[0]+days[3]+days[5], days[1]+days[3]+days[4]],
        [days[3], days[5]+days[4]],
        [days[5], days[3]+days[4]],
        [days[3], days[4]+days[5]],
        [days[4], days[3]+days[5]],
        [days[5], days[4]+days[3]],
        [days[4], days[5]+days[3]]
      ]
      setAllPaths(paths)
      planets[0].paths = paths[0];
      planets[1].paths = paths[1];
      planets[2].paths = paths[2];
      planets[0].pathsPlanet2 = paths[3];
      planets[0].pathsPlanet3 = paths[4];
      planets[1].pathsPlanet1 = paths[5];
      planets[1].pathsPlanet3 = paths[6];
      planets[2].pathsPlanet1 = paths[7];
      planets[2].pathsPlanet2 = paths[8];
    }
  }, [days]);
  console.log(allPaths);

  function sendTransport(event: React.MouseEvent, planet: Planet){
    const notify = () => toast.error('Заполните корабль полностью');
    if (!positionTransport) return;

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
            countPerson: p.countPerson -  Math.min(p.countPerson, selectedTransport.numPerson)
          }
        }
        return p;
      })
      setPlanets(updatePlanets)
      setSelectedTransport(prev=>({
        ...prev,
        numPerson: selectedTransport?.numPerson-Math.min(selectedTransport?.numPerson, planet.countPerson),
        currentPlanetId: planet.id
      }))
      mainParameters[2].value = mainParameters[2].value - Math.min(selectedTransport?.numPerson, planet.countPerson)
    }
    const transportCoord = transportRef.current?.getBoundingClientRect()
    const x = event.target.x-  transportRef.current.getBoundingClientRect().x + transportCoord.width/2;
    const y = event.target.y-  transportRef.current.getBoundingClientRect().y + transportCoord.height/2;
    transportRef.current.style.transform = `translate(${x}px, ${y}px)`;
    transportRef.current.style.transition = `1.5s`;
  }

  useEffect(() => {
    if (selectedTransport?.numPerson === 0 && selectedTransport.currentPlanetId !== null){
      setTimeout(()=>{
        transportRef.current.style.transform = `translate(0px, 0px)`
        setTimeout(()=>{
          setSelectedTransport(null);
          setSelectedImg(slot);
          setSelectedPlanet(null)
        }, 2000)
      }, 1000)
    }
  }, [selectedTransport?.numPerson]);

  useEffect(() => {
    setPositionTransport({x: transportRef.current.getBoundingClientRect().x, y: transportRef.current.getBoundingClientRect().y})
  }, [transportRef]);
  console.log(days);


  function calcUserRouteLength  ()  {
    if (previousPlanet) {
      const pathsProperty = `pathsPlanet${selectedPlanet?.id}`;
      if (pathsProperty in previousPlanet) {
        if (previousPlanet[pathsProperty].length > 0) {
          setUserRouteLength(userRouteLength + previousPlanet[pathsProperty][0])
        }
      }
    }
    else {
      if (selectedPlanet?.paths.length > 0) {
        setUserRouteLength(userRouteLength + selectedPlanet?.paths[0])
      }
    }
    setPreviousPlanet(selectedPlanet);
    mainParameters[1].value = userRouteLength
  };

  useEffect(() => {
    calcUserRouteLength();
  }, [selectedPlanet, selectedTransport]);


  function findNearestPlanet(planets: Planet[], currentPlanetId: number | null, allPlanets: Planet[]) {
    let minPath: number = Infinity;
    let nearestPlanet: Planet | null = null;
    let shortPath: number = 0;

    for (const planet of planets) {
      const pathLength = calcPathLength(planet, currentPlanetId, allPlanets);
      if (pathLength === null) continue;

      if (pathLength < minPath) {
        minPath = pathLength;
        nearestPlanet = planet;
        shortPath = pathLength;
      }
    }
    return nearestPlanet ? { nearestPlanet, shortPath } : null;
  }

  function calcPathLength(planet: Planet, currentPlanetId: number | null, allPlanets: Planet[]){
    if (!currentPlanetId) {
      const allPaths=planet.paths
      return Math.min(...allPaths)
    }
    const pathProperty = `pathsPlanet${planet.id}`;
    const paths = allPlanets[currentPlanetId - 1][pathProperty];
    return paths?.[0];
  }

  function generatePermutations(arr, permutation = [], used = [], callback) {
    if (permutation.length === arr.length) {
      callback(permutation);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!used[i]) {
        used[i] = true;
        permutation.push(arr[i]);
        generatePermutations(arr, permutation, used, callback);
        permutation.pop();
        used[i] = false;
      }
    }
  }

  async function processPermutations() {
    const results = [];
    const permutations: Transport[][] = [];

    generatePermutations(transports.slice(0, 3), [], [], (permutation) => {
      permutations.push([...permutation]);
    });

    for (const permutation of permutations) {
      const planetsCopy :Planet[] = dataPlanets.map(planet => ({ ...planet }));
      let totalSum = 0;

      for (const transport of permutation) {
        const transportCopy = { ...transport };
        let capacity = transportCopy.capacity;
        let currentPlanetId: number | null = null;
        let routeLength = 0;

        while (capacity > 0) {
          const availablePlanets = planetsCopy.filter(planet => planet.countPerson > 0);
          if (availablePlanets.length === 0) break;

          const nearest = findNearestPlanet(availablePlanets, currentPlanetId, planetsCopy);
          if (!nearest) break;

          const numPerson = Math.min(capacity, nearest.nearestPlanet.countPerson);
          nearest.nearestPlanet.countPerson -= numPerson;
          capacity -= numPerson;
          routeLength += nearest.shortPath;
          currentPlanetId = nearest.nearestPlanet.id;
        }

        totalSum += routeLength;
      }

      results.push({
        permutation: permutation.map(t => t.id),
        total: totalSum
      });
    }
    console.log(results);

    const minRoute = Math.min(...results.map(res => res.total))
    setMinRoute(minRoute)
    return minRoute
  }

  async function checkResult(){
    setVisibleErrorCard(userRouteLength !== await processPermutations())
    setVisibleFinishCard(userRouteLength === await processPermutations())
    console.log(await processPermutations());
  }

  console.log(minRoute);


  return (
    <div className={classes.container}>
      <ToastContainer />
      <GameCanvas
        canvasRef={canvasRef}
        transportRef={transportRef}
        planetRefs={planetRefs}
        days={days}
      />
      <MainParameters parameters={mainParameters} />

      <div className={classes.gameField}>
        <div className={classes.game}>
          {planets.map((planet, index) => (
            <Planet
              planetRef={planetRefs[index]}
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
      <Button bgColor="blue" type="type1v2" onClick={checkResult} className={classes.checkButton}>
        ПРОВЕРИТЬ
      </Button>
      <Button
        className={classes.backButton}
        bgColor="pink"
        type="type1v2"
        onClick={() => {
          localStorage.setItem('fromGame', 'true');
          navigate(RoutesEnum.LOGISTICS);
        }}
      >
        НАЗАД
      </Button>
      <GameResults
        showErrorCard={visibleErrorCard}
        showFinishCard={visibleFinishCard}
        closeErrorCard={()=>setVisibleErrorCard(false)}
        closeFinishCard={()=>setVisibleFinishCard(false)}
      />
    </div>
  );
};
