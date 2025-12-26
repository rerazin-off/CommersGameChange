import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import './Xylophone.scss';
import XylophoneGame from './components/XylophoneGame'

export default function Xylophone() {
  return (
    <DndProvider backend = {TouchBackend}>
      <div className="root">
        <div className="game-background">
          <XylophoneGame />
        </div>
      </div>
    </DndProvider>
  )
}