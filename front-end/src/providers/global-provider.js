import React, { createContext, useContext } from 'react';
import useTags from '../hooks/useTags';
import useProperties from '../hooks/useProperties';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { data: tags, fetchData: fetchTags } = useTags();
  const { data: properties } = useProperties();

  return (
    <GlobalContext.Provider value={{ tags, properties, fetchTags }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
