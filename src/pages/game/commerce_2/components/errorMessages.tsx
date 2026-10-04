import React from 'react';

interface Props {
  message: string | null;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 1001,
        textAlign: 'center',
        maxWidth: '80%',
        wordBreak: 'break-word',
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;