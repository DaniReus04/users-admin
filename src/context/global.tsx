import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

interface IGlobalProviderProps {
  children: ReactNode;
}

interface IDefaultValues {
  token: string | null;
  refreshToken: string | null;
  updateToken(t?: string | null, rt?: string | null): void;
  isLoadingToken: boolean;
}

const dv: IDefaultValues = {
  token: null,
  refreshToken: null,
  updateToken: () => {},
  isLoadingToken: true
};

const GlobalContext = createContext(dv);

export const GlobalConsumer = GlobalContext.Consumer;

export function GlobalProvider({ children }: IGlobalProviderProps) {
  const [token, setToken] = useState<string | null>(dv.token);
  const [refreshToken, setRefreshToken] = useState<string | null>(dv.refreshToken);
  const [isLoadingToken, setIsLoadingToken] = useState<boolean>(dv.isLoadingToken);
  
  const updateToken = useCallback((t?: string | null, rt?: string | null) => {
    if (typeof t === 'undefined' || typeof rt === 'undefined') return
    setIsLoadingToken(true);

    if (t) {
      localStorage.setItem('token', t);
      setToken(t);
    } else {
      localStorage.removeItem('token');
      setToken(dv.token)
    }

    if (rt) {
      localStorage.setItem('refreshToken', rt);
      setRefreshToken(t);
    } else {
      localStorage.removeItem('refreshToken');
      setRefreshToken(dv.refreshToken)
    }

    setIsLoadingToken(false);
  }, []);

  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
    const refreshTokenStorage = localStorage.getItem('refreshToken');

    if (!tokenStorage || !refreshTokenStorage) {
      setToken(dv.token);
      setRefreshToken(dv.refreshToken);
    } else {
      setToken(tokenStorage)
      setRefreshToken(refreshTokenStorage);
    }

    setIsLoadingToken(false);
  }, [])

  const memoizedValues = useMemo(
    () => ({
      token,
      refreshToken,
      updateToken,
      isLoadingToken
    }),
    [token, refreshToken, updateToken, isLoadingToken],
  );

  return (
    <GlobalContext.Provider value={memoizedValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
