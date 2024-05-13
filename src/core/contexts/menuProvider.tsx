import {
  Context,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

type menuContextType = {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleMenuIsOpen: () => void;
};

export const MenuContext: Context<menuContextType> = createContext({} as menuContextType);

export const MenuProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const toggleMenuIsOpen = useCallback((): void => {
    setMenuIsOpen((prev: boolean) => !prev);
  }, []);

  const value: menuContextType = useMemo(
    () => ({ menuIsOpen, setMenuIsOpen, toggleMenuIsOpen }),
    [menuIsOpen, toggleMenuIsOpen],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
