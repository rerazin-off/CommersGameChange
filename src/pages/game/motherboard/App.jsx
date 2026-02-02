import React, { useState } from 'react';

function GameContainer() {
  const [gameUrl, setGameUrl] = useState('');

  return (
    <div>
      {/* Ссылка для открытия игры */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setGameUrl('http://cosmos.sfera.local/game-path');
        }}
        className="end"
      >
        Открыть игру
      </a>

      {/* Контейнер для игры */}
      {gameUrl && (
        <div style={{ marginTop: '20px' }}>
          <iframe
            src={gameUrl}
            title="Игра"
            width="100%"
            height="600px"
            frameBorder="0"
          />
        </div>
      )}
    </div>
  );
}