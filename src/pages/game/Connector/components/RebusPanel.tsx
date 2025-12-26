import React, { useState } from "react";
import "./rebus.scss";
import cardImage from "../assets/fonRebus.webp";

interface RebusPanelProps {
  solved: boolean[];
  onSolve: (index: number) => void;
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
}

const rebuses = [
  {
    question: "Устройство для выхода в интернет по Wi-Fi",
    answer: "роутер",
    pinNumber: 1,
    pinLabel: "оранжево-белый"
  },
  {
    question: "Комплекс программ, обеспечивающий работу компьютера",
    answer: "операционная система",
    pinNumber: 2,
    pinLabel: "оранжевый"
  },
  {
    question: "Устройство для ввода звука в компьютер",
    answer: "микрофон",
    pinNumber: 3,
    pinLabel: "зелено-белый"
  },
  {
    question: "Защитная программа от вредоносного ПО",
    answer: "антивирус",
    pinNumber: 4,
    pinLabel: "синий"
  },
  {
    question: "Программа для создания презентаций от Microsoft",
    answer: "powerpoint",
    pinNumber: 5,
    pinLabel: "сине-белый"
  },
  {
    question: "Программа для создания таблиц и расчетов",
    answer: "excel",
    pinNumber: 6,
    pinLabel: "зелёный"
  },
  {
    question: "Chrome, Firefox или Edge - это...",
    answer: "браузер",
    pinNumber: 7,
    pinLabel: "коричнево-белый"
  },
  {
    question: "Что является мозгом компьютера?",
    answer: "процессор",
    pinNumber: 8,
    pinLabel: "коричневый"
  }
];

const RebusPanel: React.FC<RebusPanelProps> = ({
                                                 solved,
                                                 onSolve,
                                                 modalOpen,
                                                 setModalOpen,
                                               }) => {
  const [activeRebus, setActiveRebus] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Проверяем, все ли ребусы решены
  const allRebusesSolved = solved.every(isSolved => isSolved);

  const openRebus = (index: number) => {
    if (!solved[index]) {
      setActiveRebus(index);
      setInputValue("");
      setErrorMessage("");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setActiveRebus(null);
    setModalOpen(false);
    setErrorMessage("");
  };

  const submitAnswer = () => {
    if (activeRebus === null) return;

    if (inputValue.trim().toLowerCase() === rebuses[activeRebus].answer.toLowerCase()) {
      onSolve(activeRebus);
      closeModal();
    } else {
      setErrorMessage("Посмотри внимательно");
    }
  };

  return (
    <div className="rebus-panel">
      {/* Первый ряд: 4 карточки */}
      <div className="rebus-row">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`rebus-card ${solved[i] ? 'solved' : ''}`}
            onClick={() => openRebus(i)}
            style={{
              backgroundImage: `url(${cardImage})`,
            }}
          >
            {solved[i] ? (
              <>
                <div className="image-blur"></div>
                <div className="pin-text">
                  <div className="pin-number">PIN {rebuses[i].pinNumber}</div>
                  <div className="pin-label">{rebuses[i].pinLabel}</div>
                </div>
              </>
            ) : (
              <div className="unsolved-card"></div>
            )}
          </div>
        ))}
      </div>

      {/* Второй ряд: 4 карточки */}
      <div className="rebus-row">
        {[4, 5, 6, 7].map(i => (
          <div
            key={i}
            className={`rebus-card ${solved[i] ? 'solved' : ''}`}
            onClick={() => openRebus(i)}
            style={{
              backgroundImage: `url(${cardImage})`,
            }}
          >
            {solved[i] ? (
              <>
                <div className="image-blur"></div>
                <div className="pin-text">
                  <div className="pin-number">PIN {rebuses[i].pinNumber}</div>
                  <div className="pin-label">{rebuses[i].pinLabel}</div>
                </div>
              </>
            ) : (
              <div className="unsolved-card"></div>
            )}
          </div>
        ))}
      </div>

      {/* Индикатор прогресса */}
      <div className="rebus-progress">
        Разгадано: {solved.filter(Boolean).length} из {rebuses.length}
      </div>

      {activeRebus !== null && modalOpen && (
        <>
          <div className="blur-background" onClick={closeModal}></div>
          <div className="rebus-modal">
            <div className="rebus-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>&times;</button>
              <h2>{rebuses[activeRebus].question}</h2>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Введите ответ"
                className="rebus-input"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitAnswer();
                  }
                }}
              />
              <button className="solve-btn" onClick={submitAnswer}>Проверить</button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RebusPanel;