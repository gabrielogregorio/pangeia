import { ReactElement, ReactNode } from 'react';
import { commentColors } from '@/helpers/colors';

const getTextFromReactNode = (node: ReactNode): string | number => {
  if (typeof node === 'string' || typeof node === 'number') return node || '';
  if (node instanceof Array) return node.map(getTextFromReactNode).join('');
  if (typeof node === 'object' && node) return getTextFromReactNode((node as ReactElement)?.props?.children);
  return '';
};

// FIXME: this is bad
const getNameColor = (stringElement: string): string => {
  const reColor: RegExp = /(.{3,200}?)#/;
  const resultsColor: RegExpMatchArray | null = stringElement.match(reColor);
  let color: string = '';
  if (resultsColor) {
    [, color] = resultsColor;
  }
  return color;
};

// FIXME: this is bad
const getTitle = (stringElement: string): string => {
  const reTitleFinal: RegExp = /.{0,200}?#(.*)/;
  const results: RegExpExecArray | null = reTitleFinal.exec(stringElement);
  let titleFinal: string = '';
  if (results) {
    [, titleFinal] = results;
  }

  return titleFinal;
};

export const Blockquote = ({ children }: { children: ReactNode }): ReactElement => {
  const stringElement: string = getTextFromReactNode(children).toString();

  const titleFinal: string = getTitle(stringElement);
  const color: string = getNameColor(stringElement);
  const bodyText: string = stringElement.replace(/.{0,999}?#.*/g, '');

  const colorFinal: string = color.trim().toLowerCase();
  const backgroundColor: string = commentColors[colorFinal]?.bg || commentColors.default.bg;
  const titleColor: string = commentColors[colorFinal]?.title || commentColors.default.title;
  const textColor: string = commentColors[colorFinal]?.text || commentColors.default.text;

  return (
    <blockquote className={`${backgroundColor} py-4`}>
      <h4 className={`uppercase text-lg font-bold ${titleColor}`}>{titleFinal}</h4>

      <p className={` text-lg font-base ${textColor} pt-2`}>{bodyText}</p>
    </blockquote>
  );
};
