import classes from './indicator.module.scss';
import indiano from '@/assets/img/indicator.svg';

interface IndicatorProps {
  onClick?: () => void;
}

export const Indicator = (props: IndicatorProps) => {
  const { onClick } = props;
  return (
    <div className={classes.indicator} onClick={onClick}>
      <img src={indiano} width={'30px'} height={'30px'} />
    </div>
  );
};

