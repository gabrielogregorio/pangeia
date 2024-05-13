import { ReactElement, useContext } from 'react';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';
import { SchemaType } from '@/interfaces/api';
import { ModeContext } from '@/contexts/devProvider';

type Props = {
  docSelected: SchemaType;
  isInExpandedDoc?: boolean;
};

export const HandlerShowDocs = ({ docSelected, isInExpandedDoc = false }: Props): ReactElement => {
  const { mode } = useContext(ModeContext);

  return (
    <div
      className={`${isInExpandedDoc ? 'px-3 py-1' : 'px-6 py-6 pt-5'} animate-fadeInSpeed`}
      key={docSelected.dynamicId}>
      {docSelected?.content?.map((page) => {
        const key = `${docSelected.title}-${docSelected.dynamicId}`;

        if ('markdown' in page) {
          if (page.subType === 'dev' && mode === 'product') {
            return <div key={page.dynamicId}></div>;
          }

          if (page.type === 'md') {
            return (
              <InterpreterMarkdown
                isInExpandedDoc={isInExpandedDoc}
                tags={docSelected.tags}
                handlerName={docSelected.handlerName}
                text={page.markdown || ''}
                key={key + page.dynamicId}
              />
            );
          }

          if (page.type === 'tag' && mode === 'dev') {
            return (
              <InterpreterMarkdown
                isInExpandedDoc={isInExpandedDoc}
                tags={docSelected.tags}
                handlerName={docSelected.handlerName}
                text={page.markdown || ''}
                key={key + page.dynamicId}
              />
            );
          }

          if (page.type === 'tag' && mode === 'product') {
            return <div key={page.dynamicId}></div>;
          }

          console.error('Padrão não mapeado', page);
          return <div key={page.dynamicId}></div>;
        }

        return <div key="not-found-docs">Está documentação não está mapeada {JSON.stringify(page)}</div>;
      })}
    </div>
  );
};
