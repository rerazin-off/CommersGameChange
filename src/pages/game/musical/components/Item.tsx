import { useDrag } from "react-dnd"
import { useState } from "react";

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
            console.log(dropResult)
            if (dropResult){
                item.position = {top: `${dropResult.top}`, left: `${dropResult.left}`};
            }
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
                opacity: isDragging ? 0 : 1,
            position: 'absolute',
            top:positions.top,
            left: positions.left,
            cursor: 'move',
        }} />
    )
}