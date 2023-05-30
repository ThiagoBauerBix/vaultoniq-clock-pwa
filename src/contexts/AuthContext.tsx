import { createContext, useEffect, useState } from "react";
import api from "../services/api";

type AuthContextType = {
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  refresh: () => Promise<unknown>;
  init: () => Promise<unknown>;
  isAuthenticated: boolean;
  loggedUser: UserType | null | unknown;
  accessToken: string | null;
  refreshToken: string | null;
};

type UserType = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  created_at: Date;
  updated_at: Date;
};

export const AuthContext = createContext<AuthContextType | any>({});

export const AuthProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [loggedUser, setLoggedUser] = useState<UserType | null | unknown>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const saveToStorage = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const clearStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken("");
    setRefreshToken("");
    setLoggedUser(null);

    clearStorage();

    api.defaults.headers.common.Authorization = null;
  };

  useEffect(() => {
    api.defaults.headers.common.Authorization = `Bearer ${
      accessToken || localStorage.getItem("accessToken")
    }`;
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        isAuthenticated,
        setIsAuthenticated,

        loggedUser,
        accessToken,
        refreshToken,
        saveToStorage,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
