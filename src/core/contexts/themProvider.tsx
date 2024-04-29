import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';

type themeType = 'white' | 'dark';

const nameThemeApiDocs: string = 'themeApiyggdrasil';
const themeApiyggdrasil: string = localStorage.getItem(nameThemeApiDocs) || 'dark';

const initialStateTheme: themeType = themeApiyggdrasil === 'dark' ? 'dark' : 'white';

type themeContextType = {
  theme: themeType;
  toggleTheme: () => void;
};

export const ThemeContext: Context<themeContextType> = createContext({} as themeContextType);

export const ThemeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [theme, setTheme] = useState<themeType>(initialStateTheme);

  const toggleTheme = (): void => {
    if (theme === 'dark') {
      localStorage.setItem(nameThemeApiDocs, 'white');
      setTheme('white');
    } else {
      localStorage.setItem(nameThemeApiDocs, 'dark');
      setTheme('dark');
    }
  };

  const value: themeContextType = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
