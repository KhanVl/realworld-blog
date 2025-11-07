import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, setAuthToken } from "./api/client";
import { getCurrentUser, loginUser, registerUser, updateUser } from "./api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoadingAuth(false);
      return;
    }

    (async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (e) {
        console.error("Failed to load current user", e);
        setAuthToken(null);
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    })();
  }, []);

  const signUp = async ({ username, email, password }) => {
    const data = await registerUser({ username, email, password });
    const token = data.user.token;
    setAuthToken(token);
    setUser(data.user);
  };

  const signIn = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    const token = data.user.token;
    setAuthToken(token);
    setUser(data.user);
  };

  const signOut = () => {
    setAuthToken(null);
    setUser(null);
  };

   const updateProfile = async (payload) => {
    const data = await updateUser(payload);

    const newToken = data.user.token;
    if (newToken) {
      setAuthToken(newToken); 
    }

    setUser(data.user);
  };

  const value = {
    user,
    loadingAuth,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);