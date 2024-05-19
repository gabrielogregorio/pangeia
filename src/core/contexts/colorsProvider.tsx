import { colors } from '@/contexts/colors';
import { Context, createContext, ReactElement, ReactNode, useMemo, useState } from 'react';

export type colorsType = keyof typeof colors;

// eslint-disable-next-line react-refresh/only-export-components
export const colorKeys = Object.keys(colors) as colorsType[];

const keyStorage = 'colors';
const potentialColor = localStorage.getItem(keyStorage) as colorsType;

const realColor: colorsType = colorKeys.includes(potentialColor) ? potentialColor : 'teal';

const theme = colors[realColor];

for (const [key, value] of Object.entries(theme)) {
  document.documentElement.style.setProperty(key, value);
}

type ColorsContextType = {
  colors: typeof colors;
  colorSelected: {
    '--primary-color-50': string;
    '--primary-color-100': string;
    '--primary-color-200': string;
    '--primary-color-300': string;
    '--primary-color-400': string;
    '--primary-color-500': string;
    '--primary-color-600': string;
    '--primary-color-700': string;
  };
  updateToColor: (ColorsLocal: colorsType) => void;
};

export const ColorsContext: Context<ColorsContextType> = createContext({} as ColorsContextType);

export const ColorsProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [colorSelectedName, setColorSelected] = useState<colorsType>(realColor);

  const updateToColor = (ColorsLocal: colorsType) => {
    localStorage.setItem(keyStorage, ColorsLocal);
    setColorSelected(ColorsLocal);

    const colorSelected = colors[ColorsLocal];

    for (const [key, value] of Object.entries(colorSelected)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  const colorSelected = colors[colorSelectedName];
  const value: ColorsContextType = useMemo(() => ({ colors, updateToColor, colorSelected }), []);

  return <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>;
};
