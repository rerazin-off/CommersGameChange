import React from 'react';

const FormulaVariable = ({letter, explanation}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign:'start', marginBottom:'2vh'}}>
      <h2>{letter} </h2>
      <p> - {explanation}</p>
    </div>
  );
};

export default FormulaVariable;