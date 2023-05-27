import { useState, createContext, useContext } from 'react';

const LoadToggleButtonContext = createContext();

const LoadToggleButtonProvider = ({ children }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const toggleButton = () => {
    setIsButtonPressed(prevState => !prevState);
  }

  return (
    <LoadToggleButtonContext.Provider value={{ isButtonPressed, toggleButton }}>
      {children}
    </LoadToggleButtonContext.Provider>
  );
};

const useButtonContext = () => useContext(LoadToggleButtonContext);

export { LoadToggleButtonContext, LoadToggleButtonProvider, useButtonContext };