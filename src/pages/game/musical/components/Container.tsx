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
            console.log(`offset`, offset)

            let top = 0;
            let left =0;

            const itemRect = monitor.getItem();

            if (JSON.stringify(itemRect.position) == JSON.stringify({top: '50px', left: '70px'})) {
                top = (offset.y - containerRect.top) +40;
                left = (offset.x - containerRect.left) +60;
                console.log('yep')
            } else {
                top = (offset.y - containerRect.top);
                left = (offset.x - containerRect.left);
            }

            const img = new Image();
            img.src = item.url;
            const imgWidth = img.width;
            const imgHeight = img.height;

            top = Math.max(0, Math.min(top, containerRect.height - imgHeight));
            left = Math.max(0, Math.min(left, containerRect.width - imgWidth));

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
        width: '65vh',
        height: '35vh',
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