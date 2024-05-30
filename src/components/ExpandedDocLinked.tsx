import { useContext, useState } from 'react';
import { DataContext } from '@/contexts/dataProvider';
import { HandlerShowDocs } from '@/widgets/documentation/HandlerShowDocs';
import { findDocByTags } from '@/components/findDocByTags';
import { Collapse } from '@/widgets/Collapse';
import { FaPlusCircle } from 'react-icons/fa';
import { FaCircleMinus } from 'react-icons/fa6';
import { SchemaType } from '@/core/interfaces/api';

const ExpandedDocLinkedItem = ({ docByTagFounded }: { docByTagFounded: SchemaType }) => {
  const [referenceIsExpanded, setReferenceIsExpanded] = useState(false);

  const docReferenceIsExpanded = referenceIsExpanded ? docByTagFounded : '';
  const content = docReferenceIsExpanded ? (
    <HandlerShowDocs isInExpandedDoc docSelected={docReferenceIsExpanded} />
  ) : undefined;

  return (
    <div className="px-4">
      <div className="bg-gray-300 dark:bg-primary-700 rounded-md">
        <button
          type="button"
          onClick={() => setReferenceIsExpanded((prev) => !prev)}
          className="cursor-pointer flex items-center gap-2 w-full py-2 justify-between px-2">
          <div>{docByTagFounded.title}</div>
          <div>{referenceIsExpanded ? <FaCircleMinus /> : <FaPlusCircle />}</div>
        </button>
        <div className="bg-gray-200 dark:bg-gray-700 px-2">
          <Collapse isOpen={referenceIsExpanded} disableAnimation forceRender={String(content)}>
            {content || 'Conteudo não encontrado'}
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export const ExpandedDocLinked = ({ reference }: { reference: string }) => {
  const { data } = useContext(DataContext);
  const tags = reference.split('.');

  const docByTagFounded = findDocByTags(data.schema, tags);

  return (
    <div className="flex flex-col gap-2">
      {docByTagFounded.map((item) => {
        return <ExpandedDocLinkedItem docByTagFounded={item} key={item.id} />;
      })}
    </div>
  );
};
