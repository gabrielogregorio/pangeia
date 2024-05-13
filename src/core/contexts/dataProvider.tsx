import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';
import { responseApi } from '@/interfaces/api';

type DataContextType = {
  setData: (data: responseApi) => void;
  data: responseApi;
  isLoading: boolean;
  error: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const DataContext: Context<DataContextType> = createContext({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [data, setSuites] = useState<responseApi>({ schema: [], hierarchy: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const setData = (dataLocal: responseApi): void => {
    setSuites(dataLocal);
  };

  const value: DataContextType = useMemo(
    () => ({ setData, data, isLoading, error, setError, setIsLoading }),
    [data, error, isLoading],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
