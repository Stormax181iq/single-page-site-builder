import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  checkAuth: async () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export default AuthContext;
