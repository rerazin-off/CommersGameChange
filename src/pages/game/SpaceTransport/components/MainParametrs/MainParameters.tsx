import React from 'react';

const MainParameters = ({parameters}) => {
  return (
    <nav>
      {parameters.map(parameter => (
        <p key={parameter.name}>
          {parameter.name}: {parameter.value}
        </p>
      ))}
    </nav>
  );
};

export default MainParameters;