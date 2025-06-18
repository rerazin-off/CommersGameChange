import React from 'react'
import Item from './Item.tsx'
import { useDrop } from 'react-dnd'
import { useRef } from 'react'

export default function Container({ areaID, items, onDrop, position }) {
    const containerRef = useRef(null)

    const [{isOver}, dropRef] = useDrop(() => ({
        accept: 'image',
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            const containerRect = containerRef.current.getBoundingClientRect();

            let top = (offset.y - containerRect.top);
            let left = (offset.x - containerRect.left);

            onDrop(item, areaID, {top, left});
            return {top, left, containerID: areaID}; 
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));
    

    const areaStyle = {
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: '60vh',
        height: '30vh',
    }

    return (
        <div ref={(node) => {dropRef(node); containerRef.current = node;}} style={areaStyle}>
             {items.map((el)=>(
                <Item 
                    url={el.url} 
                    id={el.id} 
                    key={el.id}
                    positions = {el.position}
                />
            ))}
        </div>
    );
}