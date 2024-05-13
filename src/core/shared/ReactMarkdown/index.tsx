/* eslint-disable max-lines */
import { ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Code } from './code';
import { Blockquote } from './blockquote';
import { JsxRuntimeComponents } from 'node_modules/react-markdown/lib';

type Components = Partial<JsxRuntimeComponents>;

type partialChildrenType = {
  children: ReactNode;
};

const Base = ({ children }: Partial<partialChildrenType>): ReactElement => <div className="">{children}</div>;
const h1Tag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <h1 className="text-5xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{children}</h1>
);
const h2Tag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-6">{children}</h2>
);
const h3Tag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <h3 className="text-3xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-5">{children}</h3>
);
const h4Tag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <h4 className="text-2xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-4">{children}</h4>
);
const h5Tag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <h5 className="text-xl font-bold dark:text-gray-100 text-gray-700 mb-3 my-3">{children}</h5>
);
const h6Tag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <h6 className="text-sm font-bold dark:text-gray-100 text-gray-700 mb-3 my-2">{children}</h6>
);

const hrTag = () => <hr className="bg-transparent border-b-1 border-b-gray-100 my-4" />;
const tableTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <table className="table-auto w-full text-lg dark:text-gray-200 text-gray-600 my-4 dark:bg-[#282A36] bg-gray-200">
    {children}
  </table>
);

const thTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <th className="py-2 border-b border-b-gray-300 dark:border-b-gray-700 text-left px-6">{children}</th>
);

const trTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <tr className="bg-gray-300 dark:bg-gray-800">{children}</tr>
);
const tdTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <td className="font-bold px-6 py-2">{children}</td>
);
const liTag = ({ children }: Partial<partialChildrenType>): ReactElement => <li>{children}</li>;

const ulTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <ul className="text-lg dark:text-gray-200 text-gray-600 list-disc my-3 mx-4">{children}</ul>
);
const blockquoteTag = ({ children }: Partial<partialChildrenType>): ReactElement => {
  return <Blockquote>{children}</Blockquote>;
};

const pTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <p className=" text-lg dark:text-gray-200 text-gray-600 my-2">{children}</p>
);

const strongTag = ({ children }: Partial<partialChildrenType>): ReactElement => (
  <strong className="font-bold">{children}</strong>
);

const aTag = ({ href, children }: { href?: string; children?: ReactNode }): ReactElement => (
  <a target="_blank" rel="noreferrer" href={href} className="text-blue-500 dark:text-blue-400 hover:underline">
    {children}
  </a>
);

const imgTag = ({ src, title, alt }: { src?: string; alt?: string; title?: string }): ReactElement => (
  <img src={`${src}`} alt={alt} title={title} />
);

const codeTag = ({
  inline,
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
  inline?: boolean;
}): ReactElement => {
  return (
    <Code className={className || ''} inline={inline}>
      {children}
    </Code>
  );
};

const handlers: Partial<Components> = {
  base: Base,
  h1: h1Tag,
  h2: h2Tag,
  h3: h3Tag,
  h4: h4Tag,
  h5: h5Tag,
  h6: h6Tag,
  hr: hrTag,
  table: tableTag,
  th: thTag,
  tr: trTag,
  td: tdTag,
  li: liTag,
  ul: ulTag,
  blockquote: blockquoteTag,
  p: pTag,
  strong: strongTag,
  a: aTag,
  img: imgTag,
  code: codeTag,
};

export const MarkdownToHtml = ({ body }: { body: string }): ReactElement => {
  return (
    <div className="px-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={handlers}>
        {body}
      </ReactMarkdown>
    </div>
  );
};

export const MarkdownToHtmlExpanded = ({ body }: { body: string }): ReactElement => {
  return (
    <div className="px-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ ...handlers, h1: h3Tag, h2: h3Tag }}>
        {body}
      </ReactMarkdown>
    </div>
  );
};
