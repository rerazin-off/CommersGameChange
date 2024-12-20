import React from 'react';
import classes from './gameRocket.module.scss';
interface DropAreaProps {
  setDroppedImage: (src: string) => void;
}
const DropArea: React.FC<DropAreaProps> = ({ setDroppedImage }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const imgSrc = e.dataTransfer.getData('text/plain');
    setDroppedImage(imgSrc);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  return (
    <div
      className={classes.dropArea}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
    </div>
  );
};

export default DropArea;
