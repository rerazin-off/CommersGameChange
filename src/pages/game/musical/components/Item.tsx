import { useDrag } from "react-dnd"
import { useState } from "react";

export default function Item({id, url}){
    const [positions, setPositions] = useState({});
    const [{isDragging}, dragRef] = useDrag(()=>({
        type: 'image',
        item: {id:id, url:url},
        // end: (item, monitor) => {
        //     if (!monitor.didDrop()) {
        //         const delta = monitor.getDifferenceFromInitialOffset()
        //         const newPosition = {
        //             left: positions[item.id]?.left + delta.x || delta.y,
        //             top: positions[item.id]?.top + delta.y||delta.x
        //         }
        //         setPositions(prev => ({...prev, [item.id]: newPosition}))
        //     }
        // },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }))

    return (
        <img  ref={dragRef} src={url} id={id} style={{ opacity: isDragging ? 0.5 : 1 }} />
    )
}