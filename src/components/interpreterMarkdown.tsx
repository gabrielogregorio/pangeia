import { ReactElement, useContext } from 'react';
import { MarkdownToHtml, MarkdownToHtmlExpanded } from '@/shared/ReactMarkdown';
import { extractReferences } from '@/widgets/documentation/extractReferences';
import { ExpandedDocLinked } from '@/components/ExpandedDocLinked';
import { ModeContext } from '@/contexts/devProvider';

type InterpreterMarkdownInterface = {
  text: string;
  isInExpandedDoc?: boolean;
  tags?: string[];
};

export const InterpreterMarkdown = ({ text, tags, isInExpandedDoc }: InterpreterMarkdownInterface): ReactElement => {
  const references = extractReferences(text);
  const { mode } = useContext(ModeContext);

  return (
    <div>
      {mode === 'dev' ? (
        <div className="animate-fadeInSpeed" key="tags">
          tags: <span className="select-all cursor-copy">(ref.{tags?.join('.')})</span>
        </div>
      ) : undefined}

      {references.map((item, index) => {
        if (item.type === 'text') {
          if (isInExpandedDoc) {
            return <MarkdownToHtmlExpanded key={index} body={item.content} />;
          }
          return <MarkdownToHtml key={index} body={item.content} />;
        }

        return <ExpandedDocLinked key={index} reference={item.reference}></ExpandedDocLinked>;
      })}
    </div>
  );
};
