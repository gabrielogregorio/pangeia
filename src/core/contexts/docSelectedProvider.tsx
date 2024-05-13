import { SchemaType } from '@/interfaces/api';
import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';

export type initialStateSelectedType = SchemaType | null;

const initialStateDocSelected: initialStateSelectedType = null;

type docSelectedContextType = {
  docSelected: initialStateSelectedType;
  setDocSelected: (docSelected: initialStateSelectedType) => void;
  resetDocSelected: () => void;
};

export const DocSelectedContext: Context<docSelectedContextType> = createContext({} as docSelectedContextType);

export const DocSelectedProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [docSelected, setDocSelected] = useState<initialStateSelectedType>(initialStateDocSelected);

  const resetDocSelected = (): void => {
    setDocSelected(initialStateDocSelected);
  };

  const value = useMemo(() => ({ docSelected, setDocSelected, resetDocSelected }), [docSelected]);

  return <DocSelectedContext.Provider value={value}>{children}</DocSelectedContext.Provider>;
};
