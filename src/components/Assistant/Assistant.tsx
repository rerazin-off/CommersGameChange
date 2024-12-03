import classes from './Assistant.module.scss';
export type AssistantProps = {
  children?: React.ReactNode;
  color: "primary";
  disabled?: boolean;
};

export const Assistant = ({
                                children,
                                color = "primary",
                              }: AssistantProps) => {
  return (
    <div className={classes.assist}>
      <h2  color={color} className={classes.assist}>
        {children}
      </h2>
    </div>
  );
};