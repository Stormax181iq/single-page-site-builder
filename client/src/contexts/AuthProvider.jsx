import { useCallback, useEffect, useState } from "react";
import authService from "../services/authService";
import AuthContext from "./AuthContext";

const DEFAULT_STATE = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(DEFAULT_STATE);

  const checkAuth = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      const response = await authService.checkAuth();
      const user = response.isAuthenticated ? response.user : null;

      setAuthState((prevState) => ({
        ...prevState,
        user,
        isAuthenticated: !!user,
        loading: false,
        error: null,
      }));
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async ({ username, password }) => {
      try {
        setAuthState((prev) => ({ ...prev, loading: true }));
        await authService.login({ username, password });
        await checkAuth();
      } catch (error) {
        handleError(error);
      }
    },
    [checkAuth]
  );

  const register = useCallback(
    async ({ username, password, passwordConfirm }) => {
      try {
        setAuthState((prev) => ({ ...prev, loading: true }));
        await authService.register({ username, password, passwordConfirm });
        await checkAuth();
      } catch (error) {
        handleError(error);
      }
    },
    [checkAuth]
  );

  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      await authService.logout();
      setAuthState({ ...DEFAULT_STATE, loading: false });
    } catch (error) {
      handleError(error);
    }
  }, []);

  const handleError = (error) => {
    console.error("Authentication error:", error);
    setAuthState((prevState) => ({
      ...prevState,
      error: error.message,
      loading: false,
      isAuthenticated: false,
      user: null,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, checkAuth, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
