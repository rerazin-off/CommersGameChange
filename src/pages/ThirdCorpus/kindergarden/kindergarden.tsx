import classes from '../kindergarden/kindergarden.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import IconFon from '../../../assets/img/fon_kindergarten.png';


export const Kidergarden = () => {



  return (
    <div className={classes.kindergarden}>
      <img src={IconFon} alt="" className={classes.fon_kindergarden} />
      <div className={classes.gid_kidergarden}>
        <Assistant></Assistant>
      </div>
    </div>
  );
};