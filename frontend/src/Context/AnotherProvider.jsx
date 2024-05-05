import React, { createContext, useState } from 'react';

export const AnotherContext = createContext();



const AnotherContextProvider = (props) => {
  
  const [isVisible, setIsVisible] = useState(false);
  
  const [data, setData] = useState({ name: '', phoneNumber: '', adress:'', surname:'' });

  const contextValue = {
    data,
    setData,
    isVisible,
    setIsVisible
  };

  return (
    <AnotherContext.Provider value={contextValue}>
      {props.children}
    </AnotherContext.Provider>
  );
};

export default AnotherContextProvider;
