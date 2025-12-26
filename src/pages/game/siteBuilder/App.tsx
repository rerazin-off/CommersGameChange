import React from "react";

import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import Game from "./components/Game";
import classes from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';



const App: React.FC = () => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <Game />
      <div className={classes.buttons}>
        <Link to={"/Programmers"}><Button bgColor={'white'} type={"back_arrow"} /></Link>
        <Link to={"/"}><Button bgColor={'white'} type={"gallery"} /></Link>
        <Link to={"/psih"}><Button bgColor={'white'} type={"meditation"} /></Link>
      </div>
    </DndProvider>
  );
};

export default App;
