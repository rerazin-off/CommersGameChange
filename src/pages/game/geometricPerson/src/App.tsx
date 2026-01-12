import GeometricPersonGame from './components/GeometricPersonGame';
import classes from './App.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Button/Button';
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <GeometricPersonGame />
        <div className={classes.backButton}>
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => {
              localStorage.setItem('fromGame', 'true');
              navigate('/Psih')
            }}
          >
            НАЗАД
          </Button>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;