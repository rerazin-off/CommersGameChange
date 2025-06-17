import React, { useState } from 'react';

const ImageCard = ({
    src,
    alt,
    draggable = false,
    onDragStart = () => { },
    onDrop = () => { },
    isMatched = false,
    style = {}
}) => {
    const handleDragOver = (e) => e.preventDefault();

    return (
        <div
            draggable={draggable}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={handleDragOver}
            style={{
                width: '100px',
                height: '100px',
                position: 'relative',
                margin: '10px',
                cursor: draggable ? 'grab' : 'default',
                opacity: isMatched ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    border: '2px solid #eee',

                }}
            />
           
        </div>
    );
};