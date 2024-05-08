import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';
import { SchemaType } from '@/interfaces/api';

type DataContextType = {
  setData: (data: SchemaType[]) => void;
  data: SchemaType[];
  isLoading: boolean;
  error: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const DataContext: Context<DataContextType> = createContext({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setSuites] = useState<SchemaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const setData = (dataLocal: SchemaType[]): void => {
    setSuites(dataLocal);
  };

  const value: DataContextType = useMemo(
    () => ({ setData, data, isLoading, error, setError, setIsLoading }),
    [data, error, isLoading],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
