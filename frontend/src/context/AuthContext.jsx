import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // your login code
  };

  const registerUser = async (name, email, password) => {
    // your register code
  };

  const logout = async () => {
    // your logout code
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, registerUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
