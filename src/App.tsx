import { ReactElement } from 'react';
import { Aside } from './components/widgets/aside';
import { Header } from './components/layout/header';
import { Container } from './components/layout/container';
import { useFetchDocsAndSaveContext } from './core/hooks/useFetchDocsAndSaveContext';
import { Main } from './components/layout/main';
import { useSyncUrlWithList } from '@/hooks/useSync';
import { useUrlChange } from '@/hooks/useUrlChange';
import { Documentation } from '@/widgets/documentation';

const App = (): ReactElement => {
  useFetchDocsAndSaveContext();
  useSyncUrlWithList();
  useUrlChange();

  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <Aside />
        <Main>
          <Documentation key="doctest" />
        </Main>
      </div>
    </Container>
  );
};

export default App;
