import { ReactElement } from 'react';
import { Aside } from './components/widgets/aside';
import { Header } from './components/layout/header';
import { Container } from './components/layout/container';
import { useFetchDocsAndSaveContext } from './core/hooks/useFetchDocsAndSaveContext';
import { Main } from './components/layout/main';
import { DocTests } from './components/widgets/docTests';

const App = (): ReactElement => {
  const { isLoading, error } = useFetchDocsAndSaveContext();

  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <Aside />
        <Main>
          <div className="flex items-center justify-center">
            {isLoading ? (
              <div className="my-8 animate-spin border-4 border-transparent border-t-[#0e7490] rounded-full w-16 h-16" />
            ) : null}
            {error ? (
              <div className="my-8 w-full text-center bg-red-400 px-6 py-4 text-base text-white animate-fadeIn font-sans rounded-md shadow-md">
                Error fetch request
              </div>
            ) : null}
          </div>
          <DocTests />
        </Main>
      </div>
    </Container>
  );
};

export default App;
