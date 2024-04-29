import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';
import { SchemaType } from '@/interfaces/api';

const initialStatedataSelected: SchemaType = { id: '' };

type dataSelectedContextType = {
  dataSelected: typeof initialStatedataSelected;
  setDataSelected: (dataSelected: SchemaType) => void;
  resetDataSelected: () => void;
};

export const dataSelectedContext: Context<dataSelectedContextType> = createContext({} as dataSelectedContextType);

export const DataSelectedProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [dataSelected, setDataSelected] = useState<typeof initialStatedataSelected>(initialStatedataSelected);

  const resetDataSelected = (): void => {
    setDataSelected(initialStatedataSelected);
  };

  const value = useMemo(() => ({ dataSelected, setDataSelected, resetDataSelected }), [dataSelected]);

  return <dataSelectedContext.Provider value={value}>{children}</dataSelectedContext.Provider>;
};
