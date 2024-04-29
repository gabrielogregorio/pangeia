import { ReactElement, ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeProps = {
  inline: boolean | undefined;
  className: string;
  children: ReactNode;
};

export const Code = ({ inline, className, children }: CodeProps): ReactElement => {
  const match: RegExpExecArray | null = /language-(\w+)/.exec(className || '');
  const language: string | undefined = match?.[1];
  const removeLastBreakLine: string = String(children).replace(/\n$/, '');

  return (
    <span className="codeFont">
      {!inline && match ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <SyntaxHighlighter style={dracula as any} language={language} PreTag="div">
          {removeLastBreakLine}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      )}
    </span>
  );
};
