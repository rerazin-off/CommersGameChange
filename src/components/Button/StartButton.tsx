export type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: "primary" | "secondary";
  disabled?: boolean;
};

export const StartButton = ({
                         onClick,
                         children,
                         color = "primary",
                         disabled,
                       }: ButtonProps) => {
  return (
    <button onClick={onClick} color={color} disabled={disabled}>
      {children}
    </button>
  );
};