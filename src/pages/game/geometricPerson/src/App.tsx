import React from 'react';
import GeometricPersonGame from './components/GeometricPersonGame';
import classes from './App.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button/Button';
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
function App() {
  return (
    <div>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <GeometricPersonGame />
        <div className={classes.buttons}>
          <Link to={"/Psih"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
          <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;