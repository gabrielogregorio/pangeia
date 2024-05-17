import { ReactElement } from 'react';
import { MarkdownToHtml } from '@/shared/ReactMarkdown';
import { ModeTypeEnum } from '@/contexts/types';

export const DefaultPage = (): ReactElement => {
  return (
    <div>
      <MarkdownToHtml
        mode={ModeTypeEnum.product}
        body={`

Escolha alguma documentação


`}
      />
    </div>
  );
};
