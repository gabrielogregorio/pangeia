import { ReactElement, useContext } from 'react';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';
import { SchemaType } from '@/interfaces/api';
import { ModeContext } from '@/contexts/devProvider';
import { ModeTypeEnum } from '@/contexts/types';
import { RequestHandler } from '@/widgets/documentation/requestHandlers';

type Props = {
  docSelected: SchemaType;
  isInExpandedDoc?: boolean;
};

export const HandlerShowDocs = ({ docSelected, isInExpandedDoc = false }: Props): ReactElement => {
  const { mode } = useContext(ModeContext);

  return (
    <div className={`${isInExpandedDoc ? 'px-3 py-1' : 'px-6 py-6 pt-5'} animate-fadeInSpeed`} key={docSelected.id}>
      {docSelected?.blocks?.map((page) => {
        const key = `${docSelected.title}-${docSelected.id}`;

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

          if (page.type === 'tag' && (mode === ModeTypeEnum.dev || mode === ModeTypeEnum.debug)) {
            const tag = page.markdown
              ?.split(':')[1]
              .replace('[', '')
              .replace(']', '')
              .split(',')
              .map((item) => item.trim());
            return (
              <div key={page.dynamicId} className="flex gap-3">
                {tag?.map((item) => (
                  <div key={item} className="bg-primary-700 text-white px-2 py-1 rounded-md">
                    {item}
                  </div>
                ))}
              </div>
            );
          }

          if (page.type === 'tag' && mode === ModeTypeEnum.product) {
            return <div key={page.dynamicId}></div>;
          }

          console.error('Padrão não mapeado', page);
          return <div key={page.dynamicId}></div>;
        }

        if (page.type === 'openApi3') {
          return (
            <div key={page.dynamicId}>
              <RequestHandler contentRequest={page} />
            </div>
          );
        }

        return <div key="not-found-docs">Está documentação não está mapeada {JSON.stringify(page)}</div>;
      })}
    </div>
  );
};
