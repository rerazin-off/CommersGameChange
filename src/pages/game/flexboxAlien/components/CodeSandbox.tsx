import classes from './CodeSandbox.module.scss';

const CodeSandbox = ({children, switchNextLevel, disabledBtn}) => {
  return (
    <div className={classes.codesandbox}>
      <div className={classes.countPanel}>
        {Array(10)
          .fill(0)
          .map((el, index) => (
            <p key={index}>{index + 1}</p>
          ))}
      </div>
      <div className={classes.editorArea}>
        {children}
        <button onClick={!disabledBtn ? switchNextLevel : ''} className={disabledBtn ? classes.disabled : ''}>Следующий</button>
      </div>
    </div>
  );
};

export default CodeSandbox;