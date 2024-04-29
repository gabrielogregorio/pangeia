import { ReactElement, ReactNode, useContext } from 'react';
import { ThemeContext } from '@/contexts/themProvider';

export const Container = ({ children }: { children: ReactNode }): ReactElement => {
  const { theme } = useContext(ThemeContext);

  return <div className={`w-full overflow-hidden ${theme === 'dark' ? 'dark' : ''} `}>{children}</div>;
};
