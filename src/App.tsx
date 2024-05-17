import { ReactElement } from 'react';
import { Aside } from './components/widgets/aside';
import { Header } from './components/layout/header';
import { Container } from './components/layout/container';
import { useFetchDocsAndSaveContext } from './core/hooks/useFetchDocsAndSaveContext';
import { Main } from './components/layout/main';
import { useSyncUrlWithList } from '@/hooks/useSync';
import { useUrlChange } from '@/hooks/useUrlChange';
import { Documentation } from '@/widgets/documentation';
import { DefaultPage } from './defaultPage';

const App = (): ReactElement => {
  useFetchDocsAndSaveContext();
  useSyncUrlWithList();
  const url = useUrlChange();

  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white-smooth dark:bg-dark dark:text-white-smooth relative">
        <Aside />
        <Main>{url.length ? <Documentation key="doctest" /> : <DefaultPage />}</Main>
      </div>
    </Container>
  );
};

export default App;
