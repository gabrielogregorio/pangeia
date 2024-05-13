import { ReactElement, useContext } from 'react';
import { DocSelectedContext } from '@/contexts/docSelectedProvider';
import { DataContext } from '@/contexts/dataProvider';
import { HandlerShowDocs } from '@/widgets/documentation/HandlerShowDocs';
import { Status } from '@/components/base/Status';

export const Documentation = (): ReactElement => {
  const { docSelected } = useContext(DocSelectedContext);
  const { isLoading, error } = useContext(DataContext);

  if (isLoading || error) {
    return <Status key="status" isLoading={isLoading} error={error} />;
  }

  if (!docSelected) {
    return <div key={'não encontrado'}>Nenhuma documentação selecionada</div>;
  }

  return <HandlerShowDocs key="data" docSelected={docSelected} />;
};
