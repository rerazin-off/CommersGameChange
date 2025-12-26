import classes from '../CardEvidences/CardEviences.module.scss';

const ErrorCard = ({onClose, content, title, isOpen}) => {

    return (
        <>
            {isOpen && (
                <div className={`${classes.evidenceCard} ${classes.errorCard}`}>
                    <div className={`${classes.cornerTopRight} ${classes.cornerTopRightError}`}></div>
                    <div className={`${classes.cornerBottomLeft} ${classes.cornerBottomLeftError}`}></div>
                    <div className={classes.title}>
                        <h1 style={{color: 'red', width: '22vh'}}>{title}</h1>
                        <h3 onClick={onClose}>×</h3>
                    </div>
                    <p style={{color: '#fff', fontSize: '18px', fontFamily: 'Comfortaa'}}>{content}</p>
                </div>
            )
            }
        </>
    );
};

export default ErrorCard;