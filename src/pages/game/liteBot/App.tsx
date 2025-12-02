import {useRef, useState} from 'react';
import {IRefPhaserGame, PhaserGame} from './game/PhaserGame';
import { Game_Level1 } from './game/scenes/Game_Level1';
import Card from '../../../components/Card/Card';
import './style.css'

function App() {
    const [gameOver, setGameOver] = useState(false);
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const currentScene = (scene: Phaser.Scene) => {
        scene.events.on('game-over', () => {
            setGameOver(true);
        });
    }

    const handleCloseCard = () => {
        setGameOver(false);
    }

    const handleRestart = () => {
        setGameOver(false);
        if (phaserRef.current) {
            phaserRef.current.game?.scene.getScene('Game_Level5').scene.restart();
        }
    }

    return (
      <div id="app">
          <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <Card
              title={'Поздравляем!'}
              body={'Вы отлично справились с заданием!'}
              game="programmers"
              backLink="level5"
              type="gameOver"
              isOpen={gameOver}
              onClose={(handleCloseCard)}
            />
      </div>
    )
}

export default App