import React, { createContext, useContext, useState } from 'react';

export const AnotherContext = createContext();

const AnotherContextProvider = (props) => {
  
  const [isVisible, setIsVisible] = useState(false);
  
  const [data, setData] = useState({ name: '', phoneNumber: '', address:'', surname:'', dataCart:'', cvv:'', cartNumber:'', email:'' });

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
