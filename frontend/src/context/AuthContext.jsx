import { createContext, useState } from "react";
import api from "../api/api"; // Make sure this file exists as axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ================== LOGIN ==================
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password }); // Backend API call
      setUser(res.data.user); // Set login user only if credentials are valid
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  // ================== REGISTER ==================
  const registerUser = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      return { success: true, message: "Registered successfully" };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  };

  // ================== LOGOUT ==================
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
