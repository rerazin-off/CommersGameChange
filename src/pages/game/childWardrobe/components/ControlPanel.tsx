import React from 'react';
import classes from "../ChildWardrobe.module.scss";
import {TbArrowBadgeLeftFilled, TbArrowBadgeRightFilled} from "react-icons/tb";

const ControlPanel = ({prevRef, nextRef, activeWear, onSelect}) => {
    return (
        <div className={classes.panel}>
            <div className={classes.row}>
                <button ref={prevRef}>
                    <TbArrowBadgeLeftFilled color='#000' size={40}/>
                </button>
                {activeWear?.name}
                <button ref={nextRef}>
                    <TbArrowBadgeRightFilled color='#000' size={40}/>
                </button>
            </div>
            <button onClick={onSelect}>Выбрать</button>
        </div>
    );
};

export default ControlPanel;