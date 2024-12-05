import classes from '../kindergarden/gid_kindergarden.module.scss';
import { Assistant } from '../../../components/Assistant/Assistant.tsx';
import { Button } from '../../../components/Button/Button';
import {Link} from 'react-router-dom';


export const Gid_kidergarden = () => {

  return (
    <div className={classes.kindergarden}>
      <div className={classes.gid_kidergarden}>
        <Assistant></Assistant>
      <div className={classes.button}>
        <div className={classes.arrow}>
         <Link to={'/3'}>
           <Button
             type='back_arrow'
             imageSrc='src/assets/img/buttons/white/back_arrow.svg'
             bgColor='white'
           />
         </Link>
        </div>
        <div className={classes.gallery}>
          <Button
            type="gallery"
            imageSrc="src/assets/img/buttons/white/Gallery.svg"
            bgColor="white"
          />
        </div>
      <div className={classes.meditation}>
        <Button
          type="meditation"
          imageSrc="src/assets/img/buttons/white/Gallery.svg"
          bgColor="white"
        />
      </div>
    </div>
</div>
</div>
)
  ;
};