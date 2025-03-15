import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("Authorization")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("Authorization");
      setToken(newToken);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (newToken) => {
    localStorage.setItem("Authorization", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
