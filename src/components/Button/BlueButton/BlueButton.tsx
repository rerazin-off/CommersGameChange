import classes from "./ForwardButton.module.scss";

export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  disabled?: boolean;
};

export const BlueButton = ({
                                onClick,
                                children,
                                color = "primary",
                                disabled,
                              }: ButtonProps) => {
  return (
    <div className={classes.button}>
      <button onClick={onClick} color={color} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};