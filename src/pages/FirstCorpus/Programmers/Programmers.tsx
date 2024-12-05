import classes from './Programmers.module.scss'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Card from '../../../components/card/Card';

export const Programmers: React.FC = () => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const handleCompClick = () => setActiveTask('compTask');
  const handleRobotClick = () => setActiveTask('robotTask');
  const handleCloseTask = () => setActiveTask(null);

  return (
    <div className={classes.progs}>
        <div className={classes.container}>
          <div className={classes.comp} onClick={handleCompClick}></div>
          <div className={classes.robot} onClick={handleRobotClick}></div>
        </div>
        {activeTask && (
          <Card post={back:'handleCloseTask',title:'ПЕНСИОННЫЙ ФОНД', body:'В этой игре вы  почувствуете себя сотрудником пенсионного фонда. Перед вами будут предложены ситуации, вам необходимо принять верное решение и набрать как можно больше баллов!'}/>
        )}
    </div>
  );
};
