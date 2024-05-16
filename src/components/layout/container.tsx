import { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { ThemeContext } from '@/contexts/themProvider';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';

export const Container = ({ children }: { children: ReactNode }): ReactElement => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const bodyTag = window.document.getElementsByTagName('body')?.[0];
    if (!bodyTag) {
      return () => {};
    }

    if (theme === 'dark') {
      bodyTag.classList.remove('white');
      bodyTag.classList.add('dark');
      return;
    }

    bodyTag.classList.remove('dark');
    bodyTag.classList.add('white');
  }, [theme]);

  return (
    <div className={`w-full overflow-hidden `}>
      <FloatingActionButtons /> {children}
    </div>
  );
};
