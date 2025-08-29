import { createContext, useReducer, useContext, type ReactNode } from "react";

// Tipos
export interface User {
  id: string | number;
  name: string;
  email: string;
  token: string;
  balance: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  setBalance: (balance: number) => void;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

// Actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const SET_LOADING = "SET_LOADING";
const SET_BALANCE = "SET_BALANCE";

// Reducer
function authReducer(state: AuthState, action: any): AuthState {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload, loading: false };
    case LOGOUT:
      return { ...state, user: null, loading: false };
    case REGISTER:
      return { ...state, user: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_BALANCE:
      if (!state.user) return state;
      return { ...state, user: { ...state.user, balance: action.payload } };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login com mock API
  const login = async (email: string, password: string) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const { loginApi } = await import("../services/api");
      const user = await loginApi(email, password);
      dispatch({ type: LOGIN, payload: user });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      throw err;
    }
  };

  // Registro real com mock API
  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const { registerUser } = await import("../services/api");
      const user = await registerUser(name, email, password);
      dispatch({ type: REGISTER, payload: user });
    } catch (err) {
      dispatch({ type: SET_LOADING, payload: false });
      throw err;
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const setBalance = (balance: number) => {
    dispatch({ type: SET_BALANCE, payload: balance });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, setBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
