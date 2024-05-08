import { SchemaType } from '@/interfaces/api';
import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';

export type initialStateSelectedType = SchemaType | null;

const initialStatedocSelected: initialStateSelectedType = null;

type docSelectedContextType = {
  docSelected: initialStateSelectedType;
  setDocSelected: (docSelected: initialStateSelectedType) => void;
  resetDocSelected: () => void;
};

export const docSelectedContext: Context<docSelectedContextType> = createContext({} as docSelectedContextType);

export const DocSelectedProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [docSelected, setDocSelected] = useState<initialStateSelectedType>(initialStatedocSelected);

  const resetDocSelected = (): void => {
    setDocSelected(initialStatedocSelected);
  };

  const value = useMemo(() => ({ docSelected, setDocSelected, resetDocSelected }), [docSelected]);

  return <docSelectedContext.Provider value={value}>{children}</docSelectedContext.Provider>;
};
