import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
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
};

type Position = {
  top: string;
  left: string;
};

type AreaPositions = {
  [key: number]: Position;
};

const itemArr: ItemType[] = [
    {id: 1, url: item1},
    {id: 2, url: item2},
    {id: 3, url: item3},
    {id: 4, url: item4},
    {id: 5, url: item5},
    {id: 6, url: item6},
    {id: 7, url: item7},
    {id: 8, url: item8},
    {id: 9, url: item9},
    {id: 10, url: item10},
    {id: 11, url: item11},
    {id: 12, url: item12},
]

import Item from './Item.tsx'
import Container from './Container.tsx';

export default function ItemsList(){
    const [dropItem, setDropItem] = useState(itemArr)
    const [areas, setAreas] = useState({
        1:[],
        2:[],
        3:[],
        4:[]
    })
    
    const areaPositions:AreaPositions = {
        1:{top:'10vh', left: '26vh'},
        2:{top: '10vh', left: '100vh'},
        3:{top: '56vh', left: '10vh'},
        4:{top: '56vh', left: '82vh'}
    }

    const addItem = (droppedItem, areaID) => {
        if (!areas[areaID].some(el=> el.id === droppedItem.id)) {
            setAreas(prev => ({
                ...prev,
                [areaID]: [...prev[areaID], droppedItem]
            }))
        }

        Object.keys(areas).forEach(key=>{
            if (key !== areaID.toString()) {
                setAreas(prev => ({
                    ...prev,
                    [key]: prev[key].filter(el => el.id !== droppedItem.id)
                }))
            }
        })
        setDropItem((prev) => prev.filter((el) => el.id !== droppedItem.id));
    };

    useEffect(()=>{
        console.log(areas)
    }, [areas])

    return(
        <div>
            <div className={classes.currentItem}>
                <div className={classes.whiteSpace}>
                    {dropItem.map((el)=>{
                        return <Item url={el.url} id={el.id} key={el.id}/>
                    })}
                </div>
            </div>

            <div className={classes.Boards}>
                <Container key = {1} areaID={1} items={areas[1]} onDrop={addItem} position={areaPositions[1]}/>
                <Container key = {2} areaID={2} items={areas[2]} onDrop={addItem} position={areaPositions[2]}/>
                <Container key = {3} areaID={3} items={areas[3]} onDrop={addItem} position={areaPositions[3]}/>
                <Container key = {4} areaID={4} items={areas[4]} onDrop={addItem} position={areaPositions[4]}/>
            </div>
        </div>
    )
}