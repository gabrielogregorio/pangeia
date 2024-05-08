import { useContext, useState } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { HandlerShowDocs } from '@/widgets/documentation/HandlerShowDocs';
import { findDocByTags } from '@/components/findDocByTags';

export const ExpandedDocLinked = ({ reference }: { reference: string }) => {
  const [referenceIsExpanded, setReferenceIsExpanded] = useState(false);
  const { data } = useContext(DataContext);

  const tags = reference.split('.');

  const docByTagFounded = findDocByTags(data, tags);
  const docReferenceIsExpanded = referenceIsExpanded ? docByTagFounded : '';

  return (
    <details className="bg-gray-700">
      <summary onClick={() => setReferenceIsExpanded(true)} className="cursor-pointer">
        {docByTagFounded
          ? `[${docByTagFounded.originName}] - ` + docByTagFounded.title
          : `ref não encontrado ${reference}`}{' '}
      </summary>
      <div>
        {docReferenceIsExpanded ? <HandlerShowDocs docSelected={docReferenceIsExpanded} /> : 'Conteudo não encontrado'}
      </div>
    </details>
  );
};
