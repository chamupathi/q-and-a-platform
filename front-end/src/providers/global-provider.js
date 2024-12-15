import React, { createContext, useContext, useState, useEffect } from 'react';
import useTags from '../hooks/useTags';
import useProperties from '../hooks/useProperties';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { data: tags } = useTags();
  const { data: properties } = useProperties();

  return (
    <GlobalContext.Provider value={{ tags, properties }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
