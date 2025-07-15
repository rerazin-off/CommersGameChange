import classes from './CardFairyTale.module.scss';
import { FaStar } from "react-icons/fa6";

const CardFairyTale = ({ title, type, countStar, image, onClick, isClosed }) => {
  return (
    <div className={classes.card}>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
      <div style={{display:'flex', gap:'1vh', flexDirection:'column', alignItems:'center'}}>
        <h1>{title}</h1>
        <p>{type}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5vh' }}>
          <p>Сложность:</p>
          {Array(countStar).fill(0).map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
        <button onClick={!isClosed ? onClick : undefined}>Расследовать</button>
      </div>
    </div>
  );
};

export default CardFairyTale;