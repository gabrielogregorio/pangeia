import { Context, createContext, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react';

type modeType = 'dev' | 'product';

const nameMode = 'mode';
const modeName = localStorage.getItem(nameMode) || 'product';

const initialStateMode: modeType = modeName === 'product' ? 'product' : 'dev';

type modeContextType = {
  mode: modeType;
  toggleMode: () => void;
};

export const ModeContext: Context<modeContextType> = createContext({} as modeContextType);

export const ModeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [mode, setMode] = useState<modeType>(initialStateMode);

  const toggleMode = useCallback((): void => {
    if (mode === 'product') {
      localStorage.setItem(nameMode, 'dev');
      setMode('dev');
    } else {
      localStorage.setItem(nameMode, 'product');
      setMode('product');
    }
  }, [mode]);

  const value: modeContextType = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
