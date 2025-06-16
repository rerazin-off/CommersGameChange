import React from 'react'
import {useState} from 'react'
import Item from './Item.tsx'
import { useDrop } from 'react-dnd'

export default function Container({areaID, items, onDrop, position}){
    const [{isOver}, dropRef] = useDrop(()=>({
        accept: 'image',
        drop: (item) => onDrop(item, areaID),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }))

    const areaStyle = {
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: '60vh',
        height: '33vh',
    }

    return(
        <div ref={dropRef} style={areaStyle}>
            {items.map((el)=>(
                <Item url={el.url} id={el.id} key={el.id}/>
            ))}
        </div>
    )
}