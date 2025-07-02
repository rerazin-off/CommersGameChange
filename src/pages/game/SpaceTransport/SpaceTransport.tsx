import  { useEffect, useRef, useState } from 'react';
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
import { transports, mainParameters, dataPlanets, days} from './Data';
import { GameService } from './utils/gameUtils';
import {Transport, PositionTransport, PlanetT} from '../SpaceTransport/types'

import slot from '@/assets/img/game_assets/space-transport-img/slot.svg';

export const SpaceTransport: React.FC = () => {
  const navigate = useNavigate()
  const [planets, setPlanets] = useState<PlanetT[]>(dataPlanets);
  const [selectedImg, setSelectedImg] = useState<string>(slot);
  const [selectedTransport, setSelectedTransport] = useState<Transport | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetT | null>();
  const [positionTransport, setPositionTransport] = useState<PositionTransport>({x: 0, y: 0});
  const [previousPlanet, setPreviousPlanet] = useState<PlanetT[] | null>(null);
  const [userRouteLength, setUserRouteLength] = useState(0);
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

  function sendTransport(event: React.MouseEvent, planet: PlanetT){
    if (!positionTransport) return;

    const notifyPartialTransport = () => {
      const remaining = selectedTransport.numPerson - Math.min(
        selectedTransport.numPerson,
        planet.countPerson
      );
      toast(`Осталось человек на корабле: ${remaining}`);
    };


    if (selectedTransport.currentPlanetId === null) {
      if (selectedTransport.numPerson !== selectedTransport.capacity) {
        toast.error('Заполните транспорт полностью!');
        return;
      }
    }

    if (selectedTransport){
      const updatedPlanets = planets.map(p =>
        p.id === planet.id
          ? { ...p, countPerson: p.countPerson - Math.min(p.countPerson, selectedTransport.numPerson)}
          : p
      );

      setSelectedPlanet(planet)
      setPlanets(updatedPlanets)
      setSelectedTransport(prev=>({
        ...prev,
        numPerson: selectedTransport?.numPerson-Math.min(selectedTransport?.numPerson, planet.countPerson),
        currentPlanetId: planet.id
      }))
    }
    mainParameters[2].value = mainParameters[2].value - Math.min(selectedTransport?.numPerson, planet.countPerson)
    notifyPartialTransport()
    animateTransport(planet)
  }

  function animateTransport(planet: PlanetT){
    const transportRect = transportRef.current?.getBoundingClientRect()
    const planetRect = planetRefs[planet.id - 1].current?.getBoundingClientRect()
    const x = planetRect.x-positionTransport.x + transportRect.width/2;
    const y = planetRect.y-positionTransport.y + transportRect.height/2;
    transportRef.current.style.transform = `translate(${x}px, ${y}px)`;
    transportRef.current.style.transition = `1.5s`;
  }

  function calcUserRouteLength  ()  {
    let routeLength = 0
    if (previousPlanet) {
      const pathsProperty = `pathsPlanet${selectedPlanet?.id}`;
      if (pathsProperty in previousPlanet) {
        if (previousPlanet[pathsProperty].length > 0) {
          routeLength = previousPlanet[pathsProperty][0]
        }
      }
    }
    else {
      if (selectedPlanet?.paths.length > 0) {
        routeLength = selectedPlanet?.paths[0]
      }
    }
    setUserRouteLength(prev =>prev + routeLength)
    setPreviousPlanet(selectedPlanet);
    mainParameters[0].value -= routeLength * 10
    mainParameters[3].value += routeLength * 10
    mainParameters[1].value = userRouteLength
  };

  useEffect(() => {
    calcUserRouteLength();
  }, [selectedPlanet, selectedTransport]);


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

  useEffect(() => {
    setTimeout(()=>{
      setVisibleErrorCard(mainParameters[0].value<0)
    }, 3000)
  }, [mainParameters[0].value]);

  useEffect(() => {
    setTimeout(() => {
      const minRoute = GameService.processPermutations(transports, dataPlanets);
      setVisibleFinishCard(userRouteLength === minRoute && planets.every(p => p.countPerson === 0));
    }, 3000);
  }, [userRouteLength, planets]);


  return (
    <div className={classes.container}>
      <ToastContainer position='top-center'/>
      <GameCanvas
        canvasRef={canvasRef}
        transportRef={transportRef}
        planetRefs={planetRefs}
        days={days}
      />

      <div className={classes.gameField}>
        <div className={classes.row}>
          <MainParameters parameters={mainParameters} />
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
        closeErrorCard={() => setVisibleErrorCard(false)}
        closeFinishCard={() => setVisibleFinishCard(false)}
      />
    </div>
  );
};
