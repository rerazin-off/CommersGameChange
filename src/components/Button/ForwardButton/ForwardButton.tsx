import classes from './ForwardButton.module.scss';
export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  style?: "type1" | "type2" | "type3";
  color: "pink | blue";
  disabled?: boolean;
};

export const ForwardButton = ({
                         onClick,
                         children,
                         color = "pink",
                         style = "type1",
                         disabled,
                       }: ButtonProps) => {
  return (
    <div className={classes.button}>
      <button onClick={onClick} color={color} style={style} disabled={disabled} className={classes.btn}>
        {children}
      </button>
    </div>
  );
};