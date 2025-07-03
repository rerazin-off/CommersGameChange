import React from 'react';

const SelectedWear = ({clothes}) => {
    return (
        <>
            {clothes.map((item, index) => (
                <img
                    key={index}
                    src={item.img}
                    width={item.width}
                    style={{
                        position: 'absolute',
                        left: `${item.positions[1]}vh`,
                        top: `${item.positions[0]}vh`,
                        zIndex: `${item.zIndex}`
                    }}
                />
            ))}
        </>
    );
};

export default SelectedWear;