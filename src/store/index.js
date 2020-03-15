import React, { createContext, useContext, useReducer } from 'react'

import { initialState, reducer } from './reducer'

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const contextValue = useContext(StoreContext);
  return contextValue;
};
