import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import classes from './musical.module.scss';
import ItemsList from './components/ItemsList';
import { Button } from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../app/routes';

export function Musical() {
  const navigate = useNavigate()
  return (
    <DndProvider backend={TouchBackend}>
      <div className={classes.mainBG}>
        <ItemsList/>
        <Button bgColor="blue" type="type1v2" className={classes.checkButton}>
        ПРОВЕРИТЬ
      </Button>
      <Button
        className={classes.backButton}
        bgColor="pink"
        type="type1v2"
        onClick={() => {
          localStorage.setItem('fromGame', 'true');
          navigate(RoutesEnum.MUSIC);
        }}
      >
        НАЗАД
      </Button>
      </div>
    </DndProvider>
  )
}
