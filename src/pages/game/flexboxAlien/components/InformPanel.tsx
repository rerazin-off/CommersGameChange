import CodeSandbox from './CodeSandbox';
import classes from '../flexboxAlien.module.scss';
import { Command } from '../Data';
import { ChangeEvent } from 'react';
import { CommandType, InformPanelProps } from '../Interfeces';

const InformPanel = ({ selectedValues, onSelectChange, currentLevel, switchNextLevel, disabledBtn}: InformPanelProps) => {
  const commands = currentLevel.code.map(id =>
    Command.find(cmd => cmd.id === id)
  );

  return (
    <div className={classes.informPanel}>
      <h1>css-галактика</h1>
      {currentLevel.instruction}
      <CodeSandbox
        switchNextLevel={switchNextLevel}
        disabledBtn={disabledBtn}
      >
        <code>
          #item {'{'}
          <br />
          &nbsp;&nbsp;display: flex;
          <br />
          {commands.map((el: CommandType) => (
            <p key={el.id}>
              &nbsp;&nbsp;{el.name}:&nbsp;
              <select
                value={selectedValues[el.id] || ''}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelectChange(el.id, e.target.value)}>
                <option value="">Выберите значение</option>

                {el.options.map((option: string, index: number) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              ;
            </p>
          ))}
          {'}'}
        </code>
      </CodeSandbox>
    </div>
  );
};

export default InformPanel;