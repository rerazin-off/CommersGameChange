import classes1 from './MainParametrs.module.scss'
import classes from '../../SpaceTransport.module.scss'

const MainParameters = ({parameters}) => {
  return (
    <nav>
      {parameters.map(parameter => (
        <div  className={classes.slotParameters}>
          <img src={parameter.icon}/>
          <p key={parameter.name} className={classes1.backlight}>
            {parameter.name}: {parameter.value}
          </p>
        </div>
      ))}
    </nav>
  );
};

export default MainParameters;