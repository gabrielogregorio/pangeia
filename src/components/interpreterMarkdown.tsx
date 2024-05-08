import { ReactElement } from 'react';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';
import { extractReferences } from '@/widgets/documentation/extractReferences';
import { ExpandedDocLinked } from '@/components/ExpandedDocLinked';

type InterpreterMarkdownInterface = {
  text: string;
};

export const InterpreterMarkdown = ({ text }: InterpreterMarkdownInterface): ReactElement => {
  const references = extractReferences(text);

  return (
    <div>
      {references.map((item, index) => {
        if (item.type === 'text') {
          return <MarkdownToHtml key={index} body={item.content} />;
        }

        return <ExpandedDocLinked key={index} reference={item.reference}></ExpandedDocLinked>;
      })}
    </div>
  );
};
