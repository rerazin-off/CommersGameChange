import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import './Concert.scss';
import ConcertGame from './components/ConcertGame'


export default function Concert() {
  return (
    <DndProvider backend = {TouchBackend}>
      <div className="">
        <div className="game-back">
          <ConcertGame />
        </div>
      </div>
    </DndProvider>
  )
}