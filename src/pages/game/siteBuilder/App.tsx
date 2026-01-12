import React from "react";

import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import Game from "./components/Game";
import classes from './styles.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { RoutesEnum } from '../../../app/routes';



const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Game />
      <div className={classes.backButton}>
        <Button
          bgColor="pink"
          type="type1v2"
          onClick={() => {
            localStorage.setItem('fromGame', 'true');
            navigate(RoutesEnum.PROGRAMMERS)
          }}
        >
          НАЗАД
        </Button>
      </div>
    </DndProvider>
  );
};

export default App;
