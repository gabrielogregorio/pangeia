import { ReactElement, useContext } from 'react';
import { docSelectedContext } from '@/contexts/docSelectedProvider';
import { DataContext } from '@/contexts/dataProvider';
import { HandlerShowDocs } from '@/widgets/documentation/HandlerShowDocs';
import { Status } from '@/components/base/Status';

export const Documentation = (): ReactElement => {
  const { docSelected } = useContext(docSelectedContext);
  const { isLoading, error } = useContext(DataContext);

  if (isLoading || error) {
    return <Status isLoading={isLoading} error={error} />;
  }

  if (!docSelected) {
    return <div>Nenhuma documentação selecionada</div>;
  }

  return <HandlerShowDocs docSelected={docSelected} />;
};
