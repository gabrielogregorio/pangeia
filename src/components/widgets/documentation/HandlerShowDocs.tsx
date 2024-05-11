import { ReactElement } from 'react';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';
import { SchemaType } from '@/interfaces/api';

type Props = {
  docSelected: SchemaType;
  isInExpandedDoc?: boolean;
};

export const HandlerShowDocs = ({ docSelected, isInExpandedDoc = false }: Props): ReactElement => {
  return (
    <div className="px-6 py-6 pt-5 animate-fadeInSpeed" key={docSelected.dynamicId}>
      {docSelected?.content?.map((page) => {
        const key = `${docSelected.title}-${docSelected.dynamicId}`;

        if ('markdown' in page) {
          // melhorar nome isInExpandedDoc
          return (
            <InterpreterMarkdown
              isInExpandedDoc={isInExpandedDoc}
              tags={docSelected.tags}
              text={page.markdown || ''}
              key={key + page.dynamicId}
            />
          );
        }

        return <div>Está documentação não está mapeada {JSON.stringify(page)}</div>;
      })}
      <span className="border-b-2 block" />
    </div>
  );
};
