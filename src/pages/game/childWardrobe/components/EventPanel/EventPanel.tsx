import { IoMdSunny } from "react-icons/io";
import { PiConfettiLight } from "react-icons/pi";
import classes from './EventPanel.module.scss'

const EventPanel = ({round}) => {
  console.log(round);
  return (
    <div className={classes.eventPanel}>
      <p>{round.nameEvent}</p>
      {round.nameEvent === 'Летняя прогулка' ? (
        <IoMdSunny size={40} color="#E9931A" />
      ) : (
        <PiConfettiLight size={24} color="#FF69B4" />
      )}
    </div>
  );
};

export default EventPanel;