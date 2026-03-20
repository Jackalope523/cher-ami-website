'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthInterface {
  loaded: boolean;
  getToken: () => string | null;
  updateToken: (token: string) => void;
  deleteToken: () => void;
  getOnboarded: () => boolean | null;
  updateOnboarded: (onboarded: boolean) => void;
}

const AuthContext = createContext<AuthInterface | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedOnboarded = localStorage.getItem('Onboarded') === 'true';

    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time initialization from localStorage
    setToken(storedOnboarded ? storedToken : null);
    setOnboarded(storedOnboarded);
    setLoaded(true);
  }, []);

  function getToken() {
    return token;
  }

  function updateToken(newToken: string) {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  }

  function deleteToken() {
    setToken(null);
    localStorage.removeItem('token');
  }

  function getOnboarded() {
    return onboarded;
  }

  function updateOnboarded(value: boolean) {
    setOnboarded(value);
    localStorage.setItem('Onboarded', value.toString());
  }

  return (
    <AuthContext.Provider
      value={{
        loaded,
        getToken,
        updateToken,
        deleteToken,
        getOnboarded,
        updateOnboarded,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
