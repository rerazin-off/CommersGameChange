import React, { useEffect, useState } from 'react';
import classes from './ItemsList.module.scss';

import item1 from '../../../../assets/img/game_assets/musicalgame-categories/item1.svg';
import item2 from '../../../../assets/img/game_assets/musicalgame-categories/item2.svg';
import item3 from '../../../../assets/img/game_assets/musicalgame-categories/item3.svg';
import item4 from '../../../../assets/img/game_assets/musicalgame-categories/item4.svg';
import item5 from '../../../../assets/img/game_assets/musicalgame-categories/item5.svg';
import item6 from '../../../../assets/img/game_assets/musicalgame-categories/item6.svg';
import item7 from '../../../../assets/img/game_assets/musicalgame-categories/item7.svg';
import item8 from '../../../../assets/img/game_assets/musicalgame-categories/item8.svg';
import item9 from '../../../../assets/img/game_assets/musicalgame-categories/item9.svg';
import item10 from '../../../../assets/img/game_assets/musicalgame-categories/item10.svg';
import item11 from '../../../../assets/img/game_assets/musicalgame-categories/item11.svg';
import item12 from '../../../../assets/img/game_assets/musicalgame-categories/item12.svg';

type ItemType = {
  id: number;
  url: string;
  position: {left, top}
};

type Position = {
  top: string;
  left: string;
};

type AreaPositions = {
  [key: number]: Position;
};

const itemArr: ItemType[] = [
    {id: 1, url: item1, position: {left: '0px', top: '0px'}},
    {id: 2, url: item2, position: {left: '0px', top: '0px'}},
    {id: 3, url: item3, position: {left: '0px', top: '0px'}},
    {id: 4, url: item4, position: {left: '0px', top: '0px'}},
    {id: 5, url: item5, position: {left: '0px', top: '0px'}},
    {id: 6, url: item6, position: {left: '0px', top: '0px'}},
    {id: 7, url: item7, position: {left: '0px', top: '0px'}},
    {id: 8, url: item8, position: {left: '0px', top: '0px'}},
    {id: 9, url: item9, position: {left: '0px', top: '0px'}},
    {id: 10, url: item10, position: {left: '0px', top: '0px'}},
    {id: 11, url: item11, position: {left: '0px', top: '0px'}},
    {id: 12, url: item12, position: {left: '0px', top: '0px'}},
]

import Item from './Item.tsx'
import Container from './Container.tsx';
import CustomDragPreview from './CustomDragPreview.tsx';
import { GameResult } from './GameResult.tsx';
import { Button } from '../../../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../../app/routes';

export default function ItemsList(){
    const shuffleArray = (array: ItemType[]): ItemType[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };
    const navigate = useNavigate()
    const [dropItem, setDropItem] = useState(shuffleArray(itemArr))
    const [errorCardVisability, setErrorCardV] = useState<Boolean>(false);
    const [correctCardVisability, setCorrectCardV] = useState<Boolean>(false);

    const [areas, setAreas] = useState({
        1:[],
        2:[],
        3:[],
        4:[]
    })

    const areaPositions:AreaPositions = {
        1:{top:'9vh', left: '24vh'},
        2:{top: '9vh', left: '98vh'},
        3:{top: '55vh', left: '7vh'},
        4:{top: '55vh', left: '81vh'}
    }

    const answers = {
        1:[{id: 9}, {id:10}, {id:12}],
        2:[{id: 1}, {id:5}, {id:7}],
        3:[{id: 2}, {id:4}, {id:6}],
        4:[{id: 3}, {id:8}, {id:11}]
    }

    const addItem = (droppedItem, areaID, position) => {
    const newPosition = position;
    console.log(droppedItem.position)

    const isInAnyArea = Object.values(areas).some(area => 
        area.some(el => el.id === droppedItem.id)
    );

    if (!isInAnyArea) {
        setDropItem(prev => prev.filter(el => el.id !== droppedItem.id));
    }

    setAreas(prev => ({
        ...prev,
        [areaID]: prev[areaID].some(el => el.id === droppedItem.id)
            ? prev[areaID].map(el => 
                el.id === droppedItem.id ? { ...el, position: newPosition } : el
              )
            : [...prev[areaID], { ...droppedItem, position: newPosition }]
    }));

    Object.keys(areas).forEach(key => {
        if (key !== areaID.toString()) {
            setAreas(prev => ({
                ...prev,
                [key]: prev[key].filter(el => el.id !== droppedItem.id)
            }));
        }
    });
};

    const checkResults = () => {
        let answersID = [];
        let usersID = [];
        for (const key in answers) {
            answersID.push(answers[key].map(item => item.id).sort());
            usersID.push(areas[key].map(item => item.id).sort());
        }

        if (JSON.stringify(answersID) === JSON.stringify(usersID)) {
            setCorrectCardV(true)
        } else {
             setErrorCardV(true)
        }
    }

    return(
        <div>
            <Button bgColor="blue" type="type1v2" onClick={checkResults} className={dropItem.length===0 ? classes.checkButtonD : classes.checkButton}>ПРОВЕРИТЬ</Button>

            <Button className={classes.backButton} bgColor="pink" type="type1v2" 
                onClick={() => {
                    localStorage.setItem('fromGame', 'true');
                    navigate(RoutesEnum.MUSIC);
                }}>НАЗАД</Button>

            <CustomDragPreview/>
            <div className={classes.currentItem}>
                <div className={classes.whiteSpace} style={{opacity: dropItem.length===0 ? '0' : '1'}}>
                    <Item url={dropItem[0]?.url} id={dropItem[0]?.id} key={dropItem[0]?.id} positions={{top: '50px', left: '70px'}}/>
                </div>
            </div>

            <div className={classes.Boards}>
                <Container key = {1} areaID={1} items={areas[1]} onDrop={addItem} position={areaPositions[1]}/>
                <Container key = {2} areaID={2} items={areas[2]} onDrop={addItem} position={areaPositions[2]}/>
                <Container key = {3} areaID={3} items={areas[3]} onDrop={addItem} position={areaPositions[3]}/>
                <Container key = {4} areaID={4} items={areas[4]} onDrop={addItem} position={areaPositions[4]}/>
            </div>

            <GameResult wrongResCard={errorCardVisability} rightResCard={correctCardVisability} closeW={()=>setErrorCardV(false)} closeR={()=>setCorrectCardV(false)}/>
        </div>
    )
}