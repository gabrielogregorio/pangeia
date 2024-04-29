import { ReactElement, ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

export const Main = ({ children }: MainProps): ReactElement => {
  return (
    <main className="relative z-10 col-span-12 lg:col-span-9 flex flex-col max-h-screen">
      <div
        className="overflow-y-auto"
        style={{
          height: 'calc(100vh - 3.5rem)',
        }}>
        {children}
      </div>
    </main>
  );
};
