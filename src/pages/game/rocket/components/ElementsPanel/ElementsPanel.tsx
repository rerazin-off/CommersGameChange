import DraggebleEl from '../DraggebleEl/DraggebleEl';
import classes from '../../Rocket.module.scss'

const ElementsPanel = ({elements, onMoveElements}) => {
  return (
    <div className={classes.rocketElements}>
      {elements[0]?.el.map(el => (
        <DraggebleEl
          key={el.id}
          src={el.src}
          id={el.id}
          moveElement={onMoveElements}
        />
      ))}
    </div>
  );
};

export default ElementsPanel;