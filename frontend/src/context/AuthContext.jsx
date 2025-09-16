import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); 

  // Login without saving to localStorage
  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
