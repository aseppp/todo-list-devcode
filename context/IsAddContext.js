import { createContext, useState } from 'react';

export const IsAddContext = createContext();
export const IsAddContextProvider = ({ children }) => {
  const [isAdd, setIsAdd] = useState(true);

  return (
    <IsAddContext.Provider value={[isAdd, setIsAdd]}>
      {children}
    </IsAddContext.Provider>
  );
};
