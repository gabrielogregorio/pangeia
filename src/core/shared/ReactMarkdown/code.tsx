/* eslint-disable @typescript-eslint/no-explicit-any */
import { tailwindMerge } from '@/hooks/tailwindMerge';
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

  if (!inline && match) {
    return (
      <span className="codeFont">
        <SyntaxHighlighter style={dracula as any} language={language} PreTag="div">
          {removeLastBreakLine}
        </SyntaxHighlighter>
      </span>
    );
  }

  if (inline) {
    return (
      <span className="codeFont">
        <code
          className={tailwindMerge(
            className,
            'dark:bg-teal-700 bg-gray-200 border-b-2 border-transparent hover:border-b-white transition-all duration-300',
          )}>
          {children}
        </code>
      </span>
    );
  }

  return (
    <span className="codeFont">
      <code className={className}>{children}</code>
    </span>
  );
};
