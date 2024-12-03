import classes from "./BackButton.module.scss";
export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  disabled?: boolean;
};

export const BackButton = ({
                         onClick,
                         children,
                         color = "primary",
                         disabled,
                       }: ButtonProps) => {
  return (
    <div className={classes.button}>
      <button onClick={onClick} color={color} disabled={disabled} className={classes.btn}>
        {children}
      </button>
    </div>
  );
};