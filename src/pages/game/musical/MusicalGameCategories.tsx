import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import classes from './musical.module.scss';
import ItemsList from './components/ItemsList';

export default function MusicalGameCategories() {
  return (
    <DndProvider backend={TouchBackend}>
      <div className={classes.mainBG}>
        <ItemsList/>
      </div>
    </DndProvider>
  )
}
