import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';

type modeType = 'dev' | 'product';

const nameMode = 'mode';
const modeApiyggdrasil = localStorage.getItem(nameMode) || 'product';

const initialStatemode: modeType = modeApiyggdrasil === 'product' ? 'product' : 'dev';

type modeContextType = {
  mode: modeType;
  togglemode: () => void;
};

export const ModeContext: Context<modeContextType> = createContext({} as modeContextType);

export const ModeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [mode, setmode] = useState<modeType>(initialStatemode);

  const togglemode = (): void => {
    if (mode === 'product') {
      localStorage.setItem(nameMode, 'dev');
      setmode('dev');
    } else {
      localStorage.setItem(nameMode, 'product');
      setmode('product');
    }
  };

  const value: modeContextType = useMemo(() => ({ mode, togglemode }), [mode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
