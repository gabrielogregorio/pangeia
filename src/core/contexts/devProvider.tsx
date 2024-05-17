import { ModeTypeEnum } from '@/contexts/types';
import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';

const nameMode = 'mode';
const modeName = (localStorage.getItem(nameMode) as ModeTypeEnum) || ModeTypeEnum.product;

const initialStateMode: ModeTypeEnum = modeName;

type modeContextType = {
  mode: ModeTypeEnum;
  updateTo: (modeLocal: ModeTypeEnum) => void;
};

export const ModeContext: Context<modeContextType> = createContext({} as modeContextType);

export const ModeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [mode, setMode] = useState<ModeTypeEnum>(initialStateMode);

  const updateTo = (modeLocal: ModeTypeEnum) => {
    localStorage.setItem(nameMode, modeLocal);
    setMode(modeLocal);
  };

  const value: modeContextType = useMemo(() => ({ mode, updateTo }), [mode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
