import classes from './CardEviences.module.scss';

const CardEvidences = ({ openCard, evidence, onClose }) => {
  if (!openCard || !evidence) return null;

  return (
    <div className={classes.evidenceCard}>
      <div className={classes.cornerTopRight}></div>
      <div className={classes.cornerBottomLeft}></div>
      <div className={classes.title}>
        <h1 style={{ color: '#23EAFA' }}>{evidence.name}</h1>
        <h3 onClick={onClose}>×</h3>
      </div>
      <div className={classes.description}>
        <p style={{width:'40%'}}>{evidence.type}</p>
        <div className={classes.evidenceBg}>
          <img src={evidence.image}/>
        </div>
      </div>
    </div>
  );
};

export default CardEvidences;