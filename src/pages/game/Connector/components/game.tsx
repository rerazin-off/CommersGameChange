import React, { useState, useMemo, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Card from "../../../../components/Card/Card";
import { Button } from "../../../../components/Button/Button";

import Connector from "./Connector";
import WireDragItem from "./WireDragItem";
import RebusPanel from "./RebusPanel";

import blue from "../assets/blue.svg";
import blueWhite from "../assets/blue-white.svg";
import brown from "../assets/brown.svg";
import brownWhite from "../assets/brown-white.svg";
import green from "../assets/green.svg";
import greenWhite from "../assets/green-white.svg";
import orange from "../assets/orange.svg";
import orangeWhite from "../assets/orange-white.svg";
import Custom from './Custom';
import { RoutesEnum } from '../../../../app/routes';

const WIRES = [
  { image: orangeWhite, color: "orangeWhite", targetPin: 0 },
  { image: orange, color: "orange", targetPin: 1 },
  { image: greenWhite, color: "greenWhite", targetPin: 2 },
  { image: blue, color: "blue", targetPin: 3 },
  { image: blueWhite, color: "blueWhite", targetPin: 4 },
  { image: green, color: "green", targetPin: 5 },
  { image: brownWhite, color: "brownWhite", targetPin: 6 },
  { image: brown, color: "brown", targetPin: 7 },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Компонент для уведомления через портал
const PortalNotification = ({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="notification-portal">
      <div className="notification-content">
        <span>{message}</span>
        <button className="notification-close" onClick={onClose}>&times;</button>
      </div>
    </div>,
    document.body
  );
};

function GameResult({ wrongResCard, rightResCard, closeW, closeR }: any) {
  const navigate = useNavigate();

  const handleSuccessClose = () => {
    closeR();
    navigate('/programmers');
  };

  return (
    <>
      <Card
        title="Поздравляем!"
        body="Сетевой кабель обжат правильно!"
        isOpen={rightResCard}
        onClose={handleSuccessClose}
        type="gameOver"
        game="programmers"
        backLink="programmers"
      />

      <Card
        title="Увы..."
        body="Распиновка проводов неверная. Попробуйте еще раз."
        isOpen={wrongResCard}
        onClose={closeW}
        type="secondRound"
        game="network"
        error
      />
    </>
  );
}

export default function Game() {
  const [connections, setConnections] = useState<{ [pinIndex: number]: number }>({});
  const [solved, setSolved] = useState(Array(WIRES.length).fill(false));
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [shuffledWires] = useState(() => shuffleArray(WIRES));
  const navigate = useNavigate();

  const allPinsFilled = useMemo(
    () => Object.keys(connections).length === WIRES.length,
    [connections]
  );

  const allRebusesSolved = useMemo(
    () => solved.every(isSolved => isSolved),
    [solved]
  );

  const handleWireConnect = (wireIndex: number, pinIndex: number) => {
    // Проверяем, решены ли все ребусы
    if (!allRebusesSolved) {
      setShowNotification(true);
      return;
    }

    setConnections(prev => {
      const newConnections = { ...prev };

      // Удаляем провод из предыдущего пина (если был)
      Object.keys(newConnections).forEach(key => {
        const existingPin = parseInt(key);
        if (newConnections[existingPin] === wireIndex) {
          delete newConnections[existingPin];
        }
      });

      // Подключаем к новому пину
      newConnections[pinIndex] = wireIndex;
      return newConnections;
    });
  };

  const checkConnections = () => {
    if (!allPinsFilled) return;

    const correct = WIRES.every((w, i) => connections[i] === w.targetPin);

    correct ? setShowSuccess(true) : setShowError(true);
  };

  const handleSolve = (i: number) => {
    setSolved(prev => {
      const arr = [...prev];
      arr[i] = true;
      return arr;
    });
  };

  const handleWireDragStart = () => {
    if (!allRebusesSolved) {
      setShowNotification(true);
    }
  };


  return (
    <>
      {/* Уведомление через портал - будет поверх всего */}
      {showNotification && (
        <PortalNotification
          message="Сначала решите все ребусы!"
          onClose={() => setShowNotification(false)}
        />
      )}

      <GameResult
        wrongResCard={showError}
        rightResCard={showSuccess}
        closeW={() => setShowError(false)}
        closeR={() => setShowSuccess(false)}
      />

      <DndProvider backend={TouchBackend} options={{
        enableMouseEvents: true,
        enableKeyboardEvents: true
      }}>
        <Custom></Custom>
        <div className="game-wrapper">
          <div className="top-section">
            <RebusPanel
              solved={solved}
              onSolve={handleSolve}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          </div>

          <div className="bottom-section">
            <div className="connector-wires-container">
              <div className="left-column">
                <Connector
                  wires={WIRES}
                  connections={connections}
                  onWireConnect={handleWireConnect}
                  wiresDisabled={!allRebusesSolved}
                />
              </div>

              <div className="middle-column">
                <div className="wires-list">
                  {shuffledWires.map((wire, index) => {
                    const originalIndex = WIRES.findIndex(
                      w => w.color === wire.color && w.targetPin === wire.targetPin
                    );

                    return (
                      <WireDragItem
                        key={index}
                        wireIndex={originalIndex}
                        image={wire.image}
                        isDisabled={!allRebusesSolved}
                        onDragStart={handleWireDragStart}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопка "Проверить" - показываем только если все ребусы решены И все пины заполнены */}
          {allRebusesSolved && allPinsFilled && (
            <div className="game-check-btn">
              <Button type="type1v2" bgColor="blue" onClick={checkConnections}>
                ПРОВЕРИТЬ
              </Button>
            </div>
          )}

          <div className='backButton'>
            <Button
              bgColor="pink"
              type="type1v2"
              onClick={() => navigate(RoutesEnum.PROGRAMMERS)}
            >
              НАЗАД
            </Button>
          </div>

        </div>
      </DndProvider>
    </>
  );
}