import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';

interface IGlobalProviderProps {
  children: ReactNode;
}

interface IDefaultValues {
  token: string | null;
  refreshToken: string | null;
  updateToken(t?: string | null, rt?: string | null): void;
}

const dv: IDefaultValues = {
  token: null,
  refreshToken: null,
  updateToken: () => {}
};

const GlobalContext = createContext(dv);

export const GlobalConsumer = GlobalContext.Consumer;

export function GlobalProvider({ children }: IGlobalProviderProps) {
  const [token, setToken] = useState<string | null>(dv.token);
  const [refreshToken, setRefreshToken] = useState<string | null>(dv.refreshToken);
  
  const updateToken = useCallback((t?: string | null, rt?: string | null) => {
    if (t || typeof t !== 'undefined') setToken(t);
    if (rt || typeof rt !== 'undefined') setRefreshToken(rt);
  }, []);

  const memoizedValues = useMemo(
    () => ({
      token,
      refreshToken,
      updateToken
    }),
    [token, refreshToken, updateToken],
  );

  return (
    <GlobalContext.Provider value={memoizedValues}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
