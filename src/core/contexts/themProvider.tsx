import { Context, createContext, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react';

type themeType = 'white' | 'dark';

const nameThemeApiDocs: string = 'theme';
const themeName: string = localStorage.getItem(nameThemeApiDocs) || 'dark';

const initialStateTheme: themeType = themeName === 'dark' ? 'dark' : 'white';

type themeContextType = {
  theme: themeType;
  toggleTheme: () => void;
};

export const ThemeContext: Context<themeContextType> = createContext({} as themeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [theme, setTheme] = useState<themeType>(initialStateTheme);

  const toggleTheme = useCallback((): void => {
    if (theme === 'dark') {
      localStorage.setItem(nameThemeApiDocs, 'white');
      setTheme('white');
    } else {
      localStorage.setItem(nameThemeApiDocs, 'dark');
      setTheme('dark');
    }
  }, [theme]);

  const value: themeContextType = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
