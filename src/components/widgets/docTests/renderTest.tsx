import { ReactElement, useContext } from 'react';
import { dataSelectedContext } from '@/contexts/dataSelectedProvider';
import { InterpreterMarkdown } from '@/components/interpreterMarkdown';

export const RenderTest = (): ReactElement => {
  const { dataSelected } = useContext(dataSelectedContext);

  if (!dataSelected.title) {
    return <div>sem conteudo</div>;
  }

  return (
    <div className="px-6 py-6 pt-5">
      <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-600 pb-2 hover:text-cyan-500 transition duration-150">
        {dataSelected.name || dataSelected.title}
      </h1>

      {dataSelected?.page?.map((page) => {
        if ('markdown' in page) {
          return <InterpreterMarkdown text={page.markdown || ''} />;
        }
        return <InterpreterMarkdown text={page.name || ''} />;
      })}

      <span className="border-b-2 block" />
    </div>
  );
};
