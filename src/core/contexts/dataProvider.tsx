import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';
import { SchemaType } from '@/interfaces/api';

type DataContextType = {
  setData: (data: SchemaType[]) => void;
  data: SchemaType[];
};

export const DataContext: Context<DataContextType> = createContext({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setSuites] = useState<SchemaType[]>([]);

  const setData = (dataLocal: SchemaType[]): void => {
    setSuites(dataLocal);
  };

  const value: DataContextType = useMemo(() => ({ setData, data }), [data]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
