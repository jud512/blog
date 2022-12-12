import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import BlogApi from "../apis/BlogApi";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await BlogApi.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await BlogApi.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
