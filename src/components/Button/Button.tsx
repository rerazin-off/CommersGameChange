import { memo, ReactNode } from 'react';
import { classNames } from '../../helpers/classNames/classNames.tsx';
import classes from './Button.module.scss';

interface ButtonProps {
  className?: string;
  colorText?: string;
  bgColor: 'blue' | 'pink' | 'purple';
  type: 'type1'| 'type1v2' | 'type2' | 'marker';
  children?: ReactNode;
  imageSrc?: string;
  width?: number;
  height?: number;
  onClick?: string;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    colorText,
    type,
    bgColor,
    imageSrc,
    height,
    width,
    onClick,
  } = props;

  const isMarker = type === 'marker';

  return (
    <button
      onClick={handleCloseTask}
      className={classNames(
        classes.Button,
        { [classes.marker]: isMarker },
        [className, classes[type], classes[bgColor]]
      )}
      style={{
        color: colorText,
        width: isMarker ? undefined : width,
        height: isMarker ? undefined : height,
      }}

    >
      {isMarker ? (
        <>
          {imageSrc && (
            <div className={classes.item}>
              <img
                className={classNames(classes.icon, {}, [classes[bgColor]])}
                src={imageSrc}
                alt="marker-icon"
                width="48"
                height="48"
              />

              {children}
            </div>
          )}
        </>
      ) : (
        children
      )}
    </button>
  );
});

