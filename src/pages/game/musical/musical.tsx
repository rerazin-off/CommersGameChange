import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import classes from './musical.module.scss';
import ItemsList from './components/ItemsList';

export function Musical() {
  return (
    <DndProvider backend={TouchBackend}>
      <div className={classes.mainBG}>
        <ItemsList/>
      </div>
    </DndProvider>
  )
}
