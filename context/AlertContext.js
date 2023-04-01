import { createContext, useState } from 'react';

export const AlertContext = createContext();
export const AlertContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertContext.Provider value={[open, setOpen]}>
      {children}
    </AlertContext.Provider>
  );
};
