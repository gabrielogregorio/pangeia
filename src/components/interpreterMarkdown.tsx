import { ReactElement } from 'react';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';

type InterpreterMarkdownInterface = {
  text: string;
};

export const InterpreterMarkdown = ({ text }: InterpreterMarkdownInterface): ReactElement => {
  return <MarkdownToHtml body={text} />;
};
