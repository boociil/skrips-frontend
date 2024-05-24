import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <AuthContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </AuthContext.Provider>
  );
};
