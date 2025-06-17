import { useDrag } from "react-dnd"
import { useState } from "react";

type DropResult = {
    element: HTMLElement
}

type ItemProps = {
    id: any, 
    url: any,
    positions: {left:string, top:string},
}

export default function Item({id, url, positions} : ItemProps){
    const [{isDragging}, dragRef] = useDrag(()=>({
        type: 'image',
        item: {id:id, url:url, position:positions},

        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            item.position = {top: `${dropResult.top}px`, left: `${dropResult.left}px`};
        },

        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <img  
            ref={dragRef}
            src={url}
            id={id}
            style={{ 
                opacity: isDragging ? 0.5 : 1,
            position: 'absolute',
            top:positions.top,
            left: positions.left,
            cursor: 'move'
        }} />
    )
}