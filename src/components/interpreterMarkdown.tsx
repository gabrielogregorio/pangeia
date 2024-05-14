import { ReactElement, useContext } from 'react';
import { MarkdownToHtml, MarkdownToHtmlExpanded } from '@/shared/ReactMarkdown';
import { extractReferences } from '@/widgets/documentation/extractReferences';
import { ExpandedDocLinked } from '@/components/ExpandedDocLinked';
import { ModeContext } from '@/contexts/devProvider';

type InterpreterMarkdownInterface = {
  text: string;
  isInExpandedDoc?: boolean;
  handlerName?: string;
  tags?: string[];
};

export const InterpreterMarkdown = ({
  text,
  tags = [],
  handlerName = 'Sem handler',
  isInExpandedDoc = false,
}: InterpreterMarkdownInterface): ReactElement => {
  const references = extractReferences(text);
  const { mode } = useContext(ModeContext);

  return (
    <div>
      {mode === 'dev' ? (
        <div key="tags">
          <div className="animate-fadeInSpeed whitespace-nowrap overflow-hidden text-ellipsis px-4 my-2 text-gray-500 text-sm dark:text-gray-400">
            tags: <span className="select-all cursor-copy">[ref.{tags?.join('.')}]</span>
          </div>
          handler: {handlerName}
        </div>
      ) : undefined}

      {references.map((item, index) => {
        if (item.type === 'text') {
          if (isInExpandedDoc) {
            return <MarkdownToHtmlExpanded key={index} body={item.content} mode={mode} />;
          }
          return <MarkdownToHtml key={index} body={item.content} mode={mode} />;
        }

        return <ExpandedDocLinked key={index} reference={item.reference}></ExpandedDocLinked>;
      })}
    </div>
  );
};
