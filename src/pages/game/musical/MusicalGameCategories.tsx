import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import './musical.module.scss';
import ItemsList from './components/ItemsList';

export default function MusicalGameCategories() {
  return (
    <DndProvider backend={TouchBackend}>
      <ItemsList/>
    </DndProvider>
  )
}
