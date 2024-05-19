import { dataBadge } from '@/components/base/data';
import { ReactElement } from 'react';

export const BadgeMethod = ({ method, onlyText = false }: { method: string; onlyText?: boolean }): ReactElement => {
  if (!method) {
    return <div />;
  }

  const { title, bg, border } = dataBadge?.[method] ?? dataBadge.default;

  return <div className={`select-none ${bg} ${onlyText ? '' : border} px-2 text-sm w-14 text-left`}>{title}</div>;
};
