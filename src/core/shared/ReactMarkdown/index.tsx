/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Code } from './code';
import { Blockquote } from './blockquote';

export const MarkdownToHtml = ({ body }: { body: string }): ReactElement => {
  return (
    <div className="px-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          a: ({ href, children }) => (
            <a
              target="_blank"
              rel="noreferrer"
              href={href}
              className="text-blue-500 dark:text-blue-400 hover:underline">
              {children}
            </a>
          ),

          h1: ({ children }) => (
            <h1 className="text-5xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-3xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-5">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-2xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-4">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-3">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-bold dark:text-gray-100 text-gray-700 mb-3 my-2">{children}</h6>
          ),

          hr: () => <hr className="bg-transparent border-b-1 border-b-gray-100 my-4" />,

          img: ({ src, title }) => <img src={`${src}`} alt={title} />,

          table: ({ children }) => (
            <table className="table-auto w-full text-lg dark:text-gray-200 text-gray-600 my-4 dark:bg-[#282A36] bg-gray-200">
              {children}
            </table>
          ),

          th: ({ children }) => (
            <th className="py-2 border-b border-b-gray-300 dark:border-b-gray-700 text-left px-6">{children}</th>
          ),

          tr: ({ children }) => <tr className="bg-gray-300 dark:bg-gray-800">{children}</tr>,

          td: ({ children }) => <td className="font-bold px-6 py-2">{children}</td>,

          li: ({ children }) => <li>{children}</li>,
          ul: ({ children }) => (
            <ul className="text-lg dark:text-gray-200 text-gray-600 list-disc my-3 mx-4">{children}</ul>
          ),

          // @ts-ignore
          code: ({ inline, className, children }): ReactElement => {
            return (
              <Code className={className || ''} inline={inline}>
                {children}
              </Code>
            );
          },

          blockquote: ({ children }): ReactElement => {
            return <Blockquote>{children}</Blockquote>;
          },

          p: ({ children }) => <p className=" text-lg dark:text-gray-200 text-gray-600 my-2">{children}</p>,
        }}>
        {body}
      </ReactMarkdown>
    </div>
  );
};
