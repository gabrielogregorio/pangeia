import { useContext, useState } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { HandlerShowDocs } from '@/widgets/documentation/HandlerShowDocs';
import { findDocByTags } from '@/components/findDocByTags';
import { Collapse } from '@/widgets/Collapse';
import { FaPlusCircle } from 'react-icons/fa';
import { FaCircleMinus } from 'react-icons/fa6';
import { ModeContext } from '@/contexts/devProvider';

export const ExpandedDocLinked = ({ reference }: { reference: string }) => {
  const [referenceIsExpanded, setReferenceIsExpanded] = useState(false);
  const { data } = useContext(DataContext);
  const { mode } = useContext(ModeContext); // split in hooks
  const tags = reference.split('.');

  // needs refactor

  const docByTagFounded = findDocByTags(data.schema, tags);
  const docReferenceIsExpanded = referenceIsExpanded ? docByTagFounded : '';
  const content = docReferenceIsExpanded ? (
    <HandlerShowDocs isInExpandedDoc docSelected={docReferenceIsExpanded} />
  ) : undefined;

  // this is bad
  const contextReference = mode === 'product' ? '' : `[${docByTagFounded?.originName}] - `;

  return (
    <div className="px-4">
      <div className="bg-gray-200 dark:bg-gray-700 px-2">
        <button
          type="button"
          onClick={() => setReferenceIsExpanded((prev) => !prev)}
          className="cursor-pointer flex items-center gap-2 w-full py-2">
          <div>{referenceIsExpanded ? <FaCircleMinus /> : <FaPlusCircle />}</div>
          <div>{docByTagFounded ? contextReference + docByTagFounded.title : `ref não encontrado ${reference}`} </div>
        </button>
        <Collapse isOpen={referenceIsExpanded} disableAnimation forceRender={String(content)}>
          {content || 'Conteudo não encontrado'}
        </Collapse>
      </div>
    </div>
  );
};
