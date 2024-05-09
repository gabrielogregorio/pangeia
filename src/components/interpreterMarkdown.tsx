import { ReactElement } from 'react';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';
import { extractReferences } from '@/widgets/documentation/extractReferences';
import { ExpandedDocLinked } from '@/components/ExpandedDocLinked';

type InterpreterMarkdownInterface = {
  text: string;
  tags?: string[];
};

export const InterpreterMarkdown = ({ text, tags }: InterpreterMarkdownInterface): ReactElement => {
  const references = extractReferences(text);

  return (
    <div>
      <div>tags: {tags?.join(',')}</div>
      {references.map((item, index) => {
        if (item.type === 'text') {
          return <MarkdownToHtml key={index} body={item.content} />;
        }

        return <ExpandedDocLinked key={index} reference={item.reference}></ExpandedDocLinked>;
      })}
    </div>
  );
};
