import React, { useState } from 'react';

const Alert = () => {
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  return (
    <div>
      <button onClick={toggleAlert}>Mostrar alerta</button>
      {showAlert && (
        <div className="alert bg-red-500 text-white p-4 rounded-md opacity-0 animate-fade-in">
          ¡Esta es una alerta!
        </div>
      )}
    </div>
  );
};

export default Alert;