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
// import { Modal } from '@/widgets/modal';
// import { useModalController } from '@/hooks/useModalController';

const App = (): ReactElement => {
  useFetchDocsAndSaveContext();
  useSyncUrlWithList();
  const url = useUrlChange();
  // console.log(url);

  // const controller = useModalController({
  //   firstRenderOpenState: true,
  // });
  return (
    <Container>
      <Header />

      <div
        style={{ height: 'calc(100vh - 3.5rem)' }}
        className="grid grid-cols-12 w-full overflow-hidden bg-white dark:bg-dark dark:text-white relative">
        <Aside />
        <Main>
          {url.length ? <Documentation key="doctest" /> : <DefaultPage />}

          {/* <Modal controller={controller} /> */}
        </Main>
      </div>
    </Container>
  );
};

export default App;
